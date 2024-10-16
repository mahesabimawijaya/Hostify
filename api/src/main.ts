import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(`  ➜  [API] Local:   http://localhost:${PORT}`);
  });
}
bootstrap();
