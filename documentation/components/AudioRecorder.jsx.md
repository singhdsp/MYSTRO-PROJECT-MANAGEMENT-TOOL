## AudioRecorder Component

### Purpose
This React component encapsulates the functionality for recording audio in the browser and providing a user interface for starting and stopping the recording.

### Description
The AudioRecorder component uses the Web Audio API and MediaRecorder API to capture audio input from the user's microphone. It provides a simple and customizable interface for starting and stopping the recording, and allows the recorded audio to be retrieved as a URL or passed to a callback.

### Parameters
The AudioRecorder component takes the following parameters:

| Parameter | Type | Description |
|---|---|---|
| `setAudioURLState` | Function | A function that will be called with the URL of the recorded audio and workerId |
| `workerId` | Number | The id of the worker that will be using the audio data  |

### Return Value
The AudioRecorder component returns a React element that contains a button for starting and stopping the recording, and an overlay that displays an alert if an error occurs.

### Usage

```tsx
import AudioRecorder from "./AudioRecorder";

const MyComponent = () => {
  const [audioURL, setAudioURL] = useState(null);
  
  return (
    <AudioRecorder setAudioURLState={setAudioURL} workerId={123} />
  );
};
```

### Important Notes

- This component requires the installation of the `lucide-react` package for the button icons.
- The component uses the `useTranslations` hook from the `next-intl` package for internationalization.
- The component uses the `useEffect` hook to clean up the audio stream when the component unmounts.
- The component handles several errors that can occur during audio recording and displays appropriate messages to the user in an overlay.
- The component uses a MediaRecorder to record audio in chunks of 10ms. This is a good compromise between performance and audio quality.
- The component sets the `mimeType` of the MediaRecorder based on the first supported type from a list of common audio formats.
- The component uses `createObjectURL` to create a URL for the recorded audio, which can be used to play the audio or pass it to another component.