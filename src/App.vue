<script setup lang="ts">
import { useNotesStore } from './stores/notes'
import NoteList from './components/NoteList.vue'
import NoteEditor from './components/NoteEditor.vue'
import MainLayout from './layouts/MainLayout.vue'
import { storeToRefs } from 'pinia'
import type { Note } from './types/note'
import { computed } from 'vue'

const notesStore = useNotesStore()
const { notes, selectedNoteId } = storeToRefs(notesStore)
const selectedNote = computed(() => {
  const note = notesStore.getSelectedNote()
  return note ? {
    ...note,
    updateTitle: (title: string) => notesStore.updateNote(note.id, { title }),
    updateContent: (content: string) => notesStore.updateNote(note.id, { content, html: content }),
    delete: () => notesStore.deleteNote(note.id)
  } : null
})
</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1">
        <NoteList
          :notes="notes"
          :selectedNoteId="selectedNoteId"
          :onSelect="(note) => notesStore.selectNote(note.id)"
          :onCreate="notesStore.createNote"
        />
      </div>
      <div class="md:col-span-2">
        <div v-if="selectedNote" class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b">
            <div class="flex justify-between items-center gap-4">
              <input
                v-model="selectedNote.title"
                class="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 flex-1"
                placeholder="无标题"
                @input="selectedNote.updateTitle(selectedNote.title)"
              >
              <button
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                @click="selectedNote.delete()"
              >
                <i class="i-carbon-trash-can text-lg" />
                删除
              </button>
            </div>
          </div>
          <NoteEditor
            v-model="selectedNote.content"
            @update:modelValue="selectedNote.updateContent"
          />
        </div>
        <div v-else class="bg-white rounded-lg shadow-sm p-8 text-center">
          <div class="text-gray-400 space-y-4">
            <i class="i-carbon-notebook block mx-auto text-6xl" />
            <p class="text-lg">选择或创建一个笔记开始</p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style>
.btn {
  display: inline-flex;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  transition: all 0.2s;
}
</style>
