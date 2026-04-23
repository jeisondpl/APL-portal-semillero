export interface HttpResponse<T> {
  error: boolean
  response?: T
  msg?: string
  code?: number
}

export class HttpResponseUtil {
  static ok<T>(data: T, code = 200): HttpResponse<T> {
    return {
      error: false,
      response: data,
      code,
    }
  }

  static error(msg: string, code = 500): HttpResponse<never> {
    return {
      error: true,
      msg,
      code,
    }
  }
}
