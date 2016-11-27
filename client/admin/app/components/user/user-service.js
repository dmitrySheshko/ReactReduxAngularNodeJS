class UserService {
    constructor($state, ApiService, $uibModal){
        this.$state = $state;
        this.ApiService = ApiService;
        this.$uibModal = $uibModal;

        this.user = {};

        this.changeBlockStatus = this.changeBlockStatus.bind(this);
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

        modal.result.then(newUser => {
            this.user = newUser;
        });
    }

    deleteUser(){

    }

    blockUser(){
        let modal = this.$uibModal.open({
            templateUrl: '/admin/templates/components/user/modal/user-attention.html',
            controller: 'UserAttentionCtrl as attention',
            resolve: {
                data: () => {
                    return {
                        successCallback: () => {
                            this.changeBlockStatus(modal);
                        },
                        title: 'Change user block status',
                        message: 'Do you want to change a user block status?'
                    }
                }
            }
        });
    }

    changeBlockStatus(modal){
        let user = {
            id: this.user.id,
            blocked: !this.user.blocked
        };
        this.ApiService.changeBlockStatus(user).then(newUser => {
            this.user = newUser.plain();
            modal.close();
        })

    }

}
UserService.$inject = ['$state', 'ApiService', '$uibModal'];
export default UserService;