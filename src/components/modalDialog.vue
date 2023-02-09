<template>


<input type="checkbox" id="modal_chat" v-model="messages.chat_dialog" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-bottom ">
  <div class="modal-box  pb-0 d_size pt-1 px-2  ">
    <h3 class="font-bold text-lg text-center py-2">Comentarios</h3>
    <label for="modal_chat"><ic_close  class="absolute top-3 right-3 hover:dark:text-slate-100 hover:text-slate-900 text-slate-600 dark:text-slate-400 cursor-pointer"/></label>
    <div class="py-4 px-2 h-[73vh] overflow-y-scroll " id="chat_frame">
          <template v-for="item,i in messages.items" :key="i">
              <component :item="item" :is="item.type==0 ? messageBox : fileBox"/>
          </template>
    </div>
    <div class="modal-action my-0 py-2 px-3 border-t border-slate-600 flex justify-between">
      <sendMessage/>
   </div>
  </div>
</div>


</template>

<script setup>
import {onMounted} from 'vue'
import {useMessagesStore}  from '@/stores/messages'
import utils from '@/utils'

import messageBox from './messageBox.vue'
import fileBox from './fileBox.vue'
import sendMessage from './sendMessage.vue'

import ic_close from './icons/ic_close.vue'

const messages = useMessagesStore()

onMounted(() => {
   utils.scrollDown('chat_frame')
})


</script>