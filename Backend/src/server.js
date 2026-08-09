import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

// MySQL connection setup
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "userdb",
});

console.log("Connected to MySQL database");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello from Express",
    endpoints: ["/health", "/api/users"],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM users");

    return res.status(200).json({
      data: rows,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      error: "Failed to fetch users",
    });
  }
});

app.post("/api/users/create", async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { firstName, lastName, birthDate, age, address } = req.body ?? {};

    if (
      !firstName ||
      !lastName ||
      !birthDate ||
      age === undefined ||
      !address
    ) {
      return res.status(400).json({
        error: "firstName, lastName, birthDate, age and address are required",
      });
    }

    const date = new Date(birthDate);

    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({
        error: "birthDate must be a valid ISO datetime",
      });
    }

    const mysqlBirthDate = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hourCycle: "h23",
    })
      .format(date)
      .replace(",", ".");

    await connection.execute(
      "INSERT INTO users (firstName, lastName, birthDate, age, address) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, mysqlBirthDate, age, address],
    );

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error inserting user:", error);

    return res.status(500).json({
      error: "Failed to create user",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.listen(port, host, () => {
  console.log(`Express demo is running on http://${host}:${port}`);
});
