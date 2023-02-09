import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import utils from '@/utils'

export const useMessagesStore = defineStore('chat', () => {

    let items = ref([])
    let chat_dialog = ref(false)
    let last_user = { id: 0, avatar: '' } // para emular la comunicación entre dos usuarios
    let url_files = 'https://server.com/filesave'
    let theme = ref('dark')


    const user = useUserStore()

    const addItem = async(in_obj, fileobj) => {

        if (in_obj.text.trim() == '') return

        let type = 0;
        let arch = {};

        if (fileobj.name != '') {
            let rf = await upload(fileobj)
            if (!rf.result) {
                alert('ERROR: El archivo no fue enviado');
                return
            } else {
                type = 1;
                arch.file = fileobj.name
                arch.link = rf.link
                arch.file_descr = fileobj.fileobj.type + ' (' + (parseFloat(fileobj.fileobj.size) / 1000000).toFixed(2) + 'mb)'
            }

        }



        //  === para emular la comunicación entre dos usuarios  ===
        let from_user = {}
        if (last_user.id == 100) {
            from_user.id = 200
            from_user.avatar = 'stuff01.jpg'
            from_user.name = 'Maria'
        } else {
            from_user.id = 100
            from_user.avatar = 'stuff02.jpg'
            from_user.name = 'Juan'
        }
        last_user = {...from_user }
            // === fin de datos para emular ===



        let obj = {
            id_user: from_user.id, // actual - user.cur_user.id_user,
            avatar: from_user.avatar, // actual -  user.cur_user.avatar,
            name: from_user.name, // actual -  user.cur_user.name,
            text: in_obj.text,
            time: utils.today(2),
            type: type
        }

        let obj_m = type == 1 ? {...obj, ...arch } : obj

        // guardar el mensaje en servidor
        send_to_server(obj_m).then(r => {
            if (r) {
                items.value.push(obj_m)
                utils.scrollDown('chat_frame')
            }
        })

    }

    const send_to_server = async(obj) => {
        // let r = await axios.post ...
        return true
    }

    const loadMessages = async(user_id) => {
        console.log('Cargando mensajes por usuario', user_id)

        if (user.cur_user.id_user == 0) return

        // descargamos desde servidor mensajes del usuario actual (user.cur_user.id_user) y su compañero (user_id)
        // en nuestro ejemplo descargamos solo un archivo JSON
        try {
            let d = await axios.get('messages.json')
            items.value = [...d.data]
            chat_dialog.value = true;
            utils.scrollDown('chat_frame')
            return items.value.length
        } catch (error) {
            console.log(error.response.data.error)
            return 0
        }
    }

    const upload = async(SelectedFile) => {

        return { result: true, link: 'https://sever.com/files/file.pdf' } // para DEMO  

        const fd = new FormData()
        fd.append('', SelectedFile, SelectedFile.name)
        let res = { result: false, link: '' }
        let response = await axios.post(url_files, fd);
        if (response) {
            if (response.data) {
                if (response.data.result == true) {
                    res.result = true
                    res.link = response.data.link
                } else {
                    console.log('Error', response.data.error);
                }
            }
        }

        return res;

    }


    return { items, addItem, loadMessages }

})