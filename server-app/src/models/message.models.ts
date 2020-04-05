export enum MessageType {
  Success = 'Success',
  Error = 'Error'
} 

export type Response<T> = {
  messageType: MessageType;
  message: string;
  data: T | null;
}