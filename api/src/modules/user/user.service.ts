import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2, randomBytes, timingSafeEqual } from 'crypto';
import { PrismaService } from '../prisma';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async createUser({
    username,
    password,
    isAdmin,
  }: CreateUserDto & { isAdmin?: boolean }) {
    const { password: hashedPassword, salt } = await this.passcrypt(password);
    await this.db.user.create({
      data: {
        username,
        password: hashedPassword,
        salt,
        isAdmin: isAdmin ?? false,
        isVerified: isAdmin ?? false,
      },
    });
    return this.login({ username, password });
  }

  async login({ username, password }: LoginUserDto) {
    const user = await this.db.user.findUnique({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await this.passverify(password, user.salt, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      token: await this.jwt.signAsync({
        sub: user.id,
        username: user.username,
      }),
    };
  }

  async getUser(username: string) {
    return await this.db.user.findUnique({
      where: { username },
      include: { printedDocuments: true },
    });
  }

  async getUsers() {
    return await this.db.user.findMany({
      include: { printedDocuments: true },
    });
  }

  async acceptUser(username: string) {
    await this.db.user.update({
      where: { username },
      data: { isVerified: true },
    });
  }

  async declineUser(username: string) {
    await this.db.user.delete({ where: { username } });
  }

  private async passcrypt(password: string) {
    return new Promise<{ password: Buffer; salt: Buffer }>(
      (resolve, reject) => {
        const salt = randomBytes(128);
        return pbkdf2(password, salt, 10000, 512, 'sha512', (err, password) => {
          if (err) {
            reject(err);
          } else {
            resolve({ password, salt });
          }
        });
      },
    );
  }

  private async passverify(
    password: string,
    salt: Uint8Array,
    hash: Uint8Array,
  ) {
    return new Promise<boolean>((resolve, reject) => {
      return pbkdf2(password, salt, 10000, 512, 'sha512', (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(timingSafeEqual(res, hash));
        }
      });
    });
  }
}
