import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Note } from '../types/note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const selectedNoteId = ref<string | null>(null)

  // 从localStorage加载笔记
  function loadNotes() {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      notes.value = JSON.parse(savedNotes)
    }
  }

  // 保存笔记到localStorage
  function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes.value))
  }

  // 创建新笔记
  function createNote() {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '新笔记',
      content: '',
      html: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    notes.value.push(newNote)
    selectedNoteId.value = newNote.id
    saveNotes()
    return newNote
  }

  // 更新笔记
  function updateNote(id: string, updates: Partial<Note>) {
    const note = notes.value.find(n => n.id === id)
    if (note) {
      Object.assign(note, {
        ...updates,
        updatedAt: Date.now()
      })
      saveNotes()
    }
  }

  // 删除笔记
  function deleteNote(id: string) {
    const index = notes.value.findIndex(n => n.id === id)
    if (index > -1) {
      notes.value.splice(index, 1)
      if (selectedNoteId.value === id) {
        selectedNoteId.value = notes.value.length > 0 ? notes.value[0].id : null
      }
      saveNotes()
    }
  }

  // 选择笔记
  function selectNote(id: string | null) {
    selectedNoteId.value = id
  }

  // 获取选中的笔记
  function getSelectedNote(): Note | null {
    return notes.value.find(n => n.id === selectedNoteId.value) || null
  }

  // 初始化加载笔记
  loadNotes()

  return {
    notes,
    selectedNoteId,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    getSelectedNote
  }
}) 