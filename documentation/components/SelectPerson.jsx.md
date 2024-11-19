## Example Component

### Purpose
The `Example` component is a React component that allows users to select a user from a list of users. The selected user is then displayed in a drop-down menu.

### Description
The `Example` component uses the `Listbox` and `Transition` components from `@headlessui/react` to implement a user selection drop-down menu. The `Listbox` component provides the functionality of the drop-down menu, while the `Transition` component provides the animation for the drop-down menu.

### Parameters
The `Example` component takes the following parameters:

- `admin`: The currently selected user.
- `setTeamAdmin`: A function that sets the currently selected user.

### Return Value
The `Example` component returns a React element that represents the user selection drop-down menu.

### Usage Examples

The following code shows how to use the `Example` component:
```typescript
import Example from "@/components/Example";

function MyComponent() {
  const [admin, setAdmin] = useState(null);

  return (
    <Example admin={admin} setTeamAdmin={setAdmin} />
  );
}
```

### Important Notes
The `Example` component requires the following dependencies:

- `@headlessui/react`
- `@mui/icons-material`
- `next/image`

The `Example` component also uses the `getUsers` function from the `server/user.ts` file.