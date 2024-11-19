## Function: Page

### Purpose
Displays detailed information about a specific task, including its status, description, photos, comments, and total hours worked.

### Description
This React component renders a page that allows users to view and interact with a selected task. It includes a header with the task name and project name, a body with various sections for task status, description, photos, comments, and total hours worked, and a footer with a button to edit the task.

### Parameters
None

### Return Value
A React component that represents the task details page.

### Usage Examples

```javascript
import Page from "./TaskDetailsPage";

const TaskDetailsPageComponent = () => {
  return (
    <Page />
  );
};

export default TaskDetailsPageComponent;
```

### Important Notes
- This component uses various external libraries and hooks, including React, useState, useEffect, useCallback, useParams, Skeleton, CommentBox, ImageUploadButton, Overlay, useNotyf, Loader, Link, and useTranslations.
- The component relies on the 'getTask' function from the 'server/task' module to fetch task data and 'changeStatus' and 'updateTaskHours' functions from the same module to update task status and hours, respectively.
- The component uses local storage to save the task state and start time for persistence.
- The component uses the 'notyf' library for displaying notifications to the user.