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

  export interface ShowService {
    message: string
    data: DataShowService
    status: boolean
    code: number
  }
  
  export interface DataShowService {
    id: number
    name_en: string
    name_ar: string
    icon: string
    status: number
  }
  