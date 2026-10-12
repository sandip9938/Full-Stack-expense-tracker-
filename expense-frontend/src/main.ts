import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Angular app ko root component aur global config ke saath browser mein start karta hai.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
