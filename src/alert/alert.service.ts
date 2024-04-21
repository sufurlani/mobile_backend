import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/abstractions/abstract.service';
import { Alert } from './alert.entity';
import { AlertRepository } from './alert.repository';

@Injectable()
export class AlertService extends AbstractService<Alert> {
  constructor(private readonly repository: AlertRepository) {
    super();
  }

  getRepository() {
    return this.repository;
  }

  public async getById(id: number) {
    const result = await super.getById(id);
    if (result) return result;
    else return null;
  }

  public async getList() {
    return (await super.getList()).map((alert) => {
      return alert;
    });
  }

  public async getByName(name: string) {
    return await this.repository.findByName(name);
  }

  public async create(record: Alert) {
    const result = await super.create(record);
    if (result) return result;
    else return null;
  }

  public async update(id: number, record: Alert) {
    const result = await super.update(id, record);
    if (result) return result;
    else null;
  }
}
