

export function generateRandomString(length: number) {
  let s = '';
  while (s.length < length) {
    s += Math.random().toString(36).replace(/[^a-z]+/g, '');
  }
  return s.substr(0, length);
}

export function min(a: number, b: number): number {
  return a < b ? a : b;
}

export function max(a: number, b: number): number {
  return a > b ? a : b;
}