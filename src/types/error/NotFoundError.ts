export class NotFoundError extends Error {
  private _statusCode: number;
  constructor(message: string = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this._statusCode = 404;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  set statusCode(value: number) {
    this._statusCode = value;
  }
}
