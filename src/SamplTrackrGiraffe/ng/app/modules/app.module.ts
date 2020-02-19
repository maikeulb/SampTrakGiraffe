import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { NgIdleModule } from '@ng-idle/core';

import { AppComponent } from '../components/app.component';
import { UserListComponent } from '../components/user-list.component';
import { UserSiteListComponent } from '../components/user-sites-list.component';
import { LocationListComponent } from '../components/location-list.component';
import { ContainerListComponent } from '../components/container-list.component';
import { BoxListComponent } from '../components/box-list.component';
import { RackListComponent } from '../components/rack-list.component';
import { StoreSamplesComponent } from '../components/store-samples.component';
import { SampleListComponent } from '../components/samples-list.component';
import { SampleAuditComponent } from '../components/sample-audit.component';
import { PackBoxComponent } from '../components/pak-box-samples.component';
import { UnPackBoxComponent } from '../components/unpak-box-samples.component';
import { ModalComponent } from '../components/modal.component';
import { SelectComponentByIdComponent } from '../components/select-component-byId.component';
import { BoxesListComponent } from '../components/boxes-list.component';
import { BoxAuditComponent } from '../components/box-audit.component';
import { HorizontalTimelineComponent } from '../components/horizontal-timeline.component';
import { LocationDespatchSitesComponent } from '../components/loc-despatch-locs-list.component';

import { LoadingIndicatorComponent } from '../components/loading-indicator.component';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { LoadingIndicatorInterceptor } from '../LoadingIndicatorInterceptor';

import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
import { ContainerService } from '../services/container.service';
import { BoxService } from '../services/box.service';
import { RackService } from '../services/rack.service';
import { SampleService } from '../services/sample.service';
import { SoundService } from '../services/sounds.service';
import { GlobalsService } from '../services/global.service';

import { AppRoutingModule } from '../modules/app-routing.module';

//import { EscapePipe, TruncatePipe, ToShortDateTimePipe} from '../pipes.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        Ng2DragDropModule.forRoot(),
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        NgbModule.forRoot(),
        NgIdleModule.forRoot()
    ],

    declarations: [
        AppComponent,
        ModalComponent,
        UserListComponent,
        UserSiteListComponent,
        LocationListComponent,
        ContainerListComponent,
        BoxListComponent,
        RackListComponent,
        StoreSamplesComponent,
        SampleListComponent,
        SampleAuditComponent,
        BoxesListComponent,
        SelectComponentByIdComponent,
        PackBoxComponent,
        UnPackBoxComponent,
        BoxAuditComponent,
        HorizontalTimelineComponent,
        LocationDespatchSitesComponent
/*         EscapePipe, 
        TruncatePipe, 
        ToShortDateTimePipe */
    ],

    providers: [
        UserService,
        LocationService,
        ContainerService,
        BoxService,
        RackService,
        SampleService,
        SoundService,
        GlobalsService,
        LoadingIndicatorService
        //{
        //    provide: HTTP_INTERCEPTORS,
        //    useFactory: (service: LoadingIndicatorService) => new LoadingIndicatorInterceptor(service),
        //    multi: true,
        //    deps: [LoadingIndicatorService]
        //}
        //{ provide: ToastOptions, useClass: CustomOption }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
