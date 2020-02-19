import { Component, OnInit } from '@angular/core';
import { BoxAudit, SampleAudit } from '../types';
import { BoxService } from '../services/box.service';
import { SampleService } from '../services/sample.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TimelineElement } from './timeline-element';
import 'rxjs/add/operator/switchMap';
import  * as _  from 'underscore';
//import { TLSSocket } from 'tls';

@Component({
    moduleId: module.id,
    templateUrl: '../../Templates/box-audit.component.html',
    styleUrls: ['../../../node_modules/angular-vertical-timeline/dist/vertical-timeline.css']
})

export class BoxAuditComponent implements OnInit {
    boxAudits : BoxAudit []
    boxid : number
    content = "content"
    selectedBox : BoxAudit
    samples : SampleAudit[]
    timeline: TimelineElement[] //= [{ caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: '', content: this.content }];
    /*
    = [
        { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: '', content: this.content },
        { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
        { caption: '20 Mar', date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
        { caption: '20 May', date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
        { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
        { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
        { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
        { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
        { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
        { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
        { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
      ];
    */
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private boxService: BoxService,
        private sampleService : SampleService
    ){}
    
    onSelect(box : BoxAudit) : void {
        this.selectedBox = box;
        this.sampleService.getBoxSampleAuditsByTrackingID(box.TrackingAuditId)
            .subscribe(samples => this.samples = samples)
    }

    getBoxAudits(boxid : number) : void {
        this.boxService.getBoxAudits(boxid)
            .subscribe(
                boxauds => {
                    //boxauds.forEach(ba => ba.DateTime = new Date(ba.DateTime.toLocaleString()));
                    this.boxAudits = boxauds;
                    //this.timeline = boxauds.map((ba, i) =>
                    //    ({ caption: ba.Status, date: new Date(ba.DateTime.toLocaleString()), title: `${ba.LastLocation} - ${ba.Description}`, content: ba.Event })
                    //)
                },
                err => console.log(err)
            )
    }

    ngOnInit() : void {
         this.route.params
        .subscribe((params: Params) => {
                this.boxid = +params['id'];
                this.getBoxAudits(this.boxid);
            }
        ); 
    }
}
