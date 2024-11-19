## SuccessDialog Component

### Purpose and Description
The `SuccessDialog` component displays a modal dialog indicating success, typically after a successful action is completed. It includes a checkmark animation that signifies completion and one button labeled "Done" that allows the user to navigate back to the previous page. The dialog is controlled by a boolean prop, `isOpen`, which determines whether it is visible.

### Parameters
- `isOpen`: A boolean value that indicates whether the dialog is open (true) or closed (false).
- `setIsOpen`: A function that accepts a boolean value and updates the `isOpen` state accordingly.

### Return Value
The component returns a React element representing the success dialog.

### Usage Examples
```javascript
import SuccessDialog from "./SuccessDialog";

const MyComponent = () => {
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);

  return (
    <>
      {/* Open the success dialog when a successful operation occurs */}
      {/* ... */}
      <SuccessDialog
        isOpen={successDialogOpen}
        setIsOpen={setSuccessDialogOpen}
      />
    </>
  );
};
```

### Important Notes
- The `SuccessDialog` component uses Next.js' `useRouter` hook to allow navigation back to the previous page when the "Done" button is clicked.
- The component uses a `CircularProgress` from Material UI for displaying a loading spinner while the dialog is transitioning.
- The "Done" button text is localized using `next-intl`, allowing for internationalization.
- The dialog's appearance and behavior can be customized by modifying the CSS styles associated with it.