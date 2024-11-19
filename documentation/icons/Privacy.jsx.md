## Function: SvgComponent

### Purpose and Description
The `SvgComponent` function is a React functional component that renders an SVG icon representing a bookmark.

### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| props | `object` | An object containing the SVG's properties. |

### Return Value
| Type | Description |
| ---- | ----------- |
| `React.ReactElement` | An SVG React element. |

### Usage Examples
```javascript
import SvgComponent from './SvgComponent';

const MyComponent = () => {
  return (
    <div>
      <SvgComponent />
    </div>
  );
};
```

### Important Notes
- The SVG is rendered using the `svg` element from the `react-svg` library.
- The SVG's width and height are set to 40px by default.
- The SVG's fill is set to `#F8F8FB` by default.
- The SVG's stroke color is set to `#1D1E25` by default.
- The SVG's stroke width is set to 1.5px by default.
- The SVG's stroke linecap is set to `round` by default.
- The SVG's stroke linejoin is set to `round` by default.