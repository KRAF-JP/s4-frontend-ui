import React, { useEffect, useState, useContext } from 'react'
import GlobalContext from '../../../store/context'
import styled from 'styled-components'
import Color from '../../../const/color'
import { Icon } from '../../atoms/icon'
import { List, ListItem } from '../../molecules/list'
import { LoadingIcon } from '../../atoms/loading-icon'
import { NextPage } from 'next'
import { IconButton } from '../../atoms/icon-button'
import { ServerList } from '../../pages/assets'
import { Card } from '../../atoms/card'
import { useRouter } from 'next/router'
import { useProjects } from '../../../hooks/pages/assets/use-projects'
import Modal from '../../organisms/modal'
import { Button } from '../../atoms/button'

import { InputText } from '../../atoms/form'
import { IconImage } from '../../atoms/icon-image'
import { useProjectMembers } from '../../../hooks/pages/assets/use-project-members'
import { Field, Form } from 'react-final-form'
import { composeValidators, required } from '../../utils/varidator'
import EditProject from '../../pages/assets/project/register/edit-project'
import { useProjectEdit, useServerEdit } from '../../../hooks/pages/assets/use-assets'
import EditServer from '../../pages/assets/project/register/edit-server'

type Props = {
  data: any[]
  setData: any
  isLoading?: boolean
  setIsLoading: any
  setFetchRequestTrigger?: any
  serverData: any
  osFamily: any
  setServerData: any
  versionList: any
  windowsOsList: any
  otherOsList: any
  setOsFamily: any
  setWindowsOs: any
  setOtherOsSearchKeyword: any
  setFetchOtherOsTrigger: any
  setPutServerTrigger: any
  serverId: any
  setServerId: any
  setFetchServerTrigger: any
}

const ProjectList: NextPage<Props> = (props) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [memberItems, setMemberItems] = useState([])
  const [nonMemberItems, setNonMemberItems] = useState([])
  const [name, setName] = useState<string>()
  const [projectName, setProjectName] = useState<string>()
  const [openToggle, setOpenToggle] = useState({})
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isShowModalMember, setIsShowModalMember] = useState<boolean>(false)
  const [isShowModalEdit, setIsShowModalEdit] = useState<boolean>(false)
  const [modalEditProjectName, setModalEditProjectName] = useState<string>(null)
  const [isShowModalMemberDelete, setIsShowModalMemberDelete] =
    useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(true)
  const [isShowModalEditServer, setIsShowModalEditServer] =
    useState<boolean>(false)
  const { setTarget, target, setDeleteTrigger } = useProjects()
  const {
    projectMembers,
    setProjectMembers,
    setTargetMember,
    setFetchTrigger,
    setTargetProject,
    setPostTrigger,
    targetProject,
    isLoadingMember,
    setTargetKeyword,
    targetKeyword,
    setDeleteMemberTrigger,
    setIsLoadingMember,
    setNonMemberTrigger,
    projectNonMembers,
    targetKeywordNonMember,
    setTargetKeywordNonMember,
  } = useProjectMembers()
  const { setPutProjectTrigger, projectData, setProjectData, setProjectId } =
    useProjectEdit()
  const [versionDefaultData, setVersionDefaultData] = useState<{
    label: string
    value: string
  }>({
    label: null,
    value: null,
  })
  const [osDefaultData, setOsDefaultData] = useState<{
    label: string
    value: string
  }>({
    label: null,
    value: null,
  })
  const { state } = useContext(GlobalContext)

  const handleClickOpen = (i) => {
    setOpenToggle({
      ...openToggle,
      [i]: !openToggle[i],
    })
  }

  const handleSubmitDelete = () => {
    setDeleteTrigger(true)
    setIsShowModal(false)
  }

  const handleSubmitCancel = () => {
    setTarget({
      id: null,
      name: null,
    })
    setIsShowModal(false)
  }

  let timer = null
  const handleKeywordChange = (formValues: any) => {
    const { keyword } = formValues.values
    console.log(keyword)
    clearTimeout(timer)
    timer = setTimeout(() => {
      setTargetKeyword(keyword)
    }, 2000)
  }

  const handleKeywordChangeMemberList = (formValues: any) => {
    const { keywordNonMember } = formValues.values
    console.log(keywordNonMember)
    clearTimeout(timer)
    timer = setTimeout(() => {
      setTargetKeywordNonMember(keywordNonMember)
      setNonMemberTrigger(true)
    }, 2000)
  }

  const handleDeleteMember = () => {
    setDeleteMemberTrigger(true)
  }

  const handleEditCancel = () => {
    setProjectData({ id: null, name: '', platform: '' })
    setIsShowModalEdit(false)
  }

  const handleEdit = () => {
    setPutProjectTrigger(true)
    setIsShowModalEdit(false)
  }

  const handleClickMember = (id: number) => {
    setTargetProject(id)
    setIsShowModalMember(true)
    setIsLoadingMember(false)
    setFetchTrigger(true)
  }

  const handleDeleteMemberCancel = () => {
    setTargetMember([])
    setIsShowModalMemberDelete(false)
  }

  const handleSubmitCancelMember = () => {
    setTarget({
      id: null,
      name: null,
    })
    setTargetKeywordNonMember(undefined)
    setTargetKeyword(undefined)
    setMemberItems([])
    setNonMemberItems([])
    setProjectMembers([])
    setIsShowModalMember(false)
  }

  const handleEditServerCancel = () => {
    props.setServerData({
      name: '',
      os_family: '',
      os_release: '',
      last_modified_date: null,
    })
    setIsShowModalEditServer(false)
  }

  const handleEditServer = () => {
    props.setPutServerTrigger(true)
    setIsShowModalEditServer(false)
  }

  const handleChange = () => {}

  useEffect(() => {
    setItems(props.data)
  }, [props.data])

  useEffect(() => {
    setMemberItems(projectMembers)
  }, [projectMembers])

  useEffect(() => {
    setNonMemberItems(projectNonMembers)
  }, [projectNonMembers])

  useEffect(() => {
    console.log(props.serverData)
    if (props.serverData.name) {
      if (props.osFamily.os_family === 'windows') {
        if (props.serverData.os_name && props.serverData.os_version) {
          setIsSubmit(false)
        } else {
          setIsSubmit(true)
        }
      } else if (props.osFamily.os_family === 'other') {
        if (
          props.serverData.os_name &&
          props.serverData.os_vendor &&
          props.serverData.os_version
        ) {
          setIsSubmit(false)
        } else {
          setIsSubmit(true)
        }
      } else {
        if (props.serverData.os_family && props.serverData.os_release) {
          setIsSubmit(false)
        } else {
          setIsSubmit(true)
        }
      }
    } else {
      setIsSubmit(true)
    }
  }, [props.serverData])

  return (
    <Wrap>
      <StyledList>
        {props.isLoading ? (
          <>
            {items.length ? (
              <>
                {items.map((data, i) => (
                  <Card key={i} margin={24}>
                    <ProjectListItem>
                      <WrapLeft>
                        <ProjectName>{data.name}</ProjectName>
                        {data.platform_display && (
                          <ProjectPlatform>
                            {data.platform_display}
                          </ProjectPlatform>
                        )}
                        <ProjectScanLastDate>
                          脆弱性スキャン最新日時：
                          {data.last_scanned_at
                            ? data.last_scanned_at.replaceAll('-', '/')
                            : '-'}
                        </ProjectScanLastDate>
                      </WrapLeft>
                      <WrapRight>
                        <Button
                          type={'button'}
                          label={'サーバー登録'}
                          beforeIcon={<Icon.Plus color={Color.TEXT.GRAY} />}
                          small
                          handleClick={() => {
                            router.push({
                              pathname: `/assets/projects/${data.id}/register`,
                              query: {
                                id: data.id,
                              },
                            })
                          }}
                        >
                          サーバ登録
                        </Button>
                        <IconButton
                          handleClick={() => {
                            handleClickMember(data.id)
                          }}
                        >
                          <Icon.User />
                        </IconButton>
                        <IconButton
                          handleClick={() => {
                            setProjectData({
                              id: data.id,
                              name: data.name,
                              platform: data.platform_display
                                ? data.platform_display
                                : '',
                            })
                            setProjectId(data.id)
                            setModalEditProjectName(data.name)
                            setIsShowModalEdit(true)
                          }}
                        >
                          <Icon.Pen />
                        </IconButton>
                        {state.user.role !== 0 && (
                          <IconButton
                            handleClick={() => {
                              setTarget({
                                id: data.id,
                                name: data.name,
                              })
                              setIsShowModal(true)
                            }}
                          >
                            <Icon.Trash />
                          </IconButton>
                        )}
                        <IconButton
                          handleClick={() => {
                            handleClickOpen(i)
                          }}
                        >
                          {openToggle[i] ? (
                            <Icon.ChevronUp />
                          ) : (
                            <Icon.ChevronDown />
                          )}
                        </IconButton>
                      </WrapRight>
                    </ProjectListItem>
                    <OpenWrap isOpen={openToggle[i]}>
                      <ServerList
                        data={data.servers}
                        setOsFamily={props.setOsFamily}
                        setSelectedWindowsOs={props.setWindowsOs}
                        setPutServerTrigger={props.setPutServerTrigger}
                        setServerId={props.setServerId}
                        setServerData={props.setServerData}
                        setFetchServerTrigger={props.setFetchServerTrigger}
                        projectName={data.name}
                        setProjectName={setProjectName}
                        setIsShowModalEditServer={setIsShowModalEditServer}
                      />
                    </OpenWrap>
                  </Card>
                ))}
              </>
            ) : (
              <NothingText>
                検索条件に合うプロジェクトはありませんでした。
              </NothingText>
            )}
            <Modal
              isShow={isShowModal}
              setIsShow={setIsShowModal}
              submit={{
                label: '削除',
                buttonType: 'danger',
                disabled: false,
              }}
              title={'プロジェクトを削除'}
              handleClickSubmit={() => {
                handleSubmitDelete()
              }}
              handleClickCancel={() => {
                handleSubmitCancel()
              }}
            >
              <>
                「{target.name}」を削除しますか？
                <br />
                （該当の資産で検出された脆弱性も削除されます）
              </>
            </Modal>
            <Modal
              isShow={isShowModalMember}
              setIsShow={setIsShowModalMember}
              title={''}
              noFooter={true}
              handleClickSubmit={() => {
                //
              }}
              handleClickCancel={() => {
                handleSubmitCancelMember()
              }}
            >
              <>
                <WrapCancel>
                  <IconButton
                    handleClick={() => {
                      handleSubmitCancelMember()
                    }}
                  >
                    <Icon.Cross />
                  </IconButton>
                </WrapCancel>
                <SubTitle>{target.name}</SubTitle>
                <Title>
                  メンバー<Count>（{memberItems.length}名）</Count>
                </Title>
                <WrapForm>
                  <Form
                    onSubmit={handleChange}
                    render={({ handleSubmit, form }) => (
                      <form onSubmit={handleSubmit}>
                        <Field
                          name={'keyword'}
                          type={'text'}
                          value={targetKeyword}
                        >
                          {({ input, meta }) => (
                            <InputText
                              {...(input as any)}
                              size={'XXL'}
                              name={'keyword'}
                              icon={<Icon.Search color={Color.TEXT.GRAY} />}
                              placeholder={'名前、メールアドレスで検索'}
                              onKeyUp={(e) => {
                                input.onChange(e)
                                handleKeywordChange(form.getState())
                              }}
                            />
                          )}
                        </Field>
                      </form>
                    )}
                  />
                  <Form
                    onSubmit={handleChange}
                    render={({ handleSubmit, form }) => (
                      <form onSubmit={handleSubmit}>
                        <Field
                          name={'keywordNonMember'}
                          type={'text'}
                          value={targetKeywordNonMember}
                        >
                          {({ input, meta }) => (
                            <InputText
                              {...(input as any)}
                              size={'XXL'}
                              name={'keywordNonMember'}
                              icon={<Icon.User color={Color.TEXT.GRAY} />}
                              placeholder={
                                '名前、メールアドレスでメンバーを追加'
                              }
                              onKeyUp={(e) => {
                                input.onChange(e)
                                handleKeywordChangeMemberList(form.getState())
                              }}
                            />
                          )}
                        </Field>
                      </form>
                    )}
                  />
                  <>
                    {nonMemberItems.length ? (
                      <StyledNonMemberList>
                        {nonMemberItems.map((data, i) => (
                          <ListItem key={i} size={58}>
                            <WrapMember>
                              <IconImage src={data.profile_image} size={48} />
                              <MemberName>
                                {data.name}
                                <Email>{data.email}</Email>
                              </MemberName>
                            </WrapMember>
                            <Button
                              label={'追加'}
                              buttonType={'primary'}
                              small={true}
                              handleClick={() => {
                                setTargetMember([data.id])
                                setPostTrigger(true)
                              }}
                            />
                          </ListItem>
                        ))}
                      </StyledNonMemberList>
                    ) : (
                      <></>
                    )}
                  </>
                </WrapForm>
                <WrapContent>
                  {isLoadingMember ? (
                    <>
                      {memberItems.length ? (
                        <StyledMemberList>
                          {memberItems.map((data, i) => (
                            <ListItem key={i} size={58}>
                              <WrapMember>
                                <IconImage src={data.profile_image} size={48} />
                                <MemberName>
                                  {data.name}
                                  <Email>{data.email}</Email>
                                </MemberName>
                              </WrapMember>
                              <StyledMemberDeleteButton
                                label={'削除'}
                                small={true}
                                handleClick={() => {
                                  setName(data.name)
                                  setIsShowModalMemberDelete(true)
                                  setTargetMember([data.id])
                                }}
                              />
                            </ListItem>
                          ))}
                        </StyledMemberList>
                      ) : (
                        <NothingText>
                          検索条件に合うメンバーはありませんでした。
                        </NothingText>
                      )}
                    </>
                  ) : (
                    <LoadingWrap>
                      <LoadingIcon />
                    </LoadingWrap>
                  )}
                </WrapContent>
              </>
            </Modal>
          </>
        ) : (
          <LoadingWrap>
            <LoadingIcon />
          </LoadingWrap>
        )}
      </StyledList>

      <Modal
        isShow={isShowModalEdit}
        setIsShow={setIsShowModalEdit}
        submit={{
          label: '保存',
          buttonType: 'primary',
          disabled: false,
        }}
        title={''}
        handleClickSubmit={() => {
          handleEdit()
        }}
        handleClickCancel={() => {
          handleEditCancel()
        }}
      >
        <ModalHeader>
          <ModalHeaderSmall>{modalEditProjectName}</ModalHeaderSmall>
          プロジェクト情報編集
        </ModalHeader>
        <EditProject data={projectData} setData={setProjectData} />
      </Modal>

      <Modal
        isShow={isShowModalEditServer}
        setIsShow={setIsShowModalEditServer}
        submit={{
          label: '保存',
          buttonType: 'primary',
          disabled: isSubmit,
        }}
        title={''}
        handleClickSubmit={() => {
          props.setServerId(props.serverId)
          handleEditServer()
        }}
        handleClickCancel={() => {
          handleEditServerCancel()
        }}
      >
        <>
          <ModalHeader>
            <ModalHeaderSmall>{projectName}</ModalHeaderSmall>
            サーバー情報編集
          </ModalHeader>
          <EditServer
            data={props.serverData}
            setData={props.setServerData}
            setOsFamily={props.setOsFamily}
            versionList={props.versionList}
            windowsOsList={props.windowsOsList}
            otherOsList={props.otherOsList}
            setWindowsOs={props.setWindowsOs}
            setOtherOsSearchKeyword={props.setOtherOsSearchKeyword}
            setFetchOtherOsTrigger={props.setFetchOtherOsTrigger}
            setVersionDefaultData={setVersionDefaultData}
            versionDefaultData={versionDefaultData}
            setOsDefaultData={setOsDefaultData}
            osDefaultData={osDefaultData}
            isLoading={props.isLoading}
          />
        </>
      </Modal>

      <Modal
        isShow={isShowModalMemberDelete}
        setIsShow={setIsShowModalMemberDelete}
        submit={{
          label: '削除',
          buttonType: 'danger',
          disabled: false,
        }}
        title={'メンバーを削除'}
        handleClickSubmit={() => {
          handleDeleteMember()
        }}
        handleClickCancel={() => {
          handleDeleteMemberCancel()
        }}
      >
        <>{name}を削除しますか？</>
      </Modal>
    </Wrap>
  )
}

const Wrap = styled.div`
  min-width: 830px;
  font-size: 14px;
`
const LoadingWrap = styled.div`
  height: calc(100vh - 106px);
`
const StyledList = styled(List)<{ height?: number }>`
  height: calc(100vh - ${({ height }) => height && height}px);
  margin: 0 0 0 -16px;
  padding: 4px 16px;
  overflow-y: scroll;
  transition: height 0.3s ease-in-out;

  &::-webkit-scrollbar {
    //display: none;
  }
`
const WrapLeft = styled.div`
  > * {
    margin-right: 16px;
  }
`
const WrapRight = styled.div`
  > * {
    font-size: 14px;
    font-weight: bold;
    color: ${Color.TEXT.GRAY};
    line-height: 1;
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`
const ProjectListItem = styled.div`
  height: 100%;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > * {
    display: flex;
    align-items: center;
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
`
const ProjectName = styled.div`
  font-size: 18px;
  font-weight: 500;
`
const ProjectPlatform = styled.div`
  padding: 2px 8px;
  border-radius: 4px;
  border: solid 1px ${Color.TEXT.GRAY};
  font-size: 12px;
  font-weight: normal;
  color: ${Color.TEXT.GRAY};
  line-height: 1.33;
`
const ProjectScanLastDate = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: ${Color.TEXT.GRAY};
`
const OpenWrap = styled.div<{ isOpen: any }>`
  display: none;
  ${({ isOpen }) =>
    isOpen &&
    `
    display: block;
  `}
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
const SubTitle = styled.div`
  font-size: 12px;
  line-height: 1.33;
  color: ${Color.TEXT.GRAY};
`
const Title = styled.h3`
  margin-top: 8px;
  font-size: 16px;
  font-weight: normal;
`
const Count = styled.small`
  font-size: 14px;
`
const WrapCancel = styled.div`
  display: inline-flex !important;
  position: absolute;
  right: 0;
  top: 0;
  margin: 16px;
`
const WrapForm = styled.div`
  margin-top: 24px;

  > form:nth-child(n + 2) {
    margin-top: 8px;
  }
`
const WrapContent = styled.div`
  margin-top: 24px;
  overflow-y: scroll;
  height: 50vh;
`
const StyledMemberList = styled(List)`
  margin: 2px;
`
const StyledNonMemberList = styled(List)`
  position: absolute;
  z-index: 99999;
  width: 480px;
  background: #fff;
  margin: 8px 0 0;
  padding: 8px 0 4px;
  border-radius: 16px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.16);
  overflow-y: scroll;
  max-height: 50vh;
  > li {
    box-shadow: none;
    &:hover {
      background: none;
    }
  }
`
const WrapMember = styled.div`
  display: flex;
`
const StyledMemberDeleteButton = styled(Button)`
  border: solid 1px ${Color.COMPONENT.FORM_BORDER};
  background-color: #fff;
  color: ${Color.TEXT.BLACK};
`
const MemberName = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: block;
  line-height: 1.5;
  margin-left: 8px;
  color: ${Color.TEXT.BLACK};
`
const Email = styled.div`
  display: block;
  font-size: 12px;
  font-weight: normal;
  color: ${Color.TEXT.LIGHT_GRAY};
`
const ModalHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding-bottom: 24px;
`
const ModalHeaderSmall = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: ${Color.TEXT.GRAY};
`

export default ProjectList
