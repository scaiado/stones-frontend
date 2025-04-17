# Protected Route Component

## Overview
The `ProtectedRoute` component is a higher-order component that handles route protection based on authentication status. It ensures that authenticated users can only access protected routes and unauthenticated users can only access public routes.

## Features
- Redirects unauthenticated users to the login page when trying to access protected routes
- Redirects authenticated users to the home page when trying to access public routes (login/register)
- Shows a loading spinner while checking authentication status
- Handles client-side route protection using Next.js router

## Usage
Wrap your protected pages or layouts with the `ProtectedRoute` component:

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  );
}
```

## Public Routes
The following routes are considered public and accessible without authentication:
- `/auth/login`
- `/auth/register`

All other routes require authentication.

## Dependencies
- Next.js Router
- AuthContext
- React useEffect hook 