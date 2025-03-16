import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserPrintedDocuments {
  id: number;
  pages: number;
  name: string;
  eta: Date;
  createdAt: Date;
}
export class UserResponse {
  username: string;
  isVerified: boolean;
  isAdmin: boolean;
  printedDocuments: UserPrintedDocuments[];
  createdAt: Date;
}

export class LoginResponse {
  token: string;
}
