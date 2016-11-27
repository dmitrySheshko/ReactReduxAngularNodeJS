class UserCtrl {
    constructor(UserService){
        this.UserService = UserService;
        this.getUser();
    }

    getUser(){
        this.UserService.getUser();
    }

    getUserData(){
        return this.UserService.user;
    }

    editUser(){
        this.UserService.editUser();
    }

    deleteUser(){
        this.UserService.deleteUser();
    }

    blockUser(){
        this.UserService.blockUser();
    }
}
UserCtrl.$inject = ['UserService'];
export default UserCtrl;