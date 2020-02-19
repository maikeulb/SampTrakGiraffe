import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Box, BoxType, Location } from '../types';
import { BoxService } from '../services/box.service';
import { LocationService } from '../services/location.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as _ from 'underscore';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    //selector : 'users',
    templateUrl: '../../Templates/box-list.component.html'
    //template : '<h1>Boxs</h1>'
})

export class BoxListComponent implements OnInit {
    boxes: _.Dictionary<Box[]>;
    boxTypes: BoxType[];
    locations: Location[];
    arrayOfKeys: string[];
    selectedLocation: Location;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private boxService: BoxService,
        private locationService: LocationService
    ) { }

    onSelect(location: Location): void {
        this.selectedLocation = location;
    }

    onItemDrop(e: any, ky: string): void {
        // Get the dropped data here 
        let draggedBox: Box = e.dragData;
        let previousLocation = draggedBox.LastLocation.Name;
        this.locationService.getLocationByName(ky)
            .subscribe(loc => {
                draggedBox.LastLocation = loc;
                draggedBox.Event = 'Moved from ' + previousLocation + ' to ' + loc.Name;
                this.boxService.saveBox(draggedBox)
                    .subscribe(svrbox => {
                        this.boxes[previousLocation] = _.without(this.boxes[previousLocation], this.boxes[previousLocation].find(box => box.BoxId == svrbox.BoxId));
                        this.boxes[ky] = this.boxes[ky].concat(draggedBox);
                    },
                        err => console.log(err));
            });
    }

    toggleEditable(box: Box): void {
        box.editable = !box.editable;
    }

    printLabel(box: Box): void {
        this.boxService.printLabel(box.BoxId)
            .subscribe(box =>
                console.log(box)
            )
    }

    save(box: Box): void {
        box.editable = false;
        console.log(box, 'being saved');
        var loc = box.LastLocation.Name;
        this.boxService.saveBox(box)
            .subscribe(_box => {
                console.log(_box.BoxId);
                if (this.boxes[loc] != undefined) {
                    this.boxes[loc] = _.without(this.boxes[loc], box);
                    this.boxes[loc].push(_box);
                }
                else {
                    this.boxes[loc] = [_box];
                }
                console.log(box);
            }, err => console.log(err));
    }

    racks(box: Box): void {
        this.router.navigate(['/racks', box.BoxId]);
    }

    create(loc: string): void {
        let _loc = _.find(this.locations, (l => l.Name == loc));
        let box = {
            BoxId: -1,
            BoxType: '',
            Description: 'New',
            LastLocation: _loc,
            Destination: _loc,
            LastMoved: new Date(),
            User: '',
            Status: 'Unpacked',
            Event: 'Created',
            TrackingAuditId: '',
            editable: true
        }
        if (this.boxes[loc] != undefined) {
            this.boxes[loc].push(box);
        }
        else {
            this.boxes[loc] = [box];
        }
    }

    contents(box: Box): void {
        this.router.navigate(['/packsamples', box.BoxId]);
    }

    audit(box: Box): void {
        this.router.navigate(['/boxaudit', box.BoxId]);
    }

    getXHRDataAll() :void {
        Observable.forkJoin(
          this.boxService.getBoxTypes(),
          this.locationService.getLocations(),
          this.boxService.getBoxs()
        )
        .subscribe( res => {
          this.boxTypes = res[0];
          var slocs = _.map(res[1], (s => s.Locations));
          this.locations = _.flatten(slocs, false);
          this.arrayOfKeys = _.sortBy(_.map(this.locations, l => l.Name), (n => n));
          res[2].forEach(b => b.editable = false);
          let grouped = _.groupBy(res[2], (b => b.LastLocation.Name));
          this.boxes = grouped;
        }
    )}

    getAllBoxs(): void {
        this.boxService.getBoxs()
            .subscribe(
                boxs => {
                    boxs.forEach(b => b.editable = false);
                    let grouped = _.groupBy(boxs, (b => b.LastLocation.Name));
                    //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
                    this.boxes = grouped;
                }, //Bind to view
                err => console.log(err));
    }

    getBoxsById(id: Number): void {
        this.boxService.getBoxByLocationId(id)
            .subscribe(
                boxs => {
                    boxs.forEach(b => b.editable = false);
                    let grouped = _.groupBy(boxs, (b => b.LastLocation.Name));
                    //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
                    this.boxes = grouped;
                }, //Bind to view
                err => console.log(err));
    }

    getBoxTypes(): void {
        this.boxService.getBoxTypes()
            .subscribe(
                boxtypes => {
                    this.boxTypes = boxtypes;
                    console.log(this.boxTypes);
                }, //Bind to view
                err => console.log(err));
    }

    getLocations(): void {
        this.locationService.getLocations()
            .subscribe(
                sites => {
                    var slocs = _.map(sites, (s => s.Locations));
                    this.locations = _.flatten(slocs, false);
                    this.arrayOfKeys = _.sortBy(_.map(this.locations, l => l.Name), (n => n));
                }, //Bind to view
                err => console.log(err));
    }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                if (params['id'] == undefined) { this.getXHRDataAll() }
                else {
                    this.getBoxTypes()
                    this.getBoxsById(+params['id'])
                    this.getLocations()
                }
            });
    }
}
