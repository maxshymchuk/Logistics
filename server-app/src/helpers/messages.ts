import { MessageTypes, Response } from '../models/message.models';

export function successResponse<T = null>(message: string, data: T = null): Response<T> {
  return {
    messageType: MessageTypes.Success, 
    message, data: data ?? null
  }
}

export function errorResponse<T = null>(message: string, data: T = null): Response<T> {
  return {
    messageType: MessageTypes.Error,
    message, data: data ?? null
  }
}