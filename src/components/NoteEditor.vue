<script setup lang="ts">
import type { Note } from '../types/note'

defineProps<{
  note: Note | null
  showBackButton?: boolean
  onUpdate: (updates: Partial<Note>) => void
  onDelete: () => void
  onBack: () => void
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4 h-[calc(100vh-4rem)] overflow-y-auto">
    <div v-if="note" class="h-full flex flex-col max-w-full">
      <div class="flex justify-between items-center mb-4 gap-2">
        <input
          v-model="note.title"
          class="text-2xl font-bold bg-transparent border-none focus:outline-none min-w-0 flex-1"
          @input="onUpdate({ title: note.title })"
        >
        <div class="flex gap-2 flex-shrink-0">
          <button v-if="showBackButton" 
                  class="btn bg-gray-500 hover:bg-gray-600"
                  @click="onBack">
            返回
          </button>
          <button class="btn bg-red-500 hover:bg-red-600"
                  @click="onDelete">
            删除
          </button>
        </div>
      </div>
      <textarea
        v-model="note.content"
        class="flex-1 p-4 border rounded-lg resize-none"
        @input="onUpdate({ content: note.content })"
        placeholder="开始写作..."
      ></textarea>
    </div>
    <div v-else class="h-full flex-center text-gray-400">
      选择或创建一个笔记开始
    </div>
  </div>
</template> 