<template>
  <q-layout>
    <q-page-container>
      <div class="row justify-center items-center">
        <div class="authContainer row justify-center items-center">
            <div class="q-gutter-md" style="width:350px" >
              <q-form
              @submit="submit"
              >
              <q-select
              :readonly="readData"
              color="green-14"
              :label="passUserData.getDesignation"
              hint="Designation"
              />

              <q-input
              color="green-14"
              type="text"
              :readonly="readData"
              :label="passUserData.getFullName"
              hint="Full Name"
              />

              <q-input
              :label="passUserData.getEmail"
              color="green-14"
              type="email"
              :readonly="readData"
              hint="Email"
              />

              <q-input
              :label="passUserData.getPhoneNumber"
              color="green-14"
              :readonly="readData"
              type="number"
              hint="Phone Number"
              />

              <q-input
              v-if="passUserData.getDesignation == 'User'"
              :label="passUserData.getId"
              color="green-14"
              type="number"
              :readonly="readData"
              hint="User Id"
              />

              <q-input
              v-if="passUserData.getDesignation == 'Admin'"
              :label="passUserData.getId"
              color="green-14"
              type="number"
              :readonly="readData"
              hint="Admin Id"
              />

              <q-input
              :label="passUserData.getPassword"
              color="green-14"
              type="password"
              :readonly="readData"
              hint="Password"
              />

              <br>
              <div class="row justify-center items-center">
                <q-btn unelevated rounded style="background:#42d392; color:white" label="Confirm Register" @click="addMyUsers"/>
              </div>
            </q-form>
            </div>
        </div>
        <div class="authContainer">
          <h5 style="margin-bottom: 4px;" class="textLabel1">Confirm your Registration</h5>
          <br>
          <p class="textLabel2">1 step towards your Goal</p>
          <br>
          <q-img src="../assets/ConfirmPage.svg" class="myImage" />
        </div>
      </div>
    </q-page-container>
  </q-layout>

  <!-- <router-link to="/">Home Page</router-link>
  <router-link to="/LogIn">LogIn Page</router-link>
  <router-link to="/Register">Register Page</router-link> -->
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import {computed} from 'vue';
import {useStore} from "vuex";
import { useRouter, useRoute } from 'vue-router'

export default {
props: ['passUserData'],

setup (props,context) {
  const $q = useQuasar()
  const readData = ref(true)
  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  const addMyUsers = (event)=>{
    console.log(props.passUserData);
    if(props.passUserData.getDesignation == 'User'){
      store.dispatch('addUsers',props.passUserData);
    }else if(props.passUserData.getDesignation == 'Admin'){
      store.dispatch('addAdmins',props.passUserData);
    }
    context.emit("customComponentChange", false)
  }

  return {
    options: [
      'User', 'Admin'
    ],
    readData,
    addMyUsers,
  }
},

}

</script>

<style scoped>
.authContainer{
  padding: 30px;
  height: 620px;
  background: #d4d4d4;
  margin-top: 50px;
}
.textLabel1{
  color: #42d392 ;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
.textLabel2{
  color: #000000 ;
  display: inline-block;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: bold;
}
.myImage{
  width: 350px;
  margin-top: 30px;
}
.myLink{
  color: #42d392;
  text-decoration: none;
}
</style>
