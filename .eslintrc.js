module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'linebreak-style': ['off', 'windows'],
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        indent: ['error', 4],
        'max-len': ['error', { code: 150 }],
        '@typescript-eslint/no-explicit-any': ['off'], // 应许ts中使用any类型
    },
};
