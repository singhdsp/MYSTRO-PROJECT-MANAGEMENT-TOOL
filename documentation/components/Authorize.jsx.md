## Function: `AuthWrapper`

### Purpose
The `AuthWrapper` function wraps a component and provides authentication checks. It verifies if the user has a valid session cookie and a role of "Worker" or "Contractor." If these conditions are met, it renders the wrapped component (children). Otherwise, it redirects to the login page.

### Parameters
| Name | Type | Description |
|---|---|---|
| `children` | `ReactNode` | The component to be wrapped |
| `requiredRole` | `string` | The required role for authorization |

### Return Value
| Type | Description |
|---|---|
| `ReactNode` | The wrapped component (children) if authorized; otherwise, an `UnauthorizedComponent` is rendered |

### Usage Example

```typescript
import AuthWrapper from "./AuthWrapper";

export default function MyPage() {
  return (
    <AuthWrapper requiredRole="Worker">
      <h1>My Page</h1>
    </AuthWrapper>
  );
}
```

### Notes
- This component relies on the `cookies()` function from `next/headers` to retrieve the session cookie.
- The `requiredRole` prop is optional. By default, it checks for both "Worker" and "Contractor" roles.
- If the user does not have a valid session or role, the `UnauthorizedComponent` component is displayed.

## Component: `UnauthorizedComponent`

### Purpose
The `UnauthorizedComponent` component is a placeholder component that is rendered when a user attempts to access a protected page without proper authorization.

### Return Value
| Type | Description |
|---|---|
| `JSX.Element` | A visual representation of a 401 Unauthorized page |

### Usage Example

```typescript
import { UnauthorizedComponent } from "./AuthWrapper";

export default function ErrorPage() {
  return (
    <UnauthorizedComponent />
  );
}
```