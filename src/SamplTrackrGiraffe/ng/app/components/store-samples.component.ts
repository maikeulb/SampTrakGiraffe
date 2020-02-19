import { Component, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Sample, Rack, Position } from '../types';
import { SampleService } from '../services/sample.service';
import { RackService } from '../services/rack.service';
import { SoundService } from '../services/sounds.service';
import { Observable } from 'rxjs/Rx'

import 'rxjs/add/operator/switchMap';
import * as _ from 'underscore';
//import * as $ from 'jquery';
import * as d3 from 'd3';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
//import { CustomOption } from './toastr-options';
//import { ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId : module.id,
    templateUrl: '../../Templates/store-samples.component.html'
})


export class StoreSamplesComponent implements OnInit {
    @ViewChild('labno') el: ElementRef;
    @ViewChild('emptyRackModal') emptyModal: any;
    samples: Sample[];
    rack: Rack;
    svg: d3.Selection<any>;
    y: d3.scale.Linear<any, any>;
    x: d3.scale.Linear<any, any>;
    height: number;
    width: number;
    totalWidth: number;
    postInProgress: boolean = false;
    currentPos: Position
    rackIsFull: boolean = false;
    sampleTypes: string[] = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
    margin = { top: 50, right: 50, bottom: 50, left: 50 };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sampleService: SampleService,
        private rackService: RackService,
        private soundService : SoundService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef ) {
            this.toastr.setRootViewContainerRef(vcr);
    }

    getSamplesByRackId(rakid: number): void {
        this.sampleService.getSamplesByRackId(rakid)
            .subscribe(
            samples => {
                this.samples = samples;
                this.currentPos = samples.length > 0 ? { Row: samples[samples.length - 1].Row, Col: samples[samples.length - 1].Col } : { Row: 1, Col: 0 };
                this.getRackById(rakid);
            },
            err => {
                console.log(err);
                this.soundService.beep('bong');
                this.router.navigate(['/store']);
            });
    }

    getRackById(rakid: number): void {
        this.rackService.getRackById(rakid)
            .subscribe(
            rack => {
                this.rack = rack;
                if (rack.Status === 'Full') {
                    this.emptyModal.show();
                }
                else {
                    this.updatePostion();
                }
                this.initRack();
            },
            err => {
                console.log(err);
                this.soundService.beep('bong');
                this.router.navigate(['/store']); //that rack dont exist, bruv
            });
    }

    labnoScanned(event: any) {
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.replace('-', '');
            let labno = '';
            let smptypID = 0;
            if (entry.length == 10) {
                labno = entry.substr(0, 9).toUpperCase();
                var suffix = entry.substr(9, 1);
                smptypID = isNaN(parseInt(suffix)) ? '9' : suffix;
            }
            if (entry.length <= 9) {
                labno = entry.toUpperCase();
            }
            if (entry.length > 10) {
                labno = entry.toUpperCase();
                smptypID = 9;
            }
            let sample = { SampleId: 0, SampleNo: labno, SampTypeSuffix: smptypID, Row: this.currentPos.Row, Col: this.currentPos.Col, RackId: this.rack.RackId, SampleType: this.sampleTypes[smptypID], DateTime: new Date(), Event: 'stored', TrackingAuditId : '' }

            this.sampleService.saveSample(sample)
                .subscribe(
                id => {
                    sample.SampleId = id;
                    this.samples = this.samples.concat(sample);
                    event.target.value = '';
                    this.postInProgress = false;
                    this.updatePostion();
                    this.drawRack();
                    this.soundService.beep('beep');
                    this.toastr.success(sample.SampleNo + ' stored!', 'Success!');
                },
                (err) => {
                    this.toastr.success(err, 'Success!'); //, { positionClass: 'toast-bottom-right' });
                    this.soundService.beep('bong');
                }
            )
        }
        else {
            this.soundService.beep('bong');
        }
    }

    updatePostion(): void {
        
        if (!(this.rack.Status === 'Full')) {
            this.currentPos.Col++;
            console.log(this.currentPos);
            if (this.rack.Status === 'Empty') {
                this.rack.Status = 'InUse';
                this.rackService.saveRack(this.rack)
                    .subscribe(id => null, err => console.log(err));
            }
            if (this.currentPos.Row >= this.rack.Rows && this.currentPos.Col > this.rack.Cols) {
                //if (this.currentPos.Row * this.currentPos.Col >= this.rack.Rows * this.rack.Cols) {
                    this.rackIsFull = true;
                    this.rack.Status = 'Full';
                    this.rackFull();
            }
            if (this.currentPos.Col > this.rack.Cols) {
                this.currentPos.Row++;
                this.currentPos.Col = 1;
            }
            //if (this.currentPos.Row > this.rack.Rows) {
            //    this.rackIsFull = true;
            //    this.rack.Status = 'Full';
            //    this.rackFull();
            //}

            let a = this.el.nativeElement;
            a.focus();
        }
        else {
            this.toastr.info('Rack full!', 'Full!');
            this.soundService.beep('bong');
            this.router.navigate(['/store']);
        }
    }

    initRack(): void {
        d3.select('svg')
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.svg = d3.select('svg > g');
        this.drawRack()
    }

    drawRack(): void {
        let maxRow = this.rack.Rows;
        let maxCol = this.rack.Cols;
        this.y.domain([1, maxRow]);
        this.x.domain([1, maxCol]);
        let that = this;
        
        let circles = this.svg
            .selectAll("circle");

        //circles.data(this.samples, (smp, i, oi) => {
        //        console.log(i.toString () + ' ' + smp.SampleId.toString());
        //        return smp.SampleId.toString()
        //}) // key function, uses PK from table - cannot get to work.
        circles.data(this.samples)
            .enter()
            .append("circle")
            .attr('cy', (s, i) => that.y(s.Row))
            .attr("cx", (s, i) => that.x(s.Col))
            .attr("fill", "#eeeeff")
            .attr("stroke", "black")
            .attr('stroke-width', 1)
            //.attr("r", this.height / (d3.max([maxRow, maxCol]) * 2) - 1) + "px";
            .attr("r", (this.width / (d3.max([maxRow, maxCol]) * 6)) - 1 + "px");

        //let removed = circles.data(this.samples).exit().remove();

        let xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("top")
            .tickSize(1);

        let yAxis = d3.svg.axis()
            .scale(this.y)
            .orient("left");
            

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + -this.margin.top / 2 + ")")
            .call(xAxis.ticks(maxCol));

        this.svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + -this.margin.left / 2 + ",0)")
            .call(yAxis.ticks(maxRow));
    }

    emptyRack(emptyRackModal : any): void {
        console.log(this.svg);
        this.rack.Status = 'Empty';
        this.rackService.saveRack(this.rack)
            .subscribe(id => console.log(id), err => console.log(err));
        emptyRackModal.hide();
        this.samples = [];
        this.currentPos = { Row: 1, Col: 1 };
        this.svg.selectAll('g > circle').remove();
    }

    rackFull(): void {
        this.rackService.saveRack(this.rack)
            .subscribe(id => {
                this.toastr.info('Rack full!', 'Full!', { dismiss: 'controlled' })
                .then((toast: Toast) => {
                    setTimeout(() => {
                        this.toastr.dismissToast(toast);
                        this.router.navigate(['/store'])
                    }, 2000);
                })
            }, err => console.log(err));
    }
    //sample removed, actually
    samplesChanged(evt: Sample): void {
        console.log('samples changed...');
        this.svg.selectAll('circle').remove();
        this.samples = _.without(this.samples, evt);
        
        this.currentPos = this.samples.length > 0 ? { Row: this.samples[this.samples.length - 1].Row, Col: this.samples[this.samples.length - 1].Col } : { Row: 1, Col: 0 };
        this.updatePostion();
        //if there's no samples left, reset the current Pos to {1,0}
        /*if (this.samples.length === 0) {
            this.currentPos = { Row: 1, Col: 0 };
        }*/
        
        this.drawRack();
        let a = this.el.nativeElement;
        a.focus();
    }

    ngOnInit(): void {
        this.totalWidth = window.screen.width / 2;
        this.width = this.totalWidth - this.margin.left - this.margin.right;
        this.height = 600 - this.margin.top - this.margin.bottom;
        this.y = d3.scale.linear().range([0, this.height]);
        this.x = d3.scale.linear().range([0, this.width]);

        this.route.params
            .subscribe((params: Params) => {
                console.log(params['id'])
                if (params['id'] == undefined) {  }
                else {
                    this.getSamplesByRackId(+params['id']);
                }
            });
    }
}
