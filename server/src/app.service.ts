import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getTest(): string {
    return 'Success!';
  }
}

@Injectable()
export class AppService {
  getBrowseQuestionList(): string {
    return "TODO";
  }

  getBrowseQuestion(): string {
    return "TODO";
  }
}

