## Function: Page

### Purpose
This is the main React component for the "Choose Task" page. It allows users to assign tasks to a specific user.

### Description
This component retrieves a list of tasks from the server, and displays them in a grid layout. Each task includes its name, description, and status. Users can click on a task to assign it to the specified user. If the task is successfully assigned, a success message is displayed and the page is refreshed to reflect the updated task status. If the task assignment fails, an error message is displayed.

### Parameters
- None

### Return Value
- React component: The "Choose Task" page.

### Usage Example
```js
function MyComponent() {
  return (
    <Page />
  );
}
```

### Important Notes
- This component uses the `useNotyf` hook to display notifications.
- The `getColor` function assigns a color to each task based on its status.
- The `useEffect` hook is used to retrieve the tasks from the server and set the `project` state.

## Function: SkeletonTasks

### Purpose
This function renders a skeleton loading state for the "Choose Task" page.

### Description
This function creates a skeleton layout that resembles the actual tasks grid. It includes placeholders for the task names, descriptions, and status colors. This skeleton state is displayed while the actual tasks are being fetched from the server.

### Parameters
- None

### Return Value
- React component: The skeleton loading state for the "Choose Task" page.

### Usage Example
```js
function MyComponent() {
  return (
    <SkeletonTasks />
  );
}
```

### Important Notes
- This function uses the `Skeleton` component to create the skeleton elements.