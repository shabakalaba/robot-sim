import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotMovementModule } from './robot-movement/robot-movement.module';

@Module({
  imports: [RobotMovementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
