import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler } from "@angular/common/http";
import { LoadingIndicatorService } from "./services/loading-indicator.service";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/finally';

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {

  constructor(private loadingIndicatorService: LoadingIndicatorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution
    //console.log('intercept');
    this.loadingIndicatorService.onStarted(req);

    return next
      .handle(req)
      // emit onFinished event after request execution
      .finally(() => this.loadingIndicatorService.onFinished(req));
  }

}
