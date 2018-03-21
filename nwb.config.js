module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'NumberBox',
      externals: {
        react: 'React'
      }
    }
  }
}
