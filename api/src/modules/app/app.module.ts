import { env } from '@/src/utils/env/load-env';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrintModule } from '../print';
import { PrismaModule, PrismaService } from '../prisma';
import { UserModule, UserService } from '../user';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.development.local'],
    }),
    UserModule,
    PrismaModule,
    PrintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly db: PrismaService,
    private readonly user: UserService,
  ) {}

  async onModuleInit() {
    const admin = await this.db.user.findUnique({
      where: { username: env.ADMIN_USER },
    });
    if (!admin) {
      this.logger.log('creating admin account');
      await this.user.createUser({
        username: env.ADMIN_USER,
        password: env.ADMIN_PWD,
        isAdmin: true,
      });
    }
  }
}
