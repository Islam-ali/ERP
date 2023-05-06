export interface LoginRes {
    message: string
    data: Data
    status: boolean
    code: number
  }
  
  export interface Data {
    user: User
    token: string
  }
  
  export interface User {
    id: number
    name: string
    email: string
  }