import React, { useState } from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import { SearchCheckbox } from '../../atoms/search-checkbox'
import { Icon } from '../../atoms/icon'

type Props = {
  height?: number
  form: React.ReactNode
  handleClick?(e: React.MouseEvent<HTMLElement>): void
}

const SearchToggle: React.FC<Props> = (props) => {
  const [isShow, setIsShow] = useState(false)
  let checkedSearchCheckbox = true
  if (!isShow) {
    checkedSearchCheckbox = false
  }

  const handleClick = (e) => {
    setIsShow(!isShow)
    props.handleClick(e)
  }

  return (
    <Wrap>
      <ButtonWrap>
        <SearchCheckbox
          name={'toggle'}
          value={'toggle'}
          icon={isShow ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
          checked={checkedSearchCheckbox}
          handleClick={handleClick}
        >
          絞り込み検索
        </SearchCheckbox>
      </ButtonWrap>
      <SearchForm isShow={isShow} height={props.height}>
        {props.form}
      </SearchForm>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: block;
  width: 100%;
  padding: 0 0 24px;
  border-bottom: 1px solid ${Color.COMPONENT.BORDER};
  text-align: right;
`
const ButtonWrap = styled.div``
const SearchForm = styled.div<{ isShow: boolean; height?: number }>`
  display: block;
  width: 100%;
  height: ${({ isShow, height }) => (isShow ? `${height}px` : '0')};
  padding: ${({ isShow }) => (isShow ? '16px' : '0')} 24px
    ${({ isShow }) => (isShow ? '24px' : '0')};
  margin-top: ${({ isShow }) => (isShow ? '16px' : '0')};
  border-radius: 16px;
  box-shadow: ${Color.ELEVATION.S};
  background-color: ${Color.COMPONENT.SURFACE};
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  overflow: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};

  ${({ isShow }) =>
    isShow &&
    `
    visibility: visible;
    opacity: 1;
  `}
`

export default SearchToggle
