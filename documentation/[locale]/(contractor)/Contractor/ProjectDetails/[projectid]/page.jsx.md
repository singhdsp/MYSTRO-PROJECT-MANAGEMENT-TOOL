## Function: ProjectDetails

### Purpose
Displays the details of a specific project, including its name, start date, status, and a list of tasks.

### Parameters
None

### Return Value
None

### Usage Examples
```javascript
import ProjectDetails from "./ProjectDetails";

const Example = () => {
  return (
    <ProjectDetails />
  );
};
```

### Important Notes
- The project details are fetched asynchronously on mount.
- The project ID is extracted from the URL parameters.
- The user ID is stored in the state for use in the TaskList component.
- The selected date is used to filter the tasks displayed in the TaskList.
- The left and right arrow buttons navigate between projects.