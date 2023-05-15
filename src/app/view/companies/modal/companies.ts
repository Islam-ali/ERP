export interface Company {
    message: string
    isSuccess: boolean
    isUpdated: boolean
    isExists: boolean
    isNotFound: boolean
    isActive: boolean
    data: DataAllCompanies[]
    error: string
  }
  
  export interface DataAllCompanies {
    id: number
    code: string
    name: string
    address: string
    email: string
    isActive: boolean
  }
  