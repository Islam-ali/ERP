export interface LoginRes {
    message: string
    isSuccess: boolean
    data: Data
    error: string
  }
  
  export interface Data {
    userName: string
    roleName: string
    email: string
    token: string
    expiresOn: string
    company_Id: number
  }
  