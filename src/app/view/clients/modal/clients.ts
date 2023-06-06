export interface Clients {

    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataClients[]
    error: string
}

export interface DataClients {
    id: number
    name: string
    company: string
    mobile: string
    activity: string
    generalManagerName: string
    salesManagerName: string
    email: string
    address: string
    clientJob_Id: number
    isActive: boolean
}

export interface ListOfClientJobs {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataListOfClientJobs[]
    error: string
  }
  
  export interface DataListOfClientJobs {
    id: number
    name: string
  }

  export interface showClient {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DatashowClient
    error: string
  }
  
  export interface DatashowClient {
    id: number
    name: string
    nameInEnglish: string
    company: string
    mobile: string
    activity: string
    generalManagerName: string
    salesManagerName: string
    email: string
    address: string
    clientJob_Id: number
    clientJobCategory_Id: number
  }
  