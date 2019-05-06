import { Container } from 'inversify';
import getDecorators from "inversify-inject-decorators";

// import services
import { UserService, UserServiceImpl } from 'src/services/UserService';

export const container = new Container();

// bind services
container.bind<UserService>("userService").to(UserServiceImpl).inSingletonScope();

export const lazyInject = getDecorators(container).lazyInject;