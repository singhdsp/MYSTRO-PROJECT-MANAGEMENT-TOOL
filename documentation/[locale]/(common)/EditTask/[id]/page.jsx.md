## EditTask Component

### Description
The EditTask component is a React component that allows users to edit an existing task. It provides a form for updating the task's name, description, team members, and media. Additionally, a Delete button is included to delete the task.

### Parameters
- None

### Return Value
- None

### Usage Examples
```javascript
import EditTask from "./EditTask";

const EditTaskPage = () => {
  return (
    <EditTask />
  );
};

export default EditTaskPage;
```

### Important Notes
- This component relies on several external modules, including React, React Router, and the Notyf library.
- The component uses the useState, useEffect, and useRef hooks from React.
- The component uses the useNotyf hook to manage notifications.
- The component fetches initial task data from a server-side API using the getTask function.
- The component uses the editTask function to update the task's information on the server.
- The component uses the deleteTask function to delete the task from the server.