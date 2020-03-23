export enum MessageTypes {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error'
} 

export type Message = {
  messageType: MessageTypes;
  text: string;
};