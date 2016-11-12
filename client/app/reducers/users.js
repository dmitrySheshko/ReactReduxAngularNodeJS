import { SET_USERS, SET_USERS_COUNT, ONLINE_STATUS } from '../../common/constants/const';

const initialState = {
    users: [],
    usersCount: 0
};

const reducerUsers = function(state = initialState, action){
    switch(action.type){
        case SET_USERS:
            return { ...state, users: action.users };
            break;
        case SET_USERS_COUNT:
            return { ...state, usersCount: action.count };
            break;
        case ONLINE_STATUS:
            let users = state.users.map((user) => {
                if(user.id === action.user.userId){
                    user.online = action.user.online;
                }
                return user;
            });
            return { ...state, users: users };
            break;
        case '':
            break;

        default: return state;
    }
};

export default reducerUsers;