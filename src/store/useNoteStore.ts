import {defineStore} from "pinia";
import {getNoteById as getById, publishNote} from "../api/note.ts";
import {Ref, ref} from "vue";
import {Note} from "../type/Note.ts";


interface State {
    currentNote: Note | null
}

export default defineStore('note', () => {
    const state: Ref<State> = ref({
        currentNote: null
    })


    const getNoteById = async (id: number) => {
        state.value.currentNote = (await getById(id)).data
    }

    async function publish(note: Note) {
        try {
            return (await publishNote(note)).data.code === 100
        } catch (e) {
            return false
        }
    }


    return {
        state,
        getNoteById,
        publish
    }

})
