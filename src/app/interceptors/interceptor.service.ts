// Importar operadores de RxJS para el manejo de observables
import { catchError, map } from 'rxjs/operators';

// Importar el decorador Injectable y otros módulos de Angular
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

// Importar observables y throwError de RxJS
import { Observable, throwError } from 'rxjs';

// Decorador Injectable para registrar el servicio en el módulo raíz
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  // Constructor del servicio
  constructor() {}

  // Método intercept para interceptar las solicitudes HTTP
  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // Crear un nuevo objeto HttpHeaders con un token de usuario
    const headers = new HttpHeaders({
      'token-usuario': 'ABC123564',
    });

    // Clonar la solicitud original y agregarle los nuevos encabezados
    const reqClone = req.clone({
      headers: headers,
    });

    // Enviar la solicitud clonada y manejar los errores utilizando pipe
    return next.handle(reqClone).pipe(
      catchError(this.manejarError) // Manejar errores utilizando la función manejarError
    );
  }

  // Función para manejar errores en las solicitudes HTTP
  manejarError(error: HttpErrorResponse) {
    console.log('error: ' + error);
    console.log('Sucedio un error', error);

    // Devolver un observable con un error personalizado
    return throwError('Error personalizado');
  }
}
