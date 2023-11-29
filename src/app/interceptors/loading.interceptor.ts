import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { LoadingService } from "../services/loading.service";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoadingService);
  loaderService.emitSignal(true);

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        loaderService.emitSignal(false);
      }, 3000);
    })
  );
};
