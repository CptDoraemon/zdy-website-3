import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';
import {AdminStrategy} from "./admin.strategy";

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, AdminStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [LocalStrategy, AdminStrategy]
})
export class AuthModule {}
