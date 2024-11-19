### Function: AdminNav

#### Description:
This function generates a navigation bar for the Contractor role in the application. It displays icons and text labels for four navigation items: Home, ProjectDetails, WorkerDetails, and Profile. The active navigation item is highlighted with a different color.

#### Parameters:
None

#### Return value:
- `ReactNode`: A React component representing the navigation bar.

#### Usage example:
```typescript
import AdminNav from "./AdminNav";

const Component = () => {
  return (
    <div>
      <AdminNav />
    </div>
  );
};
```

#### Important Notes:
- The navigation items are defined in the `navItems` array, which is a global variable.
- The navigation bar uses the `Link` component from the `routing` library to handle navigation.
- The navigation bar uses the `usePathname` hook from the `routing` library to determine the current path and highlight the active navigation item.
- The navigation bar uses the `useTranslations` hook from the `next-intl` library to internationalize the text labels.