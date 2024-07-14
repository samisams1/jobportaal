import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

export class RegisterUserAccountRequest {

  password: string;
}