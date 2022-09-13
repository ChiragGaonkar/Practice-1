<template>
  <q-layout>
    <q-page-container>
      <div class="row justify-center items-center">
        <div class="authContainer">
          <h5 style="margin-bottom: 4px;" class="textLabel1">Welcome Back :)</h5>
          <br>
          <p class="textLabel2">Please Login to your account</p>
          <br>
          <q-img src="../assets/LoginPage.svg" class="myImage" />
        </div>
        <div class="authContainer row justify-center items-center">
            <div class="q-gutter-md" style="width:350px" >
              <q-form
              @submit="submit"
              >
              <q-input
              v-model="email"
              label="Email"
              color="green-14"
              type="email"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
              v-model="password"
              label="Password"
              color="green-14"
              type="password"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']"
              />
              <br>
              <div class="row justify-center items-center">
                <q-btn unelevated rounded style="background:#42d392; color:white" label="Log in" @click="auth"/>
              </div>
            </q-form>
            </div>
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


export default {
setup () {
  const $q = useQuasar()
  const email = ref(null)
  const password = ref(null)
  const store = useStore();

  const getEmail = computed(function () {
    return store.getters.email;
  });

  return {
    email,
    password,
    getEmail,
  }
},

methods: {
  auth(){
    if(this.getEmail == this.email){
      console.log("Matched");
    }else{
      console.log("Not Matched");
    }
  }
}
}

</script>

<style>
.authContainer{
  padding: 30px;
  height: 500px;
  background: #dbefe6;
  margin-top: 100px;
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
