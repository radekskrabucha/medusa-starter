import pluginJs from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const config = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  eslintConfigPrettier,
  reactPlugin.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'react-compiler/react-compiler': 'error',
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "varsIgnorePattern": "^_$"
        }
      ]
    },
    plugins: {
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': reactHooksPlugin,
      'react-compiler': reactCompiler
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]

export default config
