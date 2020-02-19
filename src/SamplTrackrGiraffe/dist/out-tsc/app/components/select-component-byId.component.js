"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SelectComponentByIdComponent = /** @class */ (function () {
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
    __decorate([
        core_1.ViewChild('barcode'),
        __metadata("design:type", core_1.ElementRef)
    ], SelectComponentByIdComponent.prototype, "el", void 0);
    SelectComponentByIdComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: '../../Templates/scan-barcode.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute])
    ], SelectComponentByIdComponent);
    return SelectComponentByIdComponent;
}());
exports.SelectComponentByIdComponent = SelectComponentByIdComponent;
//# sourceMappingURL=select-component-byId.component.js.map