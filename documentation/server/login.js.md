## contractorLogin function

**Purpose and Description:**
The `contractorLogin` function is used to log in a contractor user to the application. It checks if the provided username exists in the database. If the user exists, it creates a session cookie and sets it in the response.
It also checks if the user is a contractor or a worker. If the user is a contractor, it creates a new session cookie for the contractor. If the user is a worker, it creates a new session cookie for the worker and sets the contractor's name in the session cookie.

**Parameters:**
- `username` **(string)**: The username of the user trying to log in.

**Return Value:**
- **(object)**:
  - `status` **(string)**: The status of the login attempt. Can be either "success" or "error".
  - `message` **(string)**: A message describing the outcome of the login attempt.
  - `data` **(object)**: (Optional) Additional data related to the login attempt, such as the user's ID or role.

**Usage Examples:**

```typescript
const loginResponse = await contractorLogin("Albert");
if (loginResponse.status === "success") {
  // User logged in successfully
} else {
  // Error occurred during login
}
```

**Important Notes:**

- The user's password is not checked in this function, as it is assumed to be handled by a separate authentication mechanism.
- The session cookie is set to expire after 5 days.
- The `httpOnly` and `secure` flags are set on the session cookie to enhance security.

## workerLogin function

**Purpose and Description:**
The `workerLogin` function is used to log in a worker user to the application. It checks if the provided username and contractor name exist in the database. If the user and contractor exist, it creates a session cookie and sets it in the response.


**Parameters:**
- `contractor` **(string)**: The name of the contractor the worker is associated with.
- `username` **(string)**: The username of the user trying to log in.

**Return Value:**
- **(object)**:
  - `status` **(string)**: The status of the login attempt. Can be either "success" or "error".
  - `message` **(string)**: A message describing the outcome of the login attempt.
  - `data` **(object)**: (Optional) Additional data related to the login attempt, such as the user's ID or role.

**Usage Examples:**

```typescript
const loginResponse = await workerLogin("Mystro", "Sara");
if (loginResponse.status === "success") {
  // User logged in successfully
} else {
  // Error occurred during login
}
```

**Important Notes:**

- The user's password is not checked in this function, as it is assumed to be handled by a separate authentication mechanism.
- The session cookie is set to expire after 5 days.
- The `httpOnly` and `secure` flags are set on the session cookie to enhance security.

## logout function

**Purpose and Description:**
The `logout` function is used to log out a user from the application. It deletes the session cookie from the response.

**Parameters:**
- None

**Return Value:**
- **(object)**:
  - `status` **(string)**: The status of the logout attempt. Can be either "success" or "error".
  - `message` **(string)**: A message describing the outcome of the logout attempt.

**Usage Examples:**

```typescript
const logoutResponse = await logout();
if (logoutResponse.status === "success") {
  // User logged out successfully
} else {
  // Error occurred during logout
}
```

**Important Notes:**

- The session cookie is deleted from the response, effectively logging out the user.