export interface Employees {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataEmployees[]
    error: string
  }
  
  export interface DataEmployees {
    id: number
    code: string
    name: string
    mobile: string
    nationalId: string
    hireDate: string
    address: string
    birthDate: string
    university: string
    graduateDate: string
    qualification: string
    salary: number
    militaryStatus_Id: number
    maritalStatus_Id: number
    status_Id: number
    region_Id: number
    gender_Id: number
    job_Id: number
    superVisor_Id: number
    imagePath: string
    coverPath: string
    files: string[]
  }

  export interface ShowEmployees {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataShowEmployees
    error: string
  }
  
  export interface DataShowEmployees {
    id: number
    code: string
    name: string
    nameInEnglish: string
    mobile: string
    nationalId: string
    hireDate: string
    address: string
    birthDate: string
    university: string
    graduateDate: string
    qualification: string
    isDepartmentManager: boolean
    salary: number
    militaryStatus_Id: number
    maritalStatus_Id: number
    status_Id: number
    region_Id: number
    gender_Id: number
    job_Id: number
    superVisor_Id: number
    imagePath: string
    coverPath: string
    files: string[]
  }
  