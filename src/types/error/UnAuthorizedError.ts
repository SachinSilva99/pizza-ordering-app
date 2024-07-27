export class UnAuthorizedError extends Error {
  private _statusCode: number;
  constructor(message: string = "Not Found") {
    super(message);
    this.name = "UnAuthorizedError";
    this._statusCode = 401;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  set statusCode(value: number) {
    this._statusCode = value;
  }
}
