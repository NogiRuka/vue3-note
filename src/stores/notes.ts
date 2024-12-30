import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Ref } from 'vue'
import type { Note } from '../types/note'

export const useNotesStore = defineStore('notes', () => {
  const notes: Ref<Note[]> = useStorage('notes', [])
  
  function addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) {
    const timestamp = Date.now()
    notes.value.push({
      ...note,
      id: crypto.randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp
    })
  }

  function updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      Object.assign(note, {
        ...updates,
        updatedAt: Date.now()
      })
    }
  }

  function deleteNote(id: string) {
    const index = notes.value.findIndex(n => n.id === id)
    if (index > -1) {
      notes.value.splice(index, 1)
    }
  }

  return {
    notes,
    addNote,
    updateNote,
    deleteNote
  }
}) 