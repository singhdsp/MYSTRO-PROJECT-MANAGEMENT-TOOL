## Layout

### Purpose
The `Layout` function is a React component that provides a basic layout for pages that require authorization, such as the Admin console. It includes a sidebar for navigation and a main section for content.

### Description
The `Layout` component takes a single prop, `children`, which is the content that will be displayed in the main section. It also includes the following components:

- `Authorize`: A component that checks if the user is authorized to access the page.
- `AdminNav`: A component that provides a sidebar for navigation within the Admin console.

### Parameters
- `children`: The content that will be displayed in the main section.

### Return Value
The `Layout` function returns a JSX element that represents the layout of the page.

### Usage Examples
```typescript
import Layout from "./Layout";

const Page = () => {
  return (
    <Layout>
      <h1>My Page</h1>
    </Layout>
  );
};
```

### Important notes
- The `Layout` component is only used for pages that require authorization.
- The `children` prop must be a valid React element.