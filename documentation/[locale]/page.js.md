## Function: Home

### Purpose

The `Home` function is a React component that displays two buttons, one for contractors and one for workers. When either button is clicked, the user is redirected to the corresponding login page.

### Parameters

The `Home` function takes no parameters.

### Return Value

The `Home` function returns a JSX element representing the two buttons.

### Usage Example

The following code demonstrates how to use the `Home` function:

```javascript
import Home from "./Home";

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};
```

### Notes

* The `Home` function is exported as the default export of the module, so it can be imported without needing to use curly braces.
* The `Home` function uses the `window.location.href` property to redirect the user to the appropriate login page.
* The `Home` function uses the `className` property to style the buttons.