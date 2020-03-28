export enum MessageTypes {
  Success = 'Success',
  Error = 'Error'
} 

export type Message<T> = {
  messageType: MessageTypes;
  data: T;
}