module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        useBuiltIns: 'usage',
        bugfixes: true,
      },
    ],
    [
      'preact'
    ],
  ],
  plugins: [
    [
      '@emotion/babel-plugin-jsx-pragmatic',
      {
        module: 'preact',
        import: 'h',
        export: 'h',
      }
    ],
  ],
};
