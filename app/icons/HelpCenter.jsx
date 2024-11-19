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
    <g
      stroke="#1D1E25"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="M20 28.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z" />
      <path d="M20 23.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666ZM14.108 14.108l3.534 3.534M22.358 22.358l3.534 3.534M22.358 17.642l3.534-3.534M22.358 17.642 25.3 14.7M14.108 25.892l3.534-3.534" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M10 10h20v20H10z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
