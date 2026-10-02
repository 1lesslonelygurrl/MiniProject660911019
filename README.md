# To-Do List API

## Description

A simple To-Do List application using Node.js, Express.js,
HTML, CSS and JavaScript.

This project supports CRUD operations:
Create, Read, Update and Delete.

## Technologies

- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- REST API

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/todos | Get all todos |
| GET | /api/todos/:id | Get one todo |
| POST | /api/todos | Create a todo |
| PATCH | /api/todos/:id | Update a todo |
| DELETE | /api/todos/:id | Delete a todo |

## Query Filter

Filter by completed status:

`/api/todos?done=true`

`/api/todos?done=false`

Filter by category:

`/api/todos?category=Study`

## How to Run

Install dependencies:

```bash
npm install