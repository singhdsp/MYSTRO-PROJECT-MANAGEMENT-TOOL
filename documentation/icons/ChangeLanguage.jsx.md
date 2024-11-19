**Function**: SvgComponent

**Purpose and Description**:
The SvgComponent function renders an SVG icon representing a lock. It can be used as a reusable component in React applications.

**Parameters**:

* `props`: An object containing SVG properties.

**Return value**:

* **React Element**: An SVG element representing a lock icon.

**Usage Examples**:

```jsx
import SvgComponent from "./SvgComponent";

const App = () => {
  return (
    <div>
      <SvgComponent />
    </div>
  );
};
```

**Important Notes**:

* This component is a simple wrapper around an SVG element and does not provide any additional functionality.
* The SVG icon is defined using an SVG string, which means it can be customized or replaced with a different icon if needed.