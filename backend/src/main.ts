import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("BACKEND_PORT", 3001);
  const corsOrigin = configService.get<string>("CORS_ORIGIN", "http://localhost:3000");

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: corsOrigin.split(","),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(port);
}

bootstrap();

