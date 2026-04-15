import { ChangeDetectorRef, Component, HostListener, inject, OnInit } from '@angular/core';
import { Clients } from '../../../../shared/services/clients';
import { IClient } from '../../../../shared/interfaces/data.interface';
import { IAction } from '../../../../shared/interfaces/action.interface';
import { Alert } from '../../../../shared/services/ui/alert';
import { IColumn } from '../../../../shared/interfaces/column.interface';

@Component({
  selector: 'app-list-clients',
  standalone: false,
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.css',
})
export class ListClients implements OnInit {
  private _clientService = inject(Clients);
  private _alert = inject(Alert);
  private _cdr = inject(ChangeDetectorRef);

  public clients: IClient[] = [];

  public showModal: boolean = false;
  public selectedClient: IClient | null = null;

  public columns: IColumn[] = [
    { key: 'clientId', label: 'User ID', width: '10%', align: 'left' },
    { key: 'name', label: 'Nombre Completo', width: '25%', align: 'left' },
    { key: 'identification', label: 'Identificación', width: '15%', align: 'center' },
    { key: 'phone', label: 'Teléfono', width: '15%', align: 'left' },
    { key: 'address', label: 'Dirección', width: '20%', align: 'left' },
    { key: 'status', label: 'Estado', width: '10%', align: 'center' },
    { key: 'actions', label: 'Acciones', width: '5%', align: 'center' }
  ];

  actions: IAction<IClient>[] = [
    {
      icon: 'edit',
      toolTip: 'Editar Cliente',
      execute: (client) => this.editClient(client)
    },
    {
      icon: 'delete',
      toolTip: 'Eliminar Cliente',
      execute: (client) => this.deleteClient(client)
    }
  ];

  ngOnInit() {
    this.loadClients();
  }

  openCreate() {
    this.selectedClient = null;
    this.showModal = true;
  }

  editClient(client: IClient) {
    this.selectedClient = { ...client };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedClient = null;
    this.loadClients();
  }

  loadClients() {
    this._clientService.getAll().subscribe({
      next: (res) => {
        this.clients = [...(res.data ?? [])];
        this._cdr.detectChanges();
      },
      error: (err) => {
        this._alert.showResponse(err.error);
      }
    });
  }

  async deleteClient(client: IClient) {
    const confirmed = await this._alert.confirm(
      `¿Estás seguro de eliminar al cliente ${client.name}?`,
      'Confirmar eliminación'
    );

    if (confirmed) {
      this._clientService.delete(client.id!).subscribe({
        next: () => {
          this.loadClients();
          this._alert.toast('Cliente eliminado correctamente', 'success');
        },
        error: (err) => {
          this._alert.showResponse(err.error);
        }
      });
    }
  }
}
