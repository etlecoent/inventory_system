## Setup

    npm install

## Create db

    > sudo service postgresql start
    > psql
    > CREATE DATABASE <DB_NAME>

## Created .env

    > touch .env

Paste & fill this:

    NODE_ENV=development
    PORT=3001
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=<...>
    DB_USER=<...>
    DB_PASS=<...>
    JWT_KEY=<...>

## Migrations & Seeds / Rollback

    > npm run db:migrate
    > npm run db:seed

    If needed:
    > npm run db:rollback

## Launch server

    > npm run dev

# Routes

## `/`

- GET
- `login` POST(email, password)

## `/users`

- GET
- `/:id` GET

## `/bookstores-books`

- GET & POST(book_id, bookstore_id, quantity)
- `/:id` GET & PATCH(quantity) & DELETE

## `/bookstores`

- GET & POST(name)
- `/:id` GET & DELETE
- `/:id/books` GET

## `/books`

- GET & POST(title, author, summary)
- `/:id` GET & DELETE
- `/:id/bookstores` GET

## `/status`

- `/bookstores-books` GET
