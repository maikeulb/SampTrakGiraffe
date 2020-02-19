import { Component, Input, Output, ViewContainerRef,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Box } from '../types';
import { BoxService } from '../services/box.service';
import { SoundService } from '../services/sounds.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector : 'box-list',
    templateUrl: '../../Templates/boxes-list.component.html'
})

export class BoxesListComponent {
    //private boxes : Box[]
    @Input() parent: string;
    @Input() boxes: Box[];
    @Output() BoxesChangedEvt: EventEmitter<Box> = new EventEmitter();
    
    constructor(
        private router : Router,
        private boxService: BoxService,
        private soundService: SoundService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef) {
           this.toastr.setRootViewContainerRef(vcr);
    }

    contents(b: Box): void {
        console.log(this.parent);
        switch (this.parent) {
            case 'pack':
                this.router.navigate(['/packsamples', b.BoxId]);
                break;
            case 'unpack' :
                this.router.navigate(['/unpacksamples', b.BoxId]);
                break;
            default:
                break;
        }
    }
    missing(b: Box): void {
        let perviousParent = b.ParentBoxId
        b.ParentBoxId = null;
        b.Event = "Missing from box id " + perviousParent.toString();
        this.boxService.saveBox(b)
            .subscribe(id => {
                this.boxes = _.without(this.boxes, b);
                this.soundService.beep('beep');
                this.toastr.success(b.Description + ' removed.', 'Success!');
                this.BoxesChangedEvt.emit(b);
            },
            err => {
                this.soundService.beep('bong');
                this.toastr.error(err, "Bad!");
            });
    }

    printLabel(box: Box): void {
        this.boxService.printLabel(box.BoxId)
            .subscribe(box => {
                this.toastr.success(box.Description + ' lable printed.', 'Success!');
            },
            err => {
                this.soundService.beep('bong');
                console.log(err);
                this.toastr.error(err, "Bad!");
            });
    }

    remove(b: Box): void {
        let perviousParent = b.ParentBoxId
        b.ParentBoxId = null;
        b.Event = "Removed from box id " + perviousParent.toString();
        this.boxService.saveBox(b)
            .subscribe(id => {
                this.boxes = _.without(this.boxes, b);
                this.toastr.success(b.Description + ' removed.', 'Success!');
                this.BoxesChangedEvt.emit(b);
            },
            err => {
                this.soundService.beep('bong');
                this.toastr.error(err, "Bad!");
            });
    }
}
