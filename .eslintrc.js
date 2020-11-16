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
        '@typescript-eslint/no-var-requires': ['off'], // 应许使用requires引入文件
        'no-underscore-dangle': ['off'], // 使用下滑线是为了区分 全局mixin混入的变量
        'import/extensions': ['off'], // 使用下滑线是为了区分 全局mixin混入的变量
        '@typescript-eslint/camelcase': ['off'], // 使用下滑线是为了区分 全局mixin混入的变量
        'import/no-dynamic-require': ['off'], // 允许试用require引入
        'global-require': ['off'], // 允许试用require引入
        'no-plusplus': ['off'], // 允许试用i++
        'no-restricted-globals': ["off"], // 禁止使用特定的全局变量
        // '@typescript-eslint/camelcase': ['off'], // 应许ts中使用any类型
    },
};
