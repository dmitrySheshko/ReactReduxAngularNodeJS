class EditUserCtrl {
    constructor($uibModalInstance, ApiService, UserService){
        this.$uibModalInstance = $uibModalInstance;
        this.ApiService = ApiService;
        this.isSend = false;
        this.model = angular.copy(UserService.user);
    }

    edit(){
        if(!this.isSend){
            this.isSend = true;
            this.ApiService.editUser(this.model).then(response => {
                this.$uibModalInstance.close(response.plain());
            });
        }
    }

    cancel(){
        this.$uibModalInstance.dismiss();
    }
}

EditUserCtrl.$inject = ['$uibModalInstance', 'ApiService', 'UserService'];
export default EditUserCtrl;