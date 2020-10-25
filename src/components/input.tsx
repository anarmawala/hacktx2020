import { Space, Tag, Typography, Input as AntdInput } from 'antd'
import { InputProps } from 'antd/lib/input'
import * as React from 'react'

export type CustomInputProps = {
    label: string
    required?: boolean
    inputProps?: InputProps
}

const Input: React.FC<CustomInputProps> = (props) => {
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                    <Typography.Text strong>{props.label}</Typography.Text>
                    {props.required && <Tag color="red">required</Tag>}
                </Space>
                <AntdInput {...props.inputProps} style={{ borderRadius: '15pt' }} size="large" />
            </Space>
        </>
    )
}
export default Input
