## Function: createTasks

### Purpose
Creates a new task in the database and uploads any associated image and audio files to Firebase Storage.

### Parameters
- `formData`: A FormData object containing the following fields:
  - `taskName`: The name of the task.
  - `description`: The description of the task.
  - `team`: A JSON stringified array of user IDs representing the members of the task.
  - `date`: The start date of the task.
  - `projectId`: The ID of the project the task belongs to.
  - `image`: An optional image file.
  - `taskAudio`: An optional audio file for the task's name.
  - `descAudio`: An optional audio file for the task's description.

### Return value
An object with the following properties:
- `status`: The status of the task creation operation, either "success" or "error".
- `message`: A message describing the outcome of the operation.
- `taskId` (optional): The ID of the newly created task, if the operation was successful.

### Usage example
```ts
import { createTasks } from "./tasks";

const formData = new FormData();
formData.append("taskName", "New Task");
formData.append("description", "This is a new task.");
formData.append("team", JSON.stringify([1, 2, 3]));
formData.append("date", "2023-05-15");
formData.append("projectId", "1");
formData.append("image", new File([], "image.png"));
formData.append("taskAudio", new File([], "task-audio.mp3"));
formData.append("descAudio", new File([], "desc-audio.mp3"));

const response = await createTasks(formData);

if (response.status === "success") {
  console.log("Task created successfully:", response.taskId);
} else {
  console.error("Task creation failed:", response.message);
}
```

## Function: getTask

### Purpose
Fetches a task and its related data from the database, including members, project, photos, comments, and task hours.

### Parameters
- `id`: The ID of the task to fetch.
- `inputDate`: An optional ISO 8601-formatted date string. If provided, the function will filter the task hours to include only those up to and including this date.

### Return value
The task data if found, or `null` if the task is not found.

### Usage example
```ts
import { getTask } from "./tasks";

const task = await getTask(1, "2023-05-15");

if (task) {
  console.log("Task:", task);
} else {
  console.error("Task not found.");
}
```

## Function: uploadImage

### Purpose
Uploads an image to Firebase Storage and creates a record in the database for the uploaded image.

### Parameters
- `formData`: A FormData object containing the following fields:
  - `image`: The image file to upload.
  - `type`: The type of image being uploaded (e.g., "profile", "task").
  - `taskId`: The ID of the task the image belongs to.

### Return value
An object with the following properties:
- `status`: The status of the image upload operation, either "success" or "error".
- `message`: A message describing the outcome of the operation.

### Usage example
```ts
import { uploadImage } from "./tasks";

const formData = new FormData();
formData.append("image", new File([], "image.png"));
formData.append("type", "task");
formData.append("taskId", "1");

const response = await uploadImage(formData);

if (response.status === "success") {
  console.log("Image uploaded successfully.");
} else {
  console.error("Image upload failed:", response.message);
}
```

## Function: changeStatus

### Purpose
Updates the status of a task in the database.

### Parameters
- `id`: The ID of the task to update.
- `status`: The new status of the task.

### Return value
An object with the following properties:
- `status`: The status of the status update operation, either "success" or "error".
- `message`: A message describing the outcome of the operation.

### Usage example
```ts
import { changeStatus } from "./tasks";

const response = await changeStatus(1, "Completed");

if (response.status === "success") {
  console.log("Task status updated successfully.");
} else {
  console.error("Task status update failed:", response.message);
}
```

## Function: addUserToTask

### Purpose
Adds a user to a task and project.

### Parameters
- `taskId`: The ID of the task to add the user to.
- `userId`: The ID of the user to add.
- `projectId`: The ID of the project the task belongs to.

### Return value
An object with the following properties:
- `status`: The status of the user addition operation, either "success" or "error".
- `message`: A message describing the outcome of the operation.

### Usage example
```ts
import { addUserToTask } from "./tasks";

const response = await addUserToTask(1, 2, 3);

if (response.status === "success") {
  console.log("User added successfully.");
} else {
  console.error("User addition failed:", response.message);
}
```

## Function: updateTaskHours

### Purpose
Updates the task hours for a user on a task.

### Parameters
- `taskId`: The ID of the task to update.
- `hours`: The number of hours to add to the user's task hours.

### Return value
An object with the following properties:
- `status`: The status of the task hour update operation, either "success" or "error".
- `message`: A message describing the outcome of the operation.

### Usage example
```ts
import { updateTaskHours } from "./tasks";

const response = await updateTaskHours(1, 2);

if (response.status === "success") {
  console.log("Task hours updated successfully.");
} else {
  console.error("Task hours update failed:", response.message);
}
```

## Function: editTask

### Purpose
Updates the data for a task, including its name, description, members, and attached files.

### Parameters
- `taskId`: The ID of the task to update.
- `updatedData`: A FormData object containing the updated data for the task.

### Return value
An object with the following properties:
- `status`: The status of the task update operation, either "success" or "error".
- `message`: A message describing the outcome of the operation.
- `task` (optional): The updated task data, if the operation was successful.

### Usage example
```ts
import { editTask } from "./tasks";

const updatedData = new FormData();
updatedData.append("name", "Updated Task Name");
updatedData.append("description", "This is an updated task description.");
updatedData.append("members", JSON.stringify([1, 2, 3]));
updatedData.append("descPhoto", new File([], "updated-desc-photo.png"));
updatedData.append("nameAudioURL", new File([], "updated-name-audio.mp3"));
updatedData.append("descAudio", new File([], "updated-desc-audio.mp3"));

const response = await editTask(1, updatedData);

if (response.status === "success") {
  console.log("Task updated successfully:", response.task);
} else {
  console.error("Task update failed:", response.message);
}
```

## Function: deleteTask

### Purpose
Deletes a task and its related data from the database and Firebase Storage.

### Parameters
- `taskId`: The ID of the task to delete.

### Return value
An object with the following properties:
- `status`: The status of the task deletion operation, either "success" or "error".
- `message`: A message describing the outcome of the operation.

### Usage example
```ts
import { deleteTask } from "./tasks";

const response = await deleteTask(1);

if (response.status === "success") {
  console.log("Task and related data deleted successfully.");
} else {
  console.error("Task deletion failed:", response.message);
}
```