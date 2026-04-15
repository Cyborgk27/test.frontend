export interface IApiResponse<T> {
  code: number,
  data: T,
  message: string,
}

export interface IPerson {
  id: number,
  name: string,
  age: number,
  gender: string,
  identification: string,
  address: string,
  phone: string,
}

export interface IClient extends IPerson {
  clientId: string,
  password: string,
  status: boolean,
  isDeleted: boolean
}

export interface IAccount {
  id: number,
  accountNumber: string
  accountType: string,
  initialBalance: number,
  status: boolean,
  client: IClient,
  isDeleted: boolean
}

export interface IMovement {
  id: number,
  date: Date,
  movementType: string,
  value: number,
  balance: number,
  account: IAccount,
  iSDeleted: boolean,
}
