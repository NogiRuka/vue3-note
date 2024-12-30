<script setup lang="ts">
import type { Note } from '../types/note'

defineProps<{
  notes: Note[]
  selectedNoteId?: string
  onSelect: (note: Note) => void
  onCreateNote: () => void
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4 h-[calc(100vh-4rem)] overflow-y-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">我的笔记</h1>
      <button class="btn" @click="onCreateNote">新建</button>
    </div>
    <div class="space-y-2">
      <div v-for="note in notes" 
           :key="note.id"
           @click="onSelect(note)"
           class="p-3 rounded-lg cursor-pointer hover:bg-gray-100"
           :class="{'bg-blue-50': selectedNoteId === note.id}">
        <h3 class="font-medium truncate">{{ note.title }}</h3>
        <p class="text-sm text-gray-500 truncate">
          {{ new Date(note.updatedAt).toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template> 