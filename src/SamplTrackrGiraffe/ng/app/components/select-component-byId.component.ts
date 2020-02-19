import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: '../../Templates/scan-barcode.component.html'
})

export class SelectComponentByIdComponent implements AfterViewInit, OnInit {
  @ViewChild('barcode') el: ElementRef;
  private Title: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  barCodeScanned(event: any) {
    if (event.target.value !== '') {
      let boxid = +event.target.value.toUpperCase().replace('BOX', '');
      let _path = this.route.snapshot.url[0].path;
      switch (_path) {
        case 'pack':
          this.router.navigate(['/packsamples', boxid]);
          break;
        case 'unpack':
          //let boxid = +event.target.value.toUpperCase().replace('BOX', '');
          this.router.navigate(['/unpacksamples', boxid]);
          break;
        case 'store':
          let rakid = +event.target.value.toUpperCase().replace('RACK', '');
          this.router.navigate(['/racksamples', rakid]);
          break;
        case 'findsample':
          let sampleno = event.target.value.toUpperCase();
          this.router.navigate(['/sampleaudit', sampleno]);
          break;
        case 'findbox':
          this.router.navigate(['/boxaudit', boxid]);
          break;
        default:
          console.log(_path);
          this.router.navigate(['/']);
      }
    }
  }

  ngOnInit(): void {
    let _path = this.route.snapshot.url[0].path;
    switch (_path) {
      case 'pack':
        this.Title = "Pack box";
        break;
      case 'unpack':
        this.Title = "Unpack box";
        break;
      case 'store':
        this.Title = "Store sample";
        break;
      case 'findsample':
        this.Title = "Find sample";
        break;
      case 'findbox':
        this.Title = "Find box";
        break;
      default:
        console.log(_path);
    }
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
