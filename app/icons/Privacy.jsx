import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <rect width={40} height={40} fill="#F8F8FB" rx={20} />
    <path
      stroke="#1D1E25"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 21.667a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z"
    />
    <path
      stroke="#1D1E25"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M28.334 20c-2.223 3.89-5 5.834-8.334 5.834-3.333 0-6.11-1.945-8.333-5.834 2.223-3.889 5-5.833 8.333-5.833 3.334 0 6.111 1.944 8.334 5.833Z"
    />
  </svg>
)
export default SvgComponent
