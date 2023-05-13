import { Pagination } from "../../../../app/core/modal/modal"

export interface Pending {
    message: string
    data: DataPending[]
    pagination: Pagination
    status: boolean
    code: number
  }
  
  export interface DataPending {
    id: number
    name: string
    email: string
    mobile_number: string
    image: string
    status: number
  }