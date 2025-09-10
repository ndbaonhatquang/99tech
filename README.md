# 99tech — Problems Summary

This repository contains solutions/specifications for three problems. Each problem resides in its own directory with its own instructions and code/specs.

## Contents

- `problem-4-3-why-to-sum-to-sum-n/` — Algorithmic solution explanation
- `problem-5/` — Express + TypeScript CRUD API with PostgreSQL + TypeORM
- `problem-6/` — Backend API specification for a live leaderboard module

## Problem 4-3 — Why ∑ to ∑ n

- Location: `problem-4-3-why-to-sum-to-sum-n/`
- Summary: Contains a TypeScript implementation/explanation related to summation logic (e.g., demonstrating properties of sums or performance of summations). See `index.ts` for the code and comments.

## Problem 5 — CRUD API (Express + TypeScript + PostgreSQL)

- Location: `problem-5/`
- Summary: A minimal REST API for managing resources with create/list/get/update/delete endpoints. Built with Express, TypeScript, and TypeORM targeting PostgreSQL.
- Quickstart:
  - Node.js 18+
  - Set `DATABASE_URL` (see `.env.example`), then:
    ```bash
    cd problem-5
    npm install
    npm run dev
    # http://localhost:3000
    ```
  - Health: `GET /health`
  - Resources base path: `/resources`

## Problem 6 — Live Leaderboard API Specification

- Location: `problem-6/`
- Summary: A detailed specification for a backend module powering a live-updating top-10 scoreboard. Covers architecture (API + WebSocket + Redis + DB), endpoints (`/scores/increment`, `/leaderboard`, `/me/score`), data models, security/anti-abuse, real-time broadcasting, and operational guidance. Includes Mermaid diagrams for flow and components.

## Notes

- Each problem folder is self-contained. Refer to its `README.md` (if present) or code comments for full details.
- For local development of Problem 5, ensure PostgreSQL is running and the `DATABASE_URL` is configured.

