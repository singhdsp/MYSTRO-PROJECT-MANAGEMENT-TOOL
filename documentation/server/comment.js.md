### createComment

**Purpose and Description:**
The `createComment` function allows users to create a new comment for a specific task. It adds the comment content to the database and associates it with the task and the user who created it.

**Parameters:**
- `taskId`: The ID of the task for which the comment is being created (string).
- `userId`: The ID of the user who is creating the comment (string).
- `content`: The content of the comment (string).

**Return Value:**
- An object with the following properties:
  - `status`: The status of the comment creation ("success" or "error").
  - `message`: A message describing the outcome of the comment creation.

**Usage Examples:**
```typescript
const result = await createComment("myTaskId", "myUserId", "This is my comment.");
if (result.status === "success") {
  // Comment created successfully.
} else {
  // Comment creation failed.
}
```

### createCommentSmall

**Purpose and Description:**
The `createCommentSmall` function is a simplified version of `createComment` that only requires the task ID and the comment content. The user ID is automatically derived from the logged-in user.

**Parameters:**
- `taskId`: The ID of the task for which the comment is being created (string).
- `content`: The content of the comment (string).

**Return Value:**
- An object with the following properties:
  - `status`: The status of the comment creation ("success" or "error").
  - `message`: A message describing the outcome of the comment creation.

**Usage Examples:**
```typescript
const result = await createCommentSmall("myTaskId", "This is my comment.");
if (result.status === "success") {
  // Comment created successfully.
} else {
  // Comment creation failed.
}
```

### createAudioComment

**Purpose and Description:**
The `createAudioComment` function allows users to create a new comment that contains an audio recording. It uploads the audio file to Google Cloud Storage and stores the URL in the database.

**Parameters:**
- `formData`: A FormData object containing the following fields:
  - `audio`: The audio file (File object).
  - `taskId`: The ID of the task for which the comment is being created (string).
  - `userId`: The ID of the user who is creating the comment (string).

**Return Value:**
- An object with the following properties:
  - `status`: The status of the comment creation ("success" or "error").
  - `message`: A message describing the outcome of the comment creation.

**Usage Examples:**
```typescript
const formData = new FormData();
formData.append("audio", myAudioFile);
formData.append("taskId", "myTaskId");
formData.append("userId", "myUserId");

const result = await createAudioComment(formData);
if (result.status === "success") {
  // Audio comment created successfully.
} else {
  // Audio comment creation failed.
}
```

### createAudioCommentSmall

**Purpose and Description:**
The `createAudioCommentSmall` function is a simplified version of `createAudioComment` that only requires the task ID and the audio file. The user ID is automatically derived from the logged-in user.

**Parameters:**
- `formData`: A FormData object containing the following fields:
  - `audio`: The audio file (File object).
  - `taskId`: The ID of the task for which the comment is being created (string).

**Return Value:**
- An object with the following properties:
  - `status`: The status of the comment creation ("success" or "error").
  - `message`: A message describing the outcome of the comment creation.

**Usage Examples:**
```typescript
const formData = new FormData();
formData.append("audio", myAudioFile);
formData.append("taskId", "myTaskId");

const result = await createAudioCommentSmall(formData);
if (result.status === "success") {
  // Audio comment created successfully.
} else {
  // Audio comment creation failed.
}
```

### deleteComment

**Purpose and Description:**
The `deleteComment` function allows users to delete a specific comment.

**Parameters:**
- `id`: The ID of the comment to be deleted (string).

**Return Value:**
- An object with the following properties:
  - `status`: The status of the comment deletion ("success" or "error").
  - `message`: A message describing the outcome of the comment deletion.

**Usage Examples:**
```typescript
const result = await deleteComment("myCommentId");
if (result.status === "success") {
  // Comment deleted successfully.
} else {
  // Comment deletion failed.
}
```

### Important Notes:

- The `getUser` function is used to obtain the currently logged-in user's information.
- The `prisma` object is an instance of the Prisma client, which is used to interact with the database.
- The `uuidv4` function generates a unique identifier for the comment's audio file.
- The `bucket` object is an instance of the Google Cloud Storage bucket where the audio files are stored.
- The `pathName` variable is constructed using the task ID and the audio file name to create a unique path for the uploaded file.
- The `updatedTask` variable is used to clear the `readUsers` array for the task associated with the comment. This ensures that only the intended recipients can see the comment.