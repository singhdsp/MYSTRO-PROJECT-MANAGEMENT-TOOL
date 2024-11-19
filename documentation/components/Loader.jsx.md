**Function: Loader**

**Purpose:**
Renders a loading spinner component using the `react-loader-spinner` library.

**Description:**
The `Loader` component is a React component that displays a spinner animation to indicate that the application is loading data or performing a task.

**Parameters:**

* `color` (optional): The color of the spinner. Defaults to "#fff" (white).

**Return Value:**

A React component that renders the spinner.

**Usage Examples:**

```javascript
import Loader from "./Loader";

const LoadingExample = () => {
  return (
    <div>
      <Loader color="#000" />
    </div>
  );
};
```

**Important Notes:**

* The `Loader` component requires the `react-loader-spinner` library to be installed and imported into your project.
* The `color` parameter can be any valid CSS color value.
* The `visible` property of the `TailSpin` component is always set to `true` within the `Loader` component, so the spinner will always be visible when the component is rendered.
* The `ariaLabel` property is set to "loading" for accessibility purposes.