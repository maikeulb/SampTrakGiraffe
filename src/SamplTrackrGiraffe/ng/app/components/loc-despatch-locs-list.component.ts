//loc-despatch-locs-list.component.ts
import { Component, Input } from '@angular/core';
import { SiteLocationsDespatchLocation, LocationsDespatchLocation, LocationMembership } from '../types';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../services/location.service';
import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'location-despatch-sites',
  templateUrl: '../../Templates/location-despatch-sites.component.html',
  styles: [`
        td{font-family : monospace;}
        table { background-color: white;
                border-collapse: collapse;
                width:100%;
        }
        table, th, td {
            border: 1px solid black;
            padding : 5px;
        }`
  ]
})

export class LocationDespatchSitesComponent {
  @Input() sites: SiteLocationsDespatchLocation[];
  @Input() location: LocationsDespatchLocation;
  constructor(
    private locationService: LocationService
  ) { }

  onMemberShipChanged(location: LocationMembership): void {
    
    console.log(this.location);
    let despatchLocations = _.filter(
      _.flatten(this.location.DespatchLocations.map(s => s.LocationMembership.map(lm => lm.IsMember ? lm.LocationId : 0)), true), l => l > 0);
    console.log(despatchLocations);
    this.locationService.updateDespatchLocations(this.location.LocationId, despatchLocations)
      .subscribe(uid => console.log(uid), err => console.log(err));
  }
}
