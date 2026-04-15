import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients } from '../../../shared/services/clients';
import { Accounts } from '../../../shared/services/accounts';
import { Alert } from '../../../shared/services/ui/alert';
import { IAccount, IClient } from '../../../shared/interfaces/data.interface';

@Component({
  selector: 'app-create-or-edit-account',
  standalone: false,
  templateUrl: './create-or-edit.html',
  styleUrl: './create-or-edit.css',
})
export class CreateOrEditAccount implements OnInit {
  private _fb = inject(FormBuilder);
  private _accountService = inject(Accounts);
  private _clientService = inject(Clients);
  private _alert = inject(Alert);
  private _cdr = inject(ChangeDetectorRef);

  public accountForm!: FormGroup;
  public isEdit = false;
  public clients: IClient[] = [];
  @Input() accountData: IAccount | null = null;

  @Output() onClose = new EventEmitter<void>();

  ngOnInit() {
    this.initForm();
    this.loadClients();

    if(this.accountData) {
      this.isEdit = true;
      this.accountForm.patchValue({
        id: this.accountData.id,
        accountNumber: this.accountData.accountNumber,
        accountType: this.accountData.accountType,
        initialBalance: this.accountData.initialBalance,
        status: this.accountData.status,
        clientId: this.accountData.client.id
      });
    }
  }

  private initForm() {
    this.accountForm = this._fb.group({
      id: [null],
      accountNumber: ['', [Validators.required, Validators.minLength(6)]],
      accountType: ['Ahorros', [Validators.required]],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      status: [true],
      clientId: [null, [Validators.required]]
    });
  }

  private loadClients() {
    this._clientService.getAll().subscribe({
      next: (res) => {
        this.clients = res.data ?? [];
        this._cdr.detectChanges();
      },
      error: (err) => this._alert.showResponse(err.error)
    });
  }

  save() {
    if (this.accountForm.invalid) return;

    const request = this.isEdit
      ? this._accountService.update(this.accountForm.value.id, this.accountForm.value)
      : this._accountService.create(this.accountForm.value);

    request.subscribe({
      next: (res) => {
        this._alert.showResponse(res);
        this.close();
      },
      error: (err) => this._alert.showResponse(err.error)
    });
  }

  close() {
    this.onClose.emit();
  }
}
