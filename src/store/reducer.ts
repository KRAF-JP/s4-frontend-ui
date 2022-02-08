import { data } from 'browserslist'

export const globalStateReducer = (dataState, action) => {
  switch (action.type) {
    case 'is_loading_user':
      return {
        ...dataState,
        isLoadingUser: action.payload,
      }
    case 'update_toaster':
      return {
        ...dataState,
        isToaster: action.payload,
      }
    case 'is_loading_org':
      return {
        ...dataState,
        isLoadingOrg: action.payload,
      }
    case 'is_nav':
      return {
        ...dataState,
        isNavOpen: action.payload,
      }
    case 'fetch_init_user':
      return {
        ...dataState,
        user: action.payload,
      }
    case 'fetch_init_organization':
      return {
        ...dataState,
        organization: action.payload,
      }
    case 'update_organization':
      return {
        ...dataState,
        organization: action.payload,
      }
    case 'update_user':
      return {
        ...dataState,
        user: action.payload,
      }
    case 'update_user_org_name':
      return {
        ...dataState,
        user: { ...dataState.user, org_name: action.payload },
      }
    case 'update_user_name':
      return {
        ...dataState,
        user: { ...dataState.user, name: action.payload },
      }
    case 'update_notification_newly':
      return {
        ...dataState,
        notification: { ...dataState.notification, is_newly: action.payload },
      }
    case 'update_notification_load':
      return {
        ...dataState,
        notification: { ...dataState.notification, is_load: action.payload },
      }
    case 'update_notification_items':
      return {
        ...dataState,
        notification: { ...dataState.notification, items: action.payload },
      }
    case 'update_vulnerability_unread':
      return {
        ...dataState,
        vulnerability: { unread: action.payload },
      }
    case 'update_user_profile_image':
      return {
        ...dataState,
        user: { ...dataState.user, profile_image: action.payload },
      }
    case 'update_organization_image':
      return {
        ...dataState,
        organization: { ...dataState.user, org_image: action.payload },
        user: { ...dataState.user, org_image: action.payload },
      }
    default:
      return dataState
  }
}
