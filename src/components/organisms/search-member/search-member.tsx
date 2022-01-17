import React, { useState } from 'react'
import styled from 'styled-components'
import SearchToggle from '../../molecules/search-toggle'
import { InputText } from '../../atoms/form'
import { SearchCheckbox } from '../../atoms/search-checkbox'
import { Button } from '../../atoms/button'
import FormField from '../../molecules/form-field'
type Props = {}

const SearchMember: React.FC<Props> = (props) => {
  return (
    <Wrap>
      <SearchToggle
        form={
          <FormWrap>
            <InputWrap>
              <FormField label={'キーワード'}>
                <InputText size={'L'} placeholder={'名前、メールアドレス'} />
              </FormField>
            </InputWrap>
            <InputWrap>
              <FormField label={'状態'}>
                <SearchCheckbox name={'active'} value={'active'}>
                  有効
                </SearchCheckbox>
                <SearchCheckbox name={'inactive'} value={'inactive'}>
                  無効
                </SearchCheckbox>
              </FormField>
            </InputWrap>
            <InputWrap>
              <Button
                label={'絞り込みをリセット'}
                small={true}
                buttonType={'secondary'}
              />
            </InputWrap>
          </FormWrap>
        }
      />
    </Wrap>
  )
}

const Wrap = styled.div`
  display: block;
  width: 100%;
`
const FormWrap = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 100%;
  text-align: left;
`
const InputWrap = styled.div`
  display: block;
  margin-right: 32px;
  width: auto;
  &:last-child {
    margin-top: 10px;
  }
`

export default SearchMember
