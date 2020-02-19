import { Component, OnInit } from '@angular/core';
import { LoadingIndicatorService } from '../services/loading-indicator.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {
  loading: boolean = false;
  constructor(private loadingIndicatorService: LoadingIndicatorService) {
    loadingIndicatorService
      .onLoadingChanged
      .subscribe(isLoading => this.loading = isLoading);
  }

  ngOnInit() {
  }

}
