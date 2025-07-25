module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          components: './src/components',
          services: './src/services',
          helpers: './src/helpers',
          pages: './src/pages',
          routes: './src/routes',
          themes: './src/themes',
          navigations: './src/navigations',
          utils: './src/utils',
          constants: './src/state/constants',
          assets: './src/assets/',
          hooks: './src/hooks',
        },
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
      },
    ],
  ],
};
