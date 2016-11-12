import * as constants from '../../../common/constants/const';
import { usersChangeOnline } from '../../actions/users-actions';
import { userChangeOnline } from '../../actions/user-actions';

export default class WS {
    constructor(dispatch){
        this.dispatch = dispatch;
        this.init();
        this.sendMessage = this.sendMessage.bind(this);
    }

    init(){
        this.socket = new WebSocket('wss://' + window.location.hostname + ':3000/wss');
        this.onOpen();
    }

    onOpen(){
        this.socket.onopen = () => {
            this.onMessage();
        };
    }

    onMessage(){
        this.socket.onmessage = (message) => {
            this.messageHandler(JSON.parse(message.data));
        };
    }

    messageHandler(message){
        if(!message.type) {
            return;
        }
        switch (message.type){
            case constants.ONLINE_STATUS:
                this.dispatch(usersChangeOnline(message.params));
                this.dispatch(userChangeOnline(message.params));
                break;
            default :
                break;
        }
    }

    sendMessage(message){
        this.socket.send(JSON.stringify(message));
    }
}