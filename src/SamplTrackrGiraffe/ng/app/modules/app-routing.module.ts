import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { UserListComponent }          from '../components/user-list.component';
import { LocationListComponent } from '../components/location-list.component';
import { ContainerListComponent }     from '../components/container-list.component';
import { BoxListComponent } from '../components/box-list.component';
import { RackListComponent }        from '../components/rack-list.component';
import { StoreSamplesComponent } from '../components/store-samples.component';
import { PackBoxComponent } from '../components/pak-box-samples.component';
import { UnPackBoxComponent } from '../components/unpak-box-samples.component';
import { SelectComponentByIdComponent } from '../components/select-component-byId.component';
import { SampleAuditComponent } from '../components/sample-audit.component';
import { BoxAuditComponent } from '../components/box-audit.component';

const routes : Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full'},
    { path: 'users', component: UserListComponent },
    { path: 'locations', component: LocationListComponent },

    { path: 'containers', component: ContainerListComponent },
    { path: 'containers/:id', component: ContainerListComponent },

    { path: 'boxes', component: BoxListComponent },
    { path: 'boxes/:id', component: BoxListComponent },
    
    { path: 'racks', component: RackListComponent },
    { path: 'racks/:id', component: RackListComponent },
    
    { path: 'store', component: SelectComponentByIdComponent },
    { path: 'racksamples/:id', component: StoreSamplesComponent },

    { path: 'pack', component: SelectComponentByIdComponent },
    { path: 'packsamples/:id', component: PackBoxComponent },

    { path: 'unpack', component: SelectComponentByIdComponent },
    { path: 'unpacksamples/:id', component: UnPackBoxComponent },

    { path: 'findsample', component : SelectComponentByIdComponent },
    { path: 'sampleaudit/:id', component : SampleAuditComponent },

    { path: 'findbox', component : SelectComponentByIdComponent },
    { path: 'boxaudit/:id', component : BoxAuditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}