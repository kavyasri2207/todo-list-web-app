# Todo App

A simple to-do list application with user authentication and task management, built with a client-server architecture. The frontend is developed using React.js, styled with Tailwind CSS, and the backend uses Node.js, Express, and MongoDB for data storage.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local or remote instance)
- Git (for version control)

## Features

- **User Authentication**:
  - Login and signup pages with centered layouts.
  - Background image (`login-bg.jpg`) for login and signup with no overlay for clear visibility.
  - Input fields for username and password (25% width, 50px height).
- **Task Management**:
  - Add a new task using an input field and "Add" button.
  - Display all tasks in a list with completion status (checkbox).
  - Edit a task’s text by clicking an "Edit" button and saving changes.
  - Delete a task by clicking a "Delete" button.
  - Mark a task as completed or not using a checkbox.
  - Task priorities (High, Medium, Low) with color coding.
  - Due dates for tasks with overdue status indication.
- **Additional Functionality**:
  - User-specific task storage using `localStorage` (client-side).
  - Animations and hover effects for a better user experience.
  - Responsive design across devices.

## Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Tools**: Git/GitHub, Postman, Vercel, Render

## Wireframe

- **Hand-Drawn Sketch**: Created for initial planning.
- **Layout Description**:
  - **Header**: A rectangle labeled "To-Do List" at the top.
  - **Input Form**: A horizontal rectangle (input field) next to a smaller rectangle labeled "Add" below the header.
  - **Task List**: Three rows of tasks, each with:
    - A square (checkbox), with an "x" in the second task (Task2) indicating completion.
    - Task text labeled "Task1", "Task2", and "Task3" respectively.
    - Two smaller rectangles labeled "Edit" and "Delete" for each task.
  - **Overall**: Enclosed in a larger border, with elements spaced out and aligned vertically.
- **Notes**:
  - Captures key features (Add, Edit, Delete, Mark as Done).
  - Approximate sizes and positions (e.g., header at top, input below, tasks in rows).
  - Deviations: Tasks are not grouped into single 350x40px rectangles; elements (checkbox, text, buttons) are separate boxes. Exact dimensions can be refined later in Excalidraw if needed.

## Installation

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server