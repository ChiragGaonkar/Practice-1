import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    admin: [
      {
        getDesignation : "Admin",
        getFullName : "Ganesh",
        getEmail : "g@gmail.com",
        getId : "1010",
        getPhoneNumber : "9822688341",
        getPassword : 123123,
      },
      {
        getDesignation : "Admin",
        getFullName : "Vicky",
        getEmail : "v@gmail.com",
        getId : "1011",
        getPhoneNumber : "9822682341",
        getPassword : 123123,
      },
    ],
    user: [
      {
        getDesignation : "User",
        getFullName : "Chirag",
        getEmail : "c@gmail.com",
        getId : "1001",
        getPhoneNumber : "9822688251",
        getPassword : 121212,
      }
    ]
  },

  mutations: {
    UPDATE_USERS(state, payload){
      state.user.push(payload)
    },

    DELETE_USERS(state, payload){
      state.user = state.user.filter((tempUser)=>{
        return tempUser.getId != payload
      })
    },

    UPDATE_ADMIN(state,payload){
      state.admin.push(payload)
    },

    DELETE_ADMIN(state, payload){
      state.admin = state.admin.filter((tempAdmin)=>{
        return tempAdmin.getId != payload
      })
    },

    // updateCartItem(state, updatedItem) {
    //   state.cart = state.cart.map((cartItem) => {
    //     if (cartItem.id == updatedItem.id) {
    //       return updatedItem;
    //     }
    //     return cartItem;
    //   });
    // },

    // removeCartItem(state, item) {
    //   state.cart = state.cart.filter((cartItem) => {
    //     return cartItem.id != item.id;
    //   });
    // },
  },
  actions: {
    addUsers(context, payload){
      context.commit('UPDATE_USERS', payload);
    },

    deleteUsers(context,payload){
      context.commit('DELETE_USERS', payload);
    },

    addAdmins(context,payload){
      context.commit('UPDATE_ADMIN',payload);
    },

    deleteAdmins(context,payload){
      context.commit('DELETE_ADMIN', payload);
    }

  },
  getters: {
    users: function(state){
      return state.user;
    },
    admins: function(state){
      return state.admin;
    },
    getUserDetails: (state) => (userId) => {
      // console.log(userId)
      return state.user.find(users => users.getId == userId);
    },
    getAdminDetails: (state) => (adminId) => {
      // console.log(userId)
      return state.admin.find(admins => admins.getId == adminId);
    },
  },
  plugins:[vuexLocal.plugin],

});
