# Personal CV & Blog

A modern personal portfolio website with blog functionality, built with TypeScript, React, Vite, and MongoDB.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express + TypeScript
- **Database**: MongoDB + Mongoose
- **Icons**: Lucide React
- **Markdown**: react-markdown

## Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

### 3. Seed sample data

```bash
npm run seed
```

### 4. Start development

```bash
npm run dev
```

This starts both the backend (port 3001) and frontend (port 5173) concurrently.

- Frontend: http://localhost:5173
- API: http://localhost:3001/api

## Project Structure

```
├── client/                 # Vite + React frontend
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles
│   │   └── types/          # TypeScript types
│   └── index.html
├── server/                 # Express + TypeScript backend
│   └── src/
│       ├── config/         # Database config
│       ├── models/         # Mongoose models
│       ├── routes/         # API routes
│       └── seed.ts         # Database seeder
└── package.json            # Root workspace config
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile |
| PUT | `/api/profile` | Update profile |
| GET | `/api/blogs` | List blogs (paginated) |
| GET | `/api/blogs/:slug` | Get blog by slug |
| POST | `/api/blogs` | Create blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |
| POST | `/api/contact` | Send message |
| GET | `/api/contact` | List messages |

## Production Build

```bash
npm run build
npm start
```
