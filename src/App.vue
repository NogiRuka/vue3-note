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
    <div class="h-full grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
      <div class="lg:col-span-1 h-[300px] lg:h-full overflow-hidden">
        <NoteList
          :notes="notes"
          :selectedNoteId="selectedNoteId"
          :onSelect="(note) => notesStore.selectNote(note.id)"
          :onCreate="notesStore.createNote"
        />
      </div>
      <div class="lg:col-span-3 h-[calc(100vh-400px)] lg:h-full overflow-hidden">
        <div v-if="selectedNote" class="h-full bg-white rounded-lg shadow-sm flex flex-col">
          <div class="p-4 border-b flex-none">
            <div class="flex justify-between items-center gap-4">
              <input
                v-model="selectedNote.title"
                class="text-xl lg:text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 flex-1"
                placeholder="无标题"
                @input="selectedNote.updateTitle(selectedNote.title)"
              >
              <button
                class="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-white transition-colors bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                @click="selectedNote.delete()"
              >
                <i class="i-carbon-trash-can text-lg" />
                <span class="hidden sm:inline">删除</span>
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-hidden">
            <NoteEditor
              v-model="selectedNote.content"
              @update:modelValue="selectedNote.updateContent"
            />
          </div>
        </div>
        <div v-else class="h-full bg-white rounded-lg shadow-sm p-8 flex items-center justify-center">
          <div class="text-gray-400 space-y-4 text-center">
            <i class="i-carbon-notebook block mx-auto text-4xl lg:text-6xl" />
            <p class="text-base lg:text-lg">选择或创建一个笔记开始</p>
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
