import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Color from '../../../../const/color'
import { Icon } from '../../../atoms/icon'
import { NextPage } from 'next'
import { Card } from '../../../atoms/card'
import Button from '../../../atoms/button/button'
import GlobalContext from '../../../../store/context'
import { Form, Field } from 'react-final-form'
import { InputText } from '../../../atoms/form'
import { LoadingIcon } from '../../../atoms/loading-icon'
import { useSoftwares } from '../../../../hooks/pages/assets/use-softwares'
import { List, ListItem } from '../../../molecules/list'

type Props = {
  data: any[]
  setData: any
  isLoading?: boolean
  setIsLoading: any
  totalCount?: number
}

const SoftwareRegisterList: NextPage<Props> = (props) => {
  const router = useRouter()
  const { server } = router.query
  const [items, setItems] = useState<any>({})
  const [itemsTotalCount, setItemsTotalCount] = useState<number>(
    props.totalCount
  )
  const [itemsCount, setItemsCount] = useState<number>(0)
  const [selectItem, setSelectItem] = useState<number>(null)
  const { setPostTrigger, setTarget, target, response } = useSoftwares()
  const { dispatch } = useContext(GlobalContext)

  let timer = null

  const handleKeywordChange = (formValues: any) => {
    const { keyword } = formValues.values
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (!keyword) {
        delete router.query.keyword
        router.push({
          pathname: `/assets/servers/${server}/software/register`,
          query: { ...router.query },
        })
      } else {
        router.push({
          pathname: `/assets/servers/${server}/software/register`,
          query: { ...router.query, keyword: keyword },
        })
      }
    }, 2000)
  }

  const handleSelectItem = (data, i) => {
    if (data === target) {
      setTarget('')
      setSelectItem(null)
      return
    }
    setSelectItem(i)
    setTarget(data)
    console.log(selectItem)
    console.log(data)
  }

  const handleRegister = () => {
    if (!target) return
    setPostTrigger(true)
    router.push({
      pathname: `/assets/`,
    })
  }

  const handleClear = () => {
    setTarget('')
    setSelectItem(null)
  }

  const handleChange = () => {}

  useEffect(() => {
    setItems(props.data)
    setItemsTotalCount(props.totalCount)
    if (props.data) setItemsCount(props.data.length)
  }, [props.data, props.totalCount, router.isReady])

  useEffect(() => {
    if (!response) return
    const data = items.map((data) => {
      let disabled = data['disabled']
      if (
        response.product == data['product'] &&
        response.vendor == data['vendor'] &&
        response.version == data['version']
      ) {
        disabled = true
      }
      return {
        product: data['product'],
        vendor: data['vendor'],
        version: data['version'],
        disabled: disabled,
      }
    })
    setItems(data)
    setSelectItem(null)
  }, [response])

  return (
    <Wrap>
      <Card margin={24}>
        <Form
          onSubmit={handleChange}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <FormWrap>
                <InputWrap>
                  <Field name={'keyword'} type={'text'} value={1}>
                    {({ input, meta }) => (
                      <InputText
                        {...(input as any)}
                        name={'keyword'}
                        icon={<Icon.Search color={Color.TEXT.LIGHT_GRAY} />}
                        placeholder={'ソフトウェア、バージョン、ベンダーで検索'}
                        size={'XXL'}
                        onKeyUp={(e) => {
                          input.onChange(e)
                          handleKeywordChange(form.getState())
                        }}
                      />
                    )}
                  </Field>
                </InputWrap>
              </FormWrap>
            </form>
          )}
        />

        <ListWrap>
          <ListHeader>
            <HeaderItem>ソフトウェア</HeaderItem>
            <HeaderItem>バージョン</HeaderItem>
            <HeaderItem>ベンダー</HeaderItem>
          </ListHeader>
          <StyledList>
            {props.isLoading ? (
              <>
                {items ? (
                  <>
                    {items.length ? (
                      <>
                        {items.map((data, i) => (
                          <StyledListItem
                            key={i}
                            size={40}
                            handleClick={() => {
                              handleSelectItem(data, i)
                            }}
                            select={selectItem === i}
                            disabled={data['disabled']}
                          >
                            <ContentItem>{data['product']}</ContentItem>
                            <ContentItem>{data['version']}</ContentItem>
                            <ContentItem>{data['vendor']}</ContentItem>
                          </StyledListItem>
                        ))}
                      </>
                    ) : (
                      <NothingText>
                        検索条件に合うソフトウェアはありませんでした。
                      </NothingText>
                    )}
                  </>
                ) : (
                  <NothingText>
                    検索条件に合うソフトウェアはありませんでした。
                  </NothingText>
                )}
              </>
            ) : (
              <LoadingIcon />
            )}
          </StyledList>
        </ListWrap>
        <Text>
          検索結果 {itemsTotalCount} 件中 {itemsCount ? 1 : 0} 〜 {itemsCount}{' '}
          件を表示
        </Text>
        <ActionWrap>
          <Button
            buttonType={'primary'}
            small
            label={'登録'}
            disabled={!target}
            handleClick={() => {
              handleRegister()
              router.push({
                pathname: `/assets/`,
                query: {},
              })
            }}
          />
          <Button
            buttonType={'secondary'}
            small
            label={'連続登録'}
            disabled={!target}
            handleClick={() => {
              handleRegister()
            }}
          />
          <Button
            buttonType={'secondary'}
            small
            label={'キャンセル'}
            handleClick={() => {
              handleClear()
            }}
          />
        </ActionWrap>
      </Card>
    </Wrap>
  )
}

const Wrap = styled.div`
  min-width: 830px;
  font-size: 14px;
  line-height: 1.71;
`

const FormWrap = styled.div``
const InputWrap = styled.div``
const Text = styled.p`
  color: ${Color.TEXT.BLACK};
  font-size: 14px;
`
const ListWrap = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
`
const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 320px 160px 1fr;
  color: ${Color.TEXT.LIGHT_GRAY};

  border-bottom: 1px solid ${Color.COMPONENT.BORDER};
`
const HeaderItem = styled.div`
  margin: 10px 16px;
`
const StyledList = styled(List)`
  height: 460px;
  overflow-y: scroll;
  padding: 8px 0;
  line-height: 1.5;
`
const StyledListItem = styled(ListItem)<{ select?: boolean }>`
  display: grid;
  grid-template-columns: 320px 160px 1fr;
  box-shadow: none;
  cursor: pointer;

  ${({ select }) =>
    select &&
    `
  background: ${Color.COMPONENT.WHITE_HOVER};
    `}
`
const ContentItem = styled.div``
const ActionWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  > button:nth-child(n + 2) {
    margin-left: 8px;
  }
`
const NothingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  line-height: 1.71;
  text-align: center;
`

export default SoftwareRegisterList
