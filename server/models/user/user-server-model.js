import WsModule from '../../modules/ws/ws-module';
import { messageChangeOnlineStatus } from '../../../client/common/messages/messages';
import { OUTGOING_CALL, INGOING_CALL, RECEIVER_OFFLINE, END_CALL, REJECT_CALL, ACCEPT_CALL } from '../../../client/common/constants/const';

export default class UserServerModel {
    constructor(user){
        this.id = user.id;
        this.socket = user.socket;
        this.onClose();
        this.onMessage();
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

    onMessage(){
        this.socket.on('message', (message) => {
            this.messageHandler(JSON.parse(message));
        });
    }

    sendMessage(message){
        this.socket.send(JSON.stringify(message));
    }

    getReceiver(id){
        return WsModule.findUserById(id);
    }

    messageHandler(message){
        if(!message.type) {
            return;
        }
        switch (message.type){
            case OUTGOING_CALL:
                let remoteUser = this.getReceiver(message.params.receiver);
                if(remoteUser){
                    message.params.caller.id = this.id;
                    remoteUser.sendMessage({
                        type: INGOING_CALL,
                        params: {
                            caller: message.params.caller
                        }
                    });
                }
                else {
                    this.sendMessage({
                        type: RECEIVER_OFFLINE
                    });
                }
                break;
            case END_CALL:
                remoteUser = this.getReceiver(message.params.receiver);
                if(remoteUser){
                    remoteUser.sendMessage({
                        type: END_CALL
                    });
                }
                break;
            case REJECT_CALL:
                remoteUser = this.getReceiver(message.params.receiver);
                if(remoteUser){
                    remoteUser.sendMessage({
                        type: REJECT_CALL
                    });
                }
                break;
            case ACCEPT_CALL:
                remoteUser = this.getReceiver(message.params.receiver);
                if(remoteUser){
                    remoteUser.sendMessage({
                        type: ACCEPT_CALL
                    });
                }
                break;
            default :
                break;
        }
    }
}