import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import dayjs, { type Dayjs } from "dayjs";

type ITableProps = {
  dataSource: DataType[];
  onViewClick?: (record: DataType) => void;
};

export interface DataType {
  key: string;
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  birthDate: Dayjs;
  age: number;
}

const getColumns = (
  onViewClick?: ITableProps["onViewClick"],
): TableProps<DataType>["columns"] => [
  {
    title: <span style={{ display: "block", textAlign: "center" }}>Id</span>,
    dataIndex: "id",
    key: "id",
    align: "right",
    onHeaderCell: () => ({
      style: { backgroundColor: "#91caff" },
    }),
  },
  {
    title: "ชื่อ-สกุล",
    dataIndex: "firstName",
    key: "firstName",
    align: "center",
    onHeaderCell: () => ({
      style: { backgroundColor: "#91caff" },
    }),
    render: (_, record) => (
      <>
        {record.firstName} {record.lastName}
      </>
    ),
  },
  {
    title: "ที่อยู่",
    dataIndex: "address",
    key: "address",
    align: "center",
    onHeaderCell: () => ({
      style: { backgroundColor: "#91caff" },
    }),
  },
  {
    title: "วันเกิด",
    dataIndex: "birthDate",
    key: "birthDate",
    align: "center",
    onHeaderCell: () => ({
      style: { backgroundColor: "#91caff" },
    }),
    render: (date: Dayjs) => <>{date.format("DD/MM/YYYY")}</>,
  },
  {
    title: "อายุ",
    dataIndex: "age",
    key: "age",
    align: "center",
    onHeaderCell: () => ({
      style: { backgroundColor: "#91caff" },
    }),
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    onHeaderCell: () => ({
      style: { backgroundColor: "#91caff" },
    }),
    render: (_, record) => (
      <Space size="medium">
        <Button type="primary" onClick={() => onViewClick?.(record)}>
          View
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    id: 1,
    firstName: "John",
    lastName: "Brown",
    birthDate: dayjs(),
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    id: 2,
    firstName: "Jim",
    lastName: "Green",
    birthDate: dayjs(),
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    id: 3,
    firstName: "Joe",
    lastName: "Black",
    birthDate: dayjs(),
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

export const ITable: React.FC<ITableProps> = ({
  dataSource: customDataSource,
  onViewClick,
}) => (
  <Table<DataType>
    columns={getColumns(onViewClick)}
    dataSource={customDataSource || data}
    bordered
    scroll={{ x: "max-content" }}
    pagination={false}
    virtual={true}
  />
);

export default ITable;
