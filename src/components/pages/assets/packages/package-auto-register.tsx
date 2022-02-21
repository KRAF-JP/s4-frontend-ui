import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Color from '../../../../const/color'
import { Icon } from '../../../atoms/icon'
import { NextPage } from 'next'
import { Card } from '../../../atoms/card'
import Button from '../../../atoms/button/button'
import GlobalContext from '../../../../store/context'
import { useAutoPackageRegisterResult } from '../../../../hooks/pages/assets/use-packages'

type Props = {
  command: any
  isLoading?: boolean
  setIsLoading: any
}

const PackageAutoRegister: NextPage<Props> = (props) => {
  const router = useRouter()
  const { server } = router.query
  const [items, setItems] = useState<any>({
    is_curl_received: false,
    packages: {},
  })
  const [itemOutput, setItemOutput] = useState<string>(null)
  const [packageCurl, setPackageCurl] = useState<any>({})
  const [secCount, setSecCount] = useState<number>(10)
  const [disabled, setDisabled] = useState<boolean>(true)
  const { result, setResultTrigger, setTarget, setPostTrigger, setWaitFetch } =
    useAutoPackageRegisterResult()
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
    setTarget(packageCurl.id)
    setPostTrigger(true)
    router.push({
      pathname: `/assets/`,
    })
  }

  const handleClear = () => {
    console.log('aaa')
    router.push({
      pathname: `/assets/`,
      query: {},
    })
  }

  useEffect(() => {
    setPackageCurl(props.command)
  }, [props.command, router.isReady])

  useEffect(() => {
    if (!packageCurl) return
    setTarget(packageCurl.id)
  }, [packageCurl])

  useEffect(() => {
    console.log(result)
    if (result) {
      setItems(result)
      setDisabled(!result.is_curl_received)
    }
    setWaitFetch(false)
  }, [result])

  useEffect(() => {
    if (!items.packages) return
    let out = ''
    for (const key of Object.keys(items.packages)) {
      let data = items.packages[key]
      if (items.os === 'ubuntu' || items.os === 'debian') {
        out += `${data.name} ${data.evr} ${data.source_name} ${data.source_evr}\n`
      } else {
        out += `${data.name} ${data.evr}\n`
      }
    }
    setItemOutput(out)
  }, [items])

  useEffect(() => {
    let cnt = 10
    setSecCount(10)
    const timer = setInterval(() => {
      setSecCount((preSecCount) => preSecCount - 1)
      cnt = cnt - 1
      console.log(cnt)
      if (cnt < 0) {
        setWaitFetch(true)
        setResultTrigger(true)
        cnt = 10
        setSecCount(10)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

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
          value={packageCurl ? packageCurl.curl : ''}
        />
        <Button
          buttonType={'secondary'}
          beforeIcon={<Icon.Copy />}
          small={true}
          label={'コピー'}
          handleClick={() => {
            copyTextToClipboard(packageCurl ? packageCurl.curl : '')
          }}
        />
        <Text>
          コマンド実行後、実行結果がここに表示されます。（10秒ごとに更新）
        </Text>

        <CommandArea
          readOnly={true}
          value={itemOutput ? itemOutput : `あと${secCount}秒で更新します…`}
        />
        <TextAttention>
          ※ コマンド実行がエラーになる場合は、「手動登録」をお試しください。
        </TextAttention>
        <ActionWrap>
          <Button
            buttonType={'primary'}
            small={true}
            label={'登録'}
            disabled={disabled}
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
const TextAttention = styled.p`
  font-size: 12px;
  color: ${Color.TEXT.LIGHT_GRAY};
  line-height: 1.33;
  margin-bottom: 16px;
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
  white-space: pre-wrap;
`
const ActionWrap = styled.div`
  display: flex;
  align-items: center;

  > button:nth-child(n + 2) {
    margin-left: 8px;
  }
`

export default PackageAutoRegister
