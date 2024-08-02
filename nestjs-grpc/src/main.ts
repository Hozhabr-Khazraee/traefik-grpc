import { ServerCredentials } from '@grpc/grpc-js';
import { NestFactory } from '@nestjs/core';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './proto/nest.pb';
import { addReflection } from 'grpc-server-reflection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const grpcOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50600',
      package: protobufPackage,
      loader: { keepCase: true },
      protoPath: [join(__dirname, 'proto', 'nest.proto')],
      credentials: ServerCredentials.createInsecure(), // Changed to insecure for testing
    },
  };

  const grpcApp = app.connectMicroservice(grpcOptions);
  
  // Add gRPC reflection
  addReflection((grpcApp as any).server, 'proto/nest.proto');

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();