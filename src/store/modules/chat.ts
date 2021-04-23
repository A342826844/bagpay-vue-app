interface State {
    [elem: string]: any;
}
// create a pbject to save the state of app at start
const states: State = {
    // the user of current
    currentUser: {
        id: 13,
        avatar: 'http://tva3.sinaimg.cn/crop.0.0.200.200.50/701cac0cjw8ez3nd2wa7rj205k05kt8v.jpg',
        nickname: 'jack',
    },
    // all users
    users: [
        {
            id: 0,
            nickname: '群聊',
            avatar: 'http://58pic.ooopic.com/58pic/12/25/04/02k58PICVwf.jpg',
            has_message: false,
        },
    ],
    filterUser: '',

    currentSession: {
        id: 0,
        nickname: '群聊',
        avatar: 'http://b.hiphotos.baidu.com/exp/w=480/sign=d86a96f25766d0167e199f20a72ad498/b8014a90f603738d48c6191db61bb051f819ec05.jpg',
        chat: null,
    },

    currentCount: 0,

    online: false,

    broadcast: [],

    connection: null,

    notice: {
        show: false,
        type: '',
        msg: '',
    },
};

// create a object to save the function of mutation
const mutations = {

    FILTER_USER: (state: State, nickname: string) => {
        state.filterUser = nickname;
    },

    CHANGE_SESSION: (state: State, userId: number) => {
        for (let i = state.users.length - 1; i >= 0; i--) {
            if (state.users[i].id === userId) {
                state.currentSession = state.users[i];
                break;
            }
        }
    },

    SET_USER: (state: State, user: any) => {
        state.currentUser = user;
    },

    ADD_USER: (state: State, user: any) => {
        if (user instanceof Array) {
            for (let i = user.length - 1; i >= 0; i--) {
                if (user[i].id !== state.currentUser.id) {
                    state.users.push({
                        ...user[i],
                        has_message: false,
                    });
                }
            }
        } else {
            state.users.push({
                ...user,
                has_message: false,
            });
        }
    },

    REMOVE_USER: (state: State, userId: number) => {
        state.users.forEach((item: any) => {
            if (item.id === userId) {
                state.users.$remove(item);
            }
        });
    },

    SET_CONN: (state: State, conn: any) => {
        if (conn !== null && state.connection === null) {
            state.connection = conn;
        }
    },

    CHANGE_STATUS: (state: State, status: boolean) => {
        state.online = status;
    },

    ADD_MESSAGE: (state: State, message: any) => {
        const msg = {
            user: {
                id: message.from,
                avatar: '',
                nickname: '',
            },
            msg: message.msg,
            time: message.date,
        };
        if (message.from === state.currentUser.id) {
            msg.user = state.currentUser;
        } else {
            for (let i = state.users.length - 1; i >= 0; i--) {
                if (state.users[i].id === message.from) {
                    msg.user = state.users[i];
                    break;
                }
            }
        }

        if (message.to === 0) {
            if (state.broadcast[0] === undefined) {
                state.broadcast[0] = [];
            }

            state.broadcast[0].push(msg);
        } else {
            let { from } = message;
            if (message.is_self === 1) {
                from = message.to;
            }

            if (state.broadcast[from] === undefined) {
                state.broadcast[from] = [];
            }

            state.broadcast[from].push(msg);
        }
    },

    SET_HAS_MESSAGE: (state: State, info: any) => {
        for (let i = state.users.length - 1; i >= 0; i--) {
            if (
                (info.status === false
                && state.users[i].id === info.userId)
                || (state.users[i].id === info.userId
                && state.currentSession.id !== info.userId)
            ) {
                state.users[i].has_message = status;
            }
        }
    },

    SET_COUNT: (state: State, count: number) => {
        state.currentCount = count;
    },
};

const actions = {
    searchUser: ({ commit }: any, filterUser: any) => {
        commit('FILTER_USER', filterUser);
    },

    selectSession: ({ commit }: any, userId: number) => {
        commit('CHANGE_SESSION', userId);
    },

    setUser: ({ commit }: any, user: any) => {
        if (user.id && user.avatar && user.nickname) {
            commit('SET_USER', user);
        }
    },

    addUser: ({ commit }: any, user: any) => {
        if ((user instanceof Array) || (user.id && user.avatar && user.nickname)) {
            commit('ADD_USER', user);
        }
    },

    removeUser: ({ commit }: any, userId: any) => {
        commit('REMOVE_USER', userId);
    },

    setConn: ({ commit }: any, conn: any) => {
        commit('SET_CONN', conn);
    },

    changeStatus: ({ commit }: any, status: any) => {
        commit('CHANGE_STATUS', status);
    },

    addMessage: ({ commit }: any, message: any) => {
        if (message.is_self !== 1) {
            const userId = message.to === 0 ? 0 : message.from;

            commit('SET_HAS_MESSAGE', userId, true);
        }

        commit('ADD_MESSAGE', message);
    },

    setHasMessageStatus: ({ commit }: any, info: { userId: number; status: boolean }) => {
        commit('SET_HAS_MESSAGE', info);
    },

    setCount: ({ commit }: any, count: number) => {
        commit('SET_COUNT', count);
    },

};

export default {
    namespaced: true,
    state: () => states,
    mutations,
    actions,
};
