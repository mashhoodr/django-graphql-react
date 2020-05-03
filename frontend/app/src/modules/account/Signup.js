import React from 'react';
import { Row, Card, Form, Input, Button } from 'antd';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';


const SIGNUP_USER = gql`
mutation register ($email: String!, $password1: String!, $password2: String!, $firstName: String!, $lastName: String!){
  register (input: { email: $email, password1: $password1, password2: $password2, firstName: $firstName, lastName: $lastName }){
    success,
    errors,
    token
  }
}
`;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

export const Signup = () => {
    const [signup, { data }] = useMutation(SIGNUP_USER);

    const onFinish = values => {
        console.log('Success:', values);
        signup({
            variables: {
                email: values.email,
                password1: values.password,
                password2: values.password,
                firstName: values.firstName,
                lastName: values.lastName
            }
        });

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row align="middle" justify="center" style={{ height: '100%' }}>
            { /** TODO store in localstorage? */}
            {data ? <Card title="Data">
                <pre>{JSON.stringify(data)}</pre>
            </Card> : null}

            <Card title="Signup" bordered={true} style={{ width: 350 }}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'This is a required field.' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'This is a required field.' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'This is a required field.' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'This is a required field.' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" block>
                            Signup
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    );
}