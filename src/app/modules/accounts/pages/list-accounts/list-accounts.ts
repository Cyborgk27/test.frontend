import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Accounts } from '../../../../shared/services/accounts'; // Asumiendo que tienes este servicio
import { IAccount } from '../../../../shared/interfaces/data.interface';
import { IAction } from '../../../../shared/interfaces/action.interface';
import { IColumn } from '../../../../shared/interfaces/column.interface';
import { Alert } from '../../../../shared/services/ui/alert';

@Component({
  selector: 'app-list-accounts',
  standalone: false,
  templateUrl: './list-accounts.html',
  styleUrl: './list-accounts.css',
})
export class ListAccounts implements OnInit {
  private _accountService = inject(Accounts);
  private _alert = inject(Alert);
  private _cdr = inject(ChangeDetectorRef);

  public accounts: IAccount[] = [];
  public showModal = false;
  public selectedAccount: IAccount | null = null;

  public columns: IColumn[] = [
    { key: 'accountNumber', label: 'N° Cuenta', width: '20%', align: 'left' },
    { key: 'accountType', label: 'Tipo', width: '15%', align: 'center' },
    { key: 'initialBalance', label: 'Saldo Inicial', width: '15%', align: 'right' },
    { key: 'status', label: 'Estado', width: '10%', align: 'center' },
    { key: 'client.name', label: 'Cliente', width: '30%', align: 'left' },
    { key: 'actions', label: 'Acciones', width: '10%', align: 'center' }
  ];

  public actions: IAction<IAccount>[] = [
    {
      icon: 'edit',
      toolTip: 'Editar Cuenta',
      execute: (acc) => this.editAccount(acc)
    },
    {
      icon: 'delete',
      toolTip: 'Eliminar Cuenta',
      execute: (acc) => this.deleteAccount(acc)
    }
  ];

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this._accountService.getAll().subscribe({
      next: (res) => {
        this.accounts = [...(res.data ?? [])];
        this._cdr.detectChanges();
      },
      error: (err) => this._alert.showResponse(err.error)
    });
  }

  openCreate() {
    this.selectedAccount = null;
    this.showModal = true;
  }

  editAccount(account: IAccount) {
    this.selectedAccount = { ...account };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.loadAccounts();
  }

  async deleteAccount(account: IAccount) {
    const confirmed = await this._alert.confirm(
      `¿Eliminar la cuenta ${account.accountNumber}?`,
      'Esta acción no se puede deshacer'
    );

    if (confirmed) {
      this._accountService.delete(account.id!).subscribe({
        next: () => {
          this.loadAccounts();
          this._alert.toast('Cuenta eliminada', 'success');
        },
        error: (err) => this._alert.showResponse(err.error)
      });
    }
  }
}
