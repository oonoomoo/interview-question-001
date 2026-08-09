import React, { useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import ITable, { type DataType } from "./components/ITable";
import styled from "styled-components";
import Row from "antd/es/grid/row";
import { Button, Form } from "antd";
import type { Dayjs } from "dayjs";
import IModal from "./components/IModal";
import { UsersApi } from "@api/index";
import type { UserListModel } from "@api/users/models/users-model";
import dayjs from "dayjs";

export type FieldType = {
  firstName?: string;
  lastName?: string;
  birthDate?: Dayjs;
  age?: number;
  address?: string;
};

export const List: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [form] = Form.useForm<FieldType>();
  const [mode, setMode] = React.useState<"add" | "view">("add");
  const [data, setData] = React.useState<DataType[]>([]);

  const fetchUserList = async () => {
    try {
      const response: UserListModel.Response = await UsersApi.userList();
      console.log("Fetched user list:", response);

      const userData: DataType[] = response.data.map((item) => ({
        key: item.id.toString(),
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        address: item.address,
        birthDate: dayjs(item.birthDate),
        age: item.age,
      }));

      setData(userData);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    setMode("add");
  };

  const handleOnAddUser = async (formValues: FieldType) => {
    try {
      const calculatedAge = formValues.birthDate
        ? dayjs().diff(formValues.birthDate, "year")
        : 0;

      await UsersApi.createUser({
        firstName: formValues.firstName || "",
        lastName: formValues.lastName || "",
        age: calculatedAge,
        address: formValues.address || "",
        birthDate: formValues.birthDate?.toISOString() ?? "",
      });

      await fetchUserList();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      <ContentStyle>
        <Row justify="end">
          <Button
            type="primary"
            style={{ marginBottom: "16px" }}
            onClick={handleAddClick}
          >
            ADD
          </Button>
        </Row>
        <ITable
          dataSource={data}
          onViewClick={(record) => {
            setIsModalOpen(true);
            setMode("view");
            form.setFieldsValue(record);
          }}
        />
      </ContentStyle>

      <IModal
        isOpen={isModalOpen}
        mode={mode}
        onClose={() => setIsModalOpen(false)}
        onOk={(formValues) => handleOnAddUser(formValues)}
        form={form}
      />
    </>
  );
};

const ContentStyle = styled.div`
  margin: 5% 10% 0 10%;
`;
