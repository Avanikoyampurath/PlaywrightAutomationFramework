import { setWorldConstructor } from "@cucumber/cucumber";
import { GraphQLClient } from "../../base/GraphqlClient";
import { request, APIRequestContext } from "@playwright/test";

export class CustomWorld {
  gqlClient!: GraphQLClient;
  defaultPayload: any;
  customData: any;
  payload: any;
  response: any;
  worldData: any;
  
  apiContext!: APIRequestContext;

  constructor() {
  }

  async init() {
    this.apiContext = await request.newContext({
      ignoreHTTPSErrors: true 
    });
     this.gqlClient = new GraphQLClient(this.apiContext);
  }
}
setWorldConstructor(CustomWorld);