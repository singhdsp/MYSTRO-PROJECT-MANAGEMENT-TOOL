## Function: Home

### Description:
The `Home` function is the main component for the homepage of the application. It displays two buttons, one for contractors and one for workers, allowing users to navigate to the respective login pages.

### Parameters:
This function takes no parameters.

### Return Value:
The `Home` function returns a JSX element representing a container with two buttons.

### Usage Examples:
```javascript
import Home from "./Home";

export default function App() {
  return (
    <Home />
  );
}
```

### Notes:
- The `className` attribute is used to style the container and buttons.
- The `onClick` attribute is used to handle clicks on the buttons and navigate to the respective login pages.
- The `use client` directive is used to ensure that the function is only executed on the client-side.