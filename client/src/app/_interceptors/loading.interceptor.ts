import { delay, finalize } from 'rxjs';
import { BusyService } from './../_services/busy.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  busyService.busy();
  
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      busyService.idle()
    })
  );
};
