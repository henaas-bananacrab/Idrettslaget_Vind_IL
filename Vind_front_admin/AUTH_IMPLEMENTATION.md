# Authentication System Implementation Guide

## Overview
The login and register functionality has been fully integrated into your React app. Here's how it all works together:

---

## 1. **Core Components**

### `src/context/AuthContext.jsx`
This is the central hub for managing authentication state using React Context API.

**What it does:**
- Manages user login state, token storage, and user information
- Provides `login()` and `register()` functions that call your API
- Stores tokens in `localStorage` for persistence across sessions
- Provides `logout()` to clear authentication

**Key functions:**
```javascript
- login(username, password)      // Authenticates user
- register(username, password, role)  // Creates new account
- logout()                        // Clears user session
- useAuth()                       // Hook to access auth in any component
```

**State managed:**
- `user`: Current user info
- `token`: JWT token from backend
- `isAuthenticated`: Boolean flag (true if token exists)
- `loading`: Whether auth is being checked
- `error`: Any error messages

---

## 2. **Pages**

### `src/pages/LoginPage.jsx`
**Purpose:** Form for existing users to sign in

**Features:**
- Username and password fields
- Error display for failed logins
- Link to registration page
- Redirects to `/` (matches) on successful login

### `src/pages/RegisterPage.jsx`
**Purpose:** Form for new users to create accounts

**Features:**
- Username, password, and confirm password fields
- Password validation (min 6 characters, must match)
- Error handling for duplicate usernames or other issues
- Link to login page
- Redirects to `/` (matches) on successful registration

---

## 3. **Route Protection**

### `src/components/ProtectedRoute.jsx`
**Purpose:** Wrapper that prevents unauthenticated users from accessing admin pages

**How it works:**
1. Checks if user is authenticated
2. If not, redirects to `/login`
3. If loading, shows "Loading..." screen
4. If authenticated, renders the protected page

**Used for:**
- `/` (Matches page)
- `/teams` (Teams page)

---

## 4. **API Integration**

### `src/services/api.js`
**Request Interceptor:**
- Automatically adds your JWT token to the `Authorization` header of every API request
```
Authorization: Bearer <token>
```

**Response Interceptor:**
- If server returns 401 (Unauthorized), clears token and redirects to login
- This handles expired tokens or invalid sessions

---

## 5. **App Flow**

### Updated `src/App.jsx`
**Changes:**
- Wrapped entire app with `<AuthProvider>` to enable auth context
- Protected Match and Teams pages with `<ProtectedRoute>`
- Updated navigation to show/hide based on login status
- Added "Welcome, username" and logout button when logged in
- Hides navigation bar on login/register pages

**Routes:**
```
/login      → LoginPage (public)
/register   → RegisterPage (public)
/           → MatchesPage (protected)
/teams      → TeamsPage (protected)
```

---

## 6. **User Journey**

### First Time User:
1. User visits app → redirected to `/login` (not authenticated)
2. Clicks "Create one here" → goes to `/register`
3. Fills form and submits → calls `userApi.register()`
4. Server returns JWT token
5. Token stored in `localStorage`
6. User state set in context
7. Automatically redirected to `/` (matches page)
8. Navigation shows "Welcome, [username]" and logout button

### Returning User:
1. User visits app
2. Context checks for token in `localStorage` on mount
3. If token exists → user is authenticated → can access pages
4. If no token → redirected to `/login`

### Logout:
1. User clicks "Logout" button
2. Token cleared from `localStorage`
3. User state cleared in context
4. Redirected to `/login`

---

## 7. **Error Handling**

### Login/Register Failures:
- Server returns error message
- Error displayed in red box on form
- User can retry with different credentials

### Token Expiration:
- If token becomes invalid/expired during use
- API interceptor catches 401 response
- Automatically clears token and redirects to login

### Validation:
- **Password length:** Minimum 6 characters
- **Password match:** Confirm password must match password
- **Username:** Required field

---

## 8. **Styling**

### New Auth Page Styles (in `src/App.css`):
- `.auth-page`: Center container for auth forms
- `.auth-container`: Card holding the form
- `.auth-form`: Form group spacing
- `.error-message`: Red error display box
- `.auth-link`: Styled links between login/register

**Dark Mode:** All colors use CSS variables (`--surface`, `--text-h`, `--danger`, etc.) so auth pages adapt automatically to dark mode preference.

---

## 9. **Security Notes**

✅ **Token stored in localStorage** - Survives page refreshes  
✅ **Token in Authorization header** - Sent with all API requests  
✅ **Automatic token cleanup** - Removed on logout or auth failure  
✅ **Protected routes** - Can't manually navigate to admin pages without token  

---

## 10. **Technical Stack**

```
React Router v6  → Handles routing and navigation
Context API      → Manages auth state globally
Axios            → Makes API requests with interceptors
localStorage     → Persists token between sessions
```

---

## Testing the System

1. **Register:** Go to `/register`, fill form, submit
2. **Login:** Go to `/login`, use credentials you just created
3. **Access pages:** After login, you can see matches and teams
4. **Logout:** Click logout, should redirect to `/login`
5. **Manual access:** Try typing `/` directly without login → should redirect to `/login`
6. **Dark mode:** Toggle system dark mode → auth pages should adapt

---

## Next Steps (Optional Enhancements)

- Add "forgot password" functionality
- Add email verification for registration
- Add user profile page
- Add role-based access control (admin vs user)
- Add refresh token rotation for better security
