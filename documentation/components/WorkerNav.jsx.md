**Function**: `WorkerNav`

**Purpose**: Renders a navigation bar for a worker dashboard.

**Description**: This function takes no parameters and returns a React component that renders a navigation bar with links to different pages within the worker dashboard. The navigation bar includes icons and text labels for each link. The active link is highlighted with a different color.

**Parameters**: None

**Return Value**: React component

**Usage Examples**:
```
import WorkerNav from "./WorkerNav";

const MyComponent = () => {
  return (
    <div>
      <WorkerNav />
    </div>
  );
};
```

**Important Notes**:
1. This function uses the `useTranslations` hook from the `next-intl` library to load translations for the navigation bar text.
2. The function uses the `usePathname` hook from the `routing` library to determine the current pathname and highlight the active link accordingly.
3. The function uses the `Link` component from the `routing` library to create links to different pages within the worker dashboard.
4. The function uses the `Image` component from the `next/image` library to render icons for the navigation bar links.