# JobTrackr - Job Application Tracker

JobTrackr is a full-stack job application tracking app built with Next.js, TypeScript, Tailwind CSS, and Supabase. It helps users organize their job search by saving applications, tracking statuses, viewing details, editing records, and monitoring progress from a simple dashboard.

This project was built as a beginner-to-junior full-stack developer portfolio project. It focuses on practical product features, authentication, protected user data, CRUD operations, and a clean responsive UI.

## Live Demo

Live demo: `https://your-vercel-deployment-url.vercel.app`

## Features

- User signup and login with Supabase Auth
- Logout functionality
- Protected dashboard for authenticated users
- Add job applications
- View all applications
- View application details
- Edit application details
- Delete applications
- Search applications by company name or job title
- Filter applications by status
- Real dashboard statistics
- Row Level Security so users only access their own data
- Responsive UI for desktop and mobile

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Vercel

## Screenshots

Add screenshots here after deployment:

- Landing page
- Login and signup pages
- Dashboard
- Applications list
- Add/Edit application form
- Application details page

## Run Locally

Clone the project:

```bash
git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```bash
http://localhost:3000
```

## Environment Variables

The project needs these environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

These are public Supabase client values. Do not use or expose a Supabase service role key in the frontend.

## What I Learned

- Building a full-stack app with the Next.js App Router
- Creating responsive UI with Tailwind CSS
- Using TypeScript in React components
- Setting up Supabase Auth for signup, login, and logout
- Protecting pages from unauthenticated users
- Performing CRUD operations with Supabase PostgreSQL
- Fetching user-specific data with Row Level Security
- Managing loading, error, success, and empty states
- Building search and filter functionality on fetched data
- Preparing a project for deployment on Vercel

## Future Improvements

- Add server-side route protection with middleware
- Add pagination for large application lists
- Add status charts to the dashboard
- Add interview dates and reminder fields
- Add resume/version tracking for each application
- Add email verification messaging
- Add password reset flow
- Improve form validation with stronger user feedback
- Add automated tests
- Add screenshot assets to the README
