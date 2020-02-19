import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { SampleAudit } from '../types';
import { SampleService } from '../services/sample.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/switchMap';
import  * as _  from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: '../../Templates/sample-audit.component.html'
})

export class SampleAuditComponent implements OnInit {
    sampleAudits : SampleAudit []
    sampleNo : string
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sampleService: SampleService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef ) {
            this.toastr.setRootViewContainerRef(vcr);
    }

    getSampleAudits(smpno: string): void {
        switch (smpno.length) {
            case 10:
                var sampno = smpno.substr(0, 9)
                this.sampleService.getSampleAudits(smpno)
                    .subscribe(
                        sampauds => this.sampleAudits = sampauds,
                        err => console.log(err)
                    )
                break;
            default :
                this.sampleService.getSampleAudits(smpno)
                    .subscribe(
                        sampauds => this.sampleAudits = sampauds,
                        err => console.log(err)
                )
                break;
        }
    }

    samples ( s: SampleAudit ) : void { //only valid for 'current' samples, not archived in audit.
        if (s.BoxId > 0){
            this.router.navigate(['/boxaudit', s.BoxId]); //SampleAudit type needs Box/Rack ids.
        }
        if (s.RackId > 0){
            this.router.navigate(['/racksamples', s.RackId]); //SampleAudit type needs Box/Rack ids.
        }
        //this.toastr.info('not found','?');
    }

    ngOnInit() : void {
        this.route.params
        .subscribe((params: Params) => {
                this.sampleNo = params['id'];
                this.getSampleAudits(this.sampleNo )
            }
        );
    }
}
