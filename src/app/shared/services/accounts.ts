import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IAccount, IApiResponse } from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class Accounts {
  private _http = inject(HttpClient);
  private _url = `${environment.urlAddress}/cuentas`;

  getAll() {
    return this._http.get<IApiResponse<IAccount[]>>(`${this._url}`);
  }

  getById(id: number) {
    return this._http.get<IApiResponse<IAccount>>(`${this._url}/${id}`);
  }

  create(request: IAccount) {
    return this._http.post<IApiResponse<IAccount>>(`${this._url}`, request);
  }

  update(id: number, request: IAccount) {
    return this._http.put<IApiResponse<IAccount>>(`${this._url}/${id}`, request);
  }

  delete(id: number) {
    return this._http.delete<void>(`${this._url}/${id}`);
  }

  getByClientId(clientId: number) {
    return this._http.get<IApiResponse<IAccount[]>>(`${this._url}/cliente/${clientId}`);
  }
}
