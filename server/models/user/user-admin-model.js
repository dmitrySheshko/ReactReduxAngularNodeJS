import UserPublicModel from './user-public-model';

export default class UserAdminModel extends UserPublicModel {
    constructor(user){
        super(user);
        this.login = user.login;
    }
}