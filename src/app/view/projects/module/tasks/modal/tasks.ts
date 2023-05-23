  export interface Tasks {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataTasks[]
    error: string
  }
  
  export interface DataTasks {
    id: number
    title: string
    description: string
    startDate: string
    endDate: string
    projectName: string
    priorityId: number
    priorityName: string
    isActive: boolean
    taskStage_Id: number
    atachments: Atachment[]
    assignedEmployeeData: AssignedEmployeeData[]
  }
  
  export interface Atachment {
    description: string
    file: string
  }

  export interface AssignedEmployeeData {
    id: number
    name: string
    imagePath: string
  }
  export interface ListOfTaskStages {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataListOfTaskStages[]
    error: string
  }
  
  export interface DataListOfTaskStages {
    id: number
    name: string
  }
  export interface ShowTask {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataShowTask
    error: string
  }
  
  export interface DataShowTask {
    id: number
    title: string
    description: string
    startDate: string
    endDate: string
    project_Id: number
    priority_Id: number
    taskStage_Id: number
    atachments: Atachment[]
    assignedEmployeeData: AssignedEmployeeData[]
  }
  
  export interface Comments {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataComments[]
    error: string
  }
  
  export interface DataComments {
    commentatorName:string
    dateTime:string
    id: number
    text: string
    commentatorImagePath: string
  }
  