export interface Client {
  meta: Meta
  passes: User[]
}

export interface Meta {
  size: number
  limit: number
  offset: number
}

export interface User {
  user_id: number
  template: string
  fio: string
  first_name?: string
  last_name?: string
  pat_name?: string
  phone?: string
  city?: string
  sms_verify?: boolean
  email?: string
  birthday?: string
  gender?: string
  car_number?: string
  discount?: string
  bonus: number
  inactive_bonus: any
  bonus_last: any
  write_off_last: any
  loyalty_level?: string
  summ: any
  summ_all: any
  summ_last: any
  visits: any
  visits_all: any
  date_last: any
  barcode: string
  key1: any
  key2: any
  key3?: string
  key4?: string
  key5?: string
  key6?: string
  trg_action_type: any
  trg_action_value: any
  trg_date_type: any
  trg_date_value: any
  delivery_form: any
  o_s: string
  link: string
  referal: any
  backgroundColor: any
  created_at: string
  H1: any
  H2: any
  H3: any
  S1: any
  S2: any
  S3: any
  B1: any
  B2: any
  B3: any
  B4: any
  B5: any
  B6: any
  utm_source: any
  utm_medium: any
  utm_campaign: any
  utm_content: any
  utm_term: any
  telegram: boolean
  confirm_code: any
}

export interface PushData {
  user_id: string;
  date_start: string;
  push_message: string;
}