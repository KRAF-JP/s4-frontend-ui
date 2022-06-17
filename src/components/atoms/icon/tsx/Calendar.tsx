import * as React from 'react'
import { SVGProps } from 'react'

const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="atoms-icon-svg-calender"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="none" d="M0 0h40v40H0z" />
    <path d="M3.472 12.371h33.055a2.251 2.251 0 0 0 2.251-2.251 5.208 5.208 0 0 0-5.208-5.208h-.865v-1.58a3.334 3.334 0 1 0-6.667 0v1.58H13.962v-1.58a3.334 3.334 0 1 0-6.667 0v1.58h-.866a5.208 5.208 0 0 0-5.208 5.208 2.251 2.251 0 0 0 2.251 2.251ZM35.66 14.81H4.34a3.119 3.119 0 0 0-3.119 3.119v16.6a5.468 5.468 0 0 0 5.469 5.467h26.621a5.467 5.467 0 0 0 5.467-5.467v-16.6a3.119 3.119 0 0 0-3.118-3.119ZM13.623 33.267a1.658 1.658 0 0 1-1.658 1.658H9.46a1.658 1.658 0 0 1-1.658-1.658v-2.4a1.658 1.658 0 0 1 1.658-1.658h2.505a1.658 1.658 0 0 1 1.658 1.658Zm0-9.32a1.658 1.658 0 0 1-1.658 1.658H9.46a1.658 1.658 0 0 1-1.658-1.658v-2.4a1.658 1.658 0 0 1 1.658-1.658h2.505a1.658 1.658 0 0 1 1.658 1.658Zm9.255 9.32a1.658 1.658 0 0 1-1.658 1.658h-2.505a1.658 1.658 0 0 1-1.658-1.658v-2.4a1.658 1.658 0 0 1 1.658-1.658h2.505a1.658 1.658 0 0 1 1.658 1.658Zm0-9.32a1.658 1.658 0 0 1-1.658 1.658h-2.505a1.658 1.658 0 0 1-1.658-1.658v-2.4a1.658 1.658 0 0 1 1.658-1.658h2.505a1.658 1.658 0 0 1 1.658 1.658Zm9.253 0a1.658 1.658 0 0 1-1.658 1.658h-2.505a1.658 1.658 0 0 1-1.658-1.658v-2.4a1.658 1.658 0 0 1 1.658-1.658h2.505a1.658 1.658 0 0 1 1.658 1.658Z" />
  </svg>
)

export default SvgCalendar
