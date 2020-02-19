import { Component, Input, ViewChild, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { Sample } from '../types';
import { SampleService } from '../services/sample.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector : 'sample-list',
    templateUrl: '../../Templates/samples-list.component.html'
})

export class SampleListComponent {
    private reverseSortedSamples : Sample[];
    private removalMessage : string = "";
    private contextSample: Sample;
    @ViewChild('sampleRemovedModal') sampleRemovedModal: any;
    @Input() parent: string;
    @Input() set samples(samples: Sample[]) {
        this.reverseSortedSamples = _.sortBy(samples, (s, i) => -i);
    }

    @Output() SamplesChangedEvt: EventEmitter<Sample> = new EventEmitter();

    constructor(
        private sampleService: SampleService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef) {
           this.toastr.setRootViewContainerRef(vcr);
    }

    missing(s: Sample): void {
        //set event to missing from this box.
        //remove from the box
        switch (this.parent) {
            case 'pack':
            case 'unpack':
                s.Event = "Not received in BOX" + s.BoxId + " @ " + (new Date).toShortDateTimeString();
                break;
            //case 'store':
            //    s.Event = "Removed from RACK" + s.RackId + " @ " + (new Date).toString();
            //    break;
            default:
                s.Event = "Missing @ " + (new Date).toShortDateTimeString();
                break;
        }
        this.sampleService.saveSample(s)
            .subscribe(
            id => {
                s.SampleId = id;
                    this.sampleService.destroySample(s).subscribe(id => {
                            this.reverseSortedSamples = _.without(this.reverseSortedSamples, s);
                            this.SamplesChangedEvt.emit(s);
                        }
                    )
            },
            err => this.toastr.error(err, 'Error')
        )
    }
    sampleRemoved(sampleRemovedModal : any) {
        console.log (sampleRemovedModal) ;
        
        let s = this.contextSample;
        switch (this.parent) {
            case 'pack':
                s.Event = `Removed from BOX ${s.BoxId} @ ${(new Date).toShortDateTimeString()} : ${this.removalMessage}`;
                break;
            case 'store':
                s.Event = `Removed from RACK ${s.RackId} @ ${(new Date).toShortDateTimeString()} : ${this.removalMessage}`;
                break;
            default:
                s.Event = `Removed ${(new Date).toShortDateTimeString()} : ${this.removalMessage}`;
                break;
        }
        
        this.sampleService.saveSample(s)
            .subscribe(
            id => {
                s.SampleId = id;
                    this.sampleService.destroySample(s).subscribe(id => {
                        this.reverseSortedSamples = _.without(this.reverseSortedSamples, s);
                        this.SamplesChangedEvt.emit(s);
                    }
                )
            },
            err => this.toastr.error(err, 'Error')
        )
        sampleRemovedModal.hide();
    }

    remove(s: Sample): void {
        this.sampleRemovedModal.show();
        this.contextSample = s;
    }
}
