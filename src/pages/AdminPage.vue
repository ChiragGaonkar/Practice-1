<template>
  <q-layout>
    <div class="row justify-center items-center">
      <q-layout  view="lHh lpr lFf" container style="height: 100px" class="shadow-2 rounded-borders">
          <q-header reveal elevated style="background: #42d392;">
            <q-toolbar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
              </q-avatar>

              <q-toolbar-title v-if="personDetails">{{personDetails.getFullName}}</q-toolbar-title>
              <p style="padding:4px" v-if="personDetails">{{personDetails.getDesignation}}</p>

              <q-btn unelevated  rounded style="background:white;color:#42d392;" icon="add"  @click="toggleRegister" />
              <q-btn unelevated  rounded style="background:white;color:#42d392;" icon="delete"  @click="logOut" />
            </q-toolbar>
          </q-header>
      </q-layout>

        <Register v-if="toggleReg" @customChange="handleCustomChange"></Register>
        <ConfirmRegister v-else-if="changeComponent" :passUserData = "setObject" @customComponentChange="handleCustomComponent"></ConfirmRegister>
    </div>
    <div class="q-pa-md row items-start q-gutter-md row justify-center" v-if="!toggleReg && !changeComponent">
      <!-- Users Card -->
      <q-card dark bordered class="my-card" style="background: #b9ead4;" v-for="users in getUsers" :key="users.getId">
        <q-card-section>
          <div class="text-h5">{{users.getFullName}}</div>
          <div class="text-subtitle2">{{users.getDesignation}}</div>
        </q-card-section>

        <q-separator dark inset />
        <q-card-section>
          <h6 style="margin-bottom: 4px;">Contact Details</h6>
          <p>Email Id: {{users.getEmail}}</p>
          <p>Phone No: {{users.getPhoneNumber}}</p>
          <p v-if="users.getDesignation == 'User'">User Id: {{users.getId}}</p>
          <div class="row justify-end" style="padding-top:10px">
            <q-btn round color="secondary" icon="delete" @click="deletePerson(users.getId,users.getDesignation)"/>
          </div>
        </q-card-section>
      </q-card>

      <!-- Admins Card -->
      <q-card dark bordered class="my-card" style="background: #eab9b9;" v-for="admin in getAdmins" :key="admin.getId">
        <q-card-section>
          <div class="text-h5">{{admin.getFullName}}</div>
          <div class="text-subtitle2">{{admin.getDesignation}}</div>
        </q-card-section>

        <q-separator dark inset />
        <q-card-section>
          <h6 style="margin-bottom: 4px;">Contact Details</h6>
          <p>Email Id: {{admin.getEmail}}</p>
          <p>Phone No: {{admin.getPhoneNumber}}</p>
          <p v-if="admin.getDesignation == 'Admin' || admin.getDesignation == 'Owner' ">Admin Id: {{admin.getId}}</p>
          <div class="row justify-end" style="padding-top:10px">
            <q-btn round color="secondary" icon="delete" @click="deletePerson(admin.getId,admin.getDesignation)"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-layout>
</template>

<script>
import {computed} from 'vue';
import {useStore} from "vuex";
import Register from '../components/Register.vue';
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ConfirmRegister from 'src/components/ConfirmRegister.vue';

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
        const toggleReg = ref(false);
        const changeComponent = ref(false);
        const changeCustomComponent = ref(false)
        var setObject = ref(null);
        let adminId = ref(null);

        const getUsers = computed(function () {
          return store.getters.users;
        });

        const getAdmins = computed(function(){
          return store.getters.admins;
        });

        adminId.value = route.params.id;

        const personDetails = computed(function(){
          for(let i=0; i<getAdmins.value.length; i++){
            getAdmins.value[i].getDesignation = "Admin"
          }
          let handleData = store.getters.getAdminDetails(adminId.value);
          handleData.getDesignation = 'Owner'
          return handleData
        })


        const toggleRegister = ()=>{
          toggleReg.value = !toggleReg.value;
        }

        const handleCustomChange = (designation, fullName, email, id, phoneNumber, gpassword)=>{
          setObject.value = {
            getDesignation : designation.value,
            getFullName : fullName.value,
            getEmail : email.value,
            getId : id.value,
            getPhoneNumber : phoneNumber.value,
            getPassword : gpassword.value,
          }
          toggleReg.value = !toggleReg.value;
          changeComponent.value = !changeComponent.value;
          return setObject;
        }

        const handleCustomComponent = (change)=>{
          changeComponent.value = !changeComponent.value;
        }

        const deletePerson = (id, designation)=>{
          if(designation == 'User'){
            store.dispatch('deleteUsers', id)
          }else if(designation == 'Admin'){
            store.dispatch('deleteAdmins', id)
          }else if(designation == 'Owner'){
            alert("Owners can't be deleted");
          }
        }

        const logOut = () =>{
          router.push({name:'IndexPage'})
        }

        return {
            getUsers,
            getAdmins,
            toggleRegister,
            toggleReg,
            handleCustomChange,
            changeComponent,
            changeCustomComponent,
            setObject,
            handleCustomComponent,
            deletePerson,
            adminId,
            personDetails,
            logOut,
        };
    },
    components: { Register, ConfirmRegister },
}
</script>

<style>
  .my-card{
    width: 100%;
    max-width: 250px;
    padding: 10px;
    text-align: center;
    color: black;
  }

  p{
    margin-bottom: 2px;
  }
  </style>
