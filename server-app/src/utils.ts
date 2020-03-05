import CONSTS from './const';

export function moveDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * CONSTS.HOUR_MILLISEC);
}

export function rand(a: number, b: number) {
  return Math.round(Math.random() * (b - a) + a);
}
