import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

    let cur_user = ref({
        id_user: 0,
        name: '',
        avatar: '',
    })

    const login = async() => {
        let d = await axios.get('user.json')
        cur_user.value = {...d.data }
        return cur_user.value.id_user
    }

    return { cur_user, login }

})