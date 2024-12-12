import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [AuthModule,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
