import React from 'react';
import { Typography } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
const { Title } = Typography;

const QUERY_ME = gql`
query {
  me {
    email,
    firstName,
    lastName
  }
}`


export const Dashboard = () => {
    const { data } = useQuery(QUERY_ME);
    return (
        <>
            <Title>Dashboard</Title>
            <pre>{JSON.stringify(data)}</pre>
        </>
    );
}