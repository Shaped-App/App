import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/vtest/success12 (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/vtest/success12')
      .expect(200)
      .expect('Success!');
  });

  it('/api/v1.0/browse/question/ (GET)', () => {
    const body = {
      "qids": [
          "aGixGhyA1S5LZYyXXCcE",
          "7ahZDKrDfQEhDZO5Br9R"
      ]
    }
    const response = {
    "questions": [
        {
            "qid": "7ahZDKrDfQEhDZO5Br9R",
            "question": "How are you doing today?",
            "created": "2020-08-05T04:00:00.000Z",
            "userAnswered": false,
            "creator": "admin"
        },
        {
            "qid": "aGixGhyA1S5LZYyXXCcE",
            "question": "This is the test question",
            "created": "2020-08-06T04:00:00.000Z",
            "userAnswered": false,
            "creator": "admin"
        }
    ]
}
    return request(app.getHttpServer())
      .get('/api/v1.0/browse/question/')
      .send(body)
      .expect(200)
      .expect(response);
  });
  it('/api/v1.0/browse/answer/ (GET)', () => {
    const body = {
      "qid": "aGixGhyA1S5LZYyXXCcE",
      "aids": [
          "9GW3CScIcvl9ZEuwCxEb"
      ]
    }
    const response = {
      "answers": [
          {
          "qid": "aGixGhyA1S5LZYyXXCcE",
          "aid": "9GW3CScIcvl9ZEuwCxEb",
          "answer": "All of the birds died in 1986 due to Reagan killing them all and replacing them with spies that are now watching us. The birds work for the 𝓫𝓸𝓾𝓻𝓰𝓮𝓸𝓲𝓼𝓲𝓮.",
          "created": "2020-08-06T04:00:00.000Z",
          "creator": "users/FDr6IxDIO3GDkZMJ8hPy"
          }
      ]
    }
    return request(app.getHttpServer())
      .get('/api/v1.0/browse/answer/')
      .send(body)
      .expect(200)
      .expect(response);
  });
});
