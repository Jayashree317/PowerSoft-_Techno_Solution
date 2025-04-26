# Project Management Dashboard

A full-stack **Project Management Dashboard** built with React, Redux Toolkit, React Hook Form, and Bootstrap. This app allows users to manage projects, tasks, and employees with full CRUD capabilities, drag-and-drop task boards, and local storage persistence.

## Features

- **CRUD Operations** for:
  - Projects
  - Tasks (with ETA, reference image, description)
  - Employees
- **Employee Assignment** to projects
- **Drag-and-drop Task Board**
- **Form validation** using `React Hook Form` + `Yup`
- **Toast notifications** for user feedback
- **Local Storage Integration** for data persistence
- **Responsive UI** with React Bootstrap and Material-UI

## Technologies Used

- **Frontend**:
  - React
  - Redux Toolkit
  - React Hook Form + Yup
  - React Router DOM (v6+)
  - React Bootstrap + Material UI
  - React DnD / react-beautiful-dnd
  - React Toastify

- **Storage**:
  - LocalStorage (for this version)

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** or **yarn** installed.

### Installation

https://github.com/Jayashree317/PowerSoft-Techno-Solution/blob/main/README.md
cd powersoftdashboard  
npm install

## Running the app

npm start

## Folder Structure

src/

├── components/         # Reusable components (Modals, Lists, Forms)

├── projects/           # Project logic (slice, form, views)

├── tasks/              # Task logic and task board

├── employees/          # Employee management

├── store/              # Redux store setup

├── App.js

├── index.js

└── styles/

## Future Enhancement

Backend integration (MongoDB/Express)

User authentication

File uploads for reference images

Real-time updates with WebSockets
