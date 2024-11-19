## Function: EndDay

### Purpose
This React component displays a modal interface for capturing an image used to end the user's day in a time-tracking application.

### Description
The EndDay component is invoked modally when the user clicks a button to end their day. It provides a webcam feed for capturing an image of the user, along with buttons to capture the image, retake the image, and submit the image to the server to end the day.

### Parameters
| Parameter | Type | Description |
|---|---|---|
| isOpen | boolean | Controls the visibility of the modal. |
| setIsOpen | function | Function to set the isOpen state. |
| id | string | ID of the user for whom the day is being ended. |
| refreshing | number | State variable to trigger a refresh of the parent component when the day is successfully ended. |
| setRefreshing | function | Function to set the refreshing state. |

### Return Value
None. The component renders the modal interface and handles user interactions, but does not return any value.

### Usage Examples
```javascript
import EndDay from "./EndDay";

const Component = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>End Day</button>
      <EndDay
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id="user-id"
        refreshing={0}
        setRefreshing={(value) => { /* ... */ }}
      />
    </div>
  );
};
```

### Important Notes
- The webcam feed is only displayed if the browser supports it.
- The captured image is converted to a Blob object before sending it to the server.
- The server action called by the component is responsible for processing the image and ending the user's day.
- The component uses the `useNotyf` hook for displaying notifications.