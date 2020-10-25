import { Card, Col, Row, Button, Typography, Space, Spin } from 'antd'
import React from 'react'
import Input from './input'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Redirect } from 'react-router-dom'
import { get_rating } from '../store/properties'

const PriceMatchForm = () => {
    const { loading, response } = useSelector((state: RootState) => state.properties)
    const dispatch = useDispatch()

    const [city, setCity] = React.useState('')
    const [zipcode, setZipcode] = React.useState('')
    const [current_payment, setCurrent_payment] = React.useState(70000)
    const [beds, setBeds] = React.useState(2)
    const [baths, setBaths] = React.useState(1)
    const [radius, setRadius] = React.useState(20)

    if (loading && response !== null) return <Redirect to="/results" />
    else if (loading) {
        return (
            <Card id="hero" className="cardStyle">
                <Space direction="vertical" size="middle">
                    <Spin size="large" spinning />
                </Space>
            </Card>
        )
    }

    // {
    //     "zipcode": 85001,
    //     "city": "Phoenix",
    //     "current_payment": 70000,
    //     "beds": 2,
    //     "baths": 1,
    //     "radius": 50
    // }

    return (
        <Card id="hero" className="cardStyle">
            <Space direction="vertical" size="middle">
                <Row align="middle" justify="center">
                    <Typography.Title level={4}>HOUSE VALUE JUSTIFIED ❓</Typography.Title>
                </Row>
                <Row align="middle" justify="center" gutter={24}>
                    <Col span={8}>
                        <Input
                            label="City"
                            required
                            inputProps={{ placeholder: 'i.e. Austin', value: city, onChange: (e) => setCity(e.target.value) }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            label="Zip Code"
                            required
                            inputProps={{ placeholder: 'i.e. 78712', value: zipcode, onChange: (e) => setZipcode(e.target.value) }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            label="Current Payment"
                            required
                            inputProps={{
                                placeholder: '$$',
                                type: 'number',
                                min: 0,
                                step: 5000,
                                value: current_payment,
                                onChange: (e) => setCurrent_payment(parseInt(e.target.value)),
                            }}
                        />
                    </Col>
                </Row>

                <Row align="middle" justify="center" gutter={24}>
                    <Col span={8}>
                        <Input
                            label="Beds"
                            required
                            inputProps={{
                                placeholder: '1',
                                type: 'number',
                                max: 10,
                                min: 1,
                                value: beds,
                                onChange: (e) => setBeds(parseFloat(e.target.value)),
                            }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            label="Baths"
                            required
                            inputProps={{
                                placeholder: '1',
                                type: 'number',
                                max: 10,
                                min: 1,
                                value: baths,
                                onChange: (e) => setBaths(parseFloat(e.target.value)),
                            }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            label="Radius"
                            inputProps={{
                                placeholder: '5',
                                type: 'number',
                                max: 50,
                                min: 5,
                                step: 5,
                                value: radius,
                                onChange: (e) => setRadius(parseFloat(e.target.value)),
                            }}
                        />
                    </Col>
                </Row>

                <Row align="middle" justify="center">
                    <Col>
                        <Button
                            type="primary"
                            size="large"
                            style={{ borderRadius: '30px' }}
                            className="button-Click"
                            onClick={() => dispatch(get_rating(city, zipcode, current_payment, beds, baths, radius))}
                        >
                            Get Rating
                        </Button>
                    </Col>
                </Row>
            </Space>
        </Card>
    )
}

export default PriceMatchForm
