import { Table, Select, Flex, Typography, Menu } from "antd";
import React from "react";

const { Title } = Typography;

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }
]

export default function MainWindow() {
    return (
        <>
            <Flex vertical={true}>
                <Title>File View</Title>
                <Select
                    placeholder={"Choose Log File"}
                    onChange={(value: string) => {}}
                    options={[
                        {value: "A", label: "A"},
                        {value: "B", label: "B"}
                    ]}
                ></Select>
                <Table dataSource={data} columns={columns} />
            </Flex>
        </>
    )
}