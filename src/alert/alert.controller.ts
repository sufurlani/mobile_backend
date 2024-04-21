import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { Alert } from './alert.entity';
import { AlertService } from './alert.service';

@Controller('/alerts')
export class AlertController {
  constructor(private readonly service: AlertService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: Alert, isArray: true, description: 'Alert list.' })
  public async index() {
    return await this.service.getList();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: Alert, description: 'Get Alert by Id.' })
  public async get(@Param('id') id: string) {
    const result = await this.service.getById(Number(id));
    if (result) return result;
    else throw new HttpException('Alert not found!', HttpStatus.NOT_FOUND);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: Alert, description: 'Alert to be stored.' })
  @ApiCreatedResponse({ type: Alert, description: 'Saved alert.' })
  public async store(@Body() body: Alert) {
    const result = await this.service.create(body);
    if (result) return result;
    else
      throw new HttpException('Alert already exists!', HttpStatus.BAD_REQUEST);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: Alert, description: 'Alert to be changed.' })
  @ApiResponse({ type: Alert, description: 'Edited alert.' })
  public async update(@Param('id') id: string, @Body() body: Alert) {
    const result = await this.service.update(Number(id), body);
    if (result) return result;
    else throw new HttpException('Alert does not found!', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: Boolean, description: 'True if alert was deleted.' })
  public async remove(@Param('id') id: string) {
    const removed = await this.service.remove(Number(id));
    return !removed;
  }
}
