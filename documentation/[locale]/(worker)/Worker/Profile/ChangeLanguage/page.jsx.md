## LanguageSwitcher

### Purpose and Description
The `LanguageSwitcher` function is used to provide a user interface for switching the language of the application. It displays a list of available languages and allows the user to select one. When the user selects a language, the application is redirected to the same page with the new language locale.

### Parameters and Types
None

### Return Value and Type
The function returns a React component that renders the language switcher user interface.

### Usage Examples
```typescript
import LanguageSwitcher from "./LanguageSwitcher";

const App = () => {
  return (
    <main>
      <LanguageSwitcher />
    </main>
  );
};
```

### Important Notes
- The `handleChangeLanguage` function uses `router.replace` to navigate to the current page with the new language locale. This is necessary to avoid creating a new history entry for each language switch, which would result in multiple copies of the same page in the browser history.
- The `LanguageSwitcher` component is only displayed on mobile devices. On desktop devices, a message is displayed indicating that the language switcher is under development and suggesting that the user use a mobile device or Chrome Dev Tools to switch to the mobile screen.