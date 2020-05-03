import React from 'react';
import { Row, Card, Form, Input, Button, Typography } from 'antd';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const LOGIN_USER = gql`
mutation tokenAuth ($email: String!, $password: String!){
  tokenAuth (input: { email: $email, password: $password }){
    success,
    errors,
    token,
    refreshToken,
    user {
      id,
      email,
      firstName,
      lastName
    }
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

export const Login = () => {
    const [login, { data }] = useMutation(LOGIN_USER);

    const onFinish = values => {
        console.log('Success:', values);
        login({
            variables: {
                email: values.email,
                password: values.password
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

            <Card title="Login" bordered={true} style={{ width: 300 }}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
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
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Link to="signup">
                    <Text underline>No account? Signup.</Text>
                </Link>

            </Card>


        </Row>
    );
}