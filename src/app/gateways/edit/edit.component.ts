import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { Gateway } from '../../models/gateway';
import { GatewaysService } from '../../services/gateways.service';
import { FlashMessageService } from '../../services/flash-messages.service';
import { Device } from '../../models/device';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  gateway: Gateway;
  isEditing: boolean = false;
  gatewayForm: FormGroup;
  isUniqueSerial: boolean = true;
  currentIndex: number;
  currentDevice: Device|null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gatewaysService: GatewaysService,
    private loadingService: LoadingService,
    private flashMessageService: FlashMessageService
  ) { }

  ngOnInit(): void {
    // show loading
    this.loadingService.show();
    // init from route params
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isEditing = id ? true : false;
      if (id) {
        this.gatewaysService.getGateway(id).then((item) => {
          if (item.id) {
            this.gateway = item;
            if (!this.gateway.devices) {
              this.gateway.devices = [];
            }
          }
          this.initForm();
        }).finally(() => {
          // hide loading
          this.loadingService.hide();
        });
      } else {
        this.initForm();
        // hide loading
        this.loadingService.hide();
      }
    });
  }

  initForm() {
    // add form
    if (!this.gateway) {
      this.gateway = {
        serial_number: '',
        name: '',
        ip: '',
        devices: []
      };
    }
    // init form validator
    this.gatewayForm = new FormGroup({
      serial_number: new FormControl(this.gateway.serial_number, [
        Validators.required,
        Validators.minLength(3)
      ]),
      name: new FormControl(this.gateway.name, [
        Validators.required,
        Validators.minLength(5)
      ]),
      ip: new FormControl(this.gateway.ip, [
        Validators.required,
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ]),
    });
  }

  save(): void {
    // show loading
    this.loadingService.show();
    // edit action
    if (this.gateway.id) {
      this.gatewaysService.updateGateway(this.gateway).then((result) => {
        this.flashMessageService.addMessage({
          text: result ? 'Gateway updated': 'An error has occurred',
          className: result ? 'warning': 'danger',
        });  
      }).finally(() => {
        // hide loading
        this.loadingService.hide();
        this.back();
      });
    } else { // add action
      this.gatewaysService.addGateway(this.gateway).then((result) => {
        this.flashMessageService.addMessage({
          text: result ? 'Gateway added': 'An error has occurred',
          className: result ? 'warning': 'danger',
        });
      }).finally(() => {
        // hide loading
        this.loadingService.hide();
        this.back();
      });
    }
  }

  delete() {
    // show loading
    this.loadingService.show();
    this.gatewaysService.deleteGateway(this.gateway.id).then((result) => {
      this.flashMessageService.addMessage({
        text: result ? 'Gateway removed': 'An error has occurred',
        className: result ? 'warning': 'danger',
      });
    }).finally(() => {
      // hide loading
      this.loadingService.hide();
      this.back();
    });
  }

  back(): void {
    this.router.navigate(['gateways']);
  }

  addDevice(): void {
    this.currentDevice = {
      uid: '',
      vendor: '',
      status: 'Online'
    };
  }

  saveDevice(device: Device): void {
    if (this.gateway.devices) {
      if (!device.created_date) {
        device.created_date = this.getCurrentDate();
        this.gateway.devices.push(device);
      } else {
        this.gateway.devices[this.currentIndex] = device;
      }
      this.showDeviceAdvice();
    }
    this.closeDeviceForm();
  }

  editDevice(index: number): void {
    if (this.gateway.devices) {
      this.currentIndex = index;
      this.currentDevice = this.gateway.devices[index];
    }
  }

  removeDevice(index: number): void {
    this.gateway.devices?.splice(index, 1);
    this.showDeviceAdvice();
  }

  closeDeviceForm(): void {
    this.currentDevice = null;
  }

  showDeviceAdvice(): void {
    if (!this.isEditing) {
      this.flashMessageService.addMessage({
        text: 'You must save the gateway to save the changes associated with the devices',
        className: 'warning',
      });
    } else {
      // silent saved
      this.gatewaysService.updateGateway(this.gateway);
    }
    
  }

  getCurrentDate(): string {
    let date = new Date();
    return date.getFullYear() 
      + '-' + (date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
      + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
      + ' ' + (date.getHours() > 9 ? date.getHours() : '0' + date.getHours())
      + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
      + ':' + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
  }

  isUnique() {
    if (this.gateway.serial_number) {
      this.gatewaysService.isUnique(this.gateway.serial_number)
        .then((isUniqueSerial) => 
          this.isUniqueSerial = isUniqueSerial
        );
    }
  }
}
