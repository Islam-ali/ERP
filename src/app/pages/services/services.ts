export interface Services {
    message: string
    data: DataServices[]
    status: boolean
    code: number
  }
  
  export interface DataServices {
    id: number
    name: string
    icon: string
    status: string
  }