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
  <div class="h-full bg-white rounded-lg shadow-sm flex flex-col">
    <div class="p-3 lg:p-4 border-b flex-none">
      <div class="flex justify-between items-center">
        <h2 class="text-base lg:text-lg font-semibold text-gray-800">笔记列表</h2>
        <button
          class="inline-flex items-center gap-1 lg:gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-white transition-colors bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          @click="onCreate"
        >
          <i class="i-carbon-add text-lg" />
          <span class="hidden sm:inline">新建笔记</span>
        </button>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto divide-y">
      <div
        v-for="note in sortedNotes"
        :key="note.id"
        class="p-3 lg:p-4 cursor-pointer transition-colors hover:bg-gray-50"
        :class="{ 'bg-blue-50 hover:bg-blue-50': note.id === selectedNoteId }"
        @click="onSelect(note)"
      >
        <h3 class="font-medium text-gray-900 mb-1 truncate">
          {{ note.title || '无标题' }}
        </h3>
        <p class="text-sm text-gray-500 mb-2 line-clamp-2">
          {{ getPreviewText(note) }}
        </p>
        <p class="text-xs text-gray-400 flex items-center gap-1">
          <i class="i-carbon-time" />
          {{ new Date(note.updatedAt).toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template> 