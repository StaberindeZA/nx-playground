import { isEven } from '@nx-play/is-even';

export function isOdd(x: number): boolean {
  return !isEven(x);
}
