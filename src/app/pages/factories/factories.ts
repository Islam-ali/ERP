
  export interface Factories {
    message: string
    data: DataFactories[]
    pagination: Pagination
    status: boolean
    code: number
  }
  
  export interface DataFactories {
    id: number
    name: string
    image: string
    status: number
    tarfok_percentage: string
  }
  
  export interface Pagination {
    current_page: number
    last_page: number
    per_page: number
    total: number
    path: string
  }
  
  export interface ShowFactory {
    message: string
    data: DataShowFactory
    status: boolean
    code: number
  }
  
  export interface DataShowFactory {
    id: number
    name_en: string
    name_ar: string
    image: string
    status: number
    tarfok_percentage: number
  }
  