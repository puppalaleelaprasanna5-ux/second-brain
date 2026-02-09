# Second Brain – AI Notes App

Second Brain is a simple AI-powered note-taking web application built using Next.js, Supabase, and OpenAI.  
It allows users to store notes and automatically generate summaries and tags using AI.

---

## Features

- Add notes with title and content
- View all notes in a clean UI
- AI-powered summary for each note
- Automatic tag generation
- Delete notes
- Read-more summary toggle
- Search notes by title or content

---

## Tech Stack

- Frontend: Next.js (App Router), React
- Backend: Next.js API Routes
- Database: Supabase (PostgreSQL)
- AI: OpenAI API
- Styling: Tailwind CSS

---

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/puppalaleelaprasanna5-ux/second-brain.git
cd second-brain


### 2. Install dependencies
npm install


### 3. Create environment file

Create a file named:

.env.local


Add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key


### 4. Run the development server

npm run dev


Open in browser:
http://localhost:3000


---

## Database Table Structure

Create a table named `notes` in Supabase with:

| Column      | Type |
|-------------|------|
| id          | uuid (primary key) |
| title       | text |
| content     | text |
| summary     | text |
| tags        | text |
| created_at  | timestamp (default: now()) |

Enable Row Level Security and allow:
- SELECT
- INSERT
- UPDATE
- DELETE

---

## Author
Leela Prasanna
