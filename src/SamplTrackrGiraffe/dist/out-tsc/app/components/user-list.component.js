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
var user_service_1 = require("../services/user.service");
var UserListComponent = /** @class */ (function () {
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
    UserListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'users',
            styles: [".sticky {\n  position: fixed;\n  top: 5%;\n  right: 0;\n  width: 45%;\n  overflow: auto;\n  height:100%;\n}"],
            templateUrl: '../../Templates/user-list.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map