## BackButton Component

### Purpose
The `BackButton` component renders a button with an arrow icon that navigates back to the previous page in the React application's routing system.

### Usage
```typescript
import BackButton from './BackButton';

const MyComponent = () => (
  <BackButton className="my-custom-class" />
);
```

### Props
| Prop | Type | Description |
|---|---|---|
| `className` | string | Additional CSS classes to apply to the button element. |

### Return Value
The `BackButton` component returns a `div` element with the following properties:

| Property | Type | Description |
|---|---|---|
| `className` | string | The combined CSS classes (including the provided `className` prop and the default styles). |
| `onClick` | function | A handler function that navigates back to the previous page when clicked. |

### Usage Examples
#### Default Styling
```typescript
<BackButton />
```

#### Custom Styling
```typescript
<BackButton className="my-custom-class" />
```

### Notes
- This component relies on the `useRouter` hook from the React Router library to navigate back in the application's routing history.
- The default button styling includes a small arrow icon and a 4px padding on all sides.