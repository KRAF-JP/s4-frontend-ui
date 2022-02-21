import { useContext } from 'react'
import GlobalContext from '../store/context'
import { useRouter } from 'next/router'

export const useErrorHandle = () => {
  const router = useRouter()
  const { dispatch } = useContext(GlobalContext)

  const errorHandle = (
    error: any,
    message: string = '',
    redirectUrl: string = '/login'
  ) => {
    switch (error.response.status) {
      case 401:
        toaster('セッションが無効になりました。')
        redirect(redirectUrl)
        break
      case 403:
        toaster(message ?? '許可されていない操作です。')
        break
      case 404:
        toaster(message ?? 'API Not Found.')
        break
      case 405:
        toaster(message ?? 'メソッドが許可されていません。')
        break
      case 419:
        toaster(message ?? '不正なリクエストです。')
        break
      case 422:
        toaster(message ?? '送信パラメタに問題があります。')
        break
      case 429:
        toaster(
          message ??
            'リクエストが集中しています。しばらく待ってからお試しください。'
        )
        break
      case 500:
        toaster(message ?? 'Internal Server Error.')
        break
      case 503:
        toaster(
          message ??
            '現在メンテナンス中です。しばらく待ってからお試しください。'
        )
        break
      default:
        toaster(
          message ??
            `エラーが発生しました。[${error.response.status}:${error.message}]`
        )
        break
    }
  }

  const redirect = (redirectUrl: string = '/login') => {
    router.push(redirectUrl)
  }

  const toaster = (message: string) => {
    dispatch({
      type: 'update_toaster',
      payload: {
        isShow: true,
        text: message,
        type: 'error',
      },
    })
  }

  return errorHandle
}
