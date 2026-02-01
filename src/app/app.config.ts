import { ApplicationConfig, providePlatformInitializer } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    providePlatformInitializer(() => {
      console.log('Platform initialized');
    }),
    provideHttpClient()
  ]
};