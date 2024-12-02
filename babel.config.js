module.exports = {
    presets: [
      '@babel/preset-env',    // Transforma el código moderno de JavaScript a una versión compatible con el navegador.
      '@babel/preset-react'   // Transforma JSX a código JavaScript normal.
    ],
    plugins: [
      '@babel/plugin-transform-runtime' // Para evitar duplicación de helpers.
    ]
  };