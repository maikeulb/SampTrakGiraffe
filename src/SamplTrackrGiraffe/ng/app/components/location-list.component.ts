import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, User, Site, LocationsDespatchLocation, SiteLocationsDespatchLocation } from '../types';
import { LocationService } from '../services/location.service';
import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  //selector : 'users',
  templateUrl: '../../Templates/site-locations-list.component.html'
})

export class LocationListComponent implements OnInit {
  sites: SiteLocationsDespatchLocation[];
  selectedLocation: LocationsDespatchLocation;
  constructor(
    private router: Router,
    private locationService: LocationService
  ) { }

  onSelect(location: LocationsDespatchLocation): void {
    console.log(location);
    this.selectedLocation = location;
  }

  toggleEditable(loc: LocationsDespatchLocation): void {
    loc.editable = !loc.editable;
  }

  accordionClick() {
    //this.selectedLocation = null;
  }

  //save(loc: LocationsDespatchLocation): void {
  save(loc: any): void { // TK: fix the service
    loc.editable = false;
    this.locationService.upsertLocation(loc)
      .subscribe(uid => console.log(uid), err => console.log(err));
  }

  containers(loc: LocationsDespatchLocation): void {
    //alert(loc.LocationId);
    this.router.navigate(['/containers', loc.LocationId]);
  }

  getLocations(): void {
    this.locationService.getLocationsWithDespatchLocations()
      .subscribe(
        sites => {
          sites.forEach(s => 
            s.LocationsDespatchLocations.forEach(l => l.editable = false)
          )
          //this.sites = _.sortBy(sites, (n => n)); //WTF ?
          this.sites = sites;
        }, //Bind to view
        err => console.log(err));
  }

  ngOnInit(): void {
    this.getLocations();
  }
}
