export interface allRole {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataRole[]
    error: string
  }
  
  export interface DataRole {
    id: string
    name: string
  }
  