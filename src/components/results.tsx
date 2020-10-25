import * as React from 'react'
import { Button, Card, Col, PageHeader, Row, Space, Statistic, Table, Tag, Typography } from 'antd'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import properties from '../store/properties'
import { RootState } from '../store/store'
import { Property } from '../model/properties'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const columns = [
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Beds', dataIndex: 'beds', key: 'beds' },
    { title: 'Bathrooms', dataIndex: 'baths', key: 'baths' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
        title: 'Action',
        key: 'action',
        render: (record: Property) => (
            <Space size="middle">
                <Button type="primary">Copy Address</Button>
            </Space>
        ),
    },
]

const ResultsPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { response } = useSelector((state: RootState) => state.properties)

    if (response === null) return <Redirect to="/best-price" />

    return (
        <Space direction="vertical" size="large">
            <PageHeader
                className="cardStyle"
                onBack={() => {
                    dispatch(properties.actions.setResponse(null))
                    history.push('/best-price')
                }}
                title="Back"
                subTitle="Click to go back to main screen"
            />
            <Card className="cardStyle">
                <Space direction="vertical" size="middle">
                    <Typography.Title>Compare Results:</Typography.Title>

                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Row justify="space-around" align="middle" gutter={16}>
                            <Col>
                                <Statistic
                                    title="Your Current Value"
                                    value={response.current_payment}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix="$"
                                />
                            </Col>
                        </Row>
                        <Row gutter={24} justify="center">
                            <Col>
                                <Statistic
                                    title="Average Low Price"
                                    value={response.low}
                                    precision={2}
                                    valueStyle={{ color: response.current_payment > response.low ? '#3f8600' : '#cf1322' }}
                                    suffix={response.current_payment > response.low && <ArrowDownOutlined />}
                                    prefix="$"
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title="Average Price"
                                    value={response.med}
                                    precision={2}
                                    valueStyle={{ color: response.current_payment > response.med ? '#3f8600' : 'black' }}
                                    suffix={<ArrowUpOutlined />}
                                    prefix="$"
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    title="Average High Price"
                                    value={response.high}
                                    precision={2}
                                    valueStyle={{ color: response.current_payment > response.med ? '#3f8600' : 'black' }}
                                    suffix={<ArrowUpOutlined />}
                                    prefix="$"
                                />
                            </Col>
                        </Row>
                    </Space>

                    <Table columns={columns} dataSource={response.locations} />
                </Space>
            </Card>
        </Space>
    )
}

export default ResultsPage
