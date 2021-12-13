import { Device } from './device';

export class Gateway {
    constructor(
        public id?: string,
        public serial_number?: string,
        public name?: string,
        public ip?: string,
        public devices?: Device[],
    ) {}
}