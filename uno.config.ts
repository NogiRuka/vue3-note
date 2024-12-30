import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons()
  ],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'btn': 'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300',
    'input': 'w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
  },
  theme: {
    breakpoints: {
      'sm': '320px',
      'md': '640px',
      'lg': '1024px',
      'xl': '1280px',
    },
  }
}) 