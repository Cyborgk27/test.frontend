import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponse, IClient } from '../interfaces/data.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Clients {
private _http = inject(HttpClient);
  private _url = `${environment.urlAddress}/clientes`;

  getAll() {
    return this._http.get<IApiResponse<IClient[]>>(`${this._url}`);
  }

  getById(id: number) {
    return this._http.get<IApiResponse<IClient>>(`${this._url}/${id}`);
  }

  create(request: IClient) {
    return this._http.post<IApiResponse<IClient>>(`${this._url}`, request);
  }

  update(id: number, request: IClient) {
    return this._http.put<IApiResponse<IClient>>(`${this._url}/${id}`, request);
  }

  delete(id: number) {
    return this._http.delete<void>(`${this._url}/${id}`);
  }
}
