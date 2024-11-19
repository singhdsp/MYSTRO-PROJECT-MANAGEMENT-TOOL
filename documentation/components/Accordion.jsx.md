## Accordion

### Purpose
The `Accordion` component is a reusable component that allows users to expand and collapse sections of content.

### Description
The component takes in a number of properties, including the title and number of the task, the content to be displayed, and the color of the task number.

When the user clicks on the title of the task, the content will expand or collapse. The component also includes an arrow icon that indicates whether the content is expanded or collapsed.

### Parameters
| Name | Type | Description |
|---|---|---|
| `taskTitle` | `string` | The title of the task. |
| `taskNo` | `number` | The number of the task. |
| `children` | `ReactNode` | The content to be displayed within the accordion. |
| `color` | `string` | The color of the task number. |

### Return value
The `Accordion` component returns a `div` element containing the accordion title, arrow icon, and content.

### Usage examples
```javascript
const MyAccordion = () => {
  return (
    <Accordion taskTitle="My Task" taskNo={1}>
      <p>This is the content of my accordion.</p>
    </Accordion>
  );
};
```

### Important notes
- The `Accordion` component uses the `useState` hook from the `react` library to manage the open/closed state of the accordion.
- The `Accordion` component uses the `KeyboardArrowUpRounded` and `MoreHoriz` icons from the `@mui/icons-material` library.