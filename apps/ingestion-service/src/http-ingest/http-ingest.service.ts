import {  Injectable } from '@nestjs/common';


@Injectable()
export class HttpIngestService {
  constructor() {}

  async processIdentityEvent(data: unknown): Promise<any> {

  console.log("//parsing event : " , data);

  }

  async processAuthEvents(data : unknown) : Promise<any>{
    console.log("Processing Auth Event : " , data)
  }

  async processBilingEvents(data : unknown) : Promise<any>{
    console.log("Processing Biling Event : " , data)
  }
}