import { Button, Table, Select, Flex, Typography, Modal } from "antd";
import React, { useState } from "react";
import type { ColumnsType} from "antd/es/table";

const { Title } = Typography;

interface DataType {
    key: string;
    timestamp: string;
    status: string;
    message: string;
    stats: string;
}

function get_val(i: number): DataType {
    return {
        key: `${i}`,
        timestamp: '24/5/23 13:20:45.213789',
        status: i % 2 === 0 ? 'INFO' : 'DEBUG',
        message: 'Hello World',
        stats: i % 3 === 0 ? 'NONE' : 'STATS'
    }
}

const data: DataType[] = Array(50).fill({}).map((_: any, idx: number) => { return get_val(idx)})

// how would highlighting work? <- antd filters work with a set of mutually exclusive options
// only want regex search on the message, some kind of time interval for timestamp?
// filterDropdown?
// store the filter state in some object?
export default function MainWindow() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleStatsClick = () => {
        setIsModalOpen(true);
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
            width: '20%'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filters: [
                {text: 'INFO', value: 'INFO'},
                {text: 'DEBUG', value: 'DEBUG'}
            ],
            key: 'status',
            width: "5%",
            onFilter: (value: any, record: DataType) => {
                return record.status === value;
            }
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Stats',
            dataIndex: 'stats',
            filters: [
                {text: 'STATS_ONLY', value: 'WITH_STATS'}
            ],
            key: 'stats',
            width: '10%',
            onFilter: (value: any, record: DataType) => {
                if(value === 'WITH_STATS') {
                    return record.stats !== 'NONE';
                } else {
                    return true;
                }
            },
            render: (_: any, record: DataType) => {
                return (
                    record.stats === 'NONE' ?
                        <div>NONE</div> :
                        <Button onClick={handleStatsClick}>Display Stats</Button>
                )
            }
        }
    ]

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
                />
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    scroll={{y: 600}}
                />
                <Modal
                    title="Stats Info at 24/5/23 13:20:45.213789"
                    width="80%"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Table dataSource={data} columns={columns} />
                </Modal>
                <Flex vertical={false}>
                    <Button type="primary">SAVE FILTER STATE</Button>
                    <Select placeholder="CHOOSE SAVED FILTER" options={[
                        {value: "A", label: "A"},
                        {value: "B", label: "B"}]
                    }/>
                </Flex>
            </Flex>
        </>
    )
}