## Function Documentation

### getUser

**Purpose:** Fetches the currently logged-in user's data from the session cookie.

**Parameters:**

* None

**Return Value:**

* Promise resolving to an object containing the user's data, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const user = await getUser();
console.log(user); // { id: '1', name: 'John Doe', roles: ['Worker'] }
```

**Important Notes:**

* This function assumes that the session cookie is set with the value of the user's data in JSON format.

### getUserFull

**Purpose:** Fetches the currently logged-in user's data, including all associated models (projects, tasks, comments, task hours, etc.).

**Parameters:**

* None

**Return Value:**

* Promise resolving to a user object with all associated models, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const user = await getUserFull();
console.log(user); // { id: '1', name: 'John Doe', roles: ['Worker'], projects: [...] }
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### getUserFullWithDate

**Purpose:** Fetches the currently logged-in user's data, including all associated models (projects, tasks, comments, task hours, etc.) for the specified date.

**Parameters:**

* **date**: The date for which to fetch the user's data.

**Return Value:**

* Promise resolving to a user object with all associated models for the specified date, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const user = await getUserFullWithDate(new Date());
console.log(user); // { id: '1', name: 'John Doe', roles: ['Worker'], projects: [...] }
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### getUserCanAssignProjects

**Purpose:** Fetches the currently logged-in user's data, including all associated models (projects, tasks, etc.), and filters the projects to only include those where the user can assign tasks.

**Parameters:**

* **userid**: The ID of the user to check.

**Return Value:**

* Promise resolving to a user object with all associated models, filtered to only include projects where the user can assign tasks, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const user = await getUserCanAssignProjects(1);
console.log(user); // { id: '1', name: 'John Doe', roles: ['Worker'], projects: [...] }
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### getUserCanAssignTasks

**Purpose:** Fetches a list of tasks that the currently logged-in user can assign to a specific user for a specific project.

**Parameters:**

* **userid**: The ID of the user to check.
* **projectid**: The ID of the project to check.

**Return Value:**

* Promise resolving to an array of task objects, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const tasks = await getUserCanAssignTasks(1, 2);
console.log(tasks); // [{ id: '1', name: 'Task 1' }, ...]
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### getUsers

**Purpose:** Fetches a list of all workers who are part of the currently logged-in user's contractor company.

**Parameters:**

* None

**Return Value:**

* Promise resolving to an array of user objects, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const users = await getUsers();
console.log(users); // [{ id: '1', name: 'John Doe' }, ...]
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### getUsersCreateTask

**Purpose:** Fetches a list of all workers who are part of the currently logged-in user's contractor company and are assigned to the specified project.

**Parameters:**

* **projectid**: The ID of the project to check.

**Return Value:**

* Promise resolving to an array of user objects, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const users = await getUsersCreateTask(1);
console.log(users); // [{ id: '1', name: 'John Doe' }, ...]
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### getUsersForProjectId

**Purpose:** Fetches a list of all workers who are part of the currently logged-in user's contractor company and are assigned to the specified project.

**Parameters:**

* **projectid**: The ID of the project to check.

**Return Value:**

* Promise resolving to an array of user objects, or `null` if the user is not logged in or an error occurred.

**Usage Examples:**
```typescript
const users = await getUsersForProjectId(1);
console.log(users); // [{ id: '1', name: 'John Doe' }, ...]
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### getWorker

**Purpose:** Fetches the specified worker's data, including all associated models (tasks, attendance, task hours, etc.) for the specified date.

**Parameters:**

* **id:** The ID of the worker to fetch.
* **date**: The date for which to fetch the worker's data.

**Return Value:**

* Promise resolving to a user object with all associated models for the specified date, or `null` if the worker is not found or an error occurred.

**Usage Examples:**
```typescript
const worker = await getWorker(1, new Date());
console.log(worker); // { id: '1', name: 'John Doe', roles: ['Worker'], tasks: [...] }
```

**Important Notes:**

* This function makes multiple database queries, so it may be slower than other functions.

### saveNotesRate

**Purpose:** Updates the currently logged-in user's notes and rate.

**Parameters:**

* **notes**: The new notes for the user.
* **rate**: The new rate for the user.
* **id**: The ID of the user to update.

**Return Value:**

* Promise resolving to an object with a status and message indicating the success or failure of the update.

**Usage Examples:**
```typescript
const result = await saveNotesRate('New notes', 100, 1);
console.log(result); // { status: 'success', message: 'Notes and rate saved' }
```

**Important Notes:**

* This function makes a single database query to update the user's notes and rate.