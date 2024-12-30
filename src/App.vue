<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaQuery } from '@vueuse/core'
import { useNotesStore } from './stores/notes'
import type { Note } from './types/note'
import NoteList from './components/NoteList.vue'
import NoteEditor from './components/NoteEditor.vue'

const notesStore = useNotesStore()
const { notes } = storeToRefs(notesStore)
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const selectedNote = ref<Note | null>(null)
const showEditor = ref(false)

function createNewNote() {
  const note = {
    title: '新笔记',
    content: ''
  }
  notesStore.addNote(note)
  selectedNote.value = notes.value[notes.value.length - 1]
  showEditor.value = true
}

function selectNote(note: Note) {
  selectedNote.value = note
  if (!isLargeScreen.value) {
    showEditor.value = true
  }
}

function updateCurrentNote(updates: Partial<Note>) {
  if (selectedNote.value) {
    notesStore.updateNote(selectedNote.value.id, updates)
  }
}

function deleteCurrentNote() {
  if (selectedNote.value) {
    notesStore.deleteNote(selectedNote.value.id)
    selectedNote.value = null
    showEditor.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <div class="grid gap-4" :class="isLargeScreen ? 'grid-cols-[300px_1fr]' : 'grid-cols-1'">
        <NoteList
          v-show="!showEditor || isLargeScreen"
          :notes="notes"
          :selected-note-id="selectedNote?.id"
          :on-select="selectNote"
          :on-create-note="createNewNote"
        />
        <NoteEditor
          v-show="showEditor || isLargeScreen"
          :note="selectedNote"
          :show-back-button="!isLargeScreen"
          :on-update="updateCurrentNote"
          :on-delete="deleteCurrentNote"
          :on-back="() => showEditor = false"
        />
      </div>
    </div>
  </div>
</template>

<style>
</style>
