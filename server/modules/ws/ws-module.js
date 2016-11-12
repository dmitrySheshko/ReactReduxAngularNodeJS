import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import config from '../../modules/config';
import session from 'express-session';
import connectMongo from 'connect-mongo/es5';
import mongoose from '../../modules/mongoose';

import User from '../../models/user/user-mongoose-model';
import UserServerModel from '../../models/user/user-server-model';

import { messageChangeOnlineStatus } from '../../../client/common/messages/messages';

let mongoStore = connectMongo(session);
let store = new mongoStore({ mongooseConnection: mongoose.connection });

class WsModule{
    constructor(){
        this.users = [];
        this.addUser = this.addUser.bind(this);
    }

    addUser(socket){
        let self = this;
        let cookies = cookie.parse(socket.upgradeReq.headers.cookie);
        let sid = cookieParser.signedCookie(cookies['sid'], config.get("session:secret"));
        if(!sid){
            WsModule.destroySocket(socket);
        }
        store.get(sid, function(err, session) {
            self.setUser(session.user, socket);
        });
    }

    static destroySocket(socket){
        socket.close();
        socket._socket.destroy();
    }

    setUser(userId, socket){

        User.findOne({_id: userId}, (err, user) => {
            if(err) return WsModule.destroySocket();
            let newUser = new UserServerModel({id: user.id, socket: socket});
            this.users.push(newUser);
            this.sendMessageToAll(messageChangeOnlineStatus(user.id, true));
        });
    }

    sendMessageToAll(message){
        this.users.forEach(user => {
            WsModule.sendMessage(user.socket, message);
        });
    }

    static sendMessage(socket, message){
        if(socket.readyState === 1) {
            socket.send(JSON.stringify(message));
        }
    }

    removeUser(userId){
        this.users = this.users.filter(user => {
            return user.id !== userId;
        });
    }
}

export default new WsModule();