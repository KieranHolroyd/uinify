export type HTTPResponseOpts = {
  message?: string;
  status?: number;
  code?: number;
  data?: any;
};

export class HTTPResponse {
  message: string;
  status: number;
  code: number;
  data: any;

  constructor({ message, status, code, data }: HTTPResponseOpts) {
    this.message = message ?? "Undefined Response";
    this.status = status ?? 200;
    this.code = code ?? 200;
    this.data = data;
  }

  toJSON() {
    return new Response(
      JSON.stringify({
        message: this.message,
        data: this.data,
        code: this.code,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: this.status,
      }
    );
  }
}
