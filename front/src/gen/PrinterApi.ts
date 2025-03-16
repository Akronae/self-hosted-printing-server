/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  password: string;
  username: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginUserDto {
  password: string;
  username: string;
}

export interface PrintRequestDto {
  /** @format binary */
  file: File;
}

export interface UserPrintedDocuments {
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  eta: string;
  id: number;
  name: string;
  pages: number;
}

export interface UserResponse {
  /** @format date-time */
  createdAt: string;
  isAdmin: boolean;
  isVerified: boolean;
  printedDocuments: UserPrintedDocuments[];
  username: string;
}

export namespace Status {
  /**
   * No description
   * @name GetStatus
   * @request GET:/v1/status
   * @response `200` `void`
   */
  export namespace GetStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @name GetStatusV2
   * @request GET:/v2/status
   * @response `200` `string`
   */
  export namespace GetStatusV2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }
}

export namespace User {
  /**
   * No description
   * @name Create
   * @request POST:/v1/user/create
   * @response `201` `LoginResponse`
   */
  export namespace Create {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoginResponse;
  }

  /**
   * No description
   * @name Login
   * @request POST:/v1/user/login
   * @response `201` `LoginResponse`
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoginResponse;
  }

  /**
   * No description
   * @name GetMe
   * @request GET:/v1/user/me
   * @response `200` `UserResponse`
   */
  export namespace GetMe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponse;
  }

  /**
   * No description
   * @name GetUsers
   * @request GET:/v1/user/all
   * @response `200` `(UserResponse)[]`
   */
  export namespace GetUsers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponse[];
  }

  /**
   * No description
   * @name GetUser
   * @request GET:/v1/user/{username}
   * @response `200` `UserResponse`
   */
  export namespace GetUser {
    export type RequestParams = {
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserResponse;
  }

  /**
   * No description
   * @name AcceptUser
   * @request POST:/v1/user/{username}/accept
   * @response `201` `void`
   */
  export namespace AcceptUser {
    export type RequestParams = {
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @name DeclineUser
   * @request POST:/v1/user/{username}/decline
   * @response `201` `void`
   */
  export namespace DeclineUser {
    export type RequestParams = {
      username: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Print {
  /**
   * No description
   * @name Print
   * @request POST:/v1/print
   * @response `201` `void`
   */
  export namespace Print {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PrintRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Cats example
 * @version 1.0
 * @contact
 *
 * The cats API description
 */
export class PrinterApi<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  status = {
    /**
     * No description
     *
     * @name GetStatus
     * @request GET:/v1/status
     * @response `200` `void`
     */
    getStatus: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/status`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetStatusV2
     * @request GET:/v2/status
     * @response `200` `string`
     */
    getStatusV2: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/v2/status`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @name Create
     * @request POST:/v1/user/create
     * @response `201` `LoginResponse`
     */
    create: (data: CreateUserDto, params: RequestParams = {}) =>
      this.http.request<LoginResponse, any>({
        path: `/v1/user/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name Login
     * @request POST:/v1/user/login
     * @response `201` `LoginResponse`
     */
    login: (data: LoginUserDto, params: RequestParams = {}) =>
      this.http.request<LoginResponse, any>({
        path: `/v1/user/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetMe
     * @request GET:/v1/user/me
     * @response `200` `UserResponse`
     */
    getMe: (params: RequestParams = {}) =>
      this.http.request<UserResponse, any>({
        path: `/v1/user/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetUsers
     * @request GET:/v1/user/all
     * @response `200` `(UserResponse)[]`
     */
    getUsers: (params: RequestParams = {}) =>
      this.http.request<UserResponse[], any>({
        path: `/v1/user/all`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetUser
     * @request GET:/v1/user/{username}
     * @response `200` `UserResponse`
     */
    getUser: (username: string, params: RequestParams = {}) =>
      this.http.request<UserResponse, any>({
        path: `/v1/user/${username}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name AcceptUser
     * @request POST:/v1/user/{username}/accept
     * @response `201` `void`
     */
    acceptUser: (username: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/user/${username}/accept`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeclineUser
     * @request POST:/v1/user/{username}/decline
     * @response `201` `void`
     */
    declineUser: (username: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/user/${username}/decline`,
        method: "POST",
        ...params,
      }),
  };
  print = {
    /**
     * No description
     *
     * @name Print
     * @request POST:/v1/print
     * @response `201` `void`
     */
    print: (data: PrintRequestDto, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/print`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),
  };
}
