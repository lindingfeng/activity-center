const path = require('path');
/* eslint-env node */
// require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  globals: {
    'defineOptions': true
  },
  extends: [
    // "plugin:vue/essential",
    "plugin:vue/recommended",
    "eslint:recommended",
    // "@vue/eslint-config-prettier",
    // '@vue/standard',
    path.join(__dirname, './.eslintrcbase.js'),
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'vue/no-v-html': 'off',
    'no-implicit-coercion': 'off',
    'no-async-promise-executor': 'off',
    'vue/html-self-closing': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
  },
};
