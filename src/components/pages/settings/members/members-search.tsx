import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchToggle from '../../../molecules/search-toggle'
import { InputText } from '../../../atoms/form'
import { SearchCheckbox } from '../../../atoms/search-checkbox'
import { Button } from '../../../atoms/button'
import FormField from '../../../molecules/form-field'
import { useRouter } from 'next/router'
import { Form, Field } from 'react-final-form'
import GlobalContext from '../../../../store/context'

type Props = {
  className?: string
  data?: []
  setData?: any
  searchRef?: any
  setReset?: any
  handleClick?(e: React.MouseEvent<HTMLElement>): void
}

const MembersSearch: React.FC<Props> = (props) => {
  const router = useRouter()

  let timer = null

  const handleKeywordChange = (formValues: any) => {
    const { keyword } = formValues.values
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (!keyword) {
        delete router.query.keyword
        router.push({
          pathname: '/settings/members',
          query: { ...router.query },
        })
      } else {
        router.push({
          pathname: '/settings/members',
          query: { ...router.query, keyword: keyword },
        })
      }
    }, 2000)
  }

  const handleActiveChange = (formState: any) => {
    const { active } = formState.values
    const searchDataActive = active.reduce(function (sum, x) {
      return sum + x
    }, 0)

    if (!searchDataActive) {
      delete router.query.active
      router.push({
        pathname: '/settings/members',
        query: { ...router.query },
      })
    } else {
      router.push({
        pathname: '/settings/members',
        query: { ...router.query, active: searchDataActive },
      })
    }
  }

  const handleClear = () => {
    if (!Object.keys(router.query).length) return

    router.push({
      pathname: '/settings/members',
    })

    props.setReset(true)
  }

  return (
    <Wrap ref={props.searchRef}>
      <SearchToggle
        height={108}
        handleClick={props.handleClick}
        form={
          <Form
            onSubmit={handleActiveChange}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <FormWrap>
                  <InputWrap>
                    <Field name={'keyword'} type={'text'} value={1}>
                      {({ input, meta }) => (
                        <FormField label={'キーワード'}>
                          <InputText
                            {...(input as any)}
                            placeholder={'名前、メールアドレス'}
                            size={'L'}
                            onKeyUp={(e) => {
                              input.onChange(e)
                              handleKeywordChange(form.getState())
                            }}
                          />
                        </FormField>
                      )}
                    </Field>
                  </InputWrap>
                  <InputWrap>
                    <FormField label={'状態'}>
                      <Field name={'active'} type={'checkbox'} value={1}>
                        {({ input, meta }) => (
                          <SearchCheckbox
                            {...input}
                            onChange={(e) => {
                              input.onChange(e)
                              handleActiveChange(form.getState())
                            }}
                          >
                            有効
                          </SearchCheckbox>
                        )}
                      </Field>
                      <Field name={'active'} type={'checkbox'} value={2}>
                        {({ input, meta }) => (
                          <SearchCheckbox
                            {...input}
                            onChange={(e) => {
                              input.onChange(e)
                              handleActiveChange(form.getState())
                            }}
                          >
                            無効
                          </SearchCheckbox>
                        )}
                      </Field>
                    </FormField>
                  </InputWrap>
                  <InputWrap>
                    <Button
                      type={'button'}
                      label={'絞り込みをリセット'}
                      small={true}
                      buttonType={'secondary'}
                      handleClick={() => {
                        form.reset()
                        handleClear()
                      }}
                    />
                  </InputWrap>
                </FormWrap>
              </form>
            )}
          />
        }
      />
    </Wrap>
  )
}

const Wrap = styled.div`
  margin-top: -60px;
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

export default MembersSearch
