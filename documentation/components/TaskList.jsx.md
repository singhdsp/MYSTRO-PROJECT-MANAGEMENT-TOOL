## Function: `TaskList`

### Description
The `TaskList` component renders a list of tasks, each with its status, description, and a link to the task details page. The tasks are filtered by status if a status is provided, and unread tasks are marked with a red dot.

### Parameters
- `tasks`: An array of task objects. Each task object should have the following properties:
  - `id`: The unique identifier for the task.
  - `name`: The name of the task.
  - `description`: The description of the task.
  - `status`: The status of the task. Can be one of the following: `Not_Yet_Started`, `In_Progress`, `Completed`, `Blocked`.
  - `readUsers`: An array of user objects who have read the task. Each user object should have the following property:
    - `id`: The unique identifier for the user.
- `taskStatus`: A TaskStatus object that contains the selected status for filtering the tasks. Can be one of the following:
  - `All`: Show all tasks, regardless of status.
  - `Not_Yet_Started`: Show only tasks with status `Not_Yet_Started`.
  - `In_Progress`: Show only tasks with status `In_Progress`.
  - `Completed`: Show only tasks with status `Completed`.
  - `Blocked`: Show only tasks with status `Blocked`.
- `userid`: The ID of the current user.

### Return Value
The `TaskList` component returns a React component that renders the list of tasks.

### Usage Example
The following code shows an example of how to use the `TaskList` component:

```javascript
import TaskList from "./TaskList";

const tasks = [
  {
    id: 1,
    name: "Task 1",
    description: "This is task 1.",
    status: "Not_Yet_Started",
    readUsers: [],
  },
  {
    id: 2,
    name: "Task 2",
    description: "This is task 2.",
    status: "In_Progress",
    readUsers: [],
  },
  {
    id: 3,
    name: "Task 3",
    description: "This is task 3.",
    status: "Completed",
    readUsers: [],
  },
];

const taskStatus = {
  selector: "All",
};

const userid = 1;

return <TaskList tasks={tasks} taskStatus={taskStatus} userid={userid} />;
```

### Important Notes
- The `TaskList` component uses the `useTranslations` hook from `next-intl` to load translations for the component.
- The `getColor` function is a helper function that returns the background color for a task based on its status.