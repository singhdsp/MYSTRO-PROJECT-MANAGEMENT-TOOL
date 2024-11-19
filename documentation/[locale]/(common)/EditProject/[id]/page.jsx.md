### Function: `EditProject`

**Purpose and Description:**
This React component allows users to edit an existing project's name, team members, and team administrator. It includes functionality for validating user input, handling project updates, and deleting the project.

**Parameters:**

* None

**Return Value:**

* JSX element: A React component for editing a project.

**Usage Examples:**

```javascript
import EditProject from "./EditProject";

function ProjectPage() {
  return (
    <EditProject />
  );
}
```

### Notes:
- The component uses the `useNotyf` hook to display notifications to the user.
- It uses the `useRouter` hook to navigate to different pages.
- The component uses the `useTranslations` hook for internationalization.
- The component utilizes server-side functionality (`getProject`, `editProject`, and `deleteProject`) to interact with the server and perform project editing and deletion operations.
- Local state (`projectName`, `teamAdmin`, `team`, `teamMenuOpen`, `loading`, `processing`, `errors`, and `isDeleteConfirmOpen`) is managed to keep track of the project details, selected team members, validation errors, and the delete confirmation modal state.
- Input validation is implemented to ensure the project name meets certain requirements.
- The component handles form submission to update the project details or delete the project.