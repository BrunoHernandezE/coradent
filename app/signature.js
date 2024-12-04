window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signature-pad');
    const clearButton = document.getElementById('clear');
    const libreta = document.getElementById('libreta');
  
    // Inicializa SignaturePad usando la función expuesta desde el preload
    const signaturePad = window.func.initSignature('signature-pad');
  
    // Configura el botón "clear" para limpiar el lienzo
    clearButton.addEventListener('click', () => {
      if (signaturePad) {
        console.log("limpia");
        
        signaturePad.clear(); // Limpia el lienzo
      } else {
        console.error('SignaturePad no está inicializado.');
      }
    });
  
    // Detecta eventos en el botón "clear"
    clearButton.addEventListener('pointerdown', (e) => {
      console.log(e.pointerType);
    });
  
    // Inserta contenido dinámico
    libreta.insertAdjacentHTML('afterbegin', '<svg>Your SVG Icon</svg>');
  });