import {defineStore} from "pinia";
import {MenuOption} from "naive-ui";
import {getMenus as getMenu} from "../api/system.ts";
import {reactive} from "vue";

interface State{
    menus: MenuOption[],
}

export default defineStore('demo',()=>{

    const state:State = reactive({
        menus: [],
    })

    const getMenus = async () => {
        state.menus = (await getMenu()).data
    }

    return {
        state,
        getMenus
    }
})
