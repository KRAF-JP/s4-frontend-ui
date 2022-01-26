import * as React from 'react'
import { SVGProps } from 'react'

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" {...props}>
    <defs>
      <clipPath id="copy_svg__a">
        <path d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#copy_svg__a)">
      <path
        d="M5,25.234V5.486H4.647A4.648,4.648,0,0,0,0,10.133V29.651a6.709,6.709,0,0,0,6.71,6.708H26.118a4.645,4.645,0,0,0,4.647-4.645v-.383H11.093a6.1,6.1,0,0,1-6.1-6.1"
        transform="translate(0 3.641)"
      />
      <path
        d="M31.914,0H8.776A3.812,3.812,0,0,0,4.964,3.812V27.777A3.812,3.812,0,0,0,8.776,31.59H31.914a3.812,3.812,0,0,0,3.813-3.813V3.812A3.811,3.811,0,0,0,31.914,0M28.447,18.227a1.681,1.681,0,0,1-1.68,1.679H13.921a1.678,1.678,0,0,1,0-3.356H26.767A1.679,1.679,0,0,1,28.447,18.227Zm-1.68-5.713H13.921a1.678,1.678,0,0,1,0-3.356H26.767a1.678,1.678,0,1,1,0,3.356"
        transform="translate(3.295 0)"
      />
    </g>
  </svg>
)

export default SvgCopy
