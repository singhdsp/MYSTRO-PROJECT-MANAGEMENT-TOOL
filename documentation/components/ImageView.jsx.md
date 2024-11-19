## ImageView Component
### Purpose
The `ImageView` component provides a customizable image viewer with left and right arrow navigation and an optional overlay to display a full-screen version of the image.

### Description
The component accepts an array of image objects as a prop and renders a thumbnail image with left and right arrow buttons. Clicking on the thumbnail opens an overlay that displays the full-screen image. The component also includes an optional placeholder image that is displayed when no images are available.

### Parameters
| Parameter | Type | Description |
|---|---|---|
| `imageList` | `Image[]` | An array of image objects. Each image object should have a `url` property containing the image URL. |
| `type` | `string` | The size of the image viewer. Can be either `xl` or `sm`. |

### Return Value
The component returns a React component that can be rendered to the DOM.

### Usage Examples
```
import ImageView from "./ImageView";

const images = [
  {
    url: "/image1.jpg",
  },
  {
    url: "/image2.jpg",
  },
  {
    url: "/image3.jpg",
  },
];

<ImageView imageList={images} type="xl" />;
```

### Important Notes
- The `Overlay` component used in this component should be imported separately.
- The component uses the `next/image` component for image optimization and responsive behavior.
- The component relies on the following CSS styles:
  - `.flex`
  - `.items-center`
  - `.justify-center`
  - `.bg-primary/10`
  - `.rounded-2xl`
  - `.relative`
  - `.overflow-hidden`
  - `.object-cover`
  - `.ml-auto`
  - `.w-full`
  - `.h-auto`
  - `.object-contain`