import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { WrapResponseInterceptor } from './interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { LoggingMiddleware } from './middleware/logging.middleware';

/*守卫和过滤器都放入common.module中*/
@Module({
  imports: [ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: WrapResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer
    //   .apply(LoggingMiddleware)
    //   .exclude()
    //   .forRoutes({ path: 'coffees', method: RequestMethod.GET });
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
