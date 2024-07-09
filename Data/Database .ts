// src/database.ts
import logger from './logger';

type Record = { id: number; [key: string]: any };

class Database {
  private records: Record[] = [];
  private idCounter: number = 1;

  create(record: Omit<Record, 'id'>): Record {
    try {
      const newRecord = { ...record, id: this.idCounter++ };
      this.records.push(newRecord);
      logger.info('Record created', { newRecord });
      return newRecord;
    } catch (error) {
      this.handleError(error, 'Failed to create record');
      throw new Error('Failed to create record');
    }
  }

  read(id: number): Record | undefined {
    try {
      const record = this.records.find(record => record.id === id);
      if (!record) {
        throw new Error(`Record with id ${id} not found`);
      }
      logger.info('Record read', { record });
      return record;
    } catch (error) {
      this.handleError(error, `Failed to read record with id ${id}`);
      return undefined;
    }
  }

  update(id: number, updatedRecord: Partial<Omit<Record, 'id'>>): Record | undefined {
    try {
      const index = this.records.findIndex(record => record.id === id);
      if (index === -1) {
        throw new Error(`Record with id ${id} not found`);
      }
      this.records[index] = { ...this.records[index], ...updatedRecord };
      logger.info('Record updated', { updatedRecord: this.records[index] });
      return this.records[index];
    } catch (error) {
      this.handleError(error, `Failed to update record with id ${id}`);
      return undefined;
    }
  }

  delete(id: number): boolean {
    try {
      const index = this.records.findIndex(record => record.id === id);
      if (index === -1) {
        throw new Error(`Record with id ${id} not found`);
      }
      this.records.splice(index, 1);
      logger.info('Record deleted', { id });
      return true;
    } catch (error) {
      this.handleError(error, `Failed to delete record with id ${id}`);
      return false;
    }
  }

  getAll(): Record[] {
    try {
      const records = this.records;
      logger.info('All records retrieved', { records });
      return records;
    } catch (error) {
      this.handleError(error, 'Failed to get all records');
      return [];
    }
  }

  private handleError(error: unknown, message: string): void {
    if (error instanceof Error) {
      logger.error(message, { error: error.message });
    } else {
      logger.error(message, { error: String(error) });
    }
  }
}

export default Database;
