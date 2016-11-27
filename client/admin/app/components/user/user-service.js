class UserService {
    constructor($state, ApiService, $uibModal){
        this.$state = $state;
        this.ApiService = ApiService;
        this.$uibModal = $uibModal;

        this.user = {};
    }

    getUser(){
        this.ApiService.getUser(this.$state.params.id).then(user => {
            this.user = user.plain();
        });
    }

    editUser(){
        let modal = this.$uibModal.open({
            templateUrl: '/admin/templates/components/user/modal/edit-user.html',
            controller: 'EditUserCtrl as edit'
        });

        modal.result.then(() => {

        });
        /*var modalInstance = $uibModal.open({
            templateUrl: 'scripts/modules/other-modal/other-modal.html',
            controller: 'otherModalController as modal',
            resolve: {
                data: function(){
                    return {
                        title: 'Удаление группы',
                        text: 'Вы действительно хотите удалить группу?',
                        okButton: 'Удалить',
                        cancelButton: 'Закрыть'
                    }
                }
            }
        });

        modalInstance.result.then(function(){
            apiService.deleteGroup(id).then(function(){
                for(var i = 0; i < mainService.groups.length; i++){
                    if(mainService.groups[i].id == id){
                        mainService.groups[i].active = false;
                    }
                }
            }).catch(function(error){
                console.log(error);
            });
        }, function(){});*/
    }

    deleteUser(){

    }

    blockUser(){

    }

}
UserService.$inject = ['$state', 'ApiService', '$uibModal'];
export default UserService;