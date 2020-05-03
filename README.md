# django-graphql-react-starter

Introduce how to use GraphQL to connect Django and React

## Audience
The project is intended for engineers who want to know how to use GraphQL to connect Django and React. There is a basic GraphQL server in backend directory and GraphQL client in frontend directory.

## Backend
- Directory: backend
- Language: Python3
- Framework: Django with Graphene and django-graphql-auth

While this project uses Graphene, it is now advised to look into
https://ariadnegraphql.org/
https://tartiflette.io/
when starting out as well.

## Frontend
- Directory: frontend
- Library: React, Apollo, Apollo Boost

### Set Up

We have configured Docker on both frontend and backend apps. Running the command below will setup everything.

- `docker-compose up`
- Visit [http://localhost:3000](http://localhost:3000)
- Visit [http://localhost:8000/graphql](http://localhost:8000/graphql)

The database will need to be migrated, for that you can access the backend container using:
`docker exec -it <BACKEND_CONTAINER_ID> sh`
and then
`python manage.py migrate`

Will move this into a make file in the future.

## Demo Images
- Django - GraphiQL - Mutation:
  ![Django - GraphiQL - Mutation](https://miro.medium.com/max/1279/1*u-B-WQ5nfI3q3URSfcZ4xA.png)
- Django - GraphiQL - Query:
  ![Django - GraphiQL - Query](https://miro.medium.com/max/1280/1*zD_QIqmfOKymenXJg_d4fw.png)
- React - Mutation & Query:
  ![React - Mutation & Query](https://miro.medium.com/max/600/1*zJHhqqSv4CZ_o94ZSgvxPA.gif)
