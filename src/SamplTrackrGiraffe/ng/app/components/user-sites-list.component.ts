import { Component, Input } from '@angular/core';
import { User, Site, Location, LocationMembership } from '../types';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';

@Component({
    moduleId : module.id,
    selector : 'user-sites',
    templateUrl : '../../Templates/user-sites-list.component.html',
    styles : [ `
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

export class UserSiteListComponent {
    @Input() sites : Site[];
    @Input() user : User;
    constructor(
        private userService : UserService
    ){}
    onMemberShipChanged(location: LocationMembership) : void {
        //this.selectedLocation = location;
      if (location.IsMember) {
        this.user.Locations.push({ LocationId: location.LocationId, Name: location.Name, PrinterIp: "", LabelFormat: { FormatId: 0, Name: "" }, editable: false });
        }
        else {
            this.user.Locations = this.user.Locations.filter(l => l.LocationId !== location.LocationId);
        }
        //console.log(location);
        //console.log(this.user);
        this.userService.upsertUser(this.user)
                        .subscribe(
                            srcs => console.log(srcs),
                            err => console.log(err));
    }
}
