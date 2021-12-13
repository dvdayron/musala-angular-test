import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Device } from '../../../models/device';

@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html'
})
export class DeviceEditComponent implements OnInit {

  @Input() device: Device|null;
  @Output() onSave: EventEmitter<Device> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  deviceForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    if (this.device) {
      // init form validator
      this.deviceForm = new FormGroup({
        uid: new FormControl(this.device.uid, [Validators.required]),
        vendor: new FormControl(this.device.vendor, [Validators.required]),
        status: new FormControl(this.device.status, [Validators.required]),
      });
    }
  }

  save() {
    this.onSave.emit(this.device as Device);
  }

  cancel() {
    this.onCancel.emit();
  }

}
