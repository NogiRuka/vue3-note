<script setup lang="ts">
import { useNotesStore } from './stores/notes'
import NoteList from './components/NoteList.vue'
import NoteEditor from './components/NoteEditor.vue'
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

function handleNoteSelect(note: Note) {
  notesStore.selectNote(note.id)
}

function handleNoteCreate() {
  notesStore.createNote()
}

function handleNoteUpdate(id: string, content: string) {
  notesStore.updateNote(id, {
    content,
    html: content
  })
}

function handleNoteDelete(id: string) {
  notesStore.deleteNote(id)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-1">
          <NoteList
            :notes="notes"
            :selectedNoteId="selectedNoteId"
            :onSelect="handleNoteSelect"
            :onCreate="handleNoteCreate"
          />
        </div>
        <div class="md:col-span-2">
          <div v-if="selectedNote" class="bg-white rounded-lg shadow p-4">
            <div class="flex justify-between items-center mb-4">
              <input
                v-model="selectedNote.title"
                class="text-2xl font-bold bg-transparent border-none focus:outline-none flex-1"
                @input="selectedNote.updateTitle(selectedNote.title)"
              >
              <button
                class="btn bg-red-500 hover:bg-red-600"
                @click="selectedNote.delete()"
              >
                删除
              </button>
            </div>
            <NoteEditor
              v-model="selectedNote.content"
              @update:modelValue="selectedNote.updateContent"
            />
          </div>
          <div v-else class="bg-white rounded-lg shadow p-4 h-[calc(100vh-4rem)] flex-center text-gray-400">
            选择或创建一个笔记开始
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.btn {
  @apply px-4 py-2 rounded-lg text-white transition-colors;
}

.flex-center {
  @apply flex items-center justify-center;
}
</style>
