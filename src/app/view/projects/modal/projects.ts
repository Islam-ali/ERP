export interface Projects {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataProjects[]
    error: string
  }
  
  export interface DataProjects {
    startDate: string
    endDate: string
    department_Id: number
    isActive: boolean
    id: number
    name: string
  }
  
  export interface ShowProjects {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataShowProjects
    error: string
  }

  export interface Atachments {
    description:string
    id:number
    file:string

  }
  export interface DataShowProjects {
    startDate: string
    endDate: string
    department_Id: number
    id: number
    name: any
    nameInEnglish: any
    atachments: Atachments[]
    budget:number
    description:string
    client_Id:number
    implementationPeriod:string
  }