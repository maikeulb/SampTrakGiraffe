import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { GlobalsService } from '../services/global.service';
import { Location } from '../types';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

//import { Observable } from 'rxjs/Rx';
//import { LocationService } from './location.service';
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { window } from 'rxjs/operator/window'; */


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: '../../Templates/app.component.html',
  // styleUrls : ['/Content/sidebar.css']
})
export class AppComponent implements OnInit {
  title = 'Home';
  isLocal: boolean;
  isAdmin: boolean;
  //location: Location;
  idleState = 'Not started.';
  timedOut = false;
  private contextUrl = 'api/context';

  constructor(
    private http: Http,
    private globalsService: GlobalsService,
    private idle: Idle,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(600);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(600);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
    });
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      //console.log(this.idleState);
      window.location.assign('/account/logoff');
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown: number) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      if (countdown <= 10) {
        this.toastr.warning(this.idleState, "**********")
      }
    });
    this.reset();
  }


  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    console.log(this.idleState);
    this.timedOut = false;
  }

  toggleContext(): void {
    console.log(this.isLocal);
    this.globalsService.IsLocal = this.isLocal;
    this.isAdmin = this.globalsService.Context.Admin;
    //location.reload();
    //this.globalsService.toggleContext(this.isLocal);
  }

  ngOnInit(): void {
    this.globalsService.getContext().subscribe(b => {
      this.isAdmin = this.globalsService.Context.Admin;
      //console.log('location', this.globalsService.Context.Location);
      console.log('global ctxt', this.globalsService.Context);
    });
  }
}
