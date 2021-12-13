import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
  }

}
