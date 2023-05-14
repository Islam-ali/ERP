import { Pagination } from "app/core/modal/modal"

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
  
