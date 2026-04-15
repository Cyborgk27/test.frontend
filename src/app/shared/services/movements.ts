import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IApiResponse, IMovement } from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class Movements {
  private _http = inject(HttpClient);
  private _url = `${environment.urlAddress}/movimientos`;

  /**
   * @PostMapping
   * Crea un nuevo movimiento (depósito o retiro)
   */
  create(request: IMovement) {
    return this._http.post<IApiResponse<IMovement>>(`${this._url}`, request);
  }

  /**
   * @GetMapping("/reportes")
   * Genera el reporte filtrado por cliente y rango de fechas
   * @param clientId ID o identificación del cliente
   * @param startDate Fecha inicial en formato YYYY-MM-DD
   * @param endDate Fecha final en formato YYYY-MM-DD
   */
  getReport(clientId: string, startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('clientId', clientId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this._http.get<IApiResponse<IMovement[]>>(`${this._url}/reportes`, { params });
  }
}
