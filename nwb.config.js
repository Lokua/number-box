module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'LUI',
      externals: {
        react: 'React'
      }
    }
  }
}
