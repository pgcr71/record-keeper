import { InjectionToken } from '@angular/core';

export const AUTOID = new InjectionToken<string>('auto.id');

export class AutoID {
    id = 0;
    constructor() {
        this.id = 0
    }

    newID() {
        return this.id++;
    }
}

