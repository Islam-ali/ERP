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
    priorityName: string
    isActive: boolean
    taskStage_Id: number
    files: string[]
    assignedEmployeeData: AssignedEmployeeData[]
  }
  
  export interface AssignedEmployeeData {
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
    files: string[]
    assignedEmployeeIds: number[]
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
  