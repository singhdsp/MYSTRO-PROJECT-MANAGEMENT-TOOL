## Function: `ProjectDetails`

### Purpose:
The `ProjectDetails` function is a React component that displays the details of a selected project, including its tasks, status, and comments. It allows users to navigate through tasks, create new tasks, and edit the project.

### Parameters:
The component accepts no parameters.

### Return Value:
The component returns a JSX element representing the project details page.

### Usage Examples:
```javascript
import ProjectDetails from "path/to/ProjectDetails";

const Page = () => {
  return (
    <ProjectDetails />
  );
};
```

### Important Notes:
- The component uses `useEffect` hooks to fetch project data and update the state when the selected date or task status changes.
- The component uses `Image` and `ImageView` components from `next/image` and `@mui/material`, respectively, to display images.
- The component uses the `getTasksWithStatus` function from the server to fetch project data.
- The component uses the `useParams` hook from `next/navigation` to get the project ID from the URL.
- The component uses the `useTranslations` hook from `next-intl` to get translated strings for the current locale.