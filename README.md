# Clinic Manager

Clinic Manager is a web application designed to streamline the daily operations of medical clinics. It enables staff and practitioners to manage appointments, patient records, and other essential workflows from a unified dashboard.

## Features

- **User Authentication**  
  Secure access and role-based permissions using Firebase.
- **Patient Management**  
  Create, update, and view patient information and history.
- **Appointment Scheduling**  
  Book, reschedule, or cancel appointments with calendar integration.
- **Doctor Management**  
  Manage doctor profiles and availability.
- **Notifications**  
  Inform users of upcoming appointments or changes via in-app notifications.
- **Form Handling**  
  Robust forms for data entry and validation using Formik and Yup.
- **Modern UI**  
  Responsive interface built with React, Tailwind CSS, and DaisyUI.
- **Data Fetching and State Management**  
  Efficient data handling with React Query.
- **Feedback and Alerts**  
  Toast notifications for user actions and system events.

## Tech Stack

- **Frontend**
  - [React](https://react.dev/) – Core UI library
  - [React Router DOM](https://reactrouter.com/) – Client-side routing
  - [React Query](https://tanstack.com/query/latest) – Data fetching and caching
  - [Formik](https://formik.org/) – Form state management
  - [Yup](https://github.com/jquense/yup) – Form validation schemas
  - [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
  - [DaisyUI](https://daisyui.com/) – UI components for Tailwind CSS
  - [React Toastify](https://fkhadra.github.io/react-toastify/) – Toast notifications
  - [Luxon](https://moment.github.io/luxon/) – Date and time utilities
  - [UUID](https://github.com/uuidjs/uuid) – Unique identifier generation

- **Authentication & Backend Services**
  - [Firebase](https://firebase.google.com/) – Authentication and backend integration

- **Build & Tooling**
  - [Vite](https://vitejs.dev/) – Build tool and dev server
  - [ESLint](https://eslint.org/) – Linting and code quality
  - [Autoprefixer](https://github.com/postcss/autoprefixer), [PostCSS](https://postcss.org/) – CSS tooling

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- (Optional) Firebase project for authentication and backend

### Installation

```bash
git clone https://github.com/reham-elsyed/clinic-manager.git
cd clinic-manager
npm install
npm run dev
```

### Configuration

Set up your Firebase credentials and other environment variables as described in `.env.example` (if available).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue in this repository.
