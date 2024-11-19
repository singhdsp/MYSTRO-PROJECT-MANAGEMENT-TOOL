## DateSelector Component

### Purpose and Description

The `DateSelector` component is a customizable React component that allows users to select dates within a specified date range. It displays a scrollable set of buttons representing days of the month, with the selected date highlighted. Users can navigate through months and years using the chevron buttons. The component provides a user-friendly interface for date selection within a restricted range.

### Parameters

| Parameter | Type | Default Value | Description |
|---|---|---|---|
| `selectedDate` | `Date` | - | The currently selected date. |
| `setSelectedDate` | `Function` | - | A callback function to update the selected date. |
| `startDate` | `Date` | "2000-01-01" | The start date of the selectable range. |
| `endDate` | `Date` | Day.js's current date | The end date of the selectable range. |

### Return Value

None.

### Usage Example

```jsx
const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 11, 31);

  return (
    <DateSelector
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      startDate={startDate}
      endDate={endDate}
    />
  );
};
```

### Important Notes

- The `startDate` and `endDate` props must be valid JavaScript `Date` objects.
- The `selectedDate` prop will always be within the `startDate` and `endDate` range through controlled component behavior.
- The component relies on the `dayjs` library for date manipulation.
- The component supports keyboard navigation. Press the left and right arrow keys to navigate through the days. Press the Home key to go to the start of the month, and the End key to go to the end of the month.

## DatePicker Component

### Purpose and Description

The `DatePicker` component is a composite component that combines the `DateSelector` component with month and year selection functionality. It provides a comprehensive date selection interface that allows users to choose any date within a specified range.

### Parameters

| Parameter | Type | Default Value | Description |
|---|---|---|---|
| `startDate` | `Date` | "2000-01-01" | The start date of the selectable range. |
| `endDate` | `Date` | Day.js's current date | The end date of the selectable range. |
| `updateDate` | `Function` | - | A callback function to update the selected date in an external context. |

### Return Value

None.

### Usage Example

```jsx
const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      startDate={new Date(2023, 0, 1)}
      endDate={new Date(2023, 11, 31)}
      updateDate={handleDateChange}
    />
  );
};
```

### Important Notes

- The `startDate` and `endDate` props must be valid JavaScript `Date` objects.
- The `updateDate` prop is optional. It can be used to update the selected date in an external context, such as a parent component.
- The component relies on the `dayjs` library for date manipulation.
- The component supports keyboard navigation. Press the Tab key to navigate between the month, year, and day selectors. Press the Enter key to select the currently focused date.