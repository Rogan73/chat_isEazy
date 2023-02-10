<template>
        
         <div  class="btn btn-outline btn-primary" 
         @click="$refs['fileInput'].click()"
         > 
            <ic_plus/> 
            <input ref="fileInput" class="hidden" type="file" @input="onFileSelected" >
         </div>
         <div class="relative w-full">
         <input v-model="msg" type="text" ref="inm" placeholder="Mensaje"  class="input input-bordered w-full " >
          <div class="absolute rounded-xl right-0 top-[-22px] 
          dark:bg-slate-600 bg-slate-300 
          px-2 gap-1 max-w-[54vw]   text-xs flex items-center"
          v-if="file.name!=''"
           >
            <ic_close class="w-[20px] cursor-pointer" @click="clearFile"/>
            <span class="truncate">({{(parseFloat(file.size)/1000000).toFixed(2)}}mb) {{file.name}} </span>

          </div>
          </div>    
         <div for="modal_chat" class="btn btn-primary " @click="addItemAndClear"><ic_send/></div>


</template>

<script setup>
import {ref} from 'vue'
import { useMessagesStore } from '@/stores/messages'
import ic_send from './icons/ic_send.vue'
import ic_plus from './icons/ic_plus.vue'
import ic_close from './icons/ic_close.vue'

let msg=ref('')
let inm=ref('')
let file=ref({name:'',size:'',fileobj:null})
const messages = useMessagesStore()

const addItemAndClear= ()=>{
    if (msg.value=='') return

    messages.addItem({text:msg.value},file.value);
    msg.value=''
    file.value={name:'',size:'',fileobj:null}
}

const onFileSelected = (event)=>{
   file.value.fileobj=event.target.files[0]
   file.value.name=event.target.files[0].name
   file.value.size=event.target.files[0].size
   inm.value.focus()
}

const clearFile = ()=>{
  file.value={name:'',size:'',fileobj:null}
}


</script>