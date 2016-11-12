import WsModule from '../../modules/ws/ws-module';
import { messageChangeOnlineStatus } from '../../../client/common/messages/messages';

export default class UserServerModel {
    constructor(user){
        this.id = user.id;
        this.socket = user.socket;
        this.onClose();
    }

    onClose(){
        this.socket.on('close', () => {
            this.destroySocket();
            WsModule.sendMessageToAll(messageChangeOnlineStatus(this.id, false));
        });
    }

    destroySocket(){
        this.socket._socket.destroy();
        WsModule.removeUser(this.id);
    }
}