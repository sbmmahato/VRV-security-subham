# VRV Security RBAC Dashboard

A modern, responsive Role-Based Access Control (RBAC) dashboard built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing users, roles, and permissions in a secure environment.

## Features

### 🔐 User Management
- Create, read, update, and delete user accounts
- Assign roles to users
- Toggle user status (active/inactive)
- Search and filter user lists
- Batch operations support

### 👥 Role Management
- Define and manage custom roles
- Hierarchical permission structure
- Dynamic role creation and modification
- Detailed role descriptions and capabilities

### ⚡ Permission Matrix
- Visual permission management interface
- Category-based permission grouping
- Bulk permission updates
- Real-time permission changes
- Intuitive checkbox-based controls

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive layout for all devices
- Interactive animations and transitions
- Intuitive navigation
- Accessible interface components

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Vite
- **Type Checking**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/vrv-security-dashboard.git
```

2. Navigate to the project directory:
```bash
cd vrv-security-dashboard
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout component
│   ├── UserManagement.tsx
│   ├── RoleManagement.tsx
│   └── PermissionMatrix.tsx
├── context/            # React Context providers
│   └── RBACContext.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Root component
└── main.tsx          # Application entry point
```

## Component Overview

### Layout Component
- Provides the main application structure
- Handles responsive navigation
- Manages routing between different sections

### UserManagement Component
- Displays user list in a table format
- Handles user CRUD operations
- Implements search and filter functionality
- Manages user status updates

### RoleManagement Component
- Displays available roles
- Handles role creation and modification
- Manages permission assignments
- Provides role description management

### PermissionMatrix Component
- Visual interface for permission management
- Implements drag-and-drop functionality
- Handles bulk permission updates
- Provides category-based organization

## Styling

The project uses Tailwind CSS with custom configurations:

- Custom color schemes
- Responsive design utilities
- Animation classes
- Custom component classes



## Security Considerations

- Input validation on all forms
- Role-based access control
- Secure permission management
- Protected routes and actions
- Error handling and validation



