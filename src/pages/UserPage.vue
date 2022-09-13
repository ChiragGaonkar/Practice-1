<template>
  <q-layout>
    <h1 class="row justify-center" >Welcome {{ details.getFullName }}</h1>
    <h5 class="row justify-center text1" style="color: #42d392 ;" >
      {{ details.getEmail }} || {{ details.getPhoneNumber }} || {{ details.getId }}
    </h5>
    <div class="row justify-center items-center" style="letter-spacing: 2px;">
      <p> {{article}} </p>
    </div>
  </q-layout>
</template>

<script>

import {computed} from 'vue';
import {useStore} from "vuex";
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue'
import { event, useQuasar } from 'quasar'

export default {
setup () {
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  let userId = ref(null);

  const getUsers = computed(function () {
    return store.getters.users;
  });

  userId.value = route.params.id;

  const details = computed(function(){
    console.log(store.getters.getUserDetails(userId.value))
    return store.getters.getUserDetails(userId.value);
  })

  return {
    getUsers,
    article: "If you want to walk fast, walk alone. But if you want to walk far, walk together.",
    userId,
    details,
  }
},
beforeMount()
{
  console.log(this.userId)
    if(!this.userId){
      this.$router.push('/')
    }else{
      console.log(this.userId)
    }
},

created(){
  console.log('Created')
}

}

</script>

<style>
  .my-card{
    width: 80%;
  }
  .text1{
  margin: 25px 0 15px;
  font-size: 1.8em;
  letter-spacing: 2px;
  font-weight: bold;
}
</style>
