<template>


    <div class="flex items-center"
    :class=" my_msg ? 'align-center' : 'flex-row-reverse justify-end' "
    > 
      <div class="card   shadow-xl rounded-2xl my-3 mx-0 px-4 py-3  dark:text-slate-200   md:w-max md:max-w-md w-56  " 
        :class="my_msg ? 'bg-violet-300 dark:bg-violet-800 rounded-tr-none ml-auto mr-0 ' : 'bg-slate-300 dark:bg-slate-600 rounded-tl-none ' "
       >
        <div class="absolute top-[-16px]  text-sm px-2 rounded-t-lg"
        :class="my_msg ?  'right-0 bg-violet-300 dark:bg-violet-800' : 'bg-slate-300 dark:bg-slate-600 left-0' "
        >{{item.name}}</div>
        <div class="leading-tight">{{item.text}}</div>
        <p class="text-sm text-slate-600 dark:text-slate-400 text-right">{{item.time}}</p>
 
      </div>

      <div class="avatar ">
          <div class="w-10 rounded-full"
          :class="my_msg ? 'ml-2':'mr-2' "
          >
            <img :src="'/images/'+item.avatar" />
            <div class="mt-10">{{item.name}}</div>
          </div>
          
      </div>

    </div>

</template>

<script setup>
import {computed} from 'vue'
import {useUserStore}  from '@/stores/user'

let user = useUserStore()

const props=defineProps({
  item: Object
})

let my_msg = computed(()=>{
  return props.item.id_user==user.cur_user.id_user

})



</script>