import { MessageType, Response } from '../models/message.models';

export function successResponse<T = null>(message: string, data: T = null): Response<T> {
  return {
    messageType: MessageType.Success, 
    message, data: data ?? null
  }
}

export function errorResponse<T = null>(message: string, data: T = null): Response<T> {
  return {
    messageType: MessageType.Error,
    message, data: data ?? null
  }
}