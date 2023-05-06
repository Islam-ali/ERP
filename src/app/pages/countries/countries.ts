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
