import { generateRandomString, max, min } from './utility';

describe('Utility tests', () => {
  describe('Max tests', () => {
    it('1 and 2', () => {
      expect(max(1, 2)).toBe(2);
    });

    it('1.3 and 3.3', () => {
      expect(max(1.3, 3.3)).toBe(3.3);
    });

    it('3 and 1', () => {
      expect(max(3, 1)).toBe(3);
    });

    it('5.6 and -3.3', () => {
      expect(max(5.6, -3.3)).toBe(5.6);
    });
  })

  describe('Max tests', () => {
    it('1 and 2', () => {
      expect(min(1, 2)).toBe(1);
    });

    it('1.3 and 3.3', () => {
      expect(min(1.3, 3.3)).toBe(1.3);
    });

    it('3 and 1', () => {
      expect(min(3, 1)).toBe(1);
    });

    it('5.6 and -3.3', () => {
      expect(min(5.6, -3.3)).toBe(-3.3);
    });
  })

  describe('generateRandomString tests', () => {
    it('length 5', () => {
      expect(generateRandomString(5)).toHaveLength(5);
    });

    it('length 80', () => {
      expect(generateRandomString(80)).toHaveLength(80);
    });

    it('length 0', () => {
      expect(generateRandomString(0)).toHaveLength(0);
    });

    it('length -3', () => {
      expect(generateRandomString(-3)).toHaveLength(0);
    });
  });
});
