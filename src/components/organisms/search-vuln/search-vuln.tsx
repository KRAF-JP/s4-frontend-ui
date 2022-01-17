import React, { useState } from 'react'
import styled from 'styled-components'
import Color from '../../../const/color'
import SearchToggle from '../../molecules/search-toggle'
import {
  SearchCheckbox,
  SearchCheckboxGroup,
} from '../../atoms/search-checkbox'
import { Button } from '../../atoms/button'
import { InputText, InputDate, Select } from '../../atoms/form'
import { IconButton } from '../../atoms/icon-button'

import FormField from '../../molecules/form-field'
import { Icon } from '../../atoms/icon'

type Props = {
  data?: any[]
}

const SearchVuln: React.FC<Props> = (props) => {
  const data = [
    {
      value: 'a',
      label: 'すべて',
    },
    {
      value: 'b',
      label: 'b',
    },
    {
      value: 'あああ',
      label: 'ああああああああああああああああああああああああ',
    },
    {
      value: 'いいい',
      label: 'いいい',
    },
    {
      value: 'ううう',
      label: 'ううう',
    },
    {
      value: 'えええ',
      label: 'えええ',
    },
  ]

  return (
    <Wrap>
      <SearchToggle
        form={
          <FormWrap>
            <InputWrap>
              <FormField label={'担当者'}>
                <Select name={'charge'} defaultData={data[0]} data={data} />
                <IconButton>
                  <Icon.User />
                </IconButton>
              </FormField>
            </InputWrap>
            <InputWrap>
              <FormField label={'対応状況'}>
                <SearchCheckboxGroup>
                  <SearchCheckbox
                    name={'status'}
                    value={'4'}
                    icon={<Icon.StatusBacklog />}
                  >
                    未対応
                  </SearchCheckbox>
                  <SearchCheckbox
                    name={'status'}
                    value={'3'}
                    icon={<Icon.StatusProgress />}
                  >
                    対応中
                  </SearchCheckbox>
                  <SearchCheckbox
                    name={'status'}
                    value={'2'}
                    icon={<Icon.StatusDone />}
                  >
                    対応済み
                  </SearchCheckbox>
                  <SearchCheckbox
                    name={'status'}
                    value={'1'}
                    icon={<Icon.StatusClosed />}
                  >
                    対応なし
                  </SearchCheckbox>
                </SearchCheckboxGroup>
              </FormField>
            </InputWrap>
            <InputWrap>
              <FormField label={'深刻度'}>
                <SearchCheckboxGroup>
                  <SearchCheckbox
                    name={'severity'}
                    value={'5'}
                    color={Color.SEVERITY.CRITICAL}
                  >
                    緊急
                  </SearchCheckbox>
                  <SearchCheckbox
                    name={'severity'}
                    value={'4'}
                    color={Color.SEVERITY.HIGH}
                  >
                    重要
                  </SearchCheckbox>
                  <SearchCheckbox
                    name={'severity'}
                    value={'3'}
                    color={Color.SEVERITY.MEDIUM}
                  >
                    警告
                  </SearchCheckbox>
                  <SearchCheckbox
                    name={'severity'}
                    value={'2'}
                    color={Color.SEVERITY.LOW}
                  >
                    注意
                  </SearchCheckbox>
                  <SearchCheckbox
                    name={'severity'}
                    value={'1'}
                    color={Color.SEVERITY.INFO}
                  >
                    情報
                  </SearchCheckbox>
                </SearchCheckboxGroup>
              </FormField>
            </InputWrap>
            <InputWrap>
              <FormField label={'種別'}>
                <SearchCheckboxGroup>
                  <SearchCheckbox name={'type'} value={'public'}>
                    公開
                  </SearchCheckbox>
                  <SearchCheckbox name={'type'} value={'diagnose'}>
                    診断
                  </SearchCheckbox>
                </SearchCheckboxGroup>
              </FormField>
            </InputWrap>

            <InputWrap>
              <FormField label={'提出日'}>
                <InputDate onChange={() => null} placeholder={'0000/00/00'} />
                <Between>{'〜'}</Between>
                <InputDate onChange={() => null} placeholder={'0000/00/00'} />
                <IconButton>
                  <Icon.Calendar color={Color.TEXT.GRAY} />
                </IconButton>
              </FormField>
            </InputWrap>

            <InputWrap>
              <FormField label={'プロジェクト'}>
                <Select name={'project'} defaultData={data[0]} data={data} />
              </FormField>
            </InputWrap>

            <InputWrap>
              <FormField label={'サーバー'}>
                <Select name={'server'} defaultData={data[0]} data={data} />
              </FormField>
            </InputWrap>
            <InputWrap>
              <FormField label={'キーワード'}>
                <InputText size={'L'} placeholder={'例）EC-CUBE'} />
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
  margin-top: -10px;
  > div {
    margin-top: 24px;
  }
`
const InputWrap = styled.div`
  display: block;
  margin-right: 32px;
  width: auto;
  &:last-child {
    margin-top: 10px;
  }
`
const Between = styled.div``

export default SearchVuln
