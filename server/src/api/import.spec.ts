import { Test, TestingModule } from '@nestjs/testing';
import { BAD_API_FLAG } from '../const';
import ApiFactory from './import';

describe('Api Import Tests', () => {
  let apis: ApiFactory;

  beforeEach (async () => {
    this.apis = ApiFactory.getInstance();
  });

  describe('Testing known apis', () => {
    it('Should pass 1', () => {
      expect(this.apis.getApi("test", "/test1/test2/get")).toBe('/api/vtest/success12');
    });

    it('Should pass 2', () => {
      expect(this.apis.getApi("test", "/test2/test1/post")).toBe('/api/vtest/success21');
    });
  });

  describe('Testing unknown (bad) apis', () => {
    it('Should fail 1', () => {
      expect(this.apis.getApi("bad_version", "/test1/test2/get")).toBe(BAD_API_FLAG);
    });

    it('Should fail 2', () => {
      expect(this.apis.getApi("test", "bad_api")).toBe(BAD_API_FLAG);
    });
  });
});
