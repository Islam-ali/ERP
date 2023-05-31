export interface LoginRes {
    message: string
    isSuccess: boolean
    data: DataLoginRes
    error: string
  }
  
  export interface DataLoginRes {
    userName: string
    roleNames: string[]
    email: string
    token: string
    expiresOn: string
    company_Id: number
  }
  