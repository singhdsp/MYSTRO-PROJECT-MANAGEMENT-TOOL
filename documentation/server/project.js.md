### 1. createProject: Create a new project record.
**Purpose:** Creates a new project and assigns the provided admin user and members to it.

**Parameters:**
- **name**: The name of the project. (string)
- **members**: An array of user IDs representing the members of the project. (string[])
- **admin**: The user ID of the project administrator. (string)

**Return Value:**
An object containing the status of the request and a message.
- **status**: "success" if the project was created successfully, "error" otherwise. (string)
- **message**: The message describing the outcome of the request. (string)

**Usage Example:**
```ts
const { status, message, id } = await createProject("Project Name", ["member1Id", "member2Id"], "adminId");
```

### 2. getTaskStatus: Determine the status of a task on a specific date.
**Purpose:** Helps determine the status of a task at a specified date by examining its status history.

**Parameters:**
- **statusHistory**: An array of status history objects associated with the task. (StatusHistory[])
- **date**: The date for which the status is being determined. (Date)

**Return Value:**
- The status of the task on the specified date. (string)

### 3. getActiveProjectsWithTaskInfo: Get active projects and summary information about their tasks.
**Purpose:** Retrieves active projects along with information about task completion and total hours spent.

**Parameters:**
- **date**: The date for which active projects and task info is being requested. (Date)

**Return Value:**
An array of objects representing project summaries with the following properties:
- **id**: The project ID. (number)
- **name**: The project name. (string)
- **taskCompletion**: A string indicating the number of completed tasks over the total number of tasks in the project. (string)
- **totalHours**: The total hours spent on all tasks in the project. (number)

### 4. getProjectTasksWithStatus: Fetch tasks associated with a project and their current status.
**Purpose:** Retrieves tasks within a project along with their status on a specific date.

**Parameters:**
- **projectId**: The ID of the project whose tasks are being fetched. (number)
- **date**: The date for which the task status is being retrieved. (Date)

**Return Value:**
An array of objects representing tasks with the following properties:
- **id**: The task ID. (number)
- **name**: The task name. (string)
- **description**: The task description. (string)
- **status**: The task status on the specified date. (string)
- **totalHours**: The total hours spent on the task. (number)

### 5. getTasksWithStatus: Get a list of all tasks with their statuses.
**Purpose:** Retrieves all tasks assigned to the user and their current statuses.

**Parameters:**
- **date**: The date for which the task statuses are being requested. (Date)

**Return Value:**
An object with the following properties:
- **userid**: The ID of the user whose tasks are being fetched. (number)
- **projects**: An array of objects representing projects with the following properties:
 - **id**: The project ID. (number)
 - **name**: The project name. (string)
 - **tasks**: An array of objects representing tasks within the project with the following properties:
    - **id**: The task ID. (number)
    - **name**: The task name. (string)
    - **description**: The task description. (string)
    - **status**: The task status on the specified date. (string)
    - **totalHours**: The total hours spent on the task. (number)

### 6. getProjects: Fetch all projects associated with the logged-in user.
**Purpose:** Retrieves all projects in which the logged-in user is a member or admin.

**Parameters:**
None

**Return Value:**
An object with the following properties:
- **userid**: The ID of the user whose projects are being fetched. (number)
- **projects**: An array of objects representing projects with the following properties:
 - **id**: The project ID. (number)
 - **name**: The project name. (string)
 - **members**: An array of objects representing project members with the following properties:
    - **id**: The member's user ID. (number)
    - **name**: The member's name. (string)
 - **admin**: An object representing the project administrator with the following properties:
    - **id**: The administrator's user ID. (number)
    - **name**: The administrator's name. (string)
 - **tasks**: An array of objects representing tasks within the project with the following properties:
    - **id**: The task ID. (number)
    - **name**: The task name. (string)
    - **description**: The task description. (string)
    - **comments**: An array of objects representing comments on the task. (Comment[])
    - **photos**: An array of objects representing photos attached to the task. (Photo[])
    - **readUsers**: An array of objects representing users who have read the task. (User[])

### 7. getProject: Fetch details about a specific project.
**Purpose:** Retrieves a single project by its ID, including information about its tasks, members, and administrator.

**Parameters:**
- **id**: The ID of the project being fetched. (number)

**Return Value:**
An object representing the project with the following properties:
- **id**: The project ID. (number)
- **name**: The project name. (string)
- **tasks**: An array of objects representing tasks within the project, each with the following properties:
 - **id**: The task ID. (number)
 - **name**: The task name. (string)
 - **description**: The task description. (string)
 - **members**: An array of objects representing task members. (User[])
- **members**: An array of objects representing project members with the following properties:
 - **id**: The member's user ID. (number)
 - **name**: The member's name. (string)
- **admin**: An object representing the project administrator with the following properties:
 - **id**: The administrator's user ID. (number)
 - **name**: The administrator's name. (string)

### 8. deleteProject: Delete a project and its associated data.
**Purpose:** Removes a project from the database, ensuring referential integrity.

**Parameters:**
- **projectId**: The ID of the project to be deleted. (number)

**Return Value:**
An object with the following properties:
- **status**: "success" if the project was deleted successfully, "error" otherwise. (string)
- **message**: The message describing the outcome of the request. (string)

### 9. editProject: Update a project's details.
**Purpose:** Allows the project administrator to edit a project's name, members, start date, and end date.

**Parameters:**
- **projectId**: The ID of the project to be updated. (number)
- **updatedData**: An object containing the updated project data. (object)
  - **name**: The updated project name. (string)
  - **members**: An array of user IDs representing the updated project members. (string[])
  - **startDate**: The updated project start date. (Date)
  - **endDate**: The updated project end date. (Date)

**Return Value:**
An object with the following properties:
- **status**: "success" if the project was updated successfully, "error" otherwise. (string)
- **message**: The message describing the outcome of the request. (string)
- **project**: The updated project data. (object)