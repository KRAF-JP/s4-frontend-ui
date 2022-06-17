import * as React from 'react'
import { SVGProps } from 'react'

const SvgQuestion = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="atoms-icon-svg-question"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="none" d="M0 0h40v40H0z" />
    <path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0m-.6 33.356a2.744 2.744 0 1 1 2.747-2.743 2.715 2.715 0 0 1-2.747 2.743m4.241-12.973-.581.333a2.2 2.2 0 0 0-1.124 2.245v1.455a1.008 1.008 0 0 1-.707.707h-3.663a1.011 1.011 0 0 1-.707-.707v-1.87c0-2.453.751-3.783 3.244-5.155l.832-.458a2.783 2.783 0 0 0 1.663-2.62A2.469 2.469 0 0 0 19.9 11.9c-1.54 0-2.5.874-2.5 2.079 0 .458-.21.624-.666.624h-3.741c-.458 0-.664-.208-.664-.624 0-3.908 3.242-6.4 7.568-6.4 4.447 0 7.773 2.578 7.773 6.736 0 2.62-1.2 4.491-4.033 6.07" />
  </svg>
)

export default SvgQuestion
