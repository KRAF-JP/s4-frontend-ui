import * as React from 'react'
import { SVGProps } from 'react'

const SvgLogoGoogle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="atoms-icon-svg-logo-google"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      d="M17.64 9.2a10.341 10.341 0 0 0-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.8 2.716v2.264h2.909A8.777 8.777 0 0 0 17.64 9.2Z"
      fill="#4285f4"
      fillRule="evenodd"
    />
    <path
      d="M9 18a8.592 8.592 0 0 0 5.956-2.18l-2.909-2.258a5.43 5.43 0 0 1-8.083-2.852H.957v2.332A9 9 0 0 0 9 18Z"
      fill="#34a853"
      fillRule="evenodd"
    />
    <path
      d="M3.964 10.71a5.321 5.321 0 0 1 0-3.42V4.958H.957a9.011 9.011 0 0 0 0 8.084l3.007-2.332Z"
      fill="#fbbc05"
      fillRule="evenodd"
    />
    <path
      d="M9 3.58a4.862 4.862 0 0 1 3.44 1.346l2.581-2.581A8.649 8.649 0 0 0 9 0 9 9 0 0 0 .957 4.958L3.964 7.29A5.364 5.364 0 0 1 9 3.58Z"
      fill="#ea4335"
      fillRule="evenodd"
    />
    <path d="M0 0h18v18H0Z" fill="none" />
  </svg>
)

export default SvgLogoGoogle
