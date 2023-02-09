import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOtherStore = defineStore('other', () => {

    let theme = ref('dark')

    const toogleTheme = (tip = 0) => {
        let el = document.documentElement;
        let attr = document.createAttribute('data-theme')

        if (tip == 0) {
            if (el.classList.contains('dark')) {
                el.classList.remove('dark')
                el.classList.add('light')
                attr.value = 'light'
                theme.value = 'light'
            } else {
                el.classList.remove('light')
                el.classList.add('dark')
                attr.value = 'dark'
                theme.value = 'dark'
            }

        } else {
            el.classList.add('dark')
            attr.value = 'dark'
            theme.value = 'dark'
        }

        el.setAttributeNode(attr);

    }

    return { theme, toogleTheme }

})