export default class UserPublicModel {
    constructor(user){
        this.id = user.id;
        this.name = user.name;
        this.role = user.role;
        this.gender = user.gender;
        this.description = user.description;
        this.online = user.online || false;
        this.blocked = user.blocked || false;
    }
}