export interface UserRole {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataUserRole
    error: string
  }
  
  export interface DataUserRole {
    totalRecords: number
    data: DataDataUserRole[]
  }
  
  export interface DataDataUserRole {
    id: string
    userName: string
    email: string
    roles: string[]
  }
  
  export interface ManageUserRoles {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataManageUserRoles
    error: string
  }
  
  export interface DataManageUserRoles {
    userId: string
    userName: string
    listOfCheckBoxes: ListOfCheckBox[]
  }
  
  export interface ListOfCheckBox {
    displayValue: string
    isSelected: boolean
  }
  