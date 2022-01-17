import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Color from '../../../const/color'

type Props = {
  src: string
  size: number
  className?: string
  handleClick?(e: React.MouseEvent<HTMLElement>): void
}

const IconImage: React.FC<Props> = (props) => {
  return (
    <Wrap
      className={props.className}
      size={props.size}
      onClick={props.handleClick}
    >
      {props.src ? (
        <img src={`data:image/png;base64,${props.src}`} alt="" />
      ) : (
        <></>
      )}
    </Wrap>
  )
}

const Wrap = styled.div<{
  size?: number
  onClick?(e: React.MouseEvent<HTMLElement>): void
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size ? `${size}px` : '36px')};
  height: ${({ size }) => (size ? `${size}px` : '36px')};
  border-radius: ${({ size }) => (size ? `${size / 2}px` : '18px')};
  background: ${Color.COMPONENT.FORM_BORDER};
  transition: opacity 0.2s ease-out;
  overflow: hidden;
  ${({ onClick }) => onClick && `cursor: pointer;`}

  img {
    width: ${({ size }) => (size ? `${size}px` : '36px')};
    height: ${({ size }) => (size ? `${size}px` : '36px')};
    object-fit: cover;
  }

  ${({ onClick }) =>
    onClick &&
    ` &:hover {
        opacity: 0.5;
      }`}
`

export default IconImage
