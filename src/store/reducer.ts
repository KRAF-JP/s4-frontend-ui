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
    case 'update_user_org_name':
      return {
        ...dataState,
        user: { ...dataState.user, org_name: action.payload },
      }
    case 'update_notification_newly':
      return {
        ...dataState,
        notification: { is_newly: action.payload },
      }
    case 'update_user_profile_image':
      return {
        ...dataState,
        user: { ...dataState.user, profile_image: action.payload },
      }
    default:
      return dataState
  }
}
