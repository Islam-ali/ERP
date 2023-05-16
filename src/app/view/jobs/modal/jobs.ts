
export interface Jobs {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataJobs[]
    error: string
  }
  
  export interface DataJobs {
    departmentName: string
    isActive: boolean
    id: number
    name: string
  }
  export interface ListOfJobs {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataListOfJobs[]
    error: string
  }
  
  export interface DataListOfJobs {
    id: number
    name: string
  }
  export interface ShowJob {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataShowJob
    error: string
  }
  
  export interface DataShowJob {
    department_Id: number
    id: number
    name: string
    nameInEnglish: string
  }
  