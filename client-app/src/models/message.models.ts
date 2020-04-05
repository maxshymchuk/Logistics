export enum MessageType {
  Success = 'Success',
  Error = 'Error'
} 

export type ServerResponse<T = null> = {
  messageType: MessageType;
  message: string;
  data: T | null;
};