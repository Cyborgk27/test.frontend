import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Movements } from '../../../../shared/services/movements';
import { IMovement, IClient, IAccount } from '../../../../shared/interfaces/data.interface';
import { IColumn } from '../../../../shared/interfaces/column.interface';
import { Alert } from '../../../../shared/services/ui/alert';
import { Accounts } from '../../../../shared/services/accounts';

@Component({
  selector: 'app-list-movements',
  standalone: false,
  templateUrl: './list-movements.html',
})
export class ListMovements implements OnInit {
  private _movementService = inject(Movements);
  private _accountService = inject(Accounts);
  private _alert = inject(Alert);
  private _cdr = inject(ChangeDetectorRef);

  public isModalOpen: boolean = false;

  public movements: IMovement[] = [];
  public accounts: IAccount[] = [];

  // Filtros
  public selectedClientId: string = '';
  public startDate: string = '';
  public endDate: string = '';

  public columns: IColumn[] = [
  { key: 'date', label: 'Fecha', width: '12%', align: 'left' },
  { key: 'account.client.name', label: 'Cliente', width: '22%', align: 'left' },
  { key: 'account.accountNumber', label: 'N° Cuenta', width: '15%', align: 'center' },
  { key: 'movementType', label: 'Tipo', width: '12%', align: 'center' },
  { key: 'account.initialBalance', label: 'Saldo Inicial', width: '12%', align: 'right' },
  { key: 'value', label: 'Movimiento', width: '12%', align: 'right' },
  { key: 'balance', label: 'Saldo Disponible', width: '15%', align: 'right' }
];

  ngOnInit() {
    this.loadAccounts();
    const today = new Date().toISOString().split('T')[0];
    this.startDate = today;
    this.endDate = today;
  }

  loadAccounts() {
    this._accountService.getAll().subscribe({
      next: (res) =>
        {
          this.accounts = res.data ?? []
          this._cdr.detectChanges()
        },
      error: (err) => this._alert.showResponse(err.error)
    });
  }

  generateReport() {
    if (!this.selectedClientId || !this.startDate || !this.endDate) {
      this._alert.toast('Por favor, completa todos los filtros', 'warning');
      return;
    }

    this._movementService.getReport(this.selectedClientId, this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.movements = [...(res.data ?? [])];
        this._cdr.detectChanges();
        if (this.movements.length === 0) {
          this._alert.toast('No se encontraron movimientos', 'info');
        }
      },
      error: (err) => this._alert.showResponse(err.error)
    });
  }

  openCreateModal() {
    this.isModalOpen = true;
  }

  closeCreateModal() {
    this.isModalOpen = false;
  }

  onMovementSaved() {
    this._alert.toast('Movimiento registrado con éxito', 'success');
    if (this.selectedClientId && this.startDate && this.endDate) {
      this.generateReport();
    }
  }
}
