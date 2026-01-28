import {  Injectable } from '@nestjs/common';


@Injectable()
export class HttpIngestService {
  constructor() {}

  async ProcessEvent(data: unknown): Promise<any> {

  console.log("//parsing event : " , data);

  }
}