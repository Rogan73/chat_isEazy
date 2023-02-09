<template>

  <div class="flex justify-center mt-20">
     <label for="modal_chat" class="btn" @click="open_chat">CHAT</label>


  <button  @click="other.toogleTheme(0)"  class="btn mx-5" >
    <ic_light v-if="other.theme!='dark' "/>
    <ic_dark v-if="other.theme=='dark' " />
  </button>


  </div>


<modalDialog/>

</template>

<script setup>
import {ref,onMounted} from 'vue'
import modalDialog from './components/modalDialog.vue'
import {useUserStore}  from '@/stores/user'
import {useMessagesStore}  from '@/stores/messages'
import {useOtherStore}  from '@/stores/other'
import ic_light from './components/icons/ic_light.vue'
import ic_dark from './components/icons/ic_dark.vue'
import utils from '@/utils'

const user = useUserStore()
const messages = useMessagesStore()
const other = useOtherStore()

let id_user=ref(200)  // id - con quen ceremos hablar

const open_chat=()=>{
  messages.loadMessages(id_user.value)
}

onMounted(() => {
    other.toogleTheme(1)
    user.login().then( id_user => {
        id_user? console.log('Inicio de sesión exitoso id_user:',id_user) :  console.log('error de inicio de sesión 01')
    }).catch( e =>{console.log('error',e)})
})


</script>
