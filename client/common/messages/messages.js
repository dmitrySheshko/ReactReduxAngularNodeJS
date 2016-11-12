import * as constants from '../constants/const'

export function messageChangeOnlineStatus(userId, status){
    return {
        type: constants.ONLINE_STATUS,
        params: {
            userId: userId,
            online: status
        }
    }
}