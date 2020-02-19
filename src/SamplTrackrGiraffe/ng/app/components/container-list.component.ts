import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Container, ContainerType, Location } from '../types';
import { ContainerService } from '../services/container.service';
import { LocationService } from '../services/location.service';
import 'rxjs/add/operator/switchMap';
import  * as _  from 'underscore';

@Component({
    moduleId : module.id,
    //selector : 'users',
    templateUrl : '../../Templates/container-list.component.html'
    //template : '<h1>Containers</h1>'
})

export class ContainerListComponent implements OnInit {
    containers: _.Dictionary<Container[]>;
    containerTypes: ContainerType[];
    locations: Location[];
    arrayOfKeys: string[];
    selectedLocation : Location;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private containerService: ContainerService,
        private locationService: LocationService
    ){}

    onSelect(location : Location) : void {
        this.selectedLocation = location;
    }

    onItemDrop(e: any, ky:string) : void {
        // Get the dropped data here 
        let draggedContainer: Container = e.dragData;
        let previousLocation = draggedContainer.Location.Name;
        this.locationService.getLocationByName(ky)
            .subscribe(loc => {
                draggedContainer.Location = loc;
                this.containerService.saveContainer(draggedContainer)
                    .subscribe(id => {
                        this.containers[previousLocation] = _.without(this.containers[previousLocation], this.containers[previousLocation].find(cnt => cnt.ContainerId == id));
                        this.containers[ky] = this.containers[ky].concat(draggedContainer);
                    },
                    err => console.log(err));
            });
    }

    toggleEditable(cntnr: Container): void {
        cntnr.editable = !cntnr.editable;
    }

    save(cntnr: Container): void {
        cntnr.editable = false;
        this.containerService.saveContainer(cntnr)
            .subscribe(id => cntnr.ContainerId = id, err => console.log(err));
    }

    racks(container: Container): void {
        //alert(loc.LocationId);
        this.router.navigate(['/racks', container.ContainerId]);
    }

    create(loc: string): void {
        let _loc = _.find(this.locations, (l => l.Name == loc));
        let cntnr = {
            ContainerId: -1,
            ContainerType : '',
            Description : 'New',
            Location : _loc,
            editable: true
        }
        this.containers[loc].push(cntnr);
        console.log(loc);
    }

    getAllContainers(): void {
        //console.log('get all')
        this.containerService.getContainers()
                             .subscribe(
                                containers => {
                                    containers.forEach(c => c.editable = false);
                                    let grouped = _.groupBy(containers, (c => c.Location.Name));
                                    //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
                                    this.containers = grouped;
                                }, //Bind to view
                                err => console.log(err));
    }

    getContainersById(id: Number): void {
        //console.log('in by Id')
        this.containerService.getContainerByLocationId(id)
            .subscribe(
                containers => {
                    containers.forEach(c => c.editable = false);
                    let grouped = _.groupBy(containers, (c => c.Location.Name));
                    //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n)); // arrayOfKeys needs to be gen from locations, otherwise empty ones don't display.
                    this.containers = grouped;
                }, //Bind to view
                err => console.log(err));
    }


    getContainerTypes(): void {
        console.log('ctypes');
        this.containerService.getContainerTypes()
            .subscribe(
            containertypes => {
                this.containerTypes = containertypes;
            }, //Bind to view
            err => console.log(err));
    }

    getLocations(): void {
        console.log('locs');
        this.locationService.getLocations()
            .subscribe(
            sites => {
              var slocs = _.map(sites, (s => s.Locations));
              this.locations = _.flatten(slocs, false);
              this.arrayOfKeys = _.sortBy(_.map(this.locations, l => l.Name), (n => n));
              console.log(this.arrayOfKeys);
            }, //Bind to view
            err => console.log(err));
    }

    ngOnInit() : void {
        this.route.params
            .subscribe((params: Params) => {
                console.log(params['id'])
                this.getContainerTypes()
                this.getLocations()
                if (params['id'] == undefined) { this.getAllContainers() }
                else { this.getContainersById(+params['id']) }
            });
    }
}
