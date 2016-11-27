class UserAttentionCtrl {
    constructor($uibModalInstance, data){
        this.$uibModalInstance = $uibModalInstance;
        this.data = data;
        this.isSend = false;
    }

    ok(){
        if(!this.isSend){
            this.isSend = true;
            if(typeof this.data.successCallback === 'function') {
                this.data.successCallback();
            }
        }
    }

    cancel(){
        this.$uibModalInstance.dismiss();
    }
}
UserAttentionCtrl.$inject = ['$uibModalInstance', 'data'];
export default UserAttentionCtrl;