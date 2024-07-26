import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export function validateRequest<T extends object>(
  type: new () => T
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const input = plainToInstance(type, req.body);
    validate(input).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const messages = errors
          .map((error: ValidationError) => Object.values(error.constraints!))
          .flat();
        res.status(400).json({ message: messages });
      } else {
        next();
      }
    });
  };
}
