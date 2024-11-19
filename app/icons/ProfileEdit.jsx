import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <circle cx={24} cy={24} r={24} fill="#F8F8FB" />
    <path
      stroke="#1D1E25"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M24 32h9M28.5 15.5a2.121 2.121 0 0 1 3 3L19 31l-4 1 1-4 12.5-12.5Z"
    />
  </svg>
)
export default SvgComponent
