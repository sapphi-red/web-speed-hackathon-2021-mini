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
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === "development",
        useSpread: true,
      },
    ],
  ],
};
