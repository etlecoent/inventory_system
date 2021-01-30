# Setup

Create db
Launch PSQL with 'sudo service postgresql start'
Enter psql with psql
Create db with 'CREATE DATABASE <DB_NAME>'

Create .env file with:
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=...
DB_USER=...
DB_PASS=...

# Routes

## BookstoresBooks

GET/POST(book_id, bookstore_id, quantity) /bookstores-books
GET/PATCH(quantity)/DELETE /bookstores-books/:id

## Bookstores

GET/POST(name) /bookstores
GET/DELETE /bookstores/:id
GET /bookstores/:id/books

## Books

GET/POST(title, author, summary) /books
GET/DELETE /books/:id
GET /books/:id/bookstores
