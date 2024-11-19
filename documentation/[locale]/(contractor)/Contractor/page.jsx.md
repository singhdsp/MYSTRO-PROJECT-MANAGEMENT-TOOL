**Function Name**: Page

**Description**:
This React component renders the admin dashboard page. It displays information about active projects, including project name, status, and total hours worked. The page also includes a date selector, a link to create a new project, and a logo image.

**Parameters**:

* None

**Return Value**:

* React component

**Usage Example**:

```typescript
import Page from "./Page";

export default function Index() {
  return (
    <Page />
  );
}
```

**Important Notes**:

* The `pageData` state variable is populated by an asynchronous data fetching operation that uses the `getActiveProjectsWithTaskInfo` function to retrieve data from the server.
* The `loading` state variable is used to control the display of a skeleton loading state while the data is being fetched.
* The `selectedDate` state variable is used to specify the date for which project data should be displayed.
* The `DatePicker` component allows the user to select a different date for which project data should be displayed.
* The table rows are dynamically generated based on the project data retrieved from the server.
* The table includes a link to the `ProjectDetails` page for each project, allowing the user to view more detailed information about the project.
* The `SkeletonRow` function returns a skeleton loading state for table rows when the `loading` state variable is `true`.