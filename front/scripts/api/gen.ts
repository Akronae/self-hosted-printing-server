import path from "node:path";
import { camel } from "radash";
import { generateApi } from "swagger-typescript-api";
import { loadEnv } from "../../src/utils/load-env";

loadEnv();

generateApi({
  name: "PrinterApi.ts",
  output: path.resolve(process.cwd(), "./src/gen"),
  url: `${process.env.PUBLIC_API_URL}/api-json`,
  apiClassName: "PrinterApi",
  httpClientType: "fetch", // or "fetch"
  generateClient: true,
  generateRouteTypes: true,
  generateResponses: true,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: true,
  unwrapResponseData: false,
  singleHttpClient: true,
  cleanOutput: true,
  modular: false,
  moduleNameIndex: 1,
  generateUnionEnums: true,
  typePrefix: "",
  typeSuffix: "",
  enumKeyPrefix: "",
  enumKeySuffix: "",
  sortTypes: true,
  extractingOptions: {
    requestBodySuffix: ["Payload", "Body", "Input"],
    requestParamsSuffix: ["Params"],
    responseBodySuffix: ["Data", "Result", "Output"],
    responseErrorSuffix: [
      "Error",
      "Fail",
      "Fails",
      "ErrorData",
      "HttpError",
      "BadResponse",
    ],
  },
  hooks: {
    onFormatRouteName(routeInfo, templateRouteName) {
      return camel(templateRouteName.replace(/.+Controller/, ""));
    },
  },
});
