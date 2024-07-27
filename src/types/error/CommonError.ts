export class CommonError extends Error {
  private _statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "CommonError";
    this._statusCode = 400;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  set statusCode(value: number) {
    this._statusCode = value;
  }
}
