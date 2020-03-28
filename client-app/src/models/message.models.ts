export enum MessageTypes {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error'
} 

export type Message<T> = {
  messageType: MessageTypes;
  data: T;
};