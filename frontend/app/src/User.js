import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_ME = gql`
query {
  me {
    email,
    firstName,
    lastName
  }
}
`

const QUERY_USERS = gql`
query {
  companies {
    id
    name
    isEnabled
  }
}
`;

const CREATE_USER = gql`
mutation createCompany ($name: String!, $isEnabled: Boolean!){
  createCompany (name: $name, isEnabled: $isEnabled){
    id
    name
    isEnabled
  }
}
`;


export function UserInfo() {

  // Polling: rovides near-real-time synchronization with your server
  // by causing a query to execute periodically at a specified interval
  const { data, loading } = useQuery(QUERY_USERS);
  // should handle loading status
  if (loading) return <p>Loading...</p>;

  return data.companies.map(({ id, name, isEnabled }) => (
    <div key={id}>
      <p>
        User - {id}: {name} {isEnabled}
      </p>
    </div>
  ));
}

export function CreateUser() {

  let inputName;
  const [createUser, { data }] = useMutation(CREATE_USER);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createUser({
            variables: {
              name: inputName.value,
              isEnabled: true
            }
          });
          inputName.value = '';
        }}
        style={{ marginTop: '2em', marginBottom: '2em' }}
      >
        <label>Name: </label>
        <input
          ref={node => {
            inputName = node;
          }}
          style={{ marginRight: '1em' }}
        />

        <button type="submit" style={{ cursor: 'pointer' }}>Add a Company</button>
      </form>
    </div>
  );

}
