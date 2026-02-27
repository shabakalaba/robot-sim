import { Module } from '@nestjs/common';
import { RobotMovementController } from './robot-movement.controller';
import { RobotMovementService } from './robot-movement.service';

@Module({
  controllers: [RobotMovementController],
  providers: [RobotMovementService],
})
export class RobotMovementModule {}
