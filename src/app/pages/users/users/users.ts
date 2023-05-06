export interface Users {
    message: string
    data: Users[]
    pagination: Pagination
    status: boolean
    code: number
  }
  
  export interface Users {
    id: number
    name: string
    email: string
    mobile_number: string
    image: string
  }
  
  export interface Pagination {
    current_page: number
    last_page: number
    per_page: number
    total: number
    path: string
  }