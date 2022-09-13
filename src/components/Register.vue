<template>
    <q-layout>
      <q-page-container>
        <div class="row justify-center items-center">
          <div class="authContainer">
            <h5 style="margin-bottom: 4px;" class="textLabel1">Welcome to ProgWorld</h5>
            <br>
            <p class="textLabel2">Register User or Admin</p>
            <br>
            <q-img src="../assets/RegisterPage.svg" class="myImage" />
          </div>
          <div class="authContainer row justify-center items-center">
              <div class="q-gutter-md" style="width:350px" >
                <q-form
                @submit="submit"
                >
                <q-select
                v-model="designation"
                :options="options"
                label="Designation"
                color="green-14"
                />

                <q-input
                v-model="fullName"
                label="Name"
                color="green-14"
                type="text"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                v-model="email"
                label="Email"
                color="green-14"
                type="email"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                v-model="phoneNumber"
                label="Phone Number"
                color="green-14"
                type="number"
                lazy-rules
                :rules="[val => val && val.length == 10  || 'Please type correct Phone Number']"
                />

                <q-input
                v-if="designation == 'User'"
                v-model="id"
                label="User Id"
                color="green-14"
                type="number"
                lazy-rules
                :rules="[val => val && val.length > 0  || 'Please type something']"
                />

                <q-input
                v-if="designation == 'Admin'"
                v-model="id"
                label="Admin Id"
                color="green-14"
                type="number"
                lazy-rules
                :rules="[val => val && val.length > 0  || 'Please type something']"
                />

                <q-input
                v-model="gpassword"
                label="Password"
                color="green-14"
                type="password"
                lazy-rules
                :rules="[
                  val => val && val.length >= 6 || 'Password should be atleast 6 chars long',]"
                />

                <q-input
                v-model="confirmPassword"
                label="Confirm Password"
                color="green-14"
                type="password"
                lazy-rules
                :rules="[
                  val => val && val.length > 0 || 'Please type something',
                  val => val == gpassword || 'Passwords didnt match',
                ]"
                />
                <br>
                <div class="row justify-center items-center">
                  <q-btn unelevated rounded style="background:#42d392; color:white" label="Create User" @click="handleChange"/>
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
import { event, useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup (props, context) {
    const $q = useQuasar()
    const designation = ref(null)
    const fullName = ref(null)
    const email = ref(null)
    const id = ref(null)
    const phoneNumber = ref(null)
    const gpassword = ref(null)
    const confirmPassword = ref(null)

    const confirmRegister = () =>{
      readData.value = !readData.value;
    }

    const handleChange = (event)=>{
      context.emit("customChange",designation, fullName, email, id, phoneNumber, gpassword)
    }

    return {
      fullName,
      email,
      id,
      designation,
      phoneNumber,
      gpassword,
      confirmPassword,
      options: [
        'User', 'Admin'
      ],
      confirmRegister,
      handleChange,
    }
  },
  mounted(){
    console.log("Hear")
  }
}

  </script>

  <style>
  .authContainer{
    padding: 30px;
    height: 620px;
    background: #dbefe6;
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
