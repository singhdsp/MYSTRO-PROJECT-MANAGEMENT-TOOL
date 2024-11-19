## Function: Page

### Purpose
The `Page` function displays a page with a list of workers, grouped by their availability status (in today, absent, or available). Workers can be clicked to view their details, and users can assign projects to workers by clicking the "Add" button.

### Description
- Fetches the list of workers from the server.
- Groups the workers by their availability status:
  - **In today:** Workers who have attended on the current day.
  - **Absent:** Workers who have not attended on the current day.
  - **Available:** Workers who have no active projects or have completed all the tasks in their active projects.
- Renders a list of workers in each group, with their photo, name, email, and a button to assign projects.
- Opens a modal when the "Add" button is clicked, allowing the user to select projects to assign to the worker.

### Parameters
- None

### Return Value
- A React component that displays the list of workers.

### Usage Examples
```javascript
import Page from "./Page";

const App = () => {
  return (
    <div>
      <Page />
    </div>
  );
};
```

### Important Notes
This function requires the following dependencies:
- React
- useEffect
- useState
- Accordion
- Link
- Image
- BackButton
- Overlay
- getAdminAttendance
- useTranslations