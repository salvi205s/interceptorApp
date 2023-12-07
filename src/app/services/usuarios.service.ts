// Importar el decorador Injectable y otros módulos de Angular
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

// Importar operadores de RxJS para el manejo de observables
import { catchError, map } from 'rxjs/operators';

// Importar throwError de RxJS
import { throwError } from 'rxjs';

// Decorador Injectable para registrar el servicio en el módulo raíz
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  // Constructor del servicio con inyección de dependencias de HttpClient
  constructor(private http: HttpClient) {}

  // Método para obtener usuarios desde una API
  obtenerUsuarios() {
    // Definir la URL de la API
    const url = 'https://reqres.in/api/users';
    // URL incorrecta (comentada para evitar errores)
    // const url = 'hts://reqres.in/api/usuarios';

    // Crear parámetros de la solicitud HTTP con información de paginación y nombre
    let params = new HttpParams().append('page', '2');
    params = params.append('name', 'Fernando Herrera');

    // Realizar la solicitud HTTP GET a la URL con los parámetros
    return (
      this.http
        .get(url, {
          params: params,
        })
        // Utilizar el operador map para extraer los datos de la respuesta
        .pipe(map((resp) => Object(resp).data))
    );
  }
}
