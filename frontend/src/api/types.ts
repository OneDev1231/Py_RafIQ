export interface User {
  id: number;
  email: string;
  name: string;
  is_verified: boolean;
  user_type: string;
}
export interface Login {
  token: string | null;
  user: User | null;
}

export interface ResetEmail {
  status: string | null;
  token: string | null;
  message: string | null;
}

export interface Card {
  last_4: string | null;
  exp_month: string | null;
  exp_year: string | null;
  payment_id: string | null;
  message: string | null;
  active: boolean;
  user: User;
}