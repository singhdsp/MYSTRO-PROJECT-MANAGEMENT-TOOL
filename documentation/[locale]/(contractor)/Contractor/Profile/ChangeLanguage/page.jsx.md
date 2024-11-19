## LanguageSwitcher Component

### Purpose and Description

The `LanguageSwitcher` component allows the user to change the language of the application. It displays a list of available languages and updates the application's locale when a language is selected.

### Parameters and Types

This component does not take any parameters.

### Return Value and Type

This component returns a JSX element representing the language switcher UI.

### Usage Examples

```jsx
import LanguageSwitcher from "./LanguageSwitcher";

const App = () => {
  return (
    <div>
      <LanguageSwitcher />
    </div>
  );
};
```

### Important Notes

* The component uses the Next.js `Link` component to navigate to the current path with the new locale.
* The component uses the `useRouter` hook to access the router and navigate to the new locale.
* The component uses the `Image` component from the `next/image` package to display the flag icons.
* The component conditionally renders different content depending on whether the user is on a mobile or desktop device.