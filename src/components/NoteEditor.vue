<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-500 hover:underline',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto',
      },
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(() => props.modelValue, (newValue) => {
  const editorContent = editor.value?.getHTML()
  if (newValue !== editorContent) {
    editor.value?.commands.setContent(newValue, false)
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="note-editor">
    <editor-content :editor="editor" class="h-full p-4 border rounded-lg overflow-y-auto" />
  </div>
</template>

<style>
.note-editor {
  @apply w-full;
}

.ProseMirror {
  @apply h-full outline-none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  @apply text-gray-400 float-left h-0 pointer-events-none;
}

/* 编辑器基本样式 */
.ProseMirror h1 {
  @apply text-4xl font-bold mb-4;
}

.ProseMirror h2 {
  @apply text-3xl font-bold mb-3;
}

.ProseMirror h3 {
  @apply text-2xl font-bold mb-2;
}

.ProseMirror p {
  @apply mb-4;
}

.ProseMirror ul {
  @apply list-disc pl-6 mb-4;
}

.ProseMirror ol {
  @apply list-decimal pl-6 mb-4;
}

.ProseMirror blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}

.ProseMirror pre {
  @apply bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto;
}

.ProseMirror code {
  @apply font-mono bg-gray-100 px-1 rounded;
}

.ProseMirror img {
  @apply max-w-full h-auto my-4;
}

.ProseMirror a {
  @apply text-blue-500 hover:underline;
}

.ProseMirror hr {
  @apply my-8 border-t border-gray-300;
}
</style> 