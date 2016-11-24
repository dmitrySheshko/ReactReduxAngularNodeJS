class StorageService {

    constructor(){
        this.state = {
            owner: {},
            users: {}
        };
    }

    setData(field, data) {
        this.state[field] = data;
    };

    clearServiceField(fieldName) {
        switch(typeof this.state[fieldName]){
            case 'object':
                this.state[fieldName] = {};
                break;
            case 'array':
                this.state[fieldName] = [];
                break;
            case 'function':
                break;
            default:
                this.state[fieldName] = null;
                break;
        }
    };

    clearService() {
        for(let field in this.state){
            this.clearServiceField(field);
        }
    };
}
StorageService.$inject = [];
export default StorageService;
