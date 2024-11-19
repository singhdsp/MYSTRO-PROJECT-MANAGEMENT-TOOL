## Function: SmallComment

### Purpose
Allows users to create text and audio comments, as well as upload images, for a specific task.

### Description
The `SmallComment` component provides a form for users to enter text comments, record audio comments, and upload images to be attached to a task. It handles the processing of these inputs and displays a progress indicator while processing is ongoing.

### Parameters
| Parameter | Type | Description |
|---|---|---|
| taskId | number | The ID of the task for which the comment is being created. |
| refreshing | number | A state variable that increments whenever new comments are created, triggering a refresh of the task's comments list. |
| setRefreshing | function | A function to update the `refreshing` state variable. |

### Return Value
None

### Usage Examples
```typescript
const [comment, setComment] = useState("");
const [refreshing, setRefreshing] = useState(0);

return (
  <div>
    <SmallComment taskId={taskId} refreshing={refreshing} setRefreshing={setRefreshing} />
  </div>
);
```

### Important Notes
- The `SmallComment` component uses the `createCommentSmall` and `createAudioCommentSmall` functions from the `server` directory to create text and audio comments, respectively.
- The `createCommentSmall` function takes two parameters: `taskId` and `comment`.
- The `createAudioCommentSmall` function takes four parameters: `userId`, `taskId`, `audio`, and `audioFileName`.
- The `notyf` hook is used to display success and error notifications.
- The `useTranslations` hook is used to internationalize user-facing text.