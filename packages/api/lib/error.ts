import { AxiosError } from "axios";
import { CustomError } from "ts-custom-error";

export class ApiAxiosError extends CustomError {
  public constructor(exception: AxiosError) {
    super(`${exception.name} [${exception.code}] ${exception.message}`);
    Object.defineProperty(this, "name", { value: "ApiTimeoutError" });
  }
}
