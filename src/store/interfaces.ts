export type userState = {
  isLoadingUser: boolean
  isLoadingOrg: boolean
  isNavOpen: boolean
  isToaster: {
    text: string
    type: 'success' | 'cation' | 'error' | string
    isShow: boolean
  }
  user: {
    id: number
    name: string
    firstname: string
    lastname: string
    email: string
    email_verified_at: any
    role: number
    is_active: boolean
    lang: string
    created_at: any
    updated_at: any
    deleted_at: any
    org_name: string
    profile_image: string
    org_image: string
  }
  organization: {
    id: number
    domain: string
    name: string
    created_at: any
    updated_at: any
    deleted_at: any
    notification_email_enabled: boolean
    notification_email: any
    notification_email_verified_at: any
    notification_email_verify_expires_at: string
    notification_slack_enabled: boolean
    notification_slack_url: any
    notification_week_0: boolean
    notification_week_1: boolean
    notification_week_2: boolean
    notification_week_3: boolean
    notification_week_4: boolean
    notification_week_5: boolean
    notification_week_6: boolean
    notification_time: string
    ticket_order_point: number
    total_tickets: number
    reserved_tickets: number
    org_image: string
  }
  notification: {
    is_newly: number
    is_load: boolean
    items: any
  }
  vulnerability: {
    unread: number
  }
}

export const initialUserState = {
  isLoadingUser: false,
  isLoadingOrg: false,
  isNavOpen: false,
  isToaster: {
    text: '',
    type: '',
    isShow: false,
  },
  user: {
    id: 1,
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    email_verified_at: null,
    role: 0,
    is_active: true,
    lang: 'ja',
    created_at: null,
    updated_at: null,
    deleted_at: null,
    org_name: '',
    profile_image: null,
    org_image: null,
  },
  organization: {
    id: null,
    domain: 'localhost',
    name: '',
    created_at: null,
    updated_at: null,
    deleted_at: null,
    notification_email_enabled: false,
    notification_email: null,
    notification_email_verified_at: null,
    notification_email_verify_expires_at: null,
    notification_slack_enabled: false,
    notification_slack_url: null,
    notification_week_0: false,
    notification_week_1: false,
    notification_week_2: false,
    notification_week_3: false,
    notification_week_4: false,
    notification_week_5: false,
    notification_week_6: false,
    notification_time: '',
    ticket_order_point: 0,
    total_tickets: 0,
    reserved_tickets: 999,
    org_image: null,
  },
  notification: {
    is_newly: 0,
    is_load: true,
    items: [],
  },
  vulnerability: {
    unread: 0,
  },
}

export type Action =
  | { type: 'update_toaster'; payload: any }
  | { type: 'is_loading_user'; payload: boolean }
  | { type: 'is_loading_org'; payload: boolean }
  | { type: 'is_nav'; payload: boolean }
  | { type: 'fetch_init_user'; payload: any }
  | { type: 'fetch_init_organization'; payload: any }
  | { type: 'update_organization'; payload: any }
  | { type: 'update_user'; payload: any }
  | { type: 'update_user_name'; payload: any }
  | { type: 'update_user_org_name'; payload: any }
  | { type: 'update_notification_newly'; payload: any }
  | { type: 'update_notification_load'; payload: any }
  | { type: 'update_notification_items'; payload: any }
  | { type: 'update_vulnerability_unread'; payload: any }
  | { type: 'update_user_profile_image'; payload: any }
  | { type: 'update_organization_image'; payload: any }
