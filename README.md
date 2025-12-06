# User Management Application (Frontend )


## 🌐 Frontend – User Management App

A clean and modern React-based frontend for managing users with full CRUD operations, email notifications, and visual analytics.

This interface connects to a Node.js/Express API and displays user insights using charts.
# 🚀 Tech Stack
Technology	Purpose
- ⚛️ React (Vite)	Frontend framework
- 🎨 Tailwind CSS	UI styling
- 🔄 Axios	API requests
- 🧭 React Router	Navigation
- 📊 Recharts	Analytics & charts

# ⚙️ Setup Instructions
- Install Dependencies
`cd frontend`
`npm install`

- Create Environment File (.env)
`VITE_API_URL=`

- Start Development Server
`npm run dev`



## 📘 Overview

This frontend allows you to:

- ✨ Create, Read, Update, and Delete users

- 📧 Trigger email notifications

- 📊 View analytics such as users by location

- 🎨 Navigate through a clean UI with components & routing
## API Endpoints
- `GET /api/users`
- `POST /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `POST /api/users/notify`
- `GET /api/users/analytics/users-by-location`
