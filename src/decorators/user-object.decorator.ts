import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserObj = createParamDecorator((_, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
});
