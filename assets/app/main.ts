import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app.module";

//where application is started
platformBrowserDynamic().bootstrapModule(AppModule);
