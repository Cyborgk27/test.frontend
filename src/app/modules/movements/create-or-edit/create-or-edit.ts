import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movements } from '../../../shared/services/movements';
import { IAccount, IMovement } from '../../../shared/interfaces/data.interface';
import { Alert } from '../../../shared/services/ui/alert';

@Component({
  selector: 'app-create-or-edit',
  standalone: false,
  templateUrl: './create-or-edit.html',
})
export class CreateOrEdit implements OnInit {
  private _fb = inject(FormBuilder);
  private _movementService = inject(Movements);
  private _alert = inject(Alert);

  @Input() isOpen: boolean = false;
  @Input() accounts: IAccount[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSaved = new EventEmitter<void>();

  movementForm!: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.movementForm = this._fb.group({
      accountId: ['', [Validators.required]],
      movementType: ['Retiro', [Validators.required]],
      value: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  saveMovement() {
    if (this.movementForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { accountId, movementType, value } = this.movementForm.value;

    const newMovement: Partial<IMovement> = {
      movementType: movementType,
      value: movementType === 'Retiro' ? -Math.abs(value) : Math.abs(value),
      account: { id: accountId } as any,
      iSDeleted: false
    };

    this._movementService.create(newMovement as IMovement).subscribe({
      next: () => {
        this.loading = false;
        this.onSaved.emit();
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al procesar el movimiento';
        this.loading = false;
        this._alert.showResponse(err.error);
      }
    });
  }

  closeModal() {
    this.movementForm.reset({ movementType: 'Retiro' });
    this.errorMessage = '';
    this.onClose.emit();
  }
}
