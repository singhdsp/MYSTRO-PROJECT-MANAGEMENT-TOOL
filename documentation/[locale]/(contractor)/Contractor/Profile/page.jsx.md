## Function: Profile

### Purpose and Description
The `Profile` function is a React component that displays a contractor's profile. It includes their profile picture, full name, and options to change their language or log out.

### Parameters
The function does not take any parameters.

### Return Value
The function returns a JSX element representing the profile.

### Usage Examples
The following code shows how to use the `Profile` function:
```javascript
import Profile from "./Profile";

const App = () => {
  return (
    <Profile />
  );
};

export default App;
```

### Important Notes
- This component is only visible in mobile view.
- The component uses the `useTranslations` hook to get the translations for the current language.
- The component uses the `getUser` function to get the user's data from the server.