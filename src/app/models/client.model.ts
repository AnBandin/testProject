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
  user_id: number;
  template: string;
  fio: string;
  first_name: string;
  last_name: string;
  pat_name: string;
  phone: string;
  sms_verify: boolean;
  email: string;
  birthday: string;
  gender: string;
  car_number: string;
  discount: string;
  bonus: string;
  bonus_last: string;
  write_off_last: string;
  loyalty_level: string;
  summ: string;
  summ_all: string;
  summ_last: string;
  visits: string;
  visits_all: string;
  date_last: string;
  barcode: string;
  city: string;
  confirm_code: string;
  key1: string;
  key2: string;
  key3: string;
  key4: string;
  key5: string;
  key6: string;
  trg_action_type: string;
  trg_action_value: string;
  trg_date_type: string;
  trg_date_value: string;
  delivery_form: string;
  o_s: string;
  link: string;
  referal: string;
  backgroundColor: string;
  created_at: Date;
  H1?: string;
  H2?: string;
  H3?: string;
  S1?: string;
  S2?: string;
  S3?: string;
  B1?: string;
  B2?: string;
  B3?: string;
  B4?: string;
  B5?: string;
  B6?: string;
}

export interface PushData {
  user_id: string;
  date_start: string;
  push_message: string;
}

export interface CreateCard {
  template: string
  first_name: string
  last_name: string
  pat_name: string
  phone: string
  email: string
  birthday: string
  gender: string
  barcode: string
  discount: string
  bonus: number
  loyalty_level: string
}
