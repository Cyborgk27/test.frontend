import { Component, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients } from '../../../shared/services/clients';
import { Alert } from '../../../shared/services/ui/alert';
import { IClient } from '../../../shared/interfaces/data.interface';

@Component({
  selector: 'app-create-or-edit',
  standalone: false,
  templateUrl: './create-or-edit.html',
  styleUrl: './create-or-edit.css',
})
export class CreateOrEdit implements OnInit {
  private _fb = inject(FormBuilder);
  private _alert = inject(Alert);
  private _clientService = inject(Clients);

  public clientForm!: FormGroup;
  public isEdit: boolean = false;

  @Input() clientData: IClient | null = null;
  @Output() onClose = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: Event) {
    this.close();
  }

  ngOnInit() {
    this.initForm();

    if(this.clientData) {
      this.isEdit = true;
      this.clientForm.patchValue(this.clientData);
    }
  }

  private initForm() {
    this.clientForm = this._fb.group({
      id: [null],
      clientId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['Masculino'],
      age: [18, [Validators.min(18)]],
      status: [true]
    });
  }

  save() {
    if (this.clientForm.invalid) {
      this._alert.toast('Por favor, completa todos los campos requeridos', 'error');
      return;
    }

    const data = this.clientForm.value;

    const request = data.id
      ? this._clientService.update(data.id, data)
      : this._clientService.create(data);

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
