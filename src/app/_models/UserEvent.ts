export interface UserEvent {
  _id?: string,
  startDate: any, // por algum motivo o tipo Date não realiza operações nem tem propriedades de Date
  endDate: any,
  description: string,
  creator?: string,
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}