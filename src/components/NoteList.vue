<script setup lang="ts">
import type { Note } from '../types/note'
import { computed } from 'vue'

const props = defineProps<{
  notes: Note[]
  selectedNoteId: string | null
  onSelect: (note: Note) => void
  onCreate: () => void
}>()

const sortedNotes = computed(() => {
  return [...props.notes].sort((a, b) => b.updatedAt - a.updatedAt)
})

function getPreviewText(note: Note): string {
  const div = document.createElement('div')
  div.innerHTML = note.html || note.content
  return div.textContent?.slice(0, 100) || ''
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4 h-[calc(100vh-4rem)] flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">笔记列表</h2>
      <button class="btn bg-blue-500 hover:bg-blue-600" @click="onCreate">
        新建笔记
      </button>
    </div>
    <div class="flex-1 overflow-y-auto space-y-2">
      <div
        v-for="note in sortedNotes"
        :key="note.id"
        class="p-3 border rounded-lg cursor-pointer transition-colors"
        :class="{
          'bg-blue-50 border-blue-200': note.id === selectedNoteId,
          'hover:bg-gray-50 border-gray-200': note.id !== selectedNoteId
        }"
        @click="onSelect(note)"
      >
        <h3 class="font-medium mb-1 truncate">{{ note.title || '无标题' }}</h3>
        <p class="text-sm text-gray-500 truncate">{{ getPreviewText(note) }}</p>
        <p class="text-xs text-gray-400 mt-1">
          {{ new Date(note.updatedAt).toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template> 