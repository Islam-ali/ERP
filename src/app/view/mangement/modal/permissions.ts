export interface Permissions {
    message: string
    isSuccess: boolean
    isActive: boolean
    data: DataPermissions
    error: string
  }
  
  export interface DataPermissions {
    roleId: string
    roleName: string
    listOfCheckBoxes: ListOfCheckBox[]
  }
  
  export interface ListOfCheckBox {
    displayValue: string
    isSelected: boolean
  }
  