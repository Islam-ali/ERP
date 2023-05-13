import { Pagination } from "app/core/modal/modal"

  export interface Classifications {
    message: string
    data: DataClassifications[]
    pagination: Pagination
    status: boolean
    code: number
  }
  
  export interface DataClassifications {
    id: number
    name: string
    image: string
    status: number
    tarfok_percentage: string
    factories:number
  }
  

  export interface ShowClassification {
    message: string
    data: DataShowClassification
    status: boolean
    code: number
  }
  
  export interface DataShowClassification {
    id: number
    name_en: string
    name_ar: string
    image: string
    status: number
    tarfok_percentage: number
  }
   