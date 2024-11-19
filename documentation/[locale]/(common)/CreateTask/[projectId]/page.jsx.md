## Function: CreateTask

### Purpose
Creates a new task.

### Description
This function allows users to create a new task by providing its name, description, due date, and team members. It includes the ability to add an image and audio recordings for the task and its description.

### Parameters
| Parameter | Type | Description |
|---|---|---|
| taskName | string | The name of the task. |
| description | string | The description of the task. |
| date | Date | The due date of the task. |
| team | Array<User> | The team members assigned to the task. |
| selectedImage | File | The selected image for the task. |
| taskAudio | string | The audio recording URL for the task. |
| descAudio | string | The audio recording URL for the task description. |

### Return Value
void

### Usage Examples
```typescript
const CreateTask = () => {
  // ...
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [team, setTeam] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [taskAudio, setTaskAudio] = useState(null);
  const [descAudio, setDescAudio] = useState(null);
  // ...

  const handleCreateTask = async () => {
    // Validate form and create task
    const formData = new FormData();
    formData.append("taskName", taskName);
    formData.append("description", description);
    formData.append("team", JSON.stringify(team));
    formData.append("date", new Date(date).toISOString());
    formData.append("projectId", projectId);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    // Append task audio if available
    if (taskAudio) {
      const taskAudioBlob = await fetch(taskAudio).then((r) => r.blob());
      formData.append("taskAudio", taskAudioBlob, "task_audio.webm");
    }

    // Append description audio if available
    if (descAudio) {
      const descAudioBlob = await fetch(descAudio).then((r) => r.blob());
      formData.append("descAudio", descAudioBlob, "desc_audio.webm");
    }

    const response = await createTasks(formData);
    if (response.success) {
      // Task created successfully
    } else {
      // Handle error
    }
  };

  // ...
};
```

### Important Notes

- The `useNotyf` hook is used to display notifications to the user.
- The `useTranslations` hook is used to internationalize the page.
- The `SelectTeam` component is used to allow users to select team members for the task.
- The `DatePicker` component is used to allow users to select the due date for the task.
- The `AudioRecorder` component is used to allow users to record audio for the task and its description.
- The `useEffect` hook is used to fetch the current user's data if they are logged in. If the user is not logged in, they are redirected to the login page.