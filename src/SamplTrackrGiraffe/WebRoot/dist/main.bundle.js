webpackJsonp(["main"],{

/***/ "../../../../../ng/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../ng/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../ng/Templates/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- Sidebar -->\r\n<div id=\"wrapper\" class=\"toggled\">\r\n    <div id=\"sidebar-wrapper\">\r\n        <ul class=\"sidebar-nav\">\r\n\r\n\r\n            <li>\r\n                <form class=\"form-inline\">\r\n                    <input name=\"options\" type=\"radio\" [(ngModel)]=\"isLocal\" [value]=\"true\"\r\n                           [checked]=\"isLocal=='true'\" (change)=\"toggleContext()\" />Here\r\n                    <input name=\"options\" type=\"radio\" [(ngModel)]=\"isLocal\" [value]=\"false\"\r\n                           [checked]=\"isLocal=='false'\" (change)=\"toggleContext()\" />All\r\n                </form>\r\n            </li>\r\n            <li id=\"usersBtn\"><a class=\"topic\" routerLink=\"/users\">Users</a></li>\r\n            <li id=\"locationBtn\"><a class=\"topic\" routerLink=\"/locations\">Locations</a></li>\r\n            <li id=\"containerBtn\"><a class=\"topic\" routerLink=\"/containers\">Containers</a></li>\r\n            <li id=\"boxBtn\"><a class=\"topic\" routerLink=\"/boxes\">Boxes</a></li>\r\n            <!--<li id=\"usersBtn\" *ngIf=\"isAdmin\"><a class=\"topic\" routerLink=\"/users\">Users</a></li>\r\n            <li id=\"locationBtn\" *ngIf=\"isAdmin\"><a class=\"topic\" routerLink=\"/locations\">Locations</a></li>\r\n            <li id=\"containerBtn\" *ngIf=\"isAdmin\"><a class=\"topic\" routerLink=\"/containers\">Containers</a></li>\r\n            <li id=\"boxBtn\" *ngIf=\"isAdmin\"><a class=\"topic\" routerLink=\"/boxes\">Boxes</a></li>-->\r\n            <li id=\"rackBtn\"><a class=\"topic\" routerLink=\"/racks\">Racks</a></li>\r\n            <li id=\"storesampBtn\"><a class=\"topic\" routerLink=\"/store\">Store Samples</a></li>\r\n            <li id=\"packboxBtn\"><a class=\"topic\" routerLink=\"/pack\">Pack box</a></li>\r\n            <li id=\"unpackboxBtn\"><a class=\"topic\" routerLink=\"/unpack\">Unpack box</a></li>\r\n            <!-- <li id=\"missingBtn\"><a class=\"topic\" routerLink=\"/missing\">Missing log</a></li> -->\r\n            <!-- <li id=\"packboxBtn\"><a class=\"topic\" routerLink=\"/packboxsamples\">SRA tracking</a></li> -->\r\n            <li id=\"findSampleBtn\"><a class=\"topic\" routerLink=\"/findsample\">Sample Audit</a></li>\r\n            <li id=\"findSampleBtn\"><a class=\"topic\" routerLink=\"/findbox\">Box Audit</a></li>\r\n        </ul>\r\n    </div>\r\n    <div id=\"page-content-wrapper\"><router-outlet></router-outlet></div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/box-audit.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>Box Audit</h5>\r\n<div class='row'>\r\n    <div class=\"col-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-6\">\r\n                        <h4 *ngIf=\"boxAudits?.length > 0\" style=\"text-align: left\">box - {{boxAudits[0].Description}}</h4>\r\n                        <h4 *ngIf=\"boxAudits?.length === 0\" style=\"text-align: left\">Nothing found</h4>\r\n                    </div>\r\n                    <div class=\"col-6\">\r\n                        <h4 style=\"text-align: right\">Box Id - {{boxid}}</h4>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"card-block\">\r\n                <table class=\"table-hover\" *ngIf=\"boxAudits?.length > 0\">\r\n                    <tr>\r\n                        <th>Parent</th>\r\n                        <th></th>\r\n                    </tr>\r\n                    <tr *ngFor='let b of boxAudits'\r\n                    (click)=\"onSelect(b)\"\r\n                    [class.selected]=\"b === selectedBox\">\r\n                        <td>{{b.ParentBox}}</td>\r\n                        <td>{{b.Event}}</td>\r\n                        <td>{{b.DateTime | date : 'dd/MM/yy HH:mm'}}</td>\r\n                        <td>{{b.User}}</td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-6\">        \r\n        <sample-list\r\n            [samples]=\"samples\" \r\n            (SamplesChangedEvt) =\"samplesChanged($event)\" >\r\n        </sample-list>\r\n    </div>\r\n</div>\r\n<!--<horizontal-timeline [timelineElements]=\"timeline\" [showContent]=\"true\"></horizontal-timeline>-->\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/box-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>Boxes</h5>\r\n<ngb-accordion [closeOthers]=\"true\" #acc=\"ngbAccordion\"> <!-- activeIds=\"ngb-panel-0\"-->\r\n  <ngb-panel *ngFor='let ky of arrayOfKeys'>\r\n    <template ngbPanelTitle>\r\n      <!--<span droppable (onDrop)=\"onItemDrop($event,ky)\"> {{ky}} </span>-->\r\n      <span> {{ky}} </span>\r\n    </template>\r\n    <template ngbPanelContent>\r\n        <button type=\"button\" class=\"btn btn-link\" (click)=create(ky)>New Box </button> \r\n\r\n      <div class=\"row\" *ngFor='let b of boxes[ky]' >\r\n            <div class=\"col-md-3\">\r\n                <span *ngIf=\"!b.editable\" draggable [dragData]=\"b\"> {{b.Description}} </span>\r\n                <input *ngIf=\"b.editable\" type=\"text\" [(ngModel)]=\"b.Description\" class=\"form-control\" />\r\n            </div>\r\n            <div class=\"col-md-2\">\r\n                <span *ngIf=\"!b.editable\"> {{b.BoxType}} </span>\r\n                <select *ngIf=\"b.editable\" type=\"text\" [(ngModel)]=\"b.BoxType\" class=\"form-control\">\r\n                    <option *ngFor=\"let bt of boxTypes\" [value]=\"bt.BoxType\">{{bt.BoxType}}</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"col-md-2\">\r\n                <span *ngIf=\"!b.editable\"> {{b.LastLocation.Name}} </span>\r\n                <select *ngIf=\"b.editable\" type=\"text\" [(ngModel)]=\"b.LastLocation.LocationId\" class=\"form-control\">\r\n                    <option *ngFor=\"let loc of locations\" [value]=\"loc.LocationId\">{{loc.Name}}</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"col-md-2\">\r\n                <span *ngIf=\"!b.editable\"> {{b.Status}} </span>\r\n                <span *ngIf=\"b.editable && b.BoxId > 0\" (click)=\"printLabel(b)\" class=\"clickable\" ><img src=\"/api/barcode/BOX{{b.BoxId}}\" alt=\"barcode\" /></span>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa fa-pencil\" aria-hidden=\"true\" *ngIf=\"!b.editable\" (click)=\"toggleEditable(b)\" ngbTooltip=\"Edit\"></span>\r\n                <span class=\"fa fa-list-ol\" aria-hidden=\"true\" *ngIf=\"!b.editable\" (click)=\"contents(b)\" placement=\"top\" ngbTooltip=\"Show contents\"></span>\r\n                <span class=\"fa fa fa-clipboard\" aria-hidden=\"true\" *ngIf=\"!b.editable\" (click)=\"audit(b)\" ngbTooltip=\"Box Audit\"></span>\r\n                <span class=\"fa fa-floppy-o\" aria-hidden=\"true\" *ngIf=\"b.editable\" (click)=\"save(b)\" ngbTooltip=\"Save\"></span>\r\n            </div>\r\n        </div>\r\n    </template>\r\n  </ngb-panel>\r\n</ngb-accordion>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/boxes-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n    <div class=\"card-header\">\r\n        <div class=\"row\">\r\n            <div class=\"col-12\">\r\n                <h4 style=\"text-align: left\">Boxes</h4>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-block\">\r\n        <div class=\"row\" *ngFor='let b of boxes'>\r\n            <div class=\"col-2\">\r\n                <span class=\"boxsvg\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\r\n            </div>\r\n            <div class=\"col-7\">\r\n                <span>{{b.Description}}</span>\r\n            </div>\r\n            <div class=\"col-1\">\r\n              <span class=\"fa fa-remove\" aria-hidden=\"true\" *ngIf=\"parent === 'pack'\" (click)=remove(b) placement=\"top\" ngbTooltip=\"Remove\"></span>\r\n            \r\n              <!--<button type=\"button\" class=\"btn btn-link\" *ngIf=\"parent === 'pack'\" (click)=remove(b)>Remove</button>-->\r\n            </div>\r\n            <div class=\"col-1\">\r\n              <span class=\"fa fa-print\" aria-hidden=\"true\" *ngIf=\"parent === 'pack'\" (click)=printLabel(b) placement=\"top\" ngbTooltip=\"Label\"></span>\r\n            </div>\r\n            <div class=\"col-1\">\r\n                <span class=\"fa fa-list-ol\" aria-hidden=\"true\" (click)=contents(b) placement=\"top\" ngbTooltip=\"Show contents\"></span>\r\n                <span class=\"fa fa-frown-o\" aria-hidden=\"true\" *ngIf=\"parent === 'unpack'\" (click)=\"missing(b)\" placement=\"top\" ngbTooltip=\"Missing\"></span>\r\n                <!--<button type=\"button\" class=\"btn btn-link\" *ngIf=\"parent === 'pack'\" (click)=remove(b)>Remove</button>-->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/container-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>Containers</h5>\r\n<ngb-accordion [closeOthers]=\"true\" #acc=\"ngbAccordion\"> <!-- activeIds=\"ngb-panel-0\"-->\r\n  <ngb-panel *ngFor='let ky of arrayOfKeys'>\r\n    <template ngbPanelTitle>\r\n        <span droppable (onDrop)=\"onItemDrop($event,ky)\">{{ky}}</span>\r\n    </template>\r\n    <template ngbPanelContent>\r\n        <button type=\"button\" class=\"btn btn-link\" (click)=create(ky)>New Container</button>\r\n        <div class=\"row\" *ngFor='let c of containers[ky]'>\r\n            <div class=\"col-md-3\" draggable [dragData]=\"c\" > \r\n                <span *ngIf=\"!c.editable\"> {{c.Description}} </span>\r\n                <input *ngIf=\"c.editable\" type=\"text\" [(ngModel)]=\"c.Description\" class=\"form-control\" />\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span *ngIf=\"!c.editable\"> {{c.ContainerType}} </span>\r\n                <select *ngIf=\"c.editable\" type=\"text\" [(ngModel)]=\"c.ContainerType\" class=\"form-control\">\r\n                    <option *ngFor=\"let ct of containerTypes\" [value]=\"ct.ContainerType\">{{ct.ContainerType}}</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span *ngIf=\"!c.editable\"> {{c.Location.Name}} </span>\r\n                <select *ngIf=\"c.editable\" type=\"text\" [(ngModel)]=\"c.Location.LocationId\" class=\"form-control\">\r\n                    <option *ngFor=\"let loc of locations\" [value]=\"loc.LocationId\">{{loc.Name}}</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa fa-pencil\" aria-hidden=\"true\" *ngIf=\"!c.editable\" (click)=\"toggleEditable(c)\" ngbTooltip=\"Edit\"></span>\r\n                <span class=\"fa fa-list-ol\" aria-hidden=\"true\" *ngIf=\"!c.editable\" (click)=\"racks(c)\" placement=\"top\" ngbTooltip=\"Show contents\"></span>\r\n                <span class=\"fa fa-floppy-o\" aria-hidden=\"true\" *ngIf=\"c.editable\" (click)=\"save(c)\" ngbTooltip=\"Save\"></span>\r\n                <!--button type=\"button\" class=\"btn btn-link\" *ngIf=\"!c.editable\" (click)=\"toggleEditable(c)\">Edit</button>\r\n                <button type=\"button\" class=\"btn btn-link\" *ngIf=\"!c.editable\" (click)=\"racks(c)\">Racks</button>\r\n                <button type=\"button\" class=\"btn btn-link\" *ngIf=\"c.editable\"  (click)=\"save(c)\">Save</button-->\r\n            </div>\r\n        </div>\r\n    </template>\r\n  </ngb-panel>\r\n</ngb-accordion>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/location-despatch-sites.component.html":
/***/ (function(module, exports) {

module.exports = "<ngb-accordion [closeOthers]=\"true\" #acc=\"ngbAccordion\" activeIds=\"ngb-panel-0\">\r\n  <ngb-panel *ngFor='let site of sites' title='{{site.Name}} - {{site.Description}}'>\r\n    <template ngbPanelContent>\r\n        <table>\r\n          <tr *ngFor='let loc of site.LocationMembership'>\r\n            <td>{{loc.Name}}</td>\r\n            <td>\r\n              <input type=\"checkbox\"  [(ngModel)]=\"loc.IsMember\" [checked]=\"loc.IsMember\" (change)=\"onMemberShipChanged(loc)\"/>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n    </template>\r\n  </ngb-panel>\r\n</ngb-accordion>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/pack-box-samples.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-2\">\r\n        <input type=\"text\" placeholder=\"scan\" #labno (keyup.enter)=\"labnoScanned($event,labno)\" />\r\n    </div>\r\n    <div class=\"col-2\">\r\n        <h4>{{box?.Description}}</h4>\r\n    </div>\r\n    <div class=\"col-2\">\r\n        <span class=\"fa fa-level-up fa-lg\" *ngIf=\"box?.ParentBoxId\" (click)=\"navigateToParent()\" placement=\"right\" ngbTooltip=\"Go to parent box.\"></span>\r\n    </div>\r\n    <div class=\"col-3\">\r\n        <button *ngIf=\"box?.BoxType !== 'Fixed Box'\" class=\"btn btn-normal\" (click)=\"despatchBox()\">Despatch</button>\r\n        <h4><span *ngIf=\"box?.BoxType === 'Fixed Box'\">{{box?.BoxType}}</span></h4>\r\n    </div>\r\n    <div class=\"col-3\">\r\n        <select *ngIf=\"box?.BoxType !== 'Fixed Box'\" class=\"form-control\" (change) =\"onDestinationChanged($event)\">\r\n            <option *ngFor=\"let loc of despatchLocations\" [value]=\"loc.LocationId\">{{loc.Name}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n        <box-list \r\n            [boxes]=\"childBoxes\" \r\n            [parent]=\"'pack'\"\r\n            (BoxesChangedEvt) =\"boxesChanged($event)\">\r\n        </box-list>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <sample-list \r\n            [samples]=\"samples\" \r\n            [parent]=\"'pack'\"\r\n            (SamplesChangedEvt) =\"samplesChanged($event)\" >\r\n        </sample-list>\r\n    </div>\r\n</div>\r\n\r\n<app-modal #moveBoxModal>\r\n    <div class=\"app-modal-header\">\r\n        Move Box ?\r\n    </div>\r\n    <div class=\"app-modal-body\">\r\n      <p> This box is being packed @ {{box?.Destination.Name}}.</p>\r\n      <p> Are you sure you want to move this box?</p>\r\n    </div>\r\n    <div class=\"app-modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"moveBoxModalHandler(moveBoxModal,0)\">No</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"moveBoxModalHandler(moveBoxModal,1)\">Yes</button>\r\n    </div>\r\n</app-modal>\r\n\r\n<app-modal #setFixedBoxDestintationModal>\r\n  <div class=\"app-modal-header\">\r\n    Select Destination\r\n  </div>\r\n  <div class=\"app-modal-body\">\r\n    <select class=\"form-control\" (change) =\"onChildBoxDestinationChanged($event)\">\r\n      <option *ngFor=\"let loc of despatchLocations\" [value]=\"loc.LocationId\">{{loc.Name}}</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"app-modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"setFixedBoxDestintationModalHandler(setFixedBoxDestintationModal)\">Go</button>\r\n  </div>\r\n</app-modal>\r\n\r\n<app-modal #despatchLocationNotSelectedModal>\r\n  <div class=\"app-modal-header\">\r\n    Despatch Location not selected.\r\n  </div>\r\n  <div class=\"app-modal-body\">\r\n    Please select a despatch location.\r\n  </div>\r\n  <div class=\"app-modal-footer\">\r\n    \r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"despatchLocationNotSelectedModal.hide()\">Ok</button>\r\n    <!--<button type=\"button\" class=\"btn btn-default\" (click)=\"despatchLocationNotSelectedModal.hide()\">No</button>\r\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"despatchLocationNotSelectedModalHander(despatchLocationNotSelectedModal)\">Yes</button>-->\r\n  </div>\r\n</app-modal>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/rack-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>Racks</h5>\r\n<ngb-accordion [closeOthers]=\"true\" #acc=\"ngbAccordion\"> <!-- activeIds=\"ngb-panel-0\"-->\r\n  <ngb-panel *ngFor='let cr of cracks'>\r\n    <template ngbPanelTitle>\r\n        <span droppable (onDrop)=\"onItemDrop($event,cr)\">{{cr.Container.Description}}</span>\r\n    </template>\r\n    <template ngbPanelContent>\r\n        <button *ngIf=\"isAdmin\" type=\"button\" class=\"btn btn-link\" (click)=create(cr)>New Rack</button>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4\"></div>\r\n            <div class=\"col-md-1\">Rows</div>\r\n            <div class=\"col-md-1\">Cols</div>\r\n        </div>\r\n        <div class=\"row\" *ngFor='let rr of cr.Racks'>\r\n            <div class=\"col-md-4\">\r\n                <span *ngIf=\"!rr.editable\" draggable [dragData]=\"rr\"> {{rr.Description}} </span>\r\n                <input *ngIf=\"rr.editable\" type=\"text\" [(ngModel)]=\"rr.Description\" class=\"form-control\" />\r\n            </div>\r\n            <div class=\"col-md-1\">\r\n                <span *ngIf=\"!rr.editable\"> {{rr.Rows}} </span>\r\n                <input *ngIf=\"rr.editable\" type=\"number\" [(ngModel)]=\"rr.Rows\" class=\"form-control\" />\r\n            </div>\r\n            <div class=\"col-md-1\">\r\n                <span *ngIf=\"!rr.editable\"> {{rr.Cols}} </span>\r\n                <input *ngIf=\"rr.editable\" type=\"number\" [(ngModel)]=\"rr.Cols\" class=\"form-control\" />\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span *ngIf=\"!rr.editable\"> {{rr.Status}} </span>\r\n                <span *ngIf=\"rr.editable\" (click)=\"printLabel(rr)\"><img src=\"/api/barcode/RACK{{rr.RackId}}\" alt=\"barcode\" /></span>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa fa-pencil\" aria-hidden=\"true\" *ngIf=\"!rr.editable\" (click)=\"toggleEditable(rr)\" ngbTooltip=\"Edit\"></span>\r\n                <span class=\"fa fa-list-ol\" aria-hidden=\"true\" *ngIf=\"!rr.editable\" (click)=\"samples(rr)\" placement=\"top\" ngbTooltip=\"Samples\"></span>\r\n                <span class=\"fa fa-floppy-o\" aria-hidden=\"true\" *ngIf=\"rr.editable\" (click)=\"save(rr,cr)\" ngbTooltip=\"Save\"></span>\r\n            </div>\r\n        </div>\r\n    </template>\r\n  </ngb-panel>\r\n</ngb-accordion>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/sample-audit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n    <div class=\"card-header\">\r\n        <div class=\"row\">\r\n            <div class=\"col-6\">\r\n                <h4 style=\"text-align: left\">{{sampleNo}}</h4>\r\n            </div>\r\n            <div class=\"col-6\">\r\n                <h4 style=\"text-align: right\">Total = {{sampleAudits?.length}}</h4>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-block\">\r\n        <div class=\"row table-header\">\r\n            <div class=\"col-2\"></div>\r\n            <div class=\"col-1\"><span>Row</span></div>\r\n            <div class=\"col-1\"><span>Col</span></div>\r\n            <div class=\"col-4\"><span></span></div>\r\n            <div class=\"col-2\"><span></span></div>      \r\n            <div class=\"col\"><span>&nbsp;</span></div>\r\n        </div>\r\n        <div class=\"row\" *ngFor='let s of sampleAudits'>\r\n            <div class=\"col-2\">\r\n                <span *ngIf=\"s.Rack !==''\">{{s.Rack}}</span>\r\n                <span *ngIf=\"s.Box !==''\">{{s.Box}}</span>\r\n                <span *ngIf=\"s.IsCurrent === true\" class=\"fa fa-list-ol\" aria-hidden=\"true\" (click)=\"samples(s)\" placement=\"top\" ngbTooltip=\"Contents\"></span>\r\n            </div>\r\n            <div class=\"col-1\">\r\n                <span *ngIf=\"s.Row > 0\">{{s.Row}}</span>\r\n            </div>\r\n            <div class=\"col-1\">\r\n                <span *ngIf=\"s.Col > 0\">{{s.Col}}</span>\r\n            </div>\r\n            <div class=\"col-4\">\r\n                <span>{{s.Event}}</span>\r\n            </div>\r\n            <div class=\"col-1\">\r\n                <span>{{s.DateTime | date : 'dd/MM/yy HH:mm'}}</span>\r\n            </div>\r\n            <div class=\"col-1\">\r\n                <span>{{s.User}}</span>\r\n            </div>\r\n            \r\n            <div class=\"col {{s.SampleType}}\">\r\n                &nbsp;\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../ng/Templates/samples-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n    <div class=\"card-header\">\r\n        <div class=\"row\">\r\n            <div class=\"col-6\">\r\n                <h4 style=\"text-align: left\">Samples</h4>\r\n            </div>\r\n            <div class=\"col-6\">\r\n                <h4 style=\"text-align: right\">Total = {{reverseSortedSamples.length}}</h4>\r\n            </div>\r\n        </div>\r\n        <!--<span><h4 style=\"text-align: left\">Samples</h4></span>\r\n        <span><h4 style=\"text-align: right\">Total = {{reverseSortedSamples.length}}</h4></span>-->\r\n    </div>\r\n    \r\n    <div class=\"card-block\">\r\n        <div class=\"row table-header\">\r\n            <div class=\"col-1\"><span *ngIf=\"parent === 'store'\">Row</span></div>\r\n            <div class=\"col-1\"><span *ngIf=\"parent === 'store'\">Col</span></div>\r\n        </div>\r\n        <div class=\"row\" *ngFor='let s of reverseSortedSamples'>\r\n            <div class=\"col-1\">\r\n                <span *ngIf=\"parent === 'store'\">{{s.Row}}</span>\r\n            </div>\r\n            <div class=\"col-1\">\r\n                <span *ngIf=\"parent === 'store'\">{{s.Col}}</span>\r\n            </div>\r\n            <div class=\"col {{s.SampleType}}\">\r\n                &nbsp;\r\n            </div>\r\n            <div class=\"col-4\">\r\n                <span> {{s.SampleNo}} </span>\r\n            </div>\r\n            <div class=\"col\">\r\n                <span class=\"fa fa-remove\" aria-hidden=\"true\" *ngIf=\"parent === 'pack' || parent === 'store'\" (click)=\"remove(s)\" placement=\"top\" ngbTooltip=\"Remove\"></span>\r\n                <span class=\"fa fa-frown-o\" aria-hidden=\"true\" *ngIf=\"parent === 'unpack'\" (click)=\"missing(s)\" placement=\"top\" ngbTooltip=\"Missing\"></span>\r\n                <a href=\"/sampleaudit/{{s.SampleNo}}\"><span class=\"fa fa fa-clipboard\" aria-hidden=\"true\" ngbTooltip=\"Sample Audit\"></span></a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<app-modal #sampleRemovedModal>\r\n    <div class=\"app-modal-header\">\r\n        Please comment on why this has been removed.\r\n    </div>\r\n    <div class=\"app-modal-body\">\r\n        <input type=\"text\" [(ngModel)]=\"removalMessage\" class=\"form-control\" />\r\n    </div>\r\n    <div class=\"app-modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"sampleRemoved(sampleRemovedModal)\">Save</button>\r\n    </div>\r\n</app-modal>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/scan-barcode.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>{{Title}}</h5>\r\n<div class=\"align-middle\">\r\n    <input type=\"text\" class=\"form-control\" width=\"400\" placeholder=\"scan a barcode\" #barcode (keyup.enter)=\"barCodeScanned($event)\" />\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/site-locations-list.component.html":
/***/ (function(module, exports) {

module.exports = "<h5>Locations</h5>\r\n<ngb-accordion [closeOthers]=\"true\" #acc=\"ngbAccordion\" (click) =\"accordionClick()\" >\r\n  <ngb-panel *ngFor='let site of sites' title='{{site.Name}} - {{site.Description}}'>\r\n    <template ngbPanelContent>\r\n      <div class=\"row\" *ngFor='let loc of site.LocationsDespatchLocations' (click)=\"onSelect(loc)\">\r\n        <div class=\"col-4\">\r\n          <span *ngIf=\"!loc.editable\"> {{loc.Name}} </span>\r\n          <input *ngIf=\"loc.editable\" maxlength=\"50\" type=\"text\" [(ngModel)]=\"loc.Name\" class=\"form-control\" />\r\n        </div>\r\n        <div class=\"col-1\">\r\n          <span *ngIf=\"!loc.editable\"> {{loc.PrinterIp}} </span>\r\n          <input *ngIf=\"loc.editable\" maxlength=\"50\" type=\"text\" [(ngModel)]=\"loc.PrinterIp\" class=\"form-control\" />\r\n        </div>\r\n        <div class=\"col-1\">\r\n          <span *ngIf=\"!loc.editable\"> {{loc.LabelFormat.Name}} </span>\r\n          <!-- TK: should be a select list -->\r\n          <input *ngIf=\"loc.editable\" maxlength=\"50\" type=\"number\" [(ngModel)]=\"loc.LabelFormat.FormatId\" class=\"form-control\" />\r\n        </div>\r\n        <div class=\"col-1\">\r\n          <span class=\"fa fa-pencil\" aria-hidden=\"true\" *ngIf=\"!loc.editable\" (click)=\"toggleEditable(loc)\" ngbTooltip=\"Edit\"></span>\r\n          <span class=\"fa fa-floppy-o\" aria-hidden=\"true\" *ngIf=\"loc.editable\" (click)=\"save(loc)\" ngbTooltip=\"Save\"></span>\r\n        </div>\r\n        <div class=\"col-1\">\r\n          <span class=\"fa fa-list-ol\" aria-hidden=\"true\" (click)=\"containers(loc)\" placement=\"top\" ngbTooltip=\"Containers\"></span>\r\n        </div>\r\n        <div class=\"col-4\">\r\n          <div class=\"card\">\r\n            <div class=\"card-header\">\r\n              <div class=\"row\">\r\n                <h5>Despatch locations</h5>\r\n              </div>\r\n            </div>\r\n            <div class=\"card-block\">\r\n              <location-despatch-sites\r\n                      [location]=\"loc\"\r\n                      [sites]=\"loc.DespatchLocations\">\r\n              </location-despatch-sites>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </template>\r\n  </ngb-panel>\r\n</ngb-accordion>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/store-samples.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n        <input type=\"text\" placeholder=\"scan\" #labno (keyup.enter)=\"labnoScanned($event,labno)\" /> <!-- [disabled]=\"postInProgress\" /> -->\r\n    </div>\r\n    <div class=\"col-4\">\r\n        <h5>{{rack?.Description}}</h5>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n        <button class=\"btn btn-normal\" (click)=\"emptyRackModal.show()\" [disabled]=\"postInProgress\" >Empty</button>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"col-md-8\">\r\n        <svg id=\"svg\">\r\n            <defs>\r\n                <linearGradient id=\"MyGradient\">\r\n                    <stop offset=\"10%\" stop-color=\"#36D1DC\" /> \r\n                    <stop offset=\"90%\" stop-color=\"#5B86E5\" />\r\n                </linearGradient>\r\n            </defs>\r\n            <rect [style.width]=\"totalWidth\" height=\"600\" />\r\n        </svg>\r\n    </div>\r\n    <div class=\"col-md-4\">\r\n        <sample-list\r\n                [samples]=\"samples\" [parent]=\"'store'\"\r\n                (SamplesChangedEvt) =\"samplesChanged($event)\" >\r\n        </sample-list>\r\n    </div>\r\n</div>\r\n\r\n<app-modal #emptyRackModal>\r\n    <div class=\"app-modal-header\">\r\n        Empty Rack ?\r\n    </div>\r\n    <div class=\"app-modal-body\">\r\n        Are you sure you want to empty this rack?\r\n    </div>\r\n    <div class=\"app-modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"emptyRackModal.hide()\">No</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"emptyRack(emptyRackModal)\">Yes</button>\r\n    </div>\r\n</app-modal>"

/***/ }),

/***/ "../../../../../ng/Templates/unpack-box-samples.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-3\">\r\n        <input type=\"text\" placeholder=\"scan\" #labno (keyup.enter)=\"labnoScanned($event,labno)\" />\r\n    </div>\r\n    <div class=\"col-3\">\r\n        <h4>{{box?.Description}}</h4>\r\n    </div>\r\n    <div class=\"col-3\">\r\n        <span class=\"fa fa-level-up fa-lg\" *ngIf=\"box?.ParentBoxId\" (click)=\"navigateToParent()\" placement=\"left\" ngbTooltip=\"Go to parent box.\"></span>\r\n        <span *ngIf=\"box?.BoxType === 'Fixed Box'\"><h4>{{box?.BoxType}}</h4></span>\r\n    </div>\r\n    <div class=\"col-3\">\r\n        <button *ngIf=\"box?.BoxType === 'Fixed Box'\" type=\"button\" class=\"btn btn-primary\" (click)=\"unpackEverything()\">Yes</button>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n        <box-list \r\n            [boxes]=\"childBoxes\" \r\n            [parent]=\"'unpack'\"\r\n            (BoxesChangedEvt) =\"boxesChanged($event)\">\r\n        </box-list>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n        <sample-list \r\n            [samples]=\"samples\"\r\n            [parent]=\"'unpack'\"\r\n            (SamplesChangedEvt) =\"samplesChanged($event)\" >\r\n        </sample-list>\r\n    </div>\r\n</div>\r\n\r\n<app-modal #moveBoxModal>\r\n    <div class=\"app-modal-header\">\r\n        Move Box ?\r\n    </div>\r\n    <div class=\"app-modal-body\">\r\n      <p> This box is destined for {{box?.Destination.Name}}.</p>\r\n      <p> Are you sure you want to move this box?</p>\r\n    </div>\r\n    <div class=\"app-modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"moveBoxModalHandler(moveBoxModal,0)\">No</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"moveBoxModalHandler(moveBoxModal,1)\">Yes</button>\r\n    </div>\r\n</app-modal>\r\n\r\n<app-modal #unpackAnywayModal>\r\n    <div class=\"app-modal-header\">\r\n        Not found in the box!\r\n    </div>\r\n    <div class=\"app-modal-body\">\r\n        Do you want to unpack anyway?\r\n    </div>\r\n    <div class=\"app-modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"unpackAnywayModalHandler(unpackAnywayModal,0)\">No</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"unpackAnywayModalHandler(unpackAnywayModal,1)\">Yes</button>\r\n    </div>\r\n</app-modal>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/user-list.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n        <div class=\"card\">\r\n            <div class=\"card-header\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-6\">\r\n                        <h5>Users</h5>\r\n                    </div>\r\n                    <div class=\"col-6\">\r\n                        <a class=\"fa fa-plus\" aria-hidden=\"true\" ngbToolTip=\"New User\" href=\"/account/register\"></a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"card-block\">\r\n                <table class=\"table-hover\">\r\n                    <!--<table class=\"table-striped table-hover\">-->\r\n                    <tr>\r\n                        <th>Logon</th>\r\n                        <th>Name</th>\r\n                        <th>Email</th>\r\n                        <th>Admin</th>\r\n                        <th></th>\r\n                        <!--<th></th>-->\r\n                    </tr>\r\n                    <tr *ngFor=\"let user of users\"\r\n                        (click)=\"onSelect(user)\"\r\n                        [class.selected]=\"user === selectedUser\">\r\n                        <td>\r\n                            <span *ngIf=\"!user.editable\"> {{user.ShortName}} </span>\r\n                            <input *ngIf=\"user.editable\" type=\"text\" [(ngModel)]=\"user.ShortName\" class=\"form-control\" />\r\n                        </td>\r\n                        <td>\r\n                            <span *ngIf=\"!user.editable\"> {{user.DisplayName}} </span>\r\n                            <input *ngIf=\"user.editable\" type=\"text\" [(ngModel)]=\"user.DisplayName\" class=\"form-control\" />\r\n                        </td>\r\n                        <td>\r\n                            <span *ngIf=\"!user.editable\"> {{user.Email}} </span>\r\n                            <input *ngIf=\"user.editable\" type=\"email\" [(ngModel)]=\"user.Email\" class=\"form-control\" />\r\n                        </td>\r\n                        <td> <input type=\"checkbox\" [checked]=\"user.IsAdmin\" (change)=\"user.IsAdmin = !user.IsAdmin\" [disabled]=\"!user.editable\" /> </td>\r\n                        <td>\r\n                            <span class=\"fa fa-pencil\" aria-hidden=\"true\" *ngIf=\"!user.editable\" (click)=\"toggleEditable(user)\" ngbTooltip=\"Edit\"></span>\r\n                            <span class=\"fa fa-floppy-o\" aria-hidden=\"true\" *ngIf=\"user.editable\" (click)=\"save(user)\" ngbTooltip=\"Save\"></span>\r\n                        </td>\r\n                        <!--<td> {{user.editable}} </td>-->\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <div class=\"sticky\">\r\n        <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <div class=\"row\">\r\n              <h5>Sites</h5>\r\n            </div>\r\n          </div>\r\n          <div class=\"card-block\">\r\n            <user-sites *ngIf=\"selectedUser\"\r\n                        [user]=\"selectedUser\"\r\n                        [sites]=\"selectedUser.SiteMembership\">\r\n            </user-sites>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../ng/Templates/user-sites-list.component.html":
/***/ (function(module, exports) {

module.exports = "<ngb-accordion [closeOthers]=\"true\" #acc=\"ngbAccordion\" activeIds=\"ngb-panel-0\">\r\n  <ngb-panel *ngFor='let site of sites' title='{{site.Name}} - {{site.Description}}' style=\"overflow:auto\">\r\n    <template ngbPanelContent>\r\n        <table>\r\n          <tr *ngFor='let loc of site.LocationMembership'>\r\n            <td>{{loc.Name}}</td>\r\n            <td>\r\n              <input type=\"checkbox\"  [(ngModel)]=\"loc.IsMember\" [checked]=\"loc.IsMember\" (change)=\"onMemberShipChanged(loc)\"/>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n    </template>\r\n  </ngb-panel>\r\n</ngb-accordion>\r\n"

/***/ }),

/***/ "../../../../../ng/app/components/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_global_service__ = __webpack_require__("../../../../../ng/app/services/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_idle_core__ = __webpack_require__("../../../../@ng-idle/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { Observable } from 'rxjs/Rx';
//import { LocationService } from './location.service';
/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { window } from 'rxjs/operator/window'; */
var AppComponent = (function () {
    function AppComponent(http, globalsService, idle, toastr, vcr) {
        var _this = this;
        this.http = http;
        this.globalsService = globalsService;
        this.idle = idle;
        this.toastr = toastr;
        this.vcr = vcr;
        this.title = 'Home';
        //location: Location;
        this.idleState = 'Not started.';
        this.timedOut = false;
        this.contextUrl = 'api/context';
        this.toastr.setRootViewContainerRef(vcr);
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(600);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(600);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(__WEBPACK_IMPORTED_MODULE_4__ng_idle_core__["a" /* DEFAULT_INTERRUPTSOURCES */]);
        idle.onIdleEnd.subscribe(function () {
            _this.idleState = 'No longer idle.';
            console.log(_this.idleState);
        });
        idle.onTimeout.subscribe(function () {
            _this.idleState = 'Timed out!';
            _this.timedOut = true;
            //console.log(this.idleState);
            window.location.assign('/account/logoff');
        });
        idle.onIdleStart.subscribe(function () { return _this.idleState = 'You\'ve gone idle!'; });
        idle.onTimeoutWarning.subscribe(function (countdown) {
            _this.idleState = 'You will time out in ' + countdown + ' seconds!';
            if (countdown <= 10) {
                _this.toastr.warning(_this.idleState, "**********");
            }
        });
        this.reset();
    }
    AppComponent.prototype.reset = function () {
        this.idle.watch();
        this.idleState = 'Started.';
        console.log(this.idleState);
        this.timedOut = false;
    };
    AppComponent.prototype.toggleContext = function () {
        console.log(this.isLocal);
        this.globalsService.IsLocal = this.isLocal;
        this.isAdmin = this.globalsService.Context.Admin;
        //location.reload();
        //this.globalsService.toggleContext(this.isLocal);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.globalsService.getContext().subscribe(function (b) {
            _this.isAdmin = _this.globalsService.Context.Admin;
            //console.log('location', this.globalsService.Context.Location);
            console.log('global ctxt', _this.globalsService.Context);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'my-app',
        template: __webpack_require__("../../../../../ng/Templates/app.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_global_service__["a" /* GlobalsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_global_service__["a" /* GlobalsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ng_idle_core__["b" /* Idle */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ng_idle_core__["b" /* Idle */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/box-audit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoxAuditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_box_service__ = __webpack_require__("../../../../../ng/app/services/box.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sample_service__ = __webpack_require__("../../../../../ng/app/services/sample.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { TLSSocket } from 'tls';
var BoxAuditComponent = (function () {
    /*
    = [
        { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: '', content: this.content },
        { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
        { caption: '20 Mar', date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
        { caption: '20 May', date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
        { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
        { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
        { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
        { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
        { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
        { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
        { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
      ];
    */
    function BoxAuditComponent(route, router, boxService, sampleService) {
        this.route = route;
        this.router = router;
        this.boxService = boxService;
        this.sampleService = sampleService;
        this.content = "content";
    }
    BoxAuditComponent.prototype.onSelect = function (box) {
        var _this = this;
        this.selectedBox = box;
        this.sampleService.getBoxSampleAuditsByTrackingID(box.TrackingAuditId)
            .subscribe(function (samples) { return _this.samples = samples; });
    };
    BoxAuditComponent.prototype.getBoxAudits = function (boxid) {
        var _this = this;
        this.boxService.getBoxAudits(boxid)
            .subscribe(function (boxauds) {
            //boxauds.forEach(ba => ba.DateTime = new Date(ba.DateTime.toLocaleString()));
            _this.boxAudits = boxauds;
            //this.timeline = boxauds.map((ba, i) =>
            //    ({ caption: ba.Status, date: new Date(ba.DateTime.toLocaleString()), title: `${ba.LastLocation} - ${ba.Description}`, content: ba.Event })
            //)
        }, function (err) { return console.log(err); });
    };
    BoxAuditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.boxid = +params['id'];
            _this.getBoxAudits(_this.boxid);
        });
    };
    return BoxAuditComponent;
}());
BoxAuditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../ng/Templates/box-audit.component.html"),
        styles: [__webpack_require__("../../../../angular-vertical-timeline/dist/vertical-timeline.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_box_service__["a" /* BoxService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_box_service__["a" /* BoxService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */]) === "function" && _d || Object])
], BoxAuditComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=box-audit.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/box-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoxListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_box_service__ = __webpack_require__("../../../../../ng/app/services/box.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_location_service__ = __webpack_require__("../../../../../ng/app/services/location.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BoxListComponent = (function () {
    function BoxListComponent(route, router, boxService, locationService) {
        this.route = route;
        this.router = router;
        this.boxService = boxService;
        this.locationService = locationService;
    }
    BoxListComponent.prototype.onSelect = function (location) {
        this.selectedLocation = location;
    };
    BoxListComponent.prototype.onItemDrop = function (e, ky) {
        var _this = this;
        // Get the dropped data here 
        var draggedBox = e.dragData;
        var previousLocation = draggedBox.LastLocation.Name;
        this.locationService.getLocationByName(ky)
            .subscribe(function (loc) {
            draggedBox.LastLocation = loc;
            draggedBox.Event = 'Moved from ' + previousLocation + ' to ' + loc.Name;
            _this.boxService.saveBox(draggedBox)
                .subscribe(function (svrbox) {
                _this.boxes[previousLocation] = __WEBPACK_IMPORTED_MODULE_6_underscore__["without"](_this.boxes[previousLocation], _this.boxes[previousLocation].find(function (box) { return box.BoxId == svrbox.BoxId; }));
                _this.boxes[ky] = _this.boxes[ky].concat(draggedBox);
            }, function (err) { return console.log(err); });
        });
    };
    BoxListComponent.prototype.toggleEditable = function (box) {
        box.editable = !box.editable;
    };
    BoxListComponent.prototype.printLabel = function (box) {
        this.boxService.printLabel(box.BoxId)
            .subscribe(function (box) {
            return console.log(box);
        });
    };
    BoxListComponent.prototype.save = function (box) {
        var _this = this;
        box.editable = false;
        console.log(box, 'being saved');
        var loc = box.LastLocation.Name;
        this.boxService.saveBox(box)
            .subscribe(function (_box) {
            console.log(_box.BoxId);
            if (_this.boxes[loc] != undefined) {
                _this.boxes[loc] = __WEBPACK_IMPORTED_MODULE_6_underscore__["without"](_this.boxes[loc], box);
                _this.boxes[loc].push(_box);
            }
            else {
                _this.boxes[loc] = [_box];
            }
            console.log(box);
        }, function (err) { return console.log(err); });
    };
    BoxListComponent.prototype.racks = function (box) {
        this.router.navigate(['/racks', box.BoxId]);
    };
    BoxListComponent.prototype.create = function (loc) {
        var _loc = __WEBPACK_IMPORTED_MODULE_6_underscore__["find"](this.locations, (function (l) { return l.Name == loc; }));
        var box = {
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
        };
        if (this.boxes[loc] != undefined) {
            this.boxes[loc].push(box);
        }
        else {
            this.boxes[loc] = [box];
        }
    };
    BoxListComponent.prototype.contents = function (box) {
        this.router.navigate(['/packsamples', box.BoxId]);
    };
    BoxListComponent.prototype.audit = function (box) {
        this.router.navigate(['/boxaudit', box.BoxId]);
    };
    BoxListComponent.prototype.getXHRDataAll = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].forkJoin(this.boxService.getBoxTypes(), this.locationService.getLocations(), this.boxService.getBoxs())
            .subscribe(function (res) {
            _this.boxTypes = res[0];
            var slocs = __WEBPACK_IMPORTED_MODULE_6_underscore__["map"](res[1], (function (s) { return s.Locations; }));
            _this.locations = __WEBPACK_IMPORTED_MODULE_6_underscore__["flatten"](slocs, false);
            _this.arrayOfKeys = __WEBPACK_IMPORTED_MODULE_6_underscore__["sortBy"](__WEBPACK_IMPORTED_MODULE_6_underscore__["map"](_this.locations, function (l) { return l.Name; }), (function (n) { return n; }));
            res[2].forEach(function (b) { return b.editable = false; });
            var grouped = __WEBPACK_IMPORTED_MODULE_6_underscore__["groupBy"](res[2], (function (b) { return b.LastLocation.Name; }));
            _this.boxes = grouped;
        });
    };
    BoxListComponent.prototype.getAllBoxs = function () {
        var _this = this;
        this.boxService.getBoxs()
            .subscribe(function (boxs) {
            boxs.forEach(function (b) { return b.editable = false; });
            var grouped = __WEBPACK_IMPORTED_MODULE_6_underscore__["groupBy"](boxs, (function (b) { return b.LastLocation.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
            _this.boxes = grouped;
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    BoxListComponent.prototype.getBoxsById = function (id) {
        var _this = this;
        this.boxService.getBoxByLocationId(id)
            .subscribe(function (boxs) {
            boxs.forEach(function (b) { return b.editable = false; });
            var grouped = __WEBPACK_IMPORTED_MODULE_6_underscore__["groupBy"](boxs, (function (b) { return b.LastLocation.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
            _this.boxes = grouped;
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    BoxListComponent.prototype.getBoxTypes = function () {
        var _this = this;
        this.boxService.getBoxTypes()
            .subscribe(function (boxtypes) {
            _this.boxTypes = boxtypes;
            console.log(_this.boxTypes);
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    BoxListComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocations()
            .subscribe(function (sites) {
            var slocs = __WEBPACK_IMPORTED_MODULE_6_underscore__["map"](sites, (function (s) { return s.Locations; }));
            _this.locations = __WEBPACK_IMPORTED_MODULE_6_underscore__["flatten"](slocs, false);
            _this.arrayOfKeys = __WEBPACK_IMPORTED_MODULE_6_underscore__["sortBy"](__WEBPACK_IMPORTED_MODULE_6_underscore__["map"](_this.locations, function (l) { return l.Name; }), (function (n) { return n; }));
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    BoxListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            if (params['id'] == undefined) {
                _this.getXHRDataAll();
            }
            else {
                _this.getBoxTypes();
                _this.getBoxsById(+params['id']);
                _this.getLocations();
            }
        });
    };
    return BoxListComponent;
}());
BoxListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        //selector : 'users',
        template: __webpack_require__("../../../../../ng/Templates/box-list.component.html")
        //template : '<h1>Boxs</h1>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_box_service__["a" /* BoxService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_box_service__["a" /* BoxService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_location_service__["a" /* LocationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_location_service__["a" /* LocationService */]) === "function" && _d || Object])
], BoxListComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=box-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/boxes-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoxesListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_box_service__ = __webpack_require__("../../../../../ng/app/services/box.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_sounds_service__ = __webpack_require__("../../../../../ng/app/services/sounds.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BoxesListComponent = (function () {
    function BoxesListComponent(router, boxService, soundService, toastr, vcr) {
        this.router = router;
        this.boxService = boxService;
        this.soundService = soundService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.BoxesChangedEvt = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.toastr.setRootViewContainerRef(vcr);
    }
    BoxesListComponent.prototype.contents = function (b) {
        console.log(this.parent);
        switch (this.parent) {
            case 'pack':
                this.router.navigate(['/packsamples', b.BoxId]);
                break;
            case 'unpack':
                this.router.navigate(['/unpacksamples', b.BoxId]);
                break;
            default:
                break;
        }
    };
    BoxesListComponent.prototype.missing = function (b) {
        var _this = this;
        var perviousParent = b.ParentBoxId;
        b.ParentBoxId = null;
        b.Event = "Missing from box id " + perviousParent.toString();
        this.boxService.saveBox(b)
            .subscribe(function (id) {
            _this.boxes = __WEBPACK_IMPORTED_MODULE_5_underscore__["without"](_this.boxes, b);
            _this.soundService.beep('beep');
            _this.toastr.success(b.Description + ' removed.', 'Success!');
            _this.BoxesChangedEvt.emit(b);
        }, function (err) {
            _this.soundService.beep('bong');
            _this.toastr.error(err, "Bad!");
        });
    };
    BoxesListComponent.prototype.printLabel = function (box) {
        var _this = this;
        this.boxService.printLabel(box.BoxId)
            .subscribe(function (box) {
            _this.toastr.success(box.Description + ' lable printed.', 'Success!');
        }, function (err) {
            _this.soundService.beep('bong');
            console.log(err);
            _this.toastr.error(err, "Bad!");
        });
    };
    BoxesListComponent.prototype.remove = function (b) {
        var _this = this;
        var perviousParent = b.ParentBoxId;
        b.ParentBoxId = null;
        b.Event = "Removed from box id " + perviousParent.toString();
        this.boxService.saveBox(b)
            .subscribe(function (id) {
            _this.boxes = __WEBPACK_IMPORTED_MODULE_5_underscore__["without"](_this.boxes, b);
            _this.toastr.success(b.Description + ' removed.', 'Success!');
            _this.BoxesChangedEvt.emit(b);
        }, function (err) {
            _this.soundService.beep('bong');
            _this.toastr.error(err, "Bad!");
        });
    };
    return BoxesListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], BoxesListComponent.prototype, "parent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], BoxesListComponent.prototype, "boxes", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], BoxesListComponent.prototype, "BoxesChangedEvt", void 0);
BoxesListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'box-list',
        template: __webpack_require__("../../../../../ng/Templates/boxes-list.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_box_service__["a" /* BoxService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_box_service__["a" /* BoxService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_sounds_service__["a" /* SoundService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_sounds_service__["a" /* SoundService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _f || Object])
], BoxesListComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=boxes-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/container-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContainerListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_container_service__ = __webpack_require__("../../../../../ng/app/services/container.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_location_service__ = __webpack_require__("../../../../../ng/app/services/location.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContainerListComponent = (function () {
    function ContainerListComponent(route, router, containerService, locationService) {
        this.route = route;
        this.router = router;
        this.containerService = containerService;
        this.locationService = locationService;
    }
    ContainerListComponent.prototype.onSelect = function (location) {
        this.selectedLocation = location;
    };
    ContainerListComponent.prototype.onItemDrop = function (e, ky) {
        var _this = this;
        // Get the dropped data here 
        var draggedContainer = e.dragData;
        var previousLocation = draggedContainer.Location.Name;
        this.locationService.getLocationByName(ky)
            .subscribe(function (loc) {
            draggedContainer.Location = loc;
            _this.containerService.saveContainer(draggedContainer)
                .subscribe(function (id) {
                _this.containers[previousLocation] = __WEBPACK_IMPORTED_MODULE_5_underscore__["without"](_this.containers[previousLocation], _this.containers[previousLocation].find(function (cnt) { return cnt.ContainerId == id; }));
                _this.containers[ky] = _this.containers[ky].concat(draggedContainer);
            }, function (err) { return console.log(err); });
        });
    };
    ContainerListComponent.prototype.toggleEditable = function (cntnr) {
        cntnr.editable = !cntnr.editable;
    };
    ContainerListComponent.prototype.save = function (cntnr) {
        cntnr.editable = false;
        this.containerService.saveContainer(cntnr)
            .subscribe(function (id) { return cntnr.ContainerId = id; }, function (err) { return console.log(err); });
    };
    ContainerListComponent.prototype.racks = function (container) {
        //alert(loc.LocationId);
        this.router.navigate(['/racks', container.ContainerId]);
    };
    ContainerListComponent.prototype.create = function (loc) {
        var _loc = __WEBPACK_IMPORTED_MODULE_5_underscore__["find"](this.locations, (function (l) { return l.Name == loc; }));
        var cntnr = {
            ContainerId: -1,
            ContainerType: '',
            Description: 'New',
            Location: _loc,
            editable: true
        };
        this.containers[loc].push(cntnr);
        console.log(loc);
    };
    ContainerListComponent.prototype.getAllContainers = function () {
        var _this = this;
        //console.log('get all')
        this.containerService.getContainers()
            .subscribe(function (containers) {
            containers.forEach(function (c) { return c.editable = false; });
            var grouped = __WEBPACK_IMPORTED_MODULE_5_underscore__["groupBy"](containers, (function (c) { return c.Location.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n));
            _this.containers = grouped;
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    ContainerListComponent.prototype.getContainersById = function (id) {
        var _this = this;
        //console.log('in by Id')
        this.containerService.getContainerByLocationId(id)
            .subscribe(function (containers) {
            containers.forEach(function (c) { return c.editable = false; });
            var grouped = __WEBPACK_IMPORTED_MODULE_5_underscore__["groupBy"](containers, (function (c) { return c.Location.Name; }));
            //this.arrayOfKeys = _.sortBy(Object.keys(grouped), (n => n)); // arrayOfKeys needs to be gen from locations, otherwise empty ones don't display.
            _this.containers = grouped;
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    ContainerListComponent.prototype.getContainerTypes = function () {
        var _this = this;
        console.log('ctypes');
        this.containerService.getContainerTypes()
            .subscribe(function (containertypes) {
            _this.containerTypes = containertypes;
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    ContainerListComponent.prototype.getLocations = function () {
        var _this = this;
        console.log('locs');
        this.locationService.getLocations()
            .subscribe(function (sites) {
            var slocs = __WEBPACK_IMPORTED_MODULE_5_underscore__["map"](sites, (function (s) { return s.Locations; }));
            _this.locations = __WEBPACK_IMPORTED_MODULE_5_underscore__["flatten"](slocs, false);
            _this.arrayOfKeys = __WEBPACK_IMPORTED_MODULE_5_underscore__["sortBy"](__WEBPACK_IMPORTED_MODULE_5_underscore__["map"](_this.locations, function (l) { return l.Name; }), (function (n) { return n; }));
            console.log(_this.arrayOfKeys);
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    ContainerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            console.log(params['id']);
            _this.getContainerTypes();
            _this.getLocations();
            if (params['id'] == undefined) {
                _this.getAllContainers();
            }
            else {
                _this.getContainersById(+params['id']);
            }
        });
    };
    return ContainerListComponent;
}());
ContainerListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        //selector : 'users',
        template: __webpack_require__("../../../../../ng/Templates/container-list.component.html")
        //template : '<h1>Containers</h1>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_container_service__["a" /* ContainerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_container_service__["a" /* ContainerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_location_service__["a" /* LocationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_location_service__["a" /* LocationService */]) === "function" && _d || Object])
], ContainerListComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=container-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/horizontal-timeline.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ol, ul {\r\n  list-style: none;\r\n}\r\n\r\n.cd-horizontal-timeline {\r\n  opacity: 0;\r\n  margin: 2em auto;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.cd-horizontal-timeline::before {\r\n  /* never visible - this is used in jQuery to check the current MQ */\r\n  content: 'mobile';\r\n  display: none;\r\n}\r\n\r\n.cd-horizontal-timeline.loaded {\r\n  /* show the timeline after events position has been set (using JavaScript) */\r\n  opacity: 1;\r\n}\r\n\r\n.cd-horizontal-timeline .timeline {\r\n  position: relative;\r\n  height: 100px;\r\n  width: 90%;\r\n  max-width: 1200px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.cd-horizontal-timeline .events-wrapper {\r\n  position: relative;\r\n  height: 100%;\r\n  margin: 0 40px;\r\n  overflow: hidden;\r\n}\r\n\r\n.cd-horizontal-timeline .events-wrapper::after, .cd-horizontal-timeline .events-wrapper::before {\r\n  /* these are used to create a shadow effect at the sides of the timeline */\r\n  content: '';\r\n  position: absolute;\r\n  z-index: 2;\r\n  top: 0;\r\n  height: 100%;\r\n  width: 20px;\r\n}\r\n\r\n.cd-horizontal-timeline .events-wrapper::before {\r\n  left: 0;\r\n  background-image: linear-gradient(to right, #fff, rgba(248, 248, 248, 0));\r\n}\r\n\r\n.cd-horizontal-timeline .events-wrapper::after {\r\n  right: 0;\r\n  background-image: linear-gradient(to left, #fff, rgba(248, 248, 248, 0));\r\n}\r\n\r\n.cd-horizontal-timeline .events {\r\n  /* this is the grey line/timeline */\r\n  position: absolute;\r\n  z-index: 1;\r\n  left: 0;\r\n  top: 49px;\r\n  height: 2px;\r\n  /* width will be set using JavaScript */\r\n  background: #dfdfdf;\r\n  transition: transform 0.4s;\r\n}\r\n\r\n.cd-horizontal-timeline .filling-line {\r\n  /* this is used to create the green line filling the timeline */\r\n  position: absolute;\r\n  z-index: 1;\r\n  left: 0;\r\n  top: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: #7b9d6f;\r\n  transform: scaleX(0);\r\n  transform-origin: left center;\r\n  transition: transform 0.3s;\r\n}\r\n\r\n.cd-horizontal-timeline .events a {\r\n  position: absolute;\r\n  bottom: 0;\r\n  z-index: 2;\r\n  text-align: center;\r\n  font-size: 12px;\r\n  text-decoration: none;\r\n  padding-bottom: 15px;\r\n  color: #383838;\r\n  /* fix bug on Safari - text flickering while timeline translates */\r\n  transform: translateZ(0);\r\n}\r\n\r\n.cd-horizontal-timeline .events a::after {\r\n  /* this is used to create the event spot */\r\n  content: '';\r\n  position: absolute;\r\n  left: 50%;\r\n  right: auto;\r\n  transform: translateX(-50%);\r\n  bottom: -5px;\r\n  height: 8px;\r\n  width: 8px;\r\n  border-radius: 50%;\r\n  border: 2px solid #dfdfdf;\r\n  background-color: #f8f8f8;\r\n  transition: background-color 0.3s, border-color 0.3s;\r\n}\r\n\r\n.cd-horizontal-timeline .events a:hover::after {\r\n  background-color: #7b9d6f;\r\n  border-color: #7b9d6f;\r\n}\r\n\r\n.cd-horizontal-timeline .events a.selected {\r\n  pointer-events: none;\r\n}\r\n\r\n.cd-horizontal-timeline .events a.selected::after {\r\n  background-color: #7b9d6f;\r\n  border-color: #7b9d6f;\r\n}\r\n\r\n.cd-horizontal-timeline .events a.older-event::after {\r\n  border-color: #7b9d6f;\r\n}\r\n\r\n@media only screen and (min-width: 1100px) {\r\n  .cd-horizontal-timeline {\r\n    margin: 6em auto;\r\n  }\r\n\r\n  .cd-horizontal-timeline::before {\r\n    /* never visible - this is used in jQuery to check the current MQ */\r\n    content: 'desktop';\r\n  }\r\n}\r\n\r\n.cd-horizontal-timeline li span {\r\n  position: absolute;\r\n  left: 1700px;\r\n  bottom: -30px;\r\n  font-size: 12px;\r\n}\r\n\r\n.cd-timeline-navigation a {\r\n  /* these are the left/right arrows to navigate the timeline */\r\n  position: absolute;\r\n  z-index: 1;\r\n  top: 50%;\r\n  bottom: auto;\r\n  transform: translateY(-50%);\r\n  height: 34px;\r\n  width: 34px;\r\n  border-radius: 50%;\r\n  border: 2px solid #dfdfdf;\r\n  /* replace text with an icon */\r\n  overflow: hidden;\r\n  color: transparent;\r\n  text-indent: 100%;\r\n  white-space: nowrap;\r\n  transition: border-color 0.3s;\r\n}\r\n\r\n.cd-timeline-navigation a::after {\r\n  /* arrow icon */\r\n  content: '';\r\n  position: absolute;\r\n  height: 16px;\r\n  width: 16px;\r\n  left: 50%;\r\n  top: 50%;\r\n  bottom: auto;\r\n  right: auto;\r\n  transform: translateX(-50%) translateY(-50%);\r\n  background: url(/assets/images/cd-arrow.svg) no-repeat 0 0;\r\n}\r\n\r\n.cd-timeline-navigation a.prev {\r\n  left: 0;\r\n  transform: translateY(-50%) rotate(180deg);\r\n}\r\n\r\n.cd-timeline-navigation a.next {\r\n  right: 0;\r\n}\r\n\r\n.cd-timeline-navigation a:hover {\r\n  border-color: #7b9d6f;\r\n}\r\n\r\n.cd-timeline-navigation a.inactive {\r\n  cursor: not-allowed;\r\n}\r\n\r\n.cd-timeline-navigation a.inactive::after {\r\n  background-position: 0 -16px;\r\n}\r\n\r\n.cd-timeline-navigation a.inactive:hover {\r\n  border-color: #dfdfdf;\r\n}\r\n\r\n.cd-horizontal-timeline .events-content {\r\n  position: relative;\r\n  width: 100%;\r\n  margin: 2em 0;\r\n  overflow: hidden;\r\n  transition: height 0.4s;\r\n}\r\n\r\n.cd-horizontal-timeline .events-content li {\r\n  position: absolute;\r\n  z-index: 1;\r\n  width: 100%;\r\n  left: 0;\r\n  top: 0;\r\n  padding: 0 5%;\r\n  opacity: 0;\r\n}\r\n\r\n.cd-horizontal-timeline .events-content li > * {\r\n  max-width: 800px;\r\n  margin: 0 auto;\r\n}\r\n\r\n.cd-horizontal-timeline .events-content h2 {\r\n  font-weight: bold;\r\n  font-size: 2.6rem;\r\n  line-height: 1.2;\r\n}\r\n\r\n.cd-horizontal-timeline .events-content em {\r\n  display: block;\r\n  font-style: italic;\r\n  margin: 10px auto;\r\n}\r\n\r\n.cd-horizontal-timeline .events-content em::before {\r\n  content: '- ';\r\n}\r\n\r\n.cd-horizontal-timeline .events-content p {\r\n  font-size: 1.4rem;\r\n  color: #959595;\r\n}\r\n\r\n.cd-horizontal-timeline .events-content em, .cd-horizontal-timeline .events-content p {\r\n  line-height: 1.6;\r\n}\r\n\r\n@media only screen and (min-width: 768px) {\r\n  .cd-horizontal-timeline .events-content h2 {\r\n    font-size: 7rem;\r\n  }\r\n\r\n  .cd-horizontal-timeline .events-content em {\r\n    font-size: 2rem;\r\n  }\r\n\r\n  .cd-horizontal-timeline .events-content p {\r\n    font-size: 1.8rem;\r\n  }\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../ng/app/components/horizontal-timeline.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"cd-horizontal-timeline\" [ngClass]=\"{'loaded': loaded}\">\r\n  <div class=\"timeline\">\r\n    <div class=\"events-wrapper\">\r\n      <div class=\"events\" #eventsWrapper [style.width.px]=\"eventsWrapperWidth\">\r\n        <ol>\r\n          <li *ngFor=\"let item of timelineElements; let index = index\">\r\n            <a #timelineEvents href=\"#\" [ngClass]=\"{'selected': item.selected, 'older-event': index < selectedIndex}\"\r\n               (click)=\"onEventClick($event, item)\">{{item.date | date:dateFormat}}</a>\r\n            <span>{{item.caption}}</span>\r\n          </li>\r\n        </ol>\r\n        <span class=\"filling-line\" aria-hidden=\"true\" #fillingLine></span>\r\n      </div>\r\n    </div>\r\n\r\n    <ul class=\"cd-timeline-navigation\">\r\n      <li>\r\n        <a href=\"#\" (click)=\"onScrollClick($event, false)\" class=\"prev\" [ngClass]=\"{'inactive':prevLinkInactive}\">Prev</a>\r\n      </li>\r\n      <li>\r\n        <a href=\"#\" (click)=\"onScrollClick($event, true)\" class=\"next\" [ngClass]=\"{'inactive':nextLinkInactive}\">Next</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n\r\n  <div class=\"events-content\" *ngIf=\"showContent\">\r\n    <ol>\r\n      <li *ngFor=\"let item of timelineElements; let index = index\"\r\n          [@contentState]=\"item.selected ? 'active' : (index < selectedIndex ? 'left' : 'right')\">\r\n        <h5>{{item.title}}</h5>\r\n        <!-- <em>{{item.date | date:dateFormat}}</em> -->\r\n        <p>{{item.content}}</p>\r\n      </li>\r\n    </ol>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "../../../../../ng/app/components/horizontal-timeline.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HorizontalTimelineComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("../../../animations/@angular/animations.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HorizontalTimelineComponent = HorizontalTimelineComponent_1 = (function () {
    function HorizontalTimelineComponent(_cdr) {
        this._cdr = _cdr;
        this.prevLinkInactive = true;
        this.nextLinkInactive = false;
        this.loaded = false;
        this.selectedIndex = 0;
        this.eventsWrapperWidth = 0;
        this._viewInitialized = false;
        this._timelineWrapperWidth = 720;
        this._eventsMinDistance = 80;
        this._dateFormat = 'dd.MM.yyyy';
        this._disabled = false;
        this._showContent = false;
    }
    Object.defineProperty(HorizontalTimelineComponent.prototype, "timelineWrapperWidth", {
        set: function (value) {
            this._timelineWrapperWidth = value;
            this._cdr.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "eventsMinDistance", {
        set: function (value) {
            this._eventsMinDistance = value;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "timelineElements", {
        get: function () {
            return this._timelineElements;
        },
        set: function (value) {
            this._timelineElements = value;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "dateFormat", {
        get: function () {
            return this._dateFormat;
        },
        set: function (value) {
            this._dateFormat = value;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "disabled", {
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalTimelineComponent.prototype, "showContent", {
        get: function () {
            return this._showContent;
        },
        set: function (value) {
            this._showContent = value;
            this._cdr.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    HorizontalTimelineComponent.pxToNumber = function (val) {
        return Number(val.replace('px', ''));
    };
    HorizontalTimelineComponent.getElementWidth = function (element) {
        var computedStyle = window.getComputedStyle(element);
        if (!computedStyle.width) {
            return 0;
        }
        return HorizontalTimelineComponent_1.pxToNumber(computedStyle.width);
    };
    HorizontalTimelineComponent.parentElement = function (element, tagName) {
        if (!element || !element.parentNode) {
            return null;
        }
        var parent = element.parentNode;
        while (true) {
            if (parent.tagName.toLowerCase() == tagName) {
                return parent;
            }
            parent = parent.parentNode;
            if (!parent) {
                return null;
            }
        }
    };
    HorizontalTimelineComponent.getTranslateValue = function (timeline) {
        var timelineStyle = window.getComputedStyle(timeline);
        var timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
            timelineStyle.getPropertyValue('-moz-transform') ||
            timelineStyle.getPropertyValue('-ms-transform') ||
            timelineStyle.getPropertyValue('-o-transform') ||
            timelineStyle.getPropertyValue('transform');
        var translateValue = 0;
        if (timelineTranslate.indexOf('(') >= 0) {
            var timelineTranslateStr = timelineTranslate
                .split('(')[1]
                .split(')')[0]
                .split(',')[4];
            translateValue = Number(timelineTranslateStr);
        }
        return translateValue;
    };
    HorizontalTimelineComponent.setTransformValue = function (element, property, value) {
        element.style['-webkit-transform'] = property + '(' + value + ')';
        element.style['-moz-transform'] = property + '(' + value + ')';
        element.style['-ms-transform'] = property + '(' + value + ')';
        element.style['-o-transform'] = property + '(' + value + ')';
        element.style['transform'] = property + '(' + value + ')';
    };
    HorizontalTimelineComponent.dayDiff = function (first, second) {
        return Math.round(second.getTime() - first.getTime());
    };
    HorizontalTimelineComponent.minLapse = function (elements) {
        if (elements && elements.length && elements.length === 1) {
            return 0;
        }
        var result = 0;
        for (var i = 1; i < elements.length; i++) {
            var distance = HorizontalTimelineComponent_1.dayDiff(elements[i - 1].date, elements[i].date);
            result = result ? Math.min(result, distance) : distance;
        }
        return result;
    };
    HorizontalTimelineComponent.prototype.ngAfterViewInit = function () {
        this._cdr.detach();
        this._viewInitialized = true;
        this.initView();
    };
    HorizontalTimelineComponent.prototype.onScrollClick = function (event, forward) {
        event.preventDefault();
        this.updateSlide(this.eventsWrapperWidth, forward);
        this._cdr.detectChanges();
    };
    HorizontalTimelineComponent.prototype.onEventClick = function (event, selectedItem) {
        event.preventDefault();
        if (this._disabled) {
            return;
        }
        var element = event.target;
        // detect click on the a single event - show new event content
        var visibleItem = this._timelineElements[0];
        this._timelineElements.forEach(function (item) {
            if (item.selected && item != selectedItem) {
                visibleItem = item;
                item.selected = false;
            }
        });
        this.selectedIndex = this._timelineElements.indexOf(selectedItem);
        selectedItem.selected = true;
        this.updateFilling(element);
        this._cdr.detectChanges();
    };
    HorizontalTimelineComponent.prototype.initTimeline = function (timeLines) {
        var eventsMinLapse = HorizontalTimelineComponent_1.minLapse(timeLines);
        // assign a left position to the single events along the timeline
        this.setDatePosition(timeLines, this._eventsMinDistance, eventsMinLapse);
        // assign a width to the timeline
        this.setTimelineWidth(timeLines, this._eventsMinDistance, eventsMinLapse);
        // the timeline has been initialize - show it
        this.loaded = true;
    };
    HorizontalTimelineComponent.prototype.updateSlide = function (timelineTotWidth, forward) {
        var translateValue = HorizontalTimelineComponent_1.getTranslateValue(this.eventsWrapper.nativeElement);
        if (forward) {
            this.translateTimeline(translateValue - this._timelineWrapperWidth + this._eventsMinDistance, this._timelineWrapperWidth - timelineTotWidth);
        }
        else {
            this.translateTimeline(translateValue + this._timelineWrapperWidth - this._eventsMinDistance, null);
        }
    };
    HorizontalTimelineComponent.prototype.updateTimelinePosition = function (element) {
        var eventStyle = window.getComputedStyle(element);
        var eventLeft = HorizontalTimelineComponent_1.pxToNumber(eventStyle.getPropertyValue('left'));
        var translateValue = HorizontalTimelineComponent_1.getTranslateValue(this.eventsWrapper.nativeElement);
        if (eventLeft > this._timelineWrapperWidth - translateValue) {
            this.translateTimeline(-eventLeft + this._timelineWrapperWidth / 2, this._timelineWrapperWidth - this.eventsWrapperWidth);
        }
    };
    HorizontalTimelineComponent.prototype.translateTimeline = function (value, totWidth) {
        // only negative translate value
        value = (value > 0) ? 0 : value;
        // do not translate more than timeline width
        value = (!(totWidth === null) && value < totWidth) ? totWidth : value;
        HorizontalTimelineComponent_1.setTransformValue(this.eventsWrapper.nativeElement, 'translateX', value + 'px');
        // update navigation arrows visibility
        this.prevLinkInactive = value === 0;
        this.nextLinkInactive = value === totWidth;
    };
    HorizontalTimelineComponent.prototype.setTimelineWidth = function (elements, width, eventsMinLapse) {
        var timeSpan = 100;
        if (elements.length > 1) {
            timeSpan = HorizontalTimelineComponent_1.dayDiff(elements[0].date, elements[elements.length - 1].date);
        }
        var timeSpanNorm = timeSpan / eventsMinLapse;
        timeSpanNorm = Math.round(timeSpanNorm) + 4;
        this.eventsWrapperWidth = timeSpanNorm * width;
        var aHref = this.eventsWrapper.nativeElement.querySelectorAll('a.selected')[0];
        this.updateFilling(aHref);
        this.updateTimelinePosition(aHref);
        return this.eventsWrapperWidth;
    };
    HorizontalTimelineComponent.prototype.updateFilling = function (element) {
        // change .filling-line length according to the selected event
        var eventStyle = window.getComputedStyle(element);
        var eventLeft = eventStyle.getPropertyValue('left');
        var eventWidth = eventStyle.getPropertyValue('width');
        var eventLeftNum = HorizontalTimelineComponent_1.pxToNumber(eventLeft) + HorizontalTimelineComponent_1.pxToNumber(eventWidth) / 2;
        var scaleValue = eventLeftNum / this.eventsWrapperWidth;
        HorizontalTimelineComponent_1.setTransformValue(this.fillingLine.nativeElement, 'scaleX', scaleValue);
    };
    HorizontalTimelineComponent.prototype.initView = function () {
        if (!this._viewInitialized) {
            return;
        }
        if (this._timelineElements && this._timelineElements.length) {
            for (var i = 0; i < this._timelineElements.length; i++) {
                if (this._timelineElements[i].selected) {
                    this.selectedIndex = i;
                    break;
                }
            }
            this.initTimeline(this._timelineElements);
        }
        this._cdr.detectChanges();
    };
    HorizontalTimelineComponent.prototype.setDatePosition = function (elements, min, eventsMinLapse) {
        var timelineEventsArray = this.timelineEvents.toArray();
        console.log(timelineEventsArray);
        var i = 0;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var component = elements_1[_i];
            var distance = HorizontalTimelineComponent_1.dayDiff(elements[0].date, component.date);
            var distanceNorm = Math.round(distance / eventsMinLapse);
            timelineEventsArray[i].nativeElement.style.left = distanceNorm * min + 'px';
            // span
            var span = timelineEventsArray[i].nativeElement.parentElement.children[1];
            var spanWidth = HorizontalTimelineComponent_1.getElementWidth(span);
            span.style.left = distanceNorm * min + spanWidth / 2 + 'px';
            i++;
        }
    };
    return HorizontalTimelineComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('eventsWrapper'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], HorizontalTimelineComponent.prototype, "eventsWrapper", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fillingLine'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], HorizontalTimelineComponent.prototype, "fillingLine", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('timelineEvents'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === "function" && _c || Object)
], HorizontalTimelineComponent.prototype, "timelineEvents", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], HorizontalTimelineComponent.prototype, "timelineWrapperWidth", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], HorizontalTimelineComponent.prototype, "eventsMinDistance", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], HorizontalTimelineComponent.prototype, "timelineElements", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], HorizontalTimelineComponent.prototype, "dateFormat", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], HorizontalTimelineComponent.prototype, "disabled", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], HorizontalTimelineComponent.prototype, "showContent", null);
HorizontalTimelineComponent = HorizontalTimelineComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'horizontal-timeline',
        template: __webpack_require__("../../../../../ng/app/components/horizontal-timeline.component.html"),
        styles: [__webpack_require__("../../../../../ng/app/components/horizontal-timeline.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('contentState', [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('active', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                    position: 'relative', 'z-index': 2, opacity: 1,
                })),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('right => active', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateX(100%)'
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
                    ]))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('active => right', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateX(-100%)'
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                    ]))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('active => left', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateX(-100%)'
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
                    ]))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('left => active', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                        transform: 'translateX(100%)'
                    }),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])('400ms ease-in-out', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
                    ]))
                ]),
            ])
        ]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _d || Object])
], HorizontalTimelineComponent);

var HorizontalTimelineComponent_1, _a, _b, _c, _d;
//# sourceMappingURL=horizontal-timeline.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/loc-despatch-locs-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationDespatchSitesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("../../../../../ng/app/types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_location_service__ = __webpack_require__("../../../../../ng/app/services/location.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//loc-despatch-locs-list.component.ts




var LocationDespatchSitesComponent = (function () {
    function LocationDespatchSitesComponent(locationService) {
        this.locationService = locationService;
    }
    LocationDespatchSitesComponent.prototype.onMemberShipChanged = function (location) {
        console.log(this.location);
        var despatchLocations = __WEBPACK_IMPORTED_MODULE_3_underscore__["filter"](__WEBPACK_IMPORTED_MODULE_3_underscore__["flatten"](this.location.DespatchLocations.map(function (s) { return s.LocationMembership.map(function (lm) { return lm.IsMember ? lm.LocationId : 0; }); }), true), function (l) { return l > 0; });
        console.log(despatchLocations);
        this.locationService.updateDespatchLocations(this.location.LocationId, despatchLocations)
            .subscribe(function (uid) { return console.log(uid); }, function (err) { return console.log(err); });
    };
    return LocationDespatchSitesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], LocationDespatchSitesComponent.prototype, "sites", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__types__["a" /* LocationsDespatchLocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__types__["a" /* LocationsDespatchLocation */]) === "function" && _a || Object)
], LocationDespatchSitesComponent.prototype, "location", void 0);
LocationDespatchSitesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'location-despatch-sites',
        template: __webpack_require__("../../../../../ng/Templates/location-despatch-sites.component.html"),
        styles: ["\n        td{font-family : monospace;}\n        table { background-color: white;\n                border-collapse: collapse;\n                width:100%;\n        }\n        table, th, td {\n            border: 1px solid black;\n            padding : 5px;\n        }"
        ]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */]) === "function" && _b || Object])
], LocationDespatchSitesComponent);

var _a, _b;
//# sourceMappingURL=loc-despatch-locs-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/location-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_location_service__ = __webpack_require__("../../../../../ng/app/services/location.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LocationListComponent = (function () {
    function LocationListComponent(router, locationService) {
        this.router = router;
        this.locationService = locationService;
    }
    LocationListComponent.prototype.onSelect = function (location) {
        console.log(location);
        this.selectedLocation = location;
    };
    LocationListComponent.prototype.toggleEditable = function (loc) {
        loc.editable = !loc.editable;
    };
    LocationListComponent.prototype.accordionClick = function () {
        //this.selectedLocation = null;
    };
    //save(loc: LocationsDespatchLocation): void {
    LocationListComponent.prototype.save = function (loc) {
        loc.editable = false;
        this.locationService.upsertLocation(loc)
            .subscribe(function (uid) { return console.log(uid); }, function (err) { return console.log(err); });
    };
    LocationListComponent.prototype.containers = function (loc) {
        //alert(loc.LocationId);
        this.router.navigate(['/containers', loc.LocationId]);
    };
    LocationListComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocationsWithDespatchLocations()
            .subscribe(function (sites) {
            sites.forEach(function (s) {
                return s.LocationsDespatchLocations.forEach(function (l) { return l.editable = false; });
            });
            //this.sites = _.sortBy(sites, (n => n)); //WTF ?
            _this.sites = sites;
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    LocationListComponent.prototype.ngOnInit = function () {
        this.getLocations();
    };
    return LocationListComponent;
}());
LocationListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        //selector : 'users',
        template: __webpack_require__("../../../../../ng/Templates/site-locations-list.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */]) === "function" && _b || Object])
], LocationListComponent);

var _a, _b;
//# sourceMappingURL=location-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ModalComponent = (function () {
    function ModalComponent() {
        this.visible = false;
        this.visibleAnimate = false;
    }
    ModalComponent.prototype.show = function () {
        var _this = this;
        this.visible = true;
        setTimeout(function () { return _this.visibleAnimate = true; }, 100);
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    ModalComponent.prototype.onContainerClicked = function (event) {
        if (event.target.classList.contains('modal')) {
            this.hide();
        }
    };
    return ModalComponent;
}());
ModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-modal',
        template: "\n  <div (click)=\"onContainerClicked($event)\" class=\"modal fade\" role = \"dialog\" tabindex=\"-1\" [ngClass]=\"{'in': visibleAnimate}\"\n       [ngStyle]=\"{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}\">\n    <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <ng-content select=\".app-modal-header\"></ng-content>\n        </div>\n        <div class=\"modal-body\">\n          <ng-content select=\".app-modal-body\"></ng-content>\n        </div>\n        <div class=\"modal-footer\">\n          <ng-content select=\".app-modal-footer\"></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
        styles: ["\n    .modal {\n      background: rgba(0,0,0,0.6);\n    }\n    .modal.fade .modal-dialog {\n        transform: translate(0, 25%)\n    }\n  "]
    }),
    __metadata("design:paramtypes", [])
], ModalComponent);

//# sourceMappingURL=modal.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/pak-box-samples.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PackBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sample_service__ = __webpack_require__("../../../../../ng/app/services/sample.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_box_service__ = __webpack_require__("../../../../../ng/app/services/box.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_location_service__ = __webpack_require__("../../../../../ng/app/services/location.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_sounds_service__ = __webpack_require__("../../../../../ng/app/services/sounds.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_global_service__ = __webpack_require__("../../../../../ng/app/services/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










//import { AfterViewInit, AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

var PackBoxComponent = (function () {
    function PackBoxComponent(route, router, sampleService, boxService, locationService, soundService, globalsService, toastr, vcr) {
        this.route = route;
        this.router = router;
        this.sampleService = sampleService;
        this.boxService = boxService;
        this.locationService = locationService;
        this.soundService = soundService;
        this.globalsService = globalsService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.sampleTypes = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
        this.postInProgress = false;
        this.toastr.setRootViewContainerRef(vcr);
    }
    PackBoxComponent.prototype.getXHRData = function (boxid) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"].forkJoin(this.sampleService.getSamplesByBoxId(boxid), this.boxService.getChildBoxes(boxid), this.boxService.getBoxByBoxId(boxid), this.locationService.getAllSiteLocations(), this.locationService.getDespatchLoctions())
            .subscribe(function (res) {
            _this.samples = res[0];
            _this.childBoxes = res[1];
            var box = res[2];
            _this.allLocations = __WEBPACK_IMPORTED_MODULE_8_underscore__["flatten"](__WEBPACK_IMPORTED_MODULE_8_underscore__["map"](res[3], (function (s) { return s.Locations; })));
            var emptyLoc = {
                LocationId: -1,
                Name: '*select despatch location*',
                PrinterIp: '',
                LabelFormat: null,
                editable: false
            };
            var despatchlocs = (res[4]).concat(emptyLoc);
            _this.despatchLocations = __WEBPACK_IMPORTED_MODULE_8_underscore__["sortBy"](despatchlocs, (function (l) { return l.Name; }));
            box.Event = 'Started packing @ ' + _this.globalsService.Context.Location;
            switch (box.Status) {
                case 'Unpacked':
                    box.Status = 'BeingPacked';
                    box.LastLocation = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](_this.allLocations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                    _this.boxService.saveBox(box).subscribe(function (b) {
                        _this.box = b;
                        _this.toastr.success(box.Description + ' status & location updated'), function (err) { return _this.toastr.error(err, 'Oh No!'); };
                    });
                    break;
                case 'BeingPacked':
                    //case 'Despatched':
                    console.log(_this.globalsService.Context.LocationId, box.LastLocation, __WEBPACK_IMPORTED_MODULE_8_underscore__["isEqual"](box.LastLocation.LocationId, _this.globalsService.Context.LocationId));
                    if (box.LastLocation.LocationId == _this.globalsService.Context.LocationId) {
                        box.Status = 'BeingPacked';
                        box.LastLocation = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](_this.allLocations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                        _this.boxService.saveBox(box).subscribe(function (b) {
                            _this.box = b;
                            _this.toastr.success(box.Description + ' status updated'), function (err) { return _this.toastr.error(err, 'Oh dear!'); };
                        });
                    }
                    else {
                        _this.box = box;
                        _this.moveBoxModal.show();
                    }
                    break;
                default:
                    _this.soundService.beep('bong');
                    _this.toastr.error(box.Description + ' is in ' + box.Status + ' status.', 'Wrong status!', { dismiss: 'controlled' })
                        .then(function (toast) {
                        setTimeout(function () {
                            _this.toastr.dismissToast(toast);
                            _this.router.navigate(['/pack']);
                        }, 2000);
                    });
                    break;
            }
        }, function (err) {
            return _this.toastr.error(err, 'Error!', { dismiss: 'controlled' })
                .then(function (toast) {
                setTimeout(function () {
                    _this.toastr.dismissToast(toast);
                    _this.router.navigate(['/pack']);
                }, 2000);
            });
        });
    };
    PackBoxComponent.prototype.labnoScanned = function (event) {
        var _this = this;
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.toUpperCase().replace('-', '');
            switch (entry.startsWith('BOX')) {
                //this is a box.
                case true:
                    var boxId_1 = +entry.replace('BOX', '');
                    if (boxId_1 === this.box.BoxId) {
                        this.toastr.error('You can\'t pack a box in itself!', 'No!');
                        this.soundService.beep('bong');
                        event.target.value = '';
                        this.postInProgress = false;
                        break;
                    }
                    if (this.box.BoxType === "Fixed Box") {
                        this.toastr.error('You can\'t pack a box in a fixed box', 'No!');
                        this.soundService.beep('bong');
                        event.target.value = '';
                        this.postInProgress = false;
                        break;
                    }
                    if (__WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.childBoxes, function (box) { return box.BoxId === boxId_1; })) {
                        this.toastr.error('That box is already packed!', 'No!');
                        this.soundService.beep('bong');
                        event.target.value = '';
                        this.postInProgress = false;
                        break;
                    }
                    else {
                        this.boxService.getBoxByBoxId(boxId_1)
                            .subscribe(function (box) {
                            console.log(box.BoxType);
                            var newbox = box;
                            var childBoxTransient = false;
                            switch (box.BoxType) {
                                case 'Fixed Box':
                                    //create a box on the fly,
                                    _this.fixedBoxId = boxId_1;
                                    childBoxTransient = true; //flag to indicate this child box is a transient one.
                                    newbox = {
                                        ParentBoxId: _this.box.BoxId,
                                        BoxId: -1,
                                        BoxType: 'Transient Box',
                                        Description: box.Description,
                                        LastLocation: box.LastLocation,
                                        Destination: box.Destination,
                                        LastMoved: new Date(),
                                        User: box.User,
                                        Status: 'BeingPacked',
                                        Event: "Packed in " + _this.box.Description,
                                        TrackingAuditId: box.TrackingAuditId,
                                        editable: true
                                    };
                                    _this.newBox = newbox;
                                    _this.setFixedBoxDestintationModal.show();
                                    break;
                                default:
                                    //pack the new box in the parent
                                    newbox.ParentBoxId = _this.box.BoxId;
                                    newbox.Status = 'BeingPacked'; // ? or perhaps straight to Despatched
                                    newbox.Event = "Packed in " + _this.box.Description;
                                    newbox.LastLocation = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](_this.allLocations, (function (l) { return l.LocationId === _this.globalsService.Context.LocationId; }));
                                    _this.boxService.packChildBox(newbox).subscribe(function (newBoxId) {
                                        /*
                                        if (childBoxTransient) {
                                          this.boxService.moveBoxSamples(boxId, newBoxId)
                                            .subscribe(
                                              resp => {
                                                //console.log(resp)
                                                newbox.BoxId = newBoxId
                                                this.boxService.printLabel(newBoxId)
                                                  .subscribe(box => {
                                                    console.log(box)
                                                  },
                                                    err => this.toastr.error("No label printer", "box id is " + err)
                                                  )
                                              },
                                              err => console.log(err)
                                            )
                                        }
                                        */
                                        _this.childBoxes.push(newbox);
                                        _this.toastr.success("box " + newbox.Description + " added.", "Success!");
                                        _this.soundService.beep('beep');
                                    }, function (err) {
                                        console.log(err);
                                        _this.toastr.error(err._body, 'Nooooo!');
                                        _this.soundService.beep('bong');
                                    });
                                    break;
                            }
                        }, function (err) {
                            _this.toastr.error(err, 'Nooooo!');
                            _this.soundService.beep('bong');
                            event.target.value = '';
                            _this.postInProgress = false;
                        }, function () {
                            event.target.value = '';
                            _this.postInProgress = false;
                        });
                        console.log(this.childBoxes);
                    }
                    break;
                //a sample.
                default:
                    var labno = '';
                    var smptypID = 0;
                    //convert to switch
                    if (entry.length == 10) {
                        labno = entry.substr(0, 9);
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
                    console.log(this.box);
                    var sample_1 = { SampleId: 0, SampleNo: labno, SampTypeSuffix: smptypID, Row: 0, Col: 0, BoxId: this.box.BoxId, SampleType: this.sampleTypes[smptypID], DateTime: new Date(), TrackingAuditId: this.box.TrackingAuditId, Event: 'Packed in ' + this.box.Description + ' @ ' + this.globalsService.Context.Location };
                    this.sampleService.saveSample(sample_1)
                        .subscribe(function (id) {
                        sample_1.SampleId = id;
                        _this.samples = _this.samples.concat(sample_1);
                        event.target.value = '';
                        _this.postInProgress = false;
                        _this.soundService.beep('beep');
                        _this.toastr.success(sample_1.SampleNo + ' packed!', 'Success!');
                    }, function (err) {
                        _this.toastr.error(err, 'Nooooo!'); //, { positionClass: 'toast-bottom-right' });
                        _this.soundService.beep('bong');
                        event.target.value = '';
                        _this.postInProgress = false;
                    });
                    break;
            }
        }
        else {
            this.soundService.beep('bong');
        }
        var a = this.el.nativeElement;
        a.focus();
    };
    PackBoxComponent.prototype.onDestinationChanged = function (event) {
        //console.log(event.target.value);
        this.despatchLocation = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.despatchLocations, (function (l) { return l.LocationId == event.target.value; }));
    };
    PackBoxComponent.prototype.onChildBoxDestinationChanged = function (event) {
        this.childBoxDespatchLocation = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.despatchLocations, (function (l) { return l.LocationId == event.target.value; }));
    };
    PackBoxComponent.prototype.samplesChanged = function (evt) {
        this.toastr.success(evt.SampleNo + ' removed!', "");
        this.samples = __WEBPACK_IMPORTED_MODULE_8_underscore__["without"](this.samples, evt);
        //if there's no samples left, reset the current Pos to {1,0}
    };
    PackBoxComponent.prototype.boxesChanged = function (evt) {
        this.toastr.success(evt.Description + ' removed!', "");
        this.childBoxes = __WEBPACK_IMPORTED_MODULE_8_underscore__["without"](this.childBoxes, evt);
    };
    PackBoxComponent.prototype.navigateToParent = function () {
        console.log(this.box.ParentBoxId);
        this.router.navigate(['/packsamples', +this.box.ParentBoxId]);
    };
    PackBoxComponent.prototype.checkEmptyUpdateStatus = function () {
        var _this = this;
        //check if empty
        console.log('checking empty ...', this.samples, this.childBoxes, this.box);
        if (this.samples.length === 0 && this.childBoxes.length === 0) {
            this.box.Status = 'Unpacked';
            this.boxService.saveBox(this.box).subscribe(function (box) {
                _this.box = box;
                _this.toastr.info(' box empty', 'Success!', { dismiss: 'controlled' })
                    .then(function (toast) {
                    setTimeout(function () {
                        _this.toastr.dismissToast(toast);
                        _this.router.navigate(['/unpack']);
                    }, 2000);
                });
            });
        }
    };
    PackBoxComponent.prototype.despatchBox = function () {
        var _this = this;
        if (this.despatchLocation == undefined) {
            this.despatchLocationNotSelectedModal.show();
            //this.despatchLocation = this.locations[0];
        }
        else {
            if (this.samples.length > 0 || this.childBoxes.length > 0) {
                this.box.Destination = this.despatchLocation;
                this.box.Status = 'Despatched'; //?In transit
                this.box.Event = 'Despatched from ' + this.box.LastLocation.Name + ' to ' + this.despatchLocation.Name;
                //update for all child boxes. ???? and all the boxes inside the boxes, recursively. Prolly better to do this on the server
                console.log(this.box);
                this.boxService.saveBox(this.box)
                    .subscribe(function (box) {
                    _this.box = box;
                    _this.soundService.beep('beep');
                    _this.router.navigate(['/pack']);
                });
            }
            else {
                this.toastr.error('... to depatch.', 'There is nowt ...');
            }
        }
    };
    PackBoxComponent.prototype.moveBoxModalHandler = function (modal, yesno) {
        var _this = this;
        console.log(yesno);
        switch (yesno) {
            case 0:
                modal.hide();
                this.router.navigate(['/pack']);
                break;
            case 1:
                this.box.LastLocation = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.allLocations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                this.box.Status = 'BeingPacked';
                //this.globalsService.Location;
                this.boxService.saveBox(this.box)
                    .subscribe(function (b) {
                    _this.box = b;
                    _this.toastr.success(_this.box.Description + ' status & location updated');
                }, function (err) {
                    _this.toastr.error(err, 'Oh dear!');
                }, function () { return modal.hide(); });
                break;
            default:
                break;
        }
    };
    PackBoxComponent.prototype.setFixedBoxDestintationModalHandler = function (modal) {
        var _this = this;
        this.newBox.Destination = this.childBoxDespatchLocation;
        this.boxService.packChildBox(this.newBox).subscribe(function (newBoxId) {
            //if (childBoxTransient) {
            _this.boxService.moveBoxSamples(_this.fixedBoxId, newBoxId)
                .subscribe(function (resp) {
                //console.log(resp)
                _this.newBox.BoxId = newBoxId;
                _this.boxService.printLabel(newBoxId)
                    .subscribe(function (box) {
                    console.log(box);
                }, function (err) { return _this.toastr.error("No label printer", "box id is " + err); });
            }, function (err) { return console.log(err); });
            //}
            _this.childBoxes.push(_this.newBox);
            _this.toastr.success("box " + _this.newBox.Description + " added.", "Success!");
            _this.soundService.beep('beep');
            var a = _this.el.nativeElement;
            a.focus();
        }, function (err) {
            console.log(err);
            _this.toastr.error(err._body, 'Nooooo!');
            _this.soundService.beep('bong');
        });
        modal.hide();
    };
    PackBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            var a = _this.el.nativeElement;
            a.focus();
            if (params['id'] == undefined) { }
            else {
                _this.getXHRData(+params['id']);
            }
        });
    };
    return PackBoxComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('moveBoxModal'),
    __metadata("design:type", Object)
], PackBoxComponent.prototype, "moveBoxModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('setFixedBoxDestintationModal'),
    __metadata("design:type", Object)
], PackBoxComponent.prototype, "setFixedBoxDestintationModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('despatchLocationNotSelectedModal'),
    __metadata("design:type", Object)
], PackBoxComponent.prototype, "despatchLocationNotSelectedModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('labno'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], PackBoxComponent.prototype, "el", void 0);
PackBoxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../ng/Templates/pack-box-samples.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_box_service__["a" /* BoxService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_box_service__["a" /* BoxService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__services_location_service__["a" /* LocationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_location_service__["a" /* LocationService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__services_sounds_service__["a" /* SoundService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_sounds_service__["a" /* SoundService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__services_global_service__["a" /* GlobalsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_global_service__["a" /* GlobalsService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _k || Object])
], PackBoxComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=pak-box-samples.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/rack-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RackListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_rack_service__ = __webpack_require__("../../../../../ng/app/services/rack.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_global_service__ = __webpack_require__("../../../../../ng/app/services/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RackListComponent = (function () {
    function RackListComponent(route, router, rackService, globalsService) {
        this.route = route;
        this.router = router;
        this.rackService = rackService;
        this.globalsService = globalsService;
    }
    RackListComponent.prototype.getAllRacks = function () {
        var _this = this;
        console.log('get all');
        this.rackService.getRacks()
            .subscribe(function (cracks) {
            cracks.forEach(function (cr) { return cr.Racks.forEach(function (r) { return r.editable = false; }); });
            _this.cracks = __WEBPACK_IMPORTED_MODULE_5_underscore__["sortBy"](cracks, (function (cr) { return cr.Container.Description; }));
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    RackListComponent.prototype.getRacksById = function (id) {
        var _this = this;
        console.log('in by Id');
        this.rackService.getRackByContainerId(id)
            .subscribe(function (cracks) {
            cracks.forEach(function (cr) { return cr.Racks.forEach(function (r) { return r.editable = false; }); });
            _this.cracks = __WEBPACK_IMPORTED_MODULE_5_underscore__["sortBy"](cracks, (function (cr) { return cr.Container.Description; }));
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    RackListComponent.prototype.toggleEditable = function (rack) {
        rack.editable = !rack.editable;
    };
    RackListComponent.prototype.samples = function (rack) {
        this.router.navigate(['/racksamples', rack.RackId]);
    };
    RackListComponent.prototype.save = function (rack) {
        rack.editable = false;
        this.rackService.saveRack(rack)
            .subscribe(function (id) {
            rack.RackId = id;
            console.log(rack);
        }, function (err) { return console.log(err); });
    };
    RackListComponent.prototype.create = function (crack) {
        var rack = { RackId: -1, Description: 'New Rack', Rows: 0, Cols: 0, ContainerId: crack.Container.ContainerId, Status: 'Empty', editable: true };
        crack.Racks.push(rack);
    };
    RackListComponent.prototype.onItemDrop = function (e, cr) {
        var _this = this;
        // Get the dropped data here 
        var draggedRack = e.dragData;
        var prevContainerId = draggedRack.ContainerId;
        draggedRack.ContainerId = cr.Container.ContainerId;
        this.rackService.saveRack(draggedRack)
            .subscribe(function (r) {
            var oldCrack = _this.cracks.find(function (cr) { return cr.Container.ContainerId === prevContainerId; });
            oldCrack.Racks = __WEBPACK_IMPORTED_MODULE_5_underscore__["without"](oldCrack.Racks, draggedRack);
            var newCrack = _this.cracks.find(function (svrcr) { return svrcr.Container.ContainerId === cr.Container.ContainerId; });
            newCrack.Racks = newCrack.Racks.concat(draggedRack);
            console.log(newCrack);
        });
    };
    RackListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.globalsService.getContext().subscribe(function (b) {
                _this.isAdmin = _this.globalsService.Context.Admin;
                if (params['id'] == undefined) {
                    _this.getAllRacks();
                }
                else {
                    _this.getRacksById(+params['id']);
                }
            });
        });
    };
    return RackListComponent;
}());
RackListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        //selector : 'users',
        template: __webpack_require__("../../../../../ng/Templates/rack-list.component.html")
        //template : '<h1>Containers</h1>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_rack_service__["a" /* RackService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_rack_service__["a" /* RackService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_global_service__["a" /* GlobalsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_global_service__["a" /* GlobalsService */]) === "function" && _d || Object])
], RackListComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=rack-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/sample-audit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleAuditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_sample_service__ = __webpack_require__("../../../../../ng/app/services/sample.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SampleAuditComponent = (function () {
    function SampleAuditComponent(route, router, sampleService, toastr, vcr) {
        this.route = route;
        this.router = router;
        this.sampleService = sampleService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.toastr.setRootViewContainerRef(vcr);
    }
    SampleAuditComponent.prototype.getSampleAudits = function (smpno) {
        var _this = this;
        switch (smpno.length) {
            case 10:
                var sampno = smpno.substr(0, 9);
                this.sampleService.getSampleAudits(smpno)
                    .subscribe(function (sampauds) { return _this.sampleAudits = sampauds; }, function (err) { return console.log(err); });
                break;
            default:
                this.sampleService.getSampleAudits(smpno)
                    .subscribe(function (sampauds) { return _this.sampleAudits = sampauds; }, function (err) { return console.log(err); });
                break;
        }
    };
    SampleAuditComponent.prototype.samples = function (s) {
        if (s.BoxId > 0) {
            this.router.navigate(['/boxaudit', s.BoxId]); //SampleAudit type needs Box/Rack ids.
        }
        if (s.RackId > 0) {
            this.router.navigate(['/racksamples', s.RackId]); //SampleAudit type needs Box/Rack ids.
        }
        //this.toastr.info('not found','?');
    };
    SampleAuditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.sampleNo = params['id'];
            _this.getSampleAudits(_this.sampleNo);
        });
    };
    return SampleAuditComponent;
}());
SampleAuditComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../ng/Templates/sample-audit.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_sample_service__["a" /* SampleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_sample_service__["a" /* SampleService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _e || Object])
], SampleAuditComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=sample-audit.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/samples-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_sample_service__ = __webpack_require__("../../../../../ng/app/services/sample.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SampleListComponent = (function () {
    function SampleListComponent(sampleService, toastr, vcr) {
        this.sampleService = sampleService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.removalMessage = "";
        this.SamplesChangedEvt = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.toastr.setRootViewContainerRef(vcr);
    }
    Object.defineProperty(SampleListComponent.prototype, "samples", {
        set: function (samples) {
            this.reverseSortedSamples = __WEBPACK_IMPORTED_MODULE_3_underscore__["sortBy"](samples, function (s, i) { return -i; });
        },
        enumerable: true,
        configurable: true
    });
    SampleListComponent.prototype.missing = function (s) {
        var _this = this;
        //set event to missing from this box.
        //remove from the box
        switch (this.parent) {
            case 'pack':
            case 'unpack':
                s.Event = "Not received in BOX" + s.BoxId + " @ " + (new Date).toShortDateTimeString();
                break;
            //case 'store':
            //    s.Event = "Removed from RACK" + s.RackId + " @ " + (new Date).toString();
            //    break;
            default:
                s.Event = "Missing @ " + (new Date).toShortDateTimeString();
                break;
        }
        this.sampleService.saveSample(s)
            .subscribe(function (id) {
            s.SampleId = id;
            _this.sampleService.destroySample(s).subscribe(function (id) {
                _this.reverseSortedSamples = __WEBPACK_IMPORTED_MODULE_3_underscore__["without"](_this.reverseSortedSamples, s);
                _this.SamplesChangedEvt.emit(s);
            });
        }, function (err) { return _this.toastr.error(err, 'Error'); });
    };
    SampleListComponent.prototype.sampleRemoved = function (sampleRemovedModal) {
        var _this = this;
        console.log(sampleRemovedModal);
        var s = this.contextSample;
        switch (this.parent) {
            case 'pack':
                s.Event = "Removed from BOX " + s.BoxId + " @ " + (new Date).toShortDateTimeString() + " : " + this.removalMessage;
                break;
            case 'store':
                s.Event = "Removed from RACK " + s.RackId + " @ " + (new Date).toShortDateTimeString() + " : " + this.removalMessage;
                break;
            default:
                s.Event = "Removed " + (new Date).toShortDateTimeString() + " : " + this.removalMessage;
                break;
        }
        this.sampleService.saveSample(s)
            .subscribe(function (id) {
            s.SampleId = id;
            _this.sampleService.destroySample(s).subscribe(function (id) {
                _this.reverseSortedSamples = __WEBPACK_IMPORTED_MODULE_3_underscore__["without"](_this.reverseSortedSamples, s);
                _this.SamplesChangedEvt.emit(s);
            });
        }, function (err) { return _this.toastr.error(err, 'Error'); });
        sampleRemovedModal.hide();
    };
    SampleListComponent.prototype.remove = function (s) {
        this.sampleRemovedModal.show();
        this.contextSample = s;
    };
    return SampleListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('sampleRemovedModal'),
    __metadata("design:type", Object)
], SampleListComponent.prototype, "sampleRemovedModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SampleListComponent.prototype, "parent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], SampleListComponent.prototype, "samples", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], SampleListComponent.prototype, "SamplesChangedEvt", void 0);
SampleListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'sample-list',
        template: __webpack_require__("../../../../../ng/Templates/samples-list.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_sample_service__["a" /* SampleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_sample_service__["a" /* SampleService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _d || Object])
], SampleListComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=samples-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/select-component-byId.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectComponentByIdComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SelectComponentByIdComponent = (function () {
    function SelectComponentByIdComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    SelectComponentByIdComponent.prototype.barCodeScanned = function (event) {
        if (event.target.value !== '') {
            var boxid = +event.target.value.toUpperCase().replace('BOX', '');
            var _path = this.route.snapshot.url[0].path;
            switch (_path) {
                case 'pack':
                    this.router.navigate(['/packsamples', boxid]);
                    break;
                case 'unpack':
                    //let boxid = +event.target.value.toUpperCase().replace('BOX', '');
                    this.router.navigate(['/unpacksamples', boxid]);
                    break;
                case 'store':
                    var rakid = +event.target.value.toUpperCase().replace('RACK', '');
                    this.router.navigate(['/racksamples', rakid]);
                    break;
                case 'findsample':
                    var sampleno = event.target.value.toUpperCase();
                    this.router.navigate(['/sampleaudit', sampleno]);
                    break;
                case 'findbox':
                    this.router.navigate(['/boxaudit', boxid]);
                    break;
                default:
                    console.log(_path);
                    this.router.navigate(['/']);
            }
        }
    };
    SelectComponentByIdComponent.prototype.ngOnInit = function () {
        var _path = this.route.snapshot.url[0].path;
        switch (_path) {
            case 'pack':
                this.Title = "Pack box";
                break;
            case 'unpack':
                this.Title = "Unpack box";
                break;
            case 'store':
                this.Title = "Store sample";
                break;
            case 'findsample':
                this.Title = "Find sample";
                break;
            case 'findbox':
                this.Title = "Find box";
                break;
            default:
                console.log(_path);
        }
    };
    SelectComponentByIdComponent.prototype.ngAfterViewInit = function () {
        this.el.nativeElement.focus();
    };
    return SelectComponentByIdComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('barcode'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], SelectComponentByIdComponent.prototype, "el", void 0);
SelectComponentByIdComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../ng/Templates/scan-barcode.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], SelectComponentByIdComponent);

var _a, _b, _c;
//# sourceMappingURL=select-component-byId.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/store-samples.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreSamplesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sample_service__ = __webpack_require__("../../../../../ng/app/services/sample.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_rack_service__ = __webpack_require__("../../../../../ng/app/services/rack.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_sounds_service__ = __webpack_require__("../../../../../ng/app/services/sounds.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_d3__ = __webpack_require__("../../../../d3/d3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






//import * as $ from 'jquery';


//import { CustomOption } from './toastr-options';
//import { ToastOptions } from 'ng2-toastr/ng2-toastr';
var StoreSamplesComponent = (function () {
    function StoreSamplesComponent(route, router, sampleService, rackService, soundService, toastr, vcr) {
        this.route = route;
        this.router = router;
        this.sampleService = sampleService;
        this.rackService = rackService;
        this.soundService = soundService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.postInProgress = false;
        this.rackIsFull = false;
        this.sampleTypes = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
        this.margin = { top: 50, right: 50, bottom: 50, left: 50 };
        this.toastr.setRootViewContainerRef(vcr);
    }
    StoreSamplesComponent.prototype.getSamplesByRackId = function (rakid) {
        var _this = this;
        this.sampleService.getSamplesByRackId(rakid)
            .subscribe(function (samples) {
            _this.samples = samples;
            _this.currentPos = samples.length > 0 ? { Row: samples[samples.length - 1].Row, Col: samples[samples.length - 1].Col } : { Row: 1, Col: 0 };
            _this.getRackById(rakid);
        }, function (err) {
            console.log(err);
            _this.soundService.beep('bong');
            _this.router.navigate(['/store']);
        });
    };
    StoreSamplesComponent.prototype.getRackById = function (rakid) {
        var _this = this;
        this.rackService.getRackById(rakid)
            .subscribe(function (rack) {
            _this.rack = rack;
            if (rack.Status === 'Full') {
                _this.emptyModal.show();
            }
            else {
                _this.updatePostion();
            }
            _this.initRack();
        }, function (err) {
            console.log(err);
            _this.soundService.beep('bong');
            _this.router.navigate(['/store']); //that rack dont exist, bruv
        });
    };
    StoreSamplesComponent.prototype.labnoScanned = function (event) {
        var _this = this;
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.replace('-', '');
            var labno = '';
            var smptypID = 0;
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
            var sample_1 = { SampleId: 0, SampleNo: labno, SampTypeSuffix: smptypID, Row: this.currentPos.Row, Col: this.currentPos.Col, RackId: this.rack.RackId, SampleType: this.sampleTypes[smptypID], DateTime: new Date(), Event: 'stored', TrackingAuditId: '' };
            this.sampleService.saveSample(sample_1)
                .subscribe(function (id) {
                sample_1.SampleId = id;
                _this.samples = _this.samples.concat(sample_1);
                event.target.value = '';
                _this.postInProgress = false;
                _this.updatePostion();
                _this.drawRack();
                _this.soundService.beep('beep');
                _this.toastr.success(sample_1.SampleNo + ' stored!', 'Success!');
            }, function (err) {
                _this.toastr.success(err, 'Success!'); //, { positionClass: 'toast-bottom-right' });
                _this.soundService.beep('bong');
            });
        }
        else {
            this.soundService.beep('bong');
        }
    };
    StoreSamplesComponent.prototype.updatePostion = function () {
        if (!(this.rack.Status === 'Full')) {
            this.currentPos.Col++;
            console.log(this.currentPos);
            if (this.rack.Status === 'Empty') {
                this.rack.Status = 'InUse';
                this.rackService.saveRack(this.rack)
                    .subscribe(function (id) { return null; }, function (err) { return console.log(err); });
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
            var a = this.el.nativeElement;
            a.focus();
        }
        else {
            this.toastr.info('Rack full!', 'Full!');
            this.soundService.beep('bong');
            this.router.navigate(['/store']);
        }
    };
    StoreSamplesComponent.prototype.initRack = function () {
        __WEBPACK_IMPORTED_MODULE_7_d3__["select"]('svg')
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.svg = __WEBPACK_IMPORTED_MODULE_7_d3__["select"]('svg > g');
        this.drawRack();
    };
    StoreSamplesComponent.prototype.drawRack = function () {
        var maxRow = this.rack.Rows;
        var maxCol = this.rack.Cols;
        this.y.domain([1, maxRow]);
        this.x.domain([1, maxCol]);
        var that = this;
        var circles = this.svg
            .selectAll("circle");
        //circles.data(this.samples, (smp, i, oi) => {
        //        console.log(i.toString () + ' ' + smp.SampleId.toString());
        //        return smp.SampleId.toString()
        //}) // key function, uses PK from table - cannot get to work.
        circles.data(this.samples)
            .enter()
            .append("circle")
            .attr('cy', function (s, i) { return that.y(s.Row); })
            .attr("cx", function (s, i) { return that.x(s.Col); })
            .attr("fill", "#eeeeff")
            .attr("stroke", "black")
            .attr('stroke-width', 1)
            .attr("r", (this.width / (__WEBPACK_IMPORTED_MODULE_7_d3__["max"]([maxRow, maxCol]) * 6)) - 1 + "px");
        //let removed = circles.data(this.samples).exit().remove();
        var xAxis = __WEBPACK_IMPORTED_MODULE_7_d3__["svg"].axis()
            .scale(this.x)
            .orient("top")
            .tickSize(1);
        var yAxis = __WEBPACK_IMPORTED_MODULE_7_d3__["svg"].axis()
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
    };
    StoreSamplesComponent.prototype.emptyRack = function (emptyRackModal) {
        console.log(this.svg);
        this.rack.Status = 'Empty';
        this.rackService.saveRack(this.rack)
            .subscribe(function (id) { return console.log(id); }, function (err) { return console.log(err); });
        emptyRackModal.hide();
        this.samples = [];
        this.currentPos = { Row: 1, Col: 1 };
        this.svg.selectAll('g > circle').remove();
    };
    StoreSamplesComponent.prototype.rackFull = function () {
        var _this = this;
        this.rackService.saveRack(this.rack)
            .subscribe(function (id) {
            _this.toastr.info('Rack full!', 'Full!', { dismiss: 'controlled' })
                .then(function (toast) {
                setTimeout(function () {
                    _this.toastr.dismissToast(toast);
                    _this.router.navigate(['/store']);
                }, 2000);
            });
        }, function (err) { return console.log(err); });
    };
    //sample removed, actually
    StoreSamplesComponent.prototype.samplesChanged = function (evt) {
        console.log('samples changed...');
        this.svg.selectAll('circle').remove();
        this.samples = __WEBPACK_IMPORTED_MODULE_6_underscore__["without"](this.samples, evt);
        this.currentPos = this.samples.length > 0 ? { Row: this.samples[this.samples.length - 1].Row, Col: this.samples[this.samples.length - 1].Col } : { Row: 1, Col: 0 };
        this.updatePostion();
        //if there's no samples left, reset the current Pos to {1,0}
        /*if (this.samples.length === 0) {
            this.currentPos = { Row: 1, Col: 0 };
        }*/
        this.drawRack();
        var a = this.el.nativeElement;
        a.focus();
    };
    StoreSamplesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.totalWidth = window.screen.width / 2;
        this.width = this.totalWidth - this.margin.left - this.margin.right;
        this.height = 600 - this.margin.top - this.margin.bottom;
        this.y = __WEBPACK_IMPORTED_MODULE_7_d3__["scale"].linear().range([0, this.height]);
        this.x = __WEBPACK_IMPORTED_MODULE_7_d3__["scale"].linear().range([0, this.width]);
        this.route.params
            .subscribe(function (params) {
            console.log(params['id']);
            if (params['id'] == undefined) { }
            else {
                _this.getSamplesByRackId(+params['id']);
            }
        });
    };
    return StoreSamplesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('labno'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], StoreSamplesComponent.prototype, "el", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('emptyRackModal'),
    __metadata("design:type", Object)
], StoreSamplesComponent.prototype, "emptyModal", void 0);
StoreSamplesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../ng/Templates/store-samples.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_rack_service__["a" /* RackService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_rack_service__["a" /* RackService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__services_sounds_service__["a" /* SoundService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_sounds_service__["a" /* SoundService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _h || Object])
], StoreSamplesComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=store-samples.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/unpak-box-samples.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnPackBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sample_service__ = __webpack_require__("../../../../../ng/app/services/sample.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_box_service__ = __webpack_require__("../../../../../ng/app/services/box.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_location_service__ = __webpack_require__("../../../../../ng/app/services/location.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_sounds_service__ = __webpack_require__("../../../../../ng/app/services/sounds.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_global_service__ = __webpack_require__("../../../../../ng/app/services/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var UnPackBoxComponent = (function () {
    //despatchLocation: Location;
    //@ViewChild('despatchLocation') despatchLocation: ElementRef;
    function UnPackBoxComponent(route, router, sampleService, boxService, locationService, soundService, globalsService, toastr, vcr) {
        this.route = route;
        this.router = router;
        this.sampleService = sampleService;
        this.boxService = boxService;
        this.locationService = locationService;
        this.soundService = soundService;
        this.globalsService = globalsService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.sampleTypes = ['EDTA', 'SST', 'FluOx', 'Coag', 'Heparin', 'Urine', 'AcidUrine', 'Unknown', 'Unknown', 'Unknown'];
        this.postInProgress = false;
        this.toastr.setRootViewContainerRef(vcr);
    }
    UnPackBoxComponent.prototype.getBoxAndContents = function (boxid) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"].forkJoin(this.sampleService.getSamplesByBoxId(boxid), this.boxService.getChildBoxes(boxid), this.boxService.getBoxByBoxId(boxid), this.locationService.getAllSiteLocations())
            .subscribe(function (res) {
            _this.samples = res[0];
            _this.childBoxes = res[1];
            var box = res[2];
            _this.locations = __WEBPACK_IMPORTED_MODULE_8_underscore__["flatten"](__WEBPACK_IMPORTED_MODULE_8_underscore__["map"](res[3], (function (s) { return s.Locations; })));
            box.Event = 'Started unpacking @ ' + _this.globalsService.Context.Location;
            switch (box.Status) {
                case 'InTransit':
                case 'Despatched':
                case 'Received':
                case 'BeingUnpacked':
                case 'Delivered':
                    //if box.Destination == here then
                    if (box.Destination.LocationId == _this.globalsService.Context.LocationId) {
                        box.Status = 'BeingUnpacked';
                        _this.boxService.saveBox(box).subscribe(function (b) { return _this.toastr.success(box.Description + ' status updated'); }, function (err) { return _this.toastr.error(err, 'Badness!'); });
                        _this.box = box;
                    }
                    else {
                        _this.box = box;
                        _this.moveBoxModal.show();
                    }
                    break;
                case 'BeingPacked':
                    if (box.BoxType === 'Fixed Box' || box.BoxType === 'Transient Box') {
                        //this.box = box;
                        //_.each(this.samples, s => {
                        //  let suffix = s.SampTypeSuffix === 0 ? '' : s.SampTypeSuffix;
                        //  this.unpackSample(s.SampleNo + suffix);
                        //})
                        _this.toastr.info('Fixed Box!', 'Not unpacked', { dismiss: 'controlled' })
                            .then(function (toast) {
                            setTimeout(function () {
                                _this.toastr.dismissToast(toast);
                                _this.router.navigate(['/unpack']);
                            }, 2000);
                        });
                    }
                    else {
                        _this.toastr.info('This box is still being packed', 'Not unpacked', { dismiss: 'controlled' })
                            .then(function (toast) {
                            setTimeout(function () {
                                _this.toastr.dismissToast(toast);
                                _this.router.navigate(['/unpack']);
                            }, 2000);
                        });
                    }
                    break;
                default:
                    _this.toastr.info('This box is @ status ' + box.Status, 'Wrong Status!', { dismiss: 'controlled' })
                        .then(function (toast) {
                        setTimeout(function () {
                            _this.toastr.dismissToast(toast);
                            _this.router.navigate(['/unpack']);
                        }, 2000);
                    });
                    break;
            }
        }, function (err) { return _this.toastr.error(err, 'Error!', { dismiss: 'controlled' })
            .then(function (toast) {
            setTimeout(function () {
                _this.toastr.dismissToast(toast);
                _this.router.navigate(['/unpack']);
            }, 2000);
        }); }, function () { return _this.checkEmptyUpdateStatus(); });
    };
    UnPackBoxComponent.prototype.unpackSample = function (entry) {
        var _this = this;
        switch (entry.startsWith('BOX')) {
            case true:
                var boxId_1 = entry.replace('BOX', '');
                var box_1 = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.childBoxes, (function (b) { return b.BoxId === +boxId_1; }));
                if (box_1 === undefined) {
                    this.toastr.error('Box with id ' + boxId_1.toString() + ' not found', 'Wrong!'); //unpacking a box that is not here, disallowed
                }
                else {
                    box_1.ParentBoxId = null;
                    box_1.Status = 'Received';
                    box_1.Event = 'Unpacked from ' + this.box.Description;
                    this.boxService.saveBox(box_1).subscribe(function () {
                        _this.childBoxes = __WEBPACK_IMPORTED_MODULE_8_underscore__["without"](_this.childBoxes, box_1);
                        _this.toastr.success("box " + box_1.Description + " received", "Success!");
                        _this.soundService.beep('beep');
                    }, function (err) {
                        _this.toastr.error(err, 'Nooooo!');
                        _this.soundService.beep('bong');
                    }, function () { return _this.checkEmptyUpdateStatus(); });
                }
                /* event.target.value = '';
                this.postInProgress = false; */
                break;
            default:
                this.setContextSample(entry);
                var sample_1 = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.samples, (function (s) { return s.SampleNo === _this.contextSample.SampleNo && s.SampTypeSuffix === _this.contextSample.SampTypeSuffix; }));
                if (sample_1 === undefined) {
                    //modal 'Not found, do you want to unpack anyway?'
                    this.unpackAnywayModal.show();
                }
                else {
                    console.log(this.box);
                    sample_1.Event = 'Unpacked from ' + this.box.Description + ' @ ' + this.box.Destination.Name;
                    this.sampleService.saveSample(sample_1)
                        .subscribe(function (id) {
                        sample_1.SampleId = id;
                        _this.samples = __WEBPACK_IMPORTED_MODULE_8_underscore__["without"](_this.samples, sample_1);
                        _this.sampleService.destroySample(sample_1)
                            .subscribe(function (s) {
                            _this.soundService.beep('beep');
                            _this.toastr.success(sample_1.SampleNo + ' unpacked!', 'Success!');
                        }, function (err) {
                            _this.toastr.error(err, 'Oh No!');
                            _this.soundService.beep('bong');
                        }, function () { return _this.checkEmptyUpdateStatus(); });
                    }, function (err) {
                        _this.toastr.error(err, 'Nooooo!'); //, { positionClass: 'toast-bottom-right' });
                        _this.soundService.beep('bong');
                    });
                }
                break;
        }
    };
    UnPackBoxComponent.prototype.labnoScanned = function (event) {
        if (event.target.value !== '' && !this.postInProgress) {
            this.postInProgress = true;
            var entry = event.target.value.toUpperCase().replace('-', '');
            this.unpackSample(entry);
            event.target.value = '';
            event.target.focus();
            this.postInProgress = false;
        }
        else {
            this.soundService.beep('bong');
            event.target.value = '';
            event.target.focus();
        }
        var a = this.el.nativeElement;
        a.focus();
    };
    UnPackBoxComponent.prototype.setContextSample = function (entry) {
        var labno = '';
        var smptypID = 0;
        if (entry.length === 10) {
            labno = entry.substr(0, 9);
            var suffix = entry.substr(9, 1);
            smptypID = isNaN(parseInt(suffix)) ? 9 : parseInt(suffix);
        }
        if (entry.length <= 9) {
            labno = entry.toUpperCase();
        }
        if (entry.length > 10) {
            labno = entry.toUpperCase();
            smptypID = 9;
        }
        this.contextSample = {
            SampleId: 0,
            SampleNo: labno,
            SampTypeSuffix: smptypID,
            Row: 0,
            Col: 0,
            SampleType: '',
            DateTime: new Date(),
            TrackingAuditId: '',
            Event: ''
        };
        console.log(this.contextSample);
    };
    UnPackBoxComponent.prototype.navigateToParent = function () {
        console.log(this.box.ParentBoxId);
        this.router.navigate(['/unpacksamples', +this.box.ParentBoxId]);
    };
    UnPackBoxComponent.prototype.checkEmptyUpdateStatus = function () {
        var _this = this;
        //check if empty
        //console.log('checking empty ...');
        if (this.samples.length === 0 && this.childBoxes.length === 0) {
            this.box.Status = 'Unpacked';
            this.box.Event = 'Unpacked & empty @ ' + this.globalsService.Context.Location;
            this.boxService.saveBox(this.box).subscribe(function (id) { return _this.toastr.info('box empty', 'Success!', { dismiss: 'controlled' })
                .then(function (toast) {
                setTimeout(function () {
                    _this.toastr.dismissToast(toast);
                    _this.router.navigate(['/unpack']);
                }, 2000);
            }); });
        }
    };
    UnPackBoxComponent.prototype.samplesChanged = function (evt) {
        this.toastr.success(evt.SampleNo + ' removed!', "");
        this.samples = __WEBPACK_IMPORTED_MODULE_8_underscore__["without"](this.samples, evt);
        this.checkEmptyUpdateStatus();
    };
    UnPackBoxComponent.prototype.unpackEverything = function () {
        console.log('unpack owt');
    };
    UnPackBoxComponent.prototype.boxesChanged = function (evt) {
        this.toastr.success(evt.Description + ' removed!', "");
        this.childBoxes = __WEBPACK_IMPORTED_MODULE_8_underscore__["without"](this.childBoxes, evt);
        this.checkEmptyUpdateStatus();
    };
    UnPackBoxComponent.prototype.moveBoxModalHandler = function (modal, yesno) {
        var _this = this;
        console.log('move box', this.locations);
        switch (yesno) {
            case 0:
                modal.hide();
                this.router.navigate(['/unpack']);
                break;
            case 1:
                var l = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.locations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                console.log(l);
                this.box.LastLocation = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.locations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                this.box.Destination = __WEBPACK_IMPORTED_MODULE_8_underscore__["find"](this.locations, (function (l) { return l.LocationId == _this.globalsService.Context.LocationId; }));
                this.box.Status = 'BeingUnpacked';
                this.boxService.saveBox(this.box)
                    .subscribe(function (b) {
                    _this.toastr.success(_this.box.Description + ' status & location updated');
                }, function (err) {
                    _this.toastr.error(err, 'Oh dear!');
                }, function () { return modal.hide(); });
                var a = this.el.nativeElement;
                a.focus();
                break;
            default:
                modal.hide();
                break;
        }
    };
    UnPackBoxComponent.prototype.unpackAnywayModalHandler = function (modal, yesno) {
        var _this = this;
        switch (yesno) {
            case 0:
                modal.hide();
                //this.router.navigate(['/unpack']);
                break;
            case 1:
                //get sample, update (flatMap) location, event etc., destroy.
                var sample_2 = {
                    SampleId: 0,
                    SampleNo: this.contextSample.SampleNo,
                    SampTypeSuffix: this.contextSample.SampTypeSuffix,
                    BoxId: this.box.BoxId,
                    Row: 0,
                    Col: 0, SampleType: this.sampleTypes[this.contextSample.SampTypeSuffix],
                    DateTime: new Date(),
                    TrackingAuditId: '',
                    Event: 'unpacked from ' + this.box.Description + ' @ ' + (new Date()).toShortDateTimeString() + ' in ' + this.globalsService.Context.Location
                };
                this.sampleService.saveSample(sample_2)
                    .subscribe(function (smp) {
                    _this.sampleService.destroySampleById(smp).subscribe(function (smp) { return smp; }, function (err) { return console.log(err); });
                    _this.toastr.success(sample_2.SampleNo + ' unpacked!', 'Success!');
                }, function (err) { return console.log(err); }, function () { return modal.hide(); });
                break;
            default:
                modal.hide();
                break;
        }
    };
    UnPackBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            var a = _this.el.nativeElement;
            a.focus();
            if (params['id'] == undefined) { }
            else {
                _this.getBoxAndContents(+params['id']);
            }
        });
    };
    return UnPackBoxComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('moveBoxModal'),
    __metadata("design:type", Object)
], UnPackBoxComponent.prototype, "moveBoxModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('unpackAnywayModal'),
    __metadata("design:type", Object)
], UnPackBoxComponent.prototype, "unpackAnywayModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('labno'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], UnPackBoxComponent.prototype, "el", void 0);
UnPackBoxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../ng/Templates/unpack-box-samples.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_sample_service__["a" /* SampleService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_box_service__["a" /* BoxService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_box_service__["a" /* BoxService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__services_location_service__["a" /* LocationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_location_service__["a" /* LocationService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__services_sounds_service__["a" /* SoundService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_sounds_service__["a" /* SoundService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__services_global_service__["a" /* GlobalsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_global_service__["a" /* GlobalsService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _k || Object])
], UnPackBoxComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=unpak-box-samples.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/user-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("../../../../../ng/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserListComponent = (function () {
    function UserListComponent(userService) {
        this.userService = userService;
    }
    UserListComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UserListComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) {
            users.forEach(function (u) { return u.editable = false; });
            _this.users = users;
        }, //Bind to view
        function (//Bind to view
            err) { return console.log(err); });
    };
    UserListComponent.prototype.toggleEditable = function (user) {
        user.editable = !(user.editable);
    };
    UserListComponent.prototype.save = function (user) {
        user.editable = false;
        this.userService.upsertUser(user)
            .subscribe(function (uid) { return console.log(uid); }, function (err) { return console.log(err); });
    };
    UserListComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    return UserListComponent;
}());
UserListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'users',
        styles: [".sticky {\n  position: fixed;\n  top: 5%;\n  right: 0;\n  width: 45%;\n  overflow: auto;\n  height:100%;\n}"],
        template: __webpack_require__("../../../../../ng/Templates/user-list.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === "function" && _a || Object])
], UserListComponent);

var _a;
//# sourceMappingURL=user-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/components/user-sites-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSiteListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("../../../../../ng/app/types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("../../../../../ng/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserSiteListComponent = (function () {
    function UserSiteListComponent(userService) {
        this.userService = userService;
    }
    UserSiteListComponent.prototype.onMemberShipChanged = function (location) {
        //this.selectedLocation = location;
        if (location.IsMember) {
            this.user.Locations.push({ LocationId: location.LocationId, Name: location.Name, PrinterIp: "", LabelFormat: { FormatId: 0, Name: "" }, editable: false });
        }
        else {
            this.user.Locations = this.user.Locations.filter(function (l) { return l.LocationId !== location.LocationId; });
        }
        //console.log(location);
        //console.log(this.user);
        this.userService.upsertUser(this.user)
            .subscribe(function (srcs) { return console.log(srcs); }, function (err) { return console.log(err); });
    };
    return UserSiteListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], UserSiteListComponent.prototype, "sites", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__types__["b" /* User */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__types__["b" /* User */]) === "function" && _a || Object)
], UserSiteListComponent.prototype, "user", void 0);
UserSiteListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'user-sites',
        template: __webpack_require__("../../../../../ng/Templates/user-sites-list.component.html"),
        styles: ["\n        td{font-family : monospace;}\n        table { background-color: white;\n                border-collapse: collapse;\n                width:100%;\n        }\n        table, th, td {\n            border: 1px solid black;\n            padding : 5px;\n        }"
        ]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === "function" && _b || Object])
], UserSiteListComponent);

var _a, _b;
//# sourceMappingURL=user-sites-list.component.js.map

/***/ }),

/***/ "../../../../../ng/app/modules/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_user_list_component__ = __webpack_require__("../../../../../ng/app/components/user-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_location_list_component__ = __webpack_require__("../../../../../ng/app/components/location-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_container_list_component__ = __webpack_require__("../../../../../ng/app/components/container-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_box_list_component__ = __webpack_require__("../../../../../ng/app/components/box-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_rack_list_component__ = __webpack_require__("../../../../../ng/app/components/rack-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_store_samples_component__ = __webpack_require__("../../../../../ng/app/components/store-samples.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_pak_box_samples_component__ = __webpack_require__("../../../../../ng/app/components/pak-box-samples.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_unpak_box_samples_component__ = __webpack_require__("../../../../../ng/app/components/unpak-box-samples.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_select_component_byId_component__ = __webpack_require__("../../../../../ng/app/components/select-component-byId.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_sample_audit_component__ = __webpack_require__("../../../../../ng/app/components/sample-audit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_box_audit_component__ = __webpack_require__("../../../../../ng/app/components/box-audit.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'users', component: __WEBPACK_IMPORTED_MODULE_2__components_user_list_component__["a" /* UserListComponent */] },
    { path: 'locations', component: __WEBPACK_IMPORTED_MODULE_3__components_location_list_component__["a" /* LocationListComponent */] },
    { path: 'containers', component: __WEBPACK_IMPORTED_MODULE_4__components_container_list_component__["a" /* ContainerListComponent */] },
    { path: 'containers/:id', component: __WEBPACK_IMPORTED_MODULE_4__components_container_list_component__["a" /* ContainerListComponent */] },
    { path: 'boxes', component: __WEBPACK_IMPORTED_MODULE_5__components_box_list_component__["a" /* BoxListComponent */] },
    { path: 'boxes/:id', component: __WEBPACK_IMPORTED_MODULE_5__components_box_list_component__["a" /* BoxListComponent */] },
    { path: 'racks', component: __WEBPACK_IMPORTED_MODULE_6__components_rack_list_component__["a" /* RackListComponent */] },
    { path: 'racks/:id', component: __WEBPACK_IMPORTED_MODULE_6__components_rack_list_component__["a" /* RackListComponent */] },
    { path: 'store', component: __WEBPACK_IMPORTED_MODULE_10__components_select_component_byId_component__["a" /* SelectComponentByIdComponent */] },
    { path: 'racksamples/:id', component: __WEBPACK_IMPORTED_MODULE_7__components_store_samples_component__["a" /* StoreSamplesComponent */] },
    { path: 'pack', component: __WEBPACK_IMPORTED_MODULE_10__components_select_component_byId_component__["a" /* SelectComponentByIdComponent */] },
    { path: 'packsamples/:id', component: __WEBPACK_IMPORTED_MODULE_8__components_pak_box_samples_component__["a" /* PackBoxComponent */] },
    { path: 'unpack', component: __WEBPACK_IMPORTED_MODULE_10__components_select_component_byId_component__["a" /* SelectComponentByIdComponent */] },
    { path: 'unpacksamples/:id', component: __WEBPACK_IMPORTED_MODULE_9__components_unpak_box_samples_component__["a" /* UnPackBoxComponent */] },
    { path: 'findsample', component: __WEBPACK_IMPORTED_MODULE_10__components_select_component_byId_component__["a" /* SelectComponentByIdComponent */] },
    { path: 'sampleaudit/:id', component: __WEBPACK_IMPORTED_MODULE_11__components_sample_audit_component__["a" /* SampleAuditComponent */] },
    { path: 'findbox', component: __WEBPACK_IMPORTED_MODULE_10__components_select_component_byId_component__["a" /* SelectComponentByIdComponent */] },
    { path: 'boxaudit/:id', component: __WEBPACK_IMPORTED_MODULE_12__components_box_audit_component__["a" /* BoxAuditComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes, { enableTracing: true })],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../ng/app/modules/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_drag_drop__ = __webpack_require__("../../../../ng2-drag-drop/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_drag_drop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_drag_drop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ng_idle_core__ = __webpack_require__("../../../../@ng-idle/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_app_component__ = __webpack_require__("../../../../../ng/app/components/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_user_list_component__ = __webpack_require__("../../../../../ng/app/components/user-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_user_sites_list_component__ = __webpack_require__("../../../../../ng/app/components/user-sites-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_location_list_component__ = __webpack_require__("../../../../../ng/app/components/location-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_container_list_component__ = __webpack_require__("../../../../../ng/app/components/container-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_box_list_component__ = __webpack_require__("../../../../../ng/app/components/box-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_rack_list_component__ = __webpack_require__("../../../../../ng/app/components/rack-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_store_samples_component__ = __webpack_require__("../../../../../ng/app/components/store-samples.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_samples_list_component__ = __webpack_require__("../../../../../ng/app/components/samples-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_sample_audit_component__ = __webpack_require__("../../../../../ng/app/components/sample-audit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_pak_box_samples_component__ = __webpack_require__("../../../../../ng/app/components/pak-box-samples.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_unpak_box_samples_component__ = __webpack_require__("../../../../../ng/app/components/unpak-box-samples.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_modal_component__ = __webpack_require__("../../../../../ng/app/components/modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_select_component_byId_component__ = __webpack_require__("../../../../../ng/app/components/select-component-byId.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_boxes_list_component__ = __webpack_require__("../../../../../ng/app/components/boxes-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_box_audit_component__ = __webpack_require__("../../../../../ng/app/components/box-audit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_horizontal_timeline_component__ = __webpack_require__("../../../../../ng/app/components/horizontal-timeline.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_loc_despatch_locs_list_component__ = __webpack_require__("../../../../../ng/app/components/loc-despatch-locs-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__services_loading_indicator_service__ = __webpack_require__("../../../../../ng/app/services/loading-indicator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_user_service__ = __webpack_require__("../../../../../ng/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_location_service__ = __webpack_require__("../../../../../ng/app/services/location.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_container_service__ = __webpack_require__("../../../../../ng/app/services/container.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_box_service__ = __webpack_require__("../../../../../ng/app/services/box.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_rack_service__ = __webpack_require__("../../../../../ng/app/services/rack.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_sample_service__ = __webpack_require__("../../../../../ng/app/services/sample.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_sounds_service__ = __webpack_require__("../../../../../ng/app/services/sounds.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_global_service__ = __webpack_require__("../../../../../ng/app/services/global.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__modules_app_routing_module__ = __webpack_require__("../../../../../ng/app/modules/app-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//import { RouterModule }   from '@angular/router';

































//import { EscapePipe, TruncatePipe, ToShortDateTimePipe} from '../pipes.pipe';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_36__modules_app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6_ng2_drag_drop__["Ng2DragDropModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_ng2_toastr__["ToastModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8__ng_idle_core__["c" /* NgIdleModule */].forRoot()
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__components_app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_21__components_modal_component__["a" /* ModalComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_user_list_component__["a" /* UserListComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_user_sites_list_component__["a" /* UserSiteListComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_location_list_component__["a" /* LocationListComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_container_list_component__["a" /* ContainerListComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_box_list_component__["a" /* BoxListComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_rack_list_component__["a" /* RackListComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_store_samples_component__["a" /* StoreSamplesComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_samples_list_component__["a" /* SampleListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_sample_audit_component__["a" /* SampleAuditComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_boxes_list_component__["a" /* BoxesListComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_select_component_byId_component__["a" /* SelectComponentByIdComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_pak_box_samples_component__["a" /* PackBoxComponent */],
            __WEBPACK_IMPORTED_MODULE_20__components_unpak_box_samples_component__["a" /* UnPackBoxComponent */],
            __WEBPACK_IMPORTED_MODULE_24__components_box_audit_component__["a" /* BoxAuditComponent */],
            __WEBPACK_IMPORTED_MODULE_25__components_horizontal_timeline_component__["a" /* HorizontalTimelineComponent */],
            __WEBPACK_IMPORTED_MODULE_26__components_loc_despatch_locs_list_component__["a" /* LocationDespatchSitesComponent */]
            /*         EscapePipe,
                    TruncatePipe,
                    ToShortDateTimePipe */
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_28__services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_29__services_location_service__["a" /* LocationService */],
            __WEBPACK_IMPORTED_MODULE_30__services_container_service__["a" /* ContainerService */],
            __WEBPACK_IMPORTED_MODULE_31__services_box_service__["a" /* BoxService */],
            __WEBPACK_IMPORTED_MODULE_32__services_rack_service__["a" /* RackService */],
            __WEBPACK_IMPORTED_MODULE_33__services_sample_service__["a" /* SampleService */],
            __WEBPACK_IMPORTED_MODULE_34__services_sounds_service__["a" /* SoundService */],
            __WEBPACK_IMPORTED_MODULE_35__services_global_service__["a" /* GlobalsService */],
            __WEBPACK_IMPORTED_MODULE_27__services_loading_indicator_service__["a" /* LoadingIndicatorService */]
            //{
            //    provide: HTTP_INTERCEPTORS,
            //    useFactory: (service: LoadingIndicatorService) => new LoadingIndicatorInterceptor(service),
            //    multi: true,
            //    deps: [LoadingIndicatorService]
            //}
            //{ provide: ToastOptions, useClass: CustomOption }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__components_app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../ng/app/services/box.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoxService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BoxService = (function () {
    function BoxService(http) {
        this.http = http;
        this.BoxsUrl = 'api/boxes';
        this.BoxTypesUrl = 'api/boxtypes';
    }
    BoxService.prototype.getBoxs = function () {
        return this.http.get(this.BoxsUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getBoxByLocationId = function (id) {
        var url = "api/boxes/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getChildBoxes = function (id) {
        var url = "api/childboxes/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getBoxByBoxId = function (id) {
        var url = "api/box/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.printLabel = function (id) {
        var url = "api/boxlabel/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error._body || 'Server error'); });
    };
    BoxService.prototype.getBoxAudits = function (id) {
        var url = "api/boxaudit/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.getBoxTypes = function () {
        return this.http.get(this.BoxTypesUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.saveBox = function (box) {
        return this.http.post(this.BoxsUrl, box)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    BoxService.prototype.moveBoxSamples = function (startid, endid) {
        var url = "api/moveboxsamples/" + startid + "/" + endid;
        return this.http.post(url, null)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    BoxService.prototype.packChildBox = function (box) {
        return this.http.post('api/packchildbox', box)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return BoxService;
}());
BoxService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], BoxService);

var _a;
//# sourceMappingURL=box.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/container.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContainerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContainerService = (function () {
    function ContainerService(http) {
        this.http = http;
        this.containersUrl = 'api/containers';
        this.containerTypesUrl = 'api/containertypes';
    }
    ContainerService.prototype.getContainers = function () {
        return this.http.get(this.containersUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ContainerService.prototype.getContainerByLocationId = function (id) {
        var url = "api/containers/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ContainerService.prototype.getContainerTypes = function () {
        return this.http.get(this.containerTypesUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ContainerService.prototype.saveContainer = function (cnt) {
        return this.http.post(this.containersUrl, cnt)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return ContainerService;
}());
ContainerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ContainerService);

var _a;
//# sourceMappingURL=container.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/global.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { LocationService } from './location.service';

//import 'rxjs/add/operator/map';

var GlobalsService = (function () {
    function GlobalsService(http) {
        this.http = http;
    }
    Object.defineProperty(GlobalsService.prototype, "IsLocal", {
        get: function () {
            return this.isLocal;
        },
        set: function (isLocal) {
            var _this = this;
            this.isLocal = isLocal;
            this.isLocal = this.isLocal === undefined ? false : this.isLocal;
            var url = "api/context/" + this.isLocal;
            this.http.get(url)
                .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); })
                .subscribe(function (r) {
                _this.isLocal = r.json();
                console.log('in global svc - ' + _this.isLocal);
                //window.location.reload(true)
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalsService.prototype, "Context", {
        get: function () {
            return this.context;
        },
        enumerable: true,
        configurable: true
    });
    GlobalsService.prototype.getContext = function () {
        var _this = this;
        //sessionStorage.setItem("source", JSON.stringify(source));
        return this.http.get("api/context")
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); })
            .map(function (res) {
            console.log(res);
            _this.context = res.json();
            console.log('svc', _this.Context);
            return;
        });
    };
    return GlobalsService;
}());
GlobalsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], GlobalsService);

var _a;
//# sourceMappingURL=global.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/loading-indicator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingIndicatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingIndicatorService = (function () {
    function LoadingIndicatorService() {
        this.onLoadingChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * Stores all currently active requests
         */
        this.requests = [];
    }
    /**
     * Adds request to the storage and notifies observers
     */
    LoadingIndicatorService.prototype.onStarted = function (req) {
        this.requests.push(req);
        this.notify();
    };
    /**
     * Removes request from the storage and notifies observers
     */
    LoadingIndicatorService.prototype.onFinished = function (req) {
        var index = this.requests.indexOf(req);
        if (index !== -1) {
            this.requests.splice(index, 1);
        }
        this.notify();
    };
    /**
     * Notifies observers about whether there are any requests on fly
     */
    LoadingIndicatorService.prototype.notify = function () {
        this.onLoadingChanged.emit(this.requests.length !== 0);
    };
    return LoadingIndicatorService;
}());
LoadingIndicatorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], LoadingIndicatorService);

//# sourceMappingURL=loading-indicator.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/location.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LocationService = (function () {
    function LocationService(http) {
        this.http = http;
        this.locationsUrl = 'api/locations';
        this.locationDespatchLocationsUrl = '/api/despatchlocations';
    }
    LocationService.prototype.getLocations = function () {
        return this.http.get(this.locationsUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getLocationsWithDespatchLocations = function () {
        return this.http.get(this.locationDespatchLocationsUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getAllSiteLocations = function () {
        return this.http.get('api/alllocations')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getDespatchLoctions = function () {
        var url = "api/despatchlocationsforlocid";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getLocationByName = function (locName) {
        var url = "api/location/" + locName;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.getLocationById = function (locId) {
        var url = "api/location/" + locId;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    LocationService.prototype.updateDespatchLocations = function (locationId, despatchLocations) {
        var url = "api/despatchlocations/" + locationId;
        console.log(url);
        var bodyString = JSON.stringify(despatchLocations); // Stringify payload
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers }); // Create a request option
        return this.http.post(url, bodyString, options) // ...using post request
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); }); //...errors if any
    };
    LocationService.prototype.upsertLocation = function (location) {
        console.log('in service');
        var url = "api/location/" + location.LocationId;
        console.log(url);
        var bodyString = JSON.stringify(location); // Stringify payload
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers }); // Create a request option
        return this.http.post(url, location, options) // ...using post request
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); }); //...errors if any
    };
    return LocationService;
}());
LocationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], LocationService);

var _a;
//# sourceMappingURL=location.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/rack.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RackService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RackService = (function () {
    function RackService(http) {
        this.http = http;
        this.racksUrl = 'api/racks';
    }
    RackService.prototype.getRacks = function () {
        return this.http.get(this.racksUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    RackService.prototype.getRackById = function (id) {
        var url = "api/rack/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    RackService.prototype.getRackByContainerId = function (id) {
        var url = "api/racks/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    RackService.prototype.saveRack = function (rak) {
        return this.http.post(this.racksUrl, rak)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return RackService;
}());
RackService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], RackService);

var _a;
//# sourceMappingURL=rack.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/sample.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SampleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SampleService = (function () {
    function SampleService(http) {
        this.http = http;
        this.samplesUrl = 'api/samples';
    }
    SampleService.prototype.getSamplesByRackId = function (id) {
        var url = "api/racksamples/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    SampleService.prototype.getSamplesByBoxId = function (id) {
        var url = "api/boxsamples/" + id;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    SampleService.prototype.getSampleAudits = function (sampno) {
        var url = "api/sampleaudit/" + sampno;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    SampleService.prototype.getBoxSampleAuditsByTrackingID = function (trackingId) {
        var url = "api/boxsampleaudits/" + trackingId;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    SampleService.prototype.saveSample = function (samp) {
        return this.http.post(this.samplesUrl, samp)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    SampleService.prototype.destroySample = function (samp) {
        var url = "api/sample/" + samp.SampleId;
        return this.http.delete(url)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    SampleService.prototype.destroySampleById = function (sampid) {
        var url = "api/sample/" + sampid;
        return this.http.delete(url)
            .map(function (res) { return +res.text(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return SampleService;
}());
SampleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SampleService);

var _a;
//# sourceMappingURL=sample.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/sounds.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SoundService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SoundService = (function () {
    function SoundService(http) {
        var _this = this;
        this.http = http;
        this.http.get('/Content/sounds.json')
            .subscribe(function (json) { return _this.sounds = JSON.parse(json.text()); });
    }
    SoundService.prototype.beep = function (sound) {
        var snd = new Audio("data:audio/wav;base64," + this.sounds[sound]);
        snd.play();
    };
    return SoundService;
}());
SoundService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SoundService);

var _a;
//# sourceMappingURL=sounds.service.js.map

/***/ }),

/***/ "../../../../../ng/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.usersUrl = 'api/users';
    }
    UserService.prototype.getUsers = function () {
        return this.http.get(this.usersUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.upsertUser = function (user) {
        console.log('in service');
        var url = "api/user/" + user.UserId;
        console.log(url);
        var bodyString = JSON.stringify(user); // Stringify payload
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers }); // Create a request option
        return this.http.post(url, user, options) // ...using put request
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); }); //...errors if any
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../ng/app/types.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return User; });
/* unused harmony export LabelFormat */
/* unused harmony export Location */
/* unused harmony export LocationMembership */
/* unused harmony export Site */
/* unused harmony export SiteMembership */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationsDespatchLocation; });
/* unused harmony export SiteLocationsDespatchLocation */
/* unused harmony export ContainerType */
/* unused harmony export Container */
/* unused harmony export BoxType */
/* unused harmony export Box */
/* unused harmony export BoxAudit */
/* unused harmony export Rack */
/* unused harmony export Sample */
/* unused harmony export SampleAudit */
/* unused harmony export ContainerRack */
/* unused harmony export Position */
/* unused harmony export Context */
var User = (function () {
    function User() {
    }
    return User;
}());

var LabelFormat = (function () {
    function LabelFormat() {
    }
    return LabelFormat;
}());

var Location = (function () {
    function Location() {
    }
    return Location;
}());

var LocationMembership = (function () {
    function LocationMembership() {
    }
    return LocationMembership;
}());

var Site = (function () {
    function Site() {
    }
    return Site;
}());

var SiteMembership = (function () {
    function SiteMembership() {
    }
    return SiteMembership;
}());

var LocationsDespatchLocation = (function () {
    function LocationsDespatchLocation() {
    }
    return LocationsDespatchLocation;
}());

var SiteLocationsDespatchLocation = (function () {
    function SiteLocationsDespatchLocation() {
    }
    return SiteLocationsDespatchLocation;
}());

var ContainerType = (function () {
    function ContainerType() {
    }
    return ContainerType;
}());

var Container = (function () {
    function Container() {
    }
    return Container;
}());

var BoxType = (function () {
    function BoxType() {
    }
    return BoxType;
}());

var Box = (function () {
    function Box() {
    }
    return Box;
}());

var BoxAudit = (function () {
    function BoxAudit() {
    }
    return BoxAudit;
}());

var Rack = (function () {
    function Rack() {
    }
    return Rack;
}());

var Sample = (function () {
    function Sample() {
    }
    return Sample;
}());

var SampleAudit = (function () {
    function SampleAudit() {
    }
    return SampleAudit;
}());

var ContainerRack = (function () {
    function ContainerRack() {
    }
    return ContainerRack;
}());

var Position = (function () {
    function Position() {
    }
    return Position;
}());

var Context = (function () {
    function Context() {
    }
    return Context;
}());

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "../../../../../ng/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_app_module__ = __webpack_require__("../../../../../ng/app/modules/app.module.ts");


/*import {enableProdMode} from '@angular/core';
enableProdMode();*/
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_modules_app_module__["a" /* AppModule */]);
Date.prototype.toShortDateTimeString = function () {
    var dd = ('0' + (this.getDate().toString())).substr(-2);
    var mm = ('0' + ((this.getMonth() + 1).toString())).substr(-2);
    var yy = (this.getFullYear().toString()).substr(-2);
    var hh = ('0' + (this.getHours().toString())).substr(-2);
    var mins = ('0' + (this.getMinutes().toString())).substr(-2);
    return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + mins;
};
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../ng/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map