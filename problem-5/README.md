# Problem 5 — Express + TypeScript CRUD API (PostgreSQL + TypeORM)

A CRUD backend built with ExpressJS (TypeScript) and PostgreSQL using TypeORM.

## Features

- Create, list (with filters), get, update, and delete items
- Basic validation with `zod`
- PostgreSQL persistence via TypeORM (`synchronize: true` for dev)
- Helpful middleware: CORS, Helmet, Morgan

## Requirements

- Node.js 18+

## Setup

```bash
cd problem-5
npm install
# configure DATABASE_URL in your env (examples below)
```

## Scripts

- `npm run dev` — start dev server with nodemon
- `npm run build` — compile TypeScript to `dist`
- `npm start` — run compiled server

## Run (development)

```bash
npm run dev
# Server: http://localhost:3000
```

### Database configuration

Set `DATABASE_URL` env var or rely on the default:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
```

Optionally copy `.env.sample` to `.env` and adjust values.

## API

Base URL: `http://localhost:3000`

### Health

GET `/health`

### Create Resource

POST `/resources`
```json
{
  "name": "Sample item",
  "description": "Optional description",
  "category": "books"
}
```
Response: `201 Created` with created item.

### List Resources

GET `/resources?limit=20&offset=0&category=books&q=sample&sort=created_at&order=desc`

Response:
```json
{
  "data": [ { "id": 1, "name": "..." } ],
  "pagination": { "limit": 20, "offset": 0, "total": 1 }
}
```

### Get Resource

GET `/resources/:id`

### Update Resource (partial)

PATCH `/resources/:id`
```json
{ "name": "New name" }
```

### Delete Resource

DELETE `/resources/:id`

## Notes

- Sorting supports: `created_at`, `updated_at`, `name`.
- Limits are clamped to 1..100.
