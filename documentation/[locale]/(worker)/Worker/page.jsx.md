### Function Purpose and Description

The `WorkerHome` function is the main component for the worker's home page. It displays important information such as the user's attendance, total worked hours for today, week, and last week, and a list of active projects.

### Parameters and their types

The function does not accept any parameters.

### Return Value and Type

The function returns a React component that represents the worker's home page.

### Usage Examples

The following code shows how to use the `WorkerHome` function:

```typescript
import WorkerHome from './WorkerHome';

const App = () => {
  return (
    <div>
      <WorkerHome />
    </div>
  );
};

export default App;
```

### Important Notes

- The `WorkerHome` function uses the `useEffect` hook to fetch the user's data and active projects on page load.
- The `isSameDay` function checks if two dates are on the same day.
- The `getStartOfWeek` function returns the start of the week for a given date.
- The `getStartOfLastWeek` function returns the start of the previous week for a given date.
- The `getEndOfLastWeek` function returns the end of the previous week for a given date.
- The `today` variable holds the current date.
- The `todayTaskHours` variable holds the total worked hours for today.
- The `thisWeekTaskHours` variable holds the total worked hours for this week.
- The `lastWeekTaskHours` variable holds the total worked hours for last week.
- The `projects` variable holds the list of active projects.