## NotyfProvider

### Purpose and Description

The `NotyfProvider` is a React component that provides the `Notyf` context to its children. This allows child components to access the `Notyf` instance and use its methods to create and display notifications.

### Parameters

The `NotyfProvider` component accepts the following parameter:

- `children`: The React elements that will be rendered within the context provided by the `NotyfProvider`.

### Return Value

The `NotyfProvider` component returns the `children` elements wrapped in the `Notyf` context provider.

### Usage Examples

```javascript
import React from "react";
import { NotyfProvider } from "notyf-react";
import MyComponent from "./MyComponent";

const App = () => {
  return (
    <NotyfProvider>
      <MyComponent />
    </NotyfProvider>
  );
};
```

### Important Notes

The `NotyfProvider` component must be used to wrap any components that need to access the `Notyf` instance. If the `NotyfProvider` is not used, child components will not be able to access the `Notyf` instance and will not be able to create or display notifications.