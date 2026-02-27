import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { RobotMovementService } from './robot-movement.service';

const ALLOWED_DIRECTIONS = [0, 90, -90, 180, -180, 270, -270];

@Controller()
export class RobotMovementController {
  constructor(private service: RobotMovementService) {}

  @Get('get')
  getLatest() {
    return this.service.getLatest();
  }

  @Post('create')
  create(@Body() body: { x_position: number; y_position: number; direction: number }) {
    const { x_position, y_position, direction } = body;
    const x = Number(x_position);
    const y = Number(y_position);
    if (x < 0 || x > 4 || !Number.isInteger(x)) {
      throw new BadRequestException('x_position must be an integer from 0 to 4');
    }
    if (y < 0 || y > 4 || !Number.isInteger(y)) {
      throw new BadRequestException('y_position must be an integer from 0 to 4');
    }
    if (!ALLOWED_DIRECTIONS.includes(Number(direction))) {
      throw new BadRequestException(
        `direction must be one of: ${ALLOWED_DIRECTIONS.join(', ')}`,
      );
    }
    return this.service.create(x, y, direction);
  }
}
