import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { IApiResponse } from '../../interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class Alert {
  private readonly darkTheme = {
    background: '#1e293b',
    color: '#f8fafc',
    confirmButtonColor: '#6366f1',
    cancelButtonColor: '#475569',
    heightAuto: false,
  };

  /**
   * Analiza la respuesta basada en 'code', 'message' y 'data'.
   */
  public showResponse<T>(res: IApiResponse<T>): void {
    if (!res) return;

    const isSuccess = res.code >= 200 && res.code < 300;

    if (isSuccess) {
      this.toast(res.message || 'Operación exitosa');
    } else {
      const errorMsg = res.message || 'Ocurrió un error inesperado';
      const statusTitle = `Error ${res.code}`;

      const catUrl = `https://http.cat/${res.code}`;

      this.error(errorMsg, statusTitle, catUrl);
    }
  }

  public success(message: string, title: string = '¡Éxito!'): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.darkTheme,
      icon: 'success',
      title,
      text: message,
    });
  }

  public error(message: string, title: string = 'Error', imageUrl?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.darkTheme,
      icon: imageUrl ? undefined : 'error',
      title,
      text: message,
      imageUrl: imageUrl,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: `Error ${title}`,
      confirmButtonColor: '#ef4444',
    });
  }

  public toast(message: string, icon: SweetAlertIcon = 'success'): void {
    const Toast = Swal.mixin({
      ...this.darkTheme,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({ icon, title: message });
  }

  public async confirm(message: string, title: string = '¿Estás seguro?'): Promise<boolean> {
    const result = await Swal.fire({
      ...this.darkTheme,
      icon: 'warning',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });
    return result.isConfirmed;
  }
}
