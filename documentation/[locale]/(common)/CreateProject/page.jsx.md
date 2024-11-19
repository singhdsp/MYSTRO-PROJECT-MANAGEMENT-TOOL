## Function: CreateProject

### Purpose
This function is responsible for creating a new project. It allows users to define a project name, add team members, and assign a team administrator. Upon successful project creation, the user is redirected to the project details page.

### Parameters
None

### Return Value
React.ReactElement (JSX) representing the Create Project page

### Usage Examples

```
import CreateProject from "./CreateProject";

const ProjectPage = () => {
  return (
    <CreateProject />
  );
};
```

### Important Notes

- The `createProject` function used in this component is a mock function for demonstration purposes and should be replaced with an actual API call in a real-world application.
- The `useNotyf` hook is used for displaying notifications and should be imported from a reputable library like "@mantine/notifications" in a real-world application.
- The `Skeleton` component is used for loading states and should be imported from a reputable library like "@mantine/core" in a real-world application.