import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Color from '../../../../const/color'
import { Icon } from '../../../atoms/icon'
import { NextPage } from 'next'
import { Card } from '../../../atoms/card'
import Button from '../../../atoms/button/button'
import { useManualPackageRegisterJson } from '../../../../hooks/pages/assets/use-packages'
import GlobalContext from '../../../../store/context'

type Props = {
  command: any
  serverDetail: any
  isLoading?: boolean
  setIsLoading: any
}

const PackageManualRegister: NextPage<Props> = (props) => {
  const router = useRouter()
  const { server } = router.query
  const [items, setItems] = useState<any>({})
  const [manualCommand, setManualCommand] = useState<any>({})
  const [serverDetail, setServerDetail] = useState<any>({})
  const [pasteResult, setPasteResult] = useState<string>()
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)
  const { json, setPostTrigger, setJsonTrigger, setTarget } =
    useManualPackageRegisterJson()
  const { dispatch } = useContext(GlobalContext)

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying to clipboard was successful!')
        dispatch({
          type: 'update_toaster',
          payload: {
            isShow: true,
            text: `コピーしました。`,
            type: 'success',
          },
        })
      },
      function (err) {
        console.error('Async: Could not copy text: ', err)
      }
    )
  }

  const handleSubmit = () => {
    if (pasteResult == '' || !pasteResult) return
    const data = {
      packages: pasteResult.split(/\n/).filter(function (s) {
        return s !== ''
      }),
    }
    console.log(data)
    setTarget(data)
    setPostTrigger(true)
  }

  const handleClear = () => {
    console.log('aaa')
    setPasteResult('')
    setItems('')
    setSubmitDisabled(true)
  }

  useEffect(() => {
    setManualCommand(props.command)
    setServerDetail(props.serverDetail)
  }, [props, router.query.server])

  useEffect(() => {
    if (!json) return
    if (json.length) {
      setSubmitDisabled(false)
    }
    setItems(json)
  }, [json])

  useEffect(() => {
    console.log(pasteResult)
    if (pasteResult == '' || !pasteResult) return
    const data = {
      os_family: serverDetail.os_family,
      packages: pasteResult.split(/\n/).filter(function (s) {
        return s !== ''
      }),
    }
    console.log(data)
    setTarget(data)
    setJsonTrigger(true)
  }, [pasteResult])

  return (
    <Wrap>
      <Card margin={24}>
        <Text>
          インストール済みのパッケージを取得し、登録します。
          <br />
          下枠内のコマンドを、対象サーバーで実行してください。
        </Text>
        <CommandArea
          readOnly={true}
          value={manualCommand ? manualCommand.command : ''}
        />
        <Button
          buttonType={'secondary'}
          beforeIcon={<Icon.Copy />}
          small={true}
          label={'コピー'}
          handleClick={() => {
            copyTextToClipboard(manualCommand ? manualCommand.command : '')
          }}
        />
        <Text>
          表示されたコマンド実行結果をコピーし、下枠に張り付けてください。
        </Text>
        <CommandArea
          name={'result'}
          defaultValue={''}
          value={pasteResult}
          onChange={(e) => {
            setPasteResult(e.target.value)
          }}
        />
        <Text>以下の内容で登録します。</Text>
        <CommandArea
          readOnly={true}
          value={items ? JSON.stringify(items, null, 2) : ''}
        />
        <ActionWrap>
          <Button
            buttonType={'primary'}
            small={true}
            label={'登録'}
            disabled={submitDisabled}
            handleClick={() => {
              handleSubmit()
            }}
          />
          <Button
            buttonType={'secondary'}
            small={true}
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
const Text = styled.p`
  color: ${Color.TEXT.BLACK};
  font-size: 14px;
`
const ActionWrap = styled.div`
  display: flex;
  align-items: center;

  > button:nth-child(n + 2) {
    margin-left: 8px;
  }
`
const CommandArea = styled.textarea`
  background-color: ${Color.COMPONENT.TEXTAREA};
  font-size: 14px;
  padding: 24px;
  color: ${Color.TEXT.WHITE};
  width: 100%;
  margin: 16px 0;
  line-height: 1.71;
  height: 160px;

  + button {
    margin-bottom: 24px;
  }
`

export default PackageManualRegister
