import { deprecatedSum } from 'try-lib';

export function sumProxy(a: number, b: number): number {
  return deprecatedSum(a, b);
}
