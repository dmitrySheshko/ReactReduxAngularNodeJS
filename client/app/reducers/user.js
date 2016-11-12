import { SET_USER, ONLINE_STATUS } from '../../common/constants/const';

const initialState = {
    user: {}
};

const reducerUser = function(state = initialState, action){
    switch (action.type){
        case SET_USER:
            return { ...state, user: action.user };
        case ONLINE_STATUS:
            if(action.user.userId === state.user.id){
                let user = state.user;
                user.online = action.user.online;
                return { ...state, user: user };
            }
            return { ...state };
        default :
            return state;
    }
};

export default reducerUser;