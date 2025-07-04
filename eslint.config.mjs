import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import readableTwLint from 'eslint-plugin-readable-tailwind'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: { 'readable-tailwind': readableTwLint },
    rules: {
      ...readableTwLint.configs.warning.rules,
    },
  },
]

export default eslintConfig
