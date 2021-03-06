import * as React from 'react'
import { SVGProps } from 'react'

const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="atoms-icon-svg-trash"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="none" d="M0 0h40v40H0z" />
    <path d="M34.874 4.606h-9.4a.61.61 0 0 1-.641-.575A4.28 4.28 0 0 0 20.342 0h-.506a4.278 4.278 0 0 0-4.489 4.031.61.61 0 0 1-.641.575H5.127A3.666 3.666 0 0 0 1.279 8.06v.38a1.834 1.834 0 0 0 1.923 1.728h33.6a1.835 1.835 0 0 0 1.925-1.728v-.38a3.666 3.666 0 0 0-3.853-3.454Zm-29.26 8.118a2.307 2.307 0 0 0-2.435 2.292L4.213 34.51C4.377 37.583 7.201 40 10.629 40h18.743c3.428 0 6.252-2.417 6.416-5.49l1.034-19.494a2.308 2.308 0 0 0-2.435-2.292Zm19.44 6.529a1.74 1.74 0 0 1 3.461 0v14.219a1.74 1.74 0 0 1-3.461 0Zm-6.78 0a1.74 1.74 0 0 1 3.461 0v14.219a1.74 1.74 0 0 1-3.461 0Zm-6.78 0a1.741 1.741 0 0 1 3.463 0v14.219a1.742 1.742 0 0 1-3.463 0Z" />
  </svg>
)

export default SvgTrash
