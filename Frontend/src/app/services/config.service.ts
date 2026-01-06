import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Config } from './config';

@Injectable()
export class ConfigService {
  public cfg: Config = new Config();

  constructor() {
    // Közvetlenül environment.ts értékei
    this.cfg.backendUrl = environment.backendUrl;
  }

  load(): Promise<void> {
    // APP_INITIALIZER-hez kell, visszatér egy resolved Promise-szal
    return Promise.resolve();
  }
}
