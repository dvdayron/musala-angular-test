import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { GatewaysService } from '../../services/gateways.service';
import { Gateway } from '../../models/gateway';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  gateways: Gateway[] = [];

  constructor(
    private loadingService: LoadingService,
    private gatewaysService: GatewaysService
  ) { }

  ngOnInit(): void {
    // show loading
    this.loadingService.show();
    // 
    this.gatewaysService.getGateways().subscribe((items) => {
      this.gateways = items;
      // hide loading
      this.loadingService.hide();
    })
  }
}
