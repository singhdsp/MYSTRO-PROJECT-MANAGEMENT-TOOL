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
    <g clipPath="url(#a)">
      <path
        stroke="#1D1E25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m20 24.792-5.143 2.704.982-5.728-4.166-4.056 5.75-.833 2.572-5.21 2.571 5.21 5.75.833-4.166 4.056.982 5.728L20 24.792Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M10 10h20v20H10z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
