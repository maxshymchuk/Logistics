import { Message, MessageTypes } from '../models/message.models';

export function successMsg<T>(data: T = null): Message<T> {
  return {
    messageType: MessageTypes.Success, data: data ?? null
  }
}

export function errorMsg<T>(data: T): Message<T> {
  return {
    messageType: MessageTypes.Error, data: data ?? null
  }
}