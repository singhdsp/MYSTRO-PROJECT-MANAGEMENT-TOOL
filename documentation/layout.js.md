### Function: RootLayout
#### Purpose
- The `RootLayout` function is used to define the root layout of the application.

#### Parameters
- `children`: The content that will be displayed inside the layout.

#### Return Value
- The `RootLayout` function returns HTML code that defines the root layout of the application.

#### Usage Examples
```
import RootLayout from "./RootLayout";

export default function MyPage() {
  return (
    <RootLayout>
      <div>My page content</div>
    </RootLayout>
  );
}
```

#### Important Notes
- The `RootLayout` function uses the `inter` font, which is imported from the `next/font/google` package.
- The `RootLayout` function uses the `globals.css` file to define global styles for the application.
- The `RootLayout` function sets the `viewport` meta tag to define the viewport settings for the application.
- The `RootLayout` function uses the `metadata` object to define the metadata for the application, such as the title, description, and manifest file.