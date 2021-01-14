import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { AuthModule } from "./auth/auth.module";
import { TestModule } from "./test/test.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        UserModule,
        AuthModule,
        TestModule,
    ],
})
export class AppModule {}
