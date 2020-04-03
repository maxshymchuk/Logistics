export enum MessageTypes {
  Success = 'Success',
  Error = 'Error'
} 

export type Response<T> = {
  messageType: MessageTypes;
  message: string;
  data: T | null;
}