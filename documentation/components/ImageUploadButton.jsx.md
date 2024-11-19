## Function: ImageUploadButton

**Purpose and Description:**

The `ImageUploadButton` component is used for uploading an image to the server and triggering a refresh of the page upon successful upload. It is designed to be used for uploading images related to a task.

### Parameters:

- `type`: A string indicating the type of image being uploaded.
- `taskId`: A string representing the ID of the task the image is associated with.
- `setRefreshing`: A function used to update the state of the page, causing it to refresh.
- `refreshing`: An integer representing the current refresh count of the page.

### Return Value:

The component returns a button that, when clicked, allows the user to select an image to upload. It also includes a hidden file input field for selecting the image.

### Usage Examples:

```jsx
import ImageUploadButton from "./ImageUploadButton";

const MyComponent = () => {
  const [refreshing, setRefreshing] = useState(0);

  return (
    <>
      <ImageUploadButton
        type="task"
        taskId="some-id"
        setRefreshing={setRefreshing}
        refreshing={refreshing}
      />
    </>
  );
};
```

### Important Notes:

- The `uploadImage` function used for uploading the image is implemented on the server-side and must be defined elsewhere.
- The `useNotyf` and `Loader` components are used for displaying notifications and a loading spinner, respectively. They should be imported and configured appropriately.
- The `useTranslations` hook is used for internationalization. It should be configured with the necessary translation files.
- The component assumes that the `refreshing` state is managed by the parent component and expects the `setRefreshing` function to be passed as a prop.