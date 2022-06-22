import * as React from 'react'
import { SVGProps } from 'react'

const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="atoms-icon-svg-download"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="none" d="M0 0h40v40H0z" />
    <path d="M10.233 15.595a2.657 2.657 0 0 0-.578 3.715 2.826 2.826 0 0 0 .245.29l8.207 8.206a2.659 2.659 0 0 0 3.764 0l8.208-8.206a2.659 2.659 0 0 0 0-3.762 2.629 2.629 0 0 0-.313-.267 2.721 2.721 0 0 0-3.463.362l-3.63 3.616V4.681a2.708 2.708 0 0 0-2.235-2.775 2.664 2.664 0 0 0-3.05 2.2 2.63 2.63 0 0 0-.034.447v15l-3.6-3.6a2.723 2.723 0 0 0-3.521-.358Z" />
    <path d="M32.981 0h-3.085a2.455 2.455 0 0 0 0 4.909h3.085a2.111 2.111 0 0 1 2.109 2.109V32.29a2.113 2.113 0 0 1-2.109 2.111H7.019A2.113 2.113 0 0 1 4.91 32.29V7.018a2.111 2.111 0 0 1 2.109-2.109h2.895a2.455 2.455 0 0 0 0-4.909H7.019A7.026 7.026 0 0 0 .001 7.018V32.29a7.028 7.028 0 0 0 7.018 7.02h25.963A7.027 7.027 0 0 0 40 32.29V7.018A7.025 7.025 0 0 0 32.981 0Z" />
  </svg>
)

export default SvgDownload
