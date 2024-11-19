## WorkerDetails Component

### Purpose and Description
The `WorkerDetails` component is a React component that displays detailed information about a specific worker, including their attendance, tasks, and hours worked. It also allows for filtering by date and viewing attachments related to the worker's attendance.

### Parameters
- `user`: The user object to be displayed. This object should contain information such as the worker's name, attendance, tasks, and hours worked. (Optional)
- `startDate`: A date object representing the start of the period to be displayed. Defaults to the current date. (Optional)
- `endDate`: A date object representing the end of the period to be displayed. Defaults to the current date. (Optional)

### Return Value
- The component returns a JSX element representing the worker details.

### Usage Example
```javascript
import WorkerDetails from "./WorkerDetails";

const userData = {
  name: "John Doe",
  attendance: [
    {
      inTime: "2023-03-08T09:00:00.000Z",
      outTime: "2023-03-08T17:00:00.000Z",
      inTimePhotoURL: "/in-time-photo.png",
      outTimePhotoURL: "/out-time-photo.png",
    },
  ],
  tasks: [
    {
      id: 1,
      date: "2023-03-08",
      hours: 8,
      description: "Task 1 description",
    },
    {
      id: 2,
      date: "2023-03-09",
      hours: 6,
      description: "Task 2 description",
    },
  ],
  hoursWorked: {
    today: 8,
    thisWeek: 40,
    lastWeek: 32,
  },
};

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(userData);
  }, []);

  return (
    <div>
      {user ? <WorkerDetails user={user} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
```

### Important Notes
- The `WorkerDetails` component uses the following external components:
  - `DatePicker` from `components/DateSelector`
  - `TaskView` from `components/TaskView`
  - `Image` from `next/image`
  - `getUserFullWithDate` from `server/user`
  - `StartDay` from `components/StartDay`
  - `EndDay` from `components/EndDay`
  - `Overlay` from `components/Overlay`
  - `X` from `lucide-react`
  - `Skeleton` from `components/ui/skeleton`
- The component uses the `useTranslations` hook to support internationalization. The translation keys are defined in the `WorkerWorkerDetails` namespace.
- The component uses a number of helper functions to calculate the total hours worked for today, this week, and last week.