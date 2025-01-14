import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth-interceptor';

bootstrapApplication(AppComponent, {
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  provideProtractorTestingSupport(), provideRouter(routes), provideHttpClient(withFetch())],
}).catch((err) => console.error(err));
