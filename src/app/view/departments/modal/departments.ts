export interface Departments {
    message: string
    isSuccess: boolean
    isUpdated: boolean
    isExists: boolean
    isNotFound: boolean
    isActive: boolean
    data: DataAllDepartments[]
    error: string
  }
  
  export interface DataAllDepartments {
    isActive: boolean
    id: number
    name: string
  }

  export interface DepartmentById {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataDepartment
    error: string
  }
  export interface DataDepartment {
    company_Id: number
    id: number
    name: string
    nameInEnglish: string
  }
  