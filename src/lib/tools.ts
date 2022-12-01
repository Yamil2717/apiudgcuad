import { Response as ExpressResponse } from "express";
import bcrypt from "bcryptjs";

class Response {
  success(res: ExpressResponse, data: any, statusCode = 200) {
    res.status(statusCode).send(data);
  }
  error(res: ExpressResponse, message: string, statusCode = 500) {
    res.status(statusCode).json({ error: statusCode, message });
  }
}

class encrypt {
  async encryptPassword(password: string) {
    let hashedPassword: string = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(password: string, dbPassword: string) {
    let same = await bcrypt.compare(password, dbPassword);
    return same;
  }
}

let Encrypt = new encrypt();

export { Response, Encrypt };
