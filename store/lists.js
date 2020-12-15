const state = () => ({
    mine: [],
});

const actions = {
    async initialize({ commit, state }) {
        const lists = await this.$axios.$get('/api/lists/mine', {
            withCredentials: true,
        });
        commit('POPULATE_LISTS', lists);
        return state.mine;
    },
    async createList({ commit }, name) {
        const createdList = await this.$axios.$post(
            '/api/lists',
            { name },
            { withCredentials: true }
        );
        commit('NEW_LIST', createdList);
    },
    async deleteList({ commit, state }, listId) {
        const newLists = await this.$axios.$delete(`/api/lists/${listId}`, {
            withCredentials: true,
        });
        commit('REMOVE_LIST', newLists);
        return state.mine;
    },
};
const mutations = {
    POPULATE_LISTS: (state, lists) => {
        state.mine = lists;
    },
    NEW_LIST: (state, list) => {
        state.mine.push(list);
    },
    REMOVE_LIST: (state, newLists) => {
        state.mine = newLists;
    },
};

export default { state, actions, mutations };