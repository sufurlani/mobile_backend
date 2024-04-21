import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstractions/abstract.repository';
import { Alert } from './alert.entity';

@Injectable()
export class AlertRepository extends AbstractRepository<Alert> {
  constructor() {
    super([
      {
        id: 1,
        name: 'Dipirona',
        quantity: '1 comprimido de manhã',
        datetime: '12/04/2024',
      } as Alert,
    ]);
  }

  public async findByName(name: string): Promise<Alert | null> {
    return new Promise((resolve) => {
      resolve(this.document.find((alert) => alert.name === name));
    });
  }

  public async create(record: Alert): Promise<Alert | null> {
    const alreadyExist = await this.findByName(record.name);

    return new Promise((resolve) => {
      if (alreadyExist) {
        resolve(null);
      } else {
        const last = this.document[this.document.length - 1];
        record.id = last.id + 1;
        this.document.push(record);
        resolve(record);
      }
    });
  }

  public async update(record: Alert): Promise<Alert | null> {
    const finded = await this.findByPk(record.id);

    return new Promise((resolve) => {
      if (finded) {
        finded.name = record.name;
        finded.quantity = record.quantity;
        finded.datetime = record.datetime;
      }
      resolve(finded);
    });
  }
}
