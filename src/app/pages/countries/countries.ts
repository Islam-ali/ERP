export interface Countries {
    message: string
    data: DataCountries[]
    status: boolean
    code: number
}

export interface DataCountries {
    id: number
    name: string
    flag: string
    status: string
}
export interface ShowCountry {
    message: string
    data: DataShowCountry
    status: boolean
    code: number
  }
  
  export interface DataShowCountry {
    id: number
    name_en: string
    name_ar: string
    flag: string
    status: number
  }
