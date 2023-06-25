import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() isOpen: boolean;
  @Input() setIsOpen: (open: boolean) => void;
  @Input() create: (city: string) => void;
  form: FormGroup;

  city: string;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get errorControl() {
    return this.form.controls;
  }

  submitForm() {
    if (this.form.valid) {
      this.create(this.form.value.name);
      this.form.reset();
    }
  }
}
