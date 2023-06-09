export interface Clients {

  message: string
  isSuccess: boolean
  isActive: boolean
  data: DataClients
  error: string
}
export interface DataClients {
  data: DataDataClients[],
  totalRecords: number
}
export interface DataDataClients {
  id: number
  name: string
  company: string
  mobile: string
  activity: string
  generalManagerName: string
  salesManagerName: string
  email: string
  address: string
  clientJob_Id: number
  isActive: boolean
  clientCommunicationWay_Id: number
  communicationWayName: string
}

export interface ListOfClientJobs {
  message: string
  isSuccess: boolean
  isActive: boolean
  data: DataListOfClientJobs[]
  error: string
}

export interface DataListOfClientJobs {
  id: number
  name: string
}

export interface showClient {
  message: string
  isSuccess: boolean
  isActive: boolean
  data: DatashowClient
  error: string
}
export interface AllClientsComments {
  message: string
  isSuccess: boolean
  isActive: boolean
  data: DataShowClientsComments[]
  error: string
}
export interface DataShowClientsComments {
  id: 3
  text: string
  commentator_Id: number
  commentatorName: string
  commentatorImagePath: string
  insertDate: string
}
export interface DatashowClient {
  id: number
  name: string
  nameInEnglish: string
  company: string
  mobile: string
  activity: string
  generalManagerName: string
  salesManagerName: string
  email: string
  address: string
  clientJob_Id: number
  clientJobCategory_Id: number
  department_Id: number
  departmentName: string
  clientCommunicationWay_Id: number
  communicationWayName: string
  companyName: string
  region_Id: number
  state_Id: number
  addressInDetail: string
  imagePath: string
  clientType_Id: number
  communicationWayTime:string
  communicationWayDate:string
  atachments:any[]
  clientContactImportance_Id:number
  clientSource_Id:number
  clientStatus_Id:number
  clientAddresses: ClientAddress[];
  clientContactLists: ClientContactList[];
}

export interface ClientAddress {
  streetAddress1: string;
  streetAddress2: string;
  postalCode: string;
  region: number;
  state: number;
}

export interface ClientContactList {
  firstName: string;
  lastName: string;
  telephone: string;
  mobile: string;
  email: string;
}
