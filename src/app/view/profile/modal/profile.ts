export interface Profile {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: ProfileData
    error: string
  }
  
  export interface ProfileData {
    code: string
    name: string
    email: string
    mobile: string
    nationalId: string
    hireDate: string
    address: string
    birthDate: string
    university: string
    graduateDate: string
    qualification: string
    regionName: string
    jobName: string
    imagePath: string
    coverPath: string
    files: any[]
  }
  