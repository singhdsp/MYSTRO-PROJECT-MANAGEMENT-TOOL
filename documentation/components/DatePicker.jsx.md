## DatePicker

### Purpose and Description

The DatePicker component is a reusable React component that provides a graphical user interface for selecting a date from a calendar. Users can click on the button to open the calendar and select a date, or they can type in a date in the input field. The component also provides a convenient way to disable dates before a specified date.

### Parameters and their Types

The DatePicker component takes the following parameters:

- **date**: The current selected date. (Optional. Date)
- **setDate**: A function that sets the current selected date. (Required. Function that accepts a Date)

### Return Value and Type

The DatePicker component returns a React component that renders a button that opens a calendar when clicked.

### Usage Examples

Here's an example of how to use the DatePicker component:

```javascript
import DatePicker from "./DatePicker";

export default function MyComponent() {
  const [date, setDate] = useState(null);

  return (
    <DatePicker date={date} setDate={setDate} />
  );
}
```

### Important Notes

- The DatePicker component uses the `date-fns` library for date formatting and manipulation.
- The component also uses the `lucide-react` library for the calendar icon.
- The component uses the `useTranslations` hook from the `next-intl` library for internationalization.