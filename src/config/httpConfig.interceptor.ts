import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    loaderToShow: any;
    apiKey: String;
    constructor(
        public loadingController: LoadingController,
        private storage: Storage
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return from(this.storage.get("apiKey")).pipe(
            switchMap(token => {
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: token
                        }
                    });
                } else {
                    request = request.clone({
                        setHeaders: {
                            Authorization:
                                "secureKID jdelmwfwzulhyucbbivvdvgyigzmhbkj"
                        }
                    });
                }

                if (!request.headers.has("Content-Type")) {
                    request = request.clone({
                        setHeaders: {
                            "content-type": "application/json"
                        }
                    });
                }

                this.showLoader();

                return next.handle(request).pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            console.log("event--->>>", event);
                        }
                        this.hideLoader();
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        console.error(error);
                        this.hideLoader();
                        return throwError(error);
                    })
                );
            })
        );
    }

    showLoader() {
        this.loaderToShow = this.loadingController
            .create({
                message: "Loading"
            })
            .then(res => {
                res.present();

                res.onDidDismiss().then(dis => {
                    console.log("Loading dismissed!");
                });
            });
        this.hideLoader();
    }

    hideLoader() {
        this.loadingController.dismiss();
    }
}
