import { Pagination } from "app/core/modal/modal"

export interface Factory {
    message: string
    data: DataFactory[]
    pagination: Pagination
    status: boolean
    code: number
  }
  
  export interface DataFactory {
    id: number
    name: string
    email: string
    mobile_number: string
    image: string
    status: number
  }
  export interface FactoryProfile {
    message: string
    data: DataFactoryProfile
    status: boolean
    code: number
  }
  
  export interface DataFactoryProfile {
    id: number
    name: string
    email: string
    mobile_number: string
    country_code: string
    status: string
    image: string
    country: string
    lat: string
    lng: string
    commercial_register_image: string
    tax_card_front_image: string
    tax_card_back_image: string
  }