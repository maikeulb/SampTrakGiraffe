import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Container, Rack, ContainerRack } from '../types';
import { RackService } from '../services/rack.service';
import { GlobalsService } from '../services/global.service';
import 'rxjs/add/operator/switchMap';
import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  //selector : 'users',
  templateUrl: '../../Templates/rack-list.component.html'
  //template : '<h1>Containers</h1>'
})

export class RackListComponent implements OnInit {
  cracks: ContainerRack[];
  arrayOfKeys: string[];
  selectedContainerRack: ContainerRack;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rackService: RackService,
    private globalsService: GlobalsService,
  ) { }


  getAllRacks(): void {
    console.log('get all')
    this.rackService.getRacks()
      .subscribe(
        cracks => {
          cracks.forEach(cr => cr.Racks.forEach(r => r.editable = false));
          this.cracks = _.sortBy(cracks, (cr => cr.Container.Description));
        }, //Bind to view
        err => console.log(err));
  }

  getRacksById(id: number): void {
    console.log('in by Id')
    this.rackService.getRackByContainerId(id)
      .subscribe(
        cracks => {
          cracks.forEach(cr => cr.Racks.forEach(r => r.editable = false));
          this.cracks = _.sortBy(cracks, (cr => cr.Container.Description));
        }, //Bind to view
        err => console.log(err));
  }

  toggleEditable(rack: Rack): void {

    rack.editable = !rack.editable;
  }

  samples(rack: Rack): void {
    this.router.navigate(['/racksamples', rack.RackId]);
  }

  save(rack: Rack): void {
    rack.editable = false;
    this.rackService.saveRack(rack)
      .subscribe(
        id => {
          rack.RackId = id;
          console.log(rack);
        }
        , err => console.log(err));
  }

  create(crack: ContainerRack): void {
    let rack: Rack = { RackId: -1, Description: 'New Rack', Rows: 0, Cols: 0, ContainerId: crack.Container.ContainerId, Status: 'Empty', editable: true };
    crack.Racks.push(rack);
  }

  onItemDrop(e: any, cr: ContainerRack): void {
    // Get the dropped data here 
    let draggedRack: Rack = e.dragData;
    let prevContainerId = draggedRack.ContainerId;
    draggedRack.ContainerId = cr.Container.ContainerId;
    this.rackService.saveRack(draggedRack)
      .subscribe(r => {
        let oldCrack = this.cracks.find(cr => cr.Container.ContainerId === prevContainerId)
        oldCrack.Racks = _.without(oldCrack.Racks, draggedRack);
        let newCrack = this.cracks.find(svrcr => svrcr.Container.ContainerId === cr.Container.ContainerId)
        newCrack.Racks = newCrack.Racks.concat(draggedRack);
        console.log(newCrack);
      })
  }
  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.globalsService.getContext().subscribe(b => {
          this.isAdmin = this.globalsService.Context.Admin;
          if (params['id'] == undefined) { this.getAllRacks() }
          else { this.getRacksById(+params['id']) }
        });
      });
  }
}
