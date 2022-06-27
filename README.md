# s4-frontend-ui
## カタログ
### components/atoms
- Button
- Card
- CardInner
- InputText
- InputDate
- InputTime
- Checkbox
- RadioButton
- ToggleButton
- Select
- Icon
- IconButton
- IconImage
- LabelEmail
- LabelSeverity
- LabelIcon
- LinkButton
- NewArrival
- NotificationIcon
- SearchCheckbox
- SearchCheckboxGroup
- Sort
- Supplement
- UnorderedList

### components/molecules
- FormField
- FormFieldMask
- HistoryList
- IconList
- List
- ListItem
- TextList
- LoginForm
- PageHeader
- PopupCard
- PopupSelect
- PopupSelectItem
- ProfileImage
- SearchToggle
- Tab
- TabItem



### components/utils
- Auth
- GlobalHead
- GlobalStyle
- composeValidators
- required
- number
- greaterNumber
- sameValue
- postalCode
- alphabeticAndNumeric
- email
- url
- time


### const
- Color
- Time

## SSHキー生成及び公開鍵の登録
プライベートリポジトリをNPMライブラリに追加する必要があるためSSHの設定が必要です。
```
ssh-keygen -t ed25519 -C "your_email@example.com"
```
※ 秘密鍵の名前はデフォルト（id_ed25519）、パスフレーズは「なし」でよい（enterを数回押します）

[s4-frontend-ui](https://github.com/KRAF-JP/s4-frontend-ui)
へアクセスし Settings > Deploy Keys を開き、 「add key」 で id_ed25519.pub の内容を記述します。
※ read のみで問題なし


## UIを使用するプロジェクトへライブラリを追加する

```
{
  "dependencies": {
    "s4-frontend-ui": "ssh://github.com/KRAF-JP/s4-frontend-ui.git",
  },
}
```

## UIを使用するプロジェクトのpackage.jsonに以下を追加する
```
{
  "script" : {
    "postinstall": "yarn build:ui",
    "upgrade:ui": "yarn upgrade s4-frontend-ui && yarn build:ui",
    "build:ui": "cd node_modules/s4-frontend-ui && yarn build"
  }
}
```
## Install
```
yarn install
```
## Storybook
```
yarn start:storybook
```
## Upgrade
```
yarn upgrade:ui
```
## Build
```
yarn build
```