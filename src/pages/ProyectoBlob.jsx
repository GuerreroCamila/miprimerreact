import React, { useState } from 'react';

function ProyectoBlob() {
  let nombre = "Camila";
  let datos = {
    edad: 21,
    direccion: 'San Martin 147 Campo Santo'
  };

  let mascota = ['perro', 'gato', 'tortuga'];

  let [resultado, setResultado] = useState("");
  let [blobObjeto, setBlobObjeto] = useState(null);
  let [sliceResultado, setSliceResultado] = useState("");

  const crearBlob = () => {
    const contenido = `Nombre: ${nombre}\nEdad: ${datos.edad}\nDirección: ${datos.direccion}\nMascotas: ${mascota.join(', ')}`;
    const nuevoBlob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    setBlobObjeto(nuevoBlob);

    nuevoBlob.text().then((texto) => {
      setResultado(texto);
    });
  };

  const descargarArchivo = () => {
    if (!blobObjeto) return;
    const url= URL.createObjectURL(blobObjeto);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'datos_usuario.txt';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  };

  const aplicarSlice = () => {
    if (!blobObjeto) return;
    const corteBlob = blobObjeto.slice(0, 20, 'text/plain;charset=utf-8');
    corteBlob.text().then((textoCortado) => {
      setSliceResultado(textoCortado);
    });
  };

  return (
    <div className="container">
      <h2 className="title">Proyecto React Route, Trabajo práctico 7 de Lenguaje IV</h2>
      <div className="botones-container">
        <button className="btn btn-crear" onClick={crearBlob}>
          1. Crear y Leer Blob
        </button>
        <button
          className="btn btn-descargar"
          onClick={descargarArchivo}
          disabled={!blobObjeto}
          style={{ opacity: !blobObjeto ? 0.5 : 1, cursor: !blobObjeto ? 'not-allowed' : 'pointer' }}
        >
          2. Descargar .txt Local
        </button>

        <button
          className="btn btn-slice"
          onClick={aplicarSlice}
          disabled={!blobObjeto}
          style={{ opacity: !blobObjeto ? 0.5 : 1, cursor: !blobObjeto ? 'not-allowed' : 'pointer' }}
        >
          3. Aplicar Slice con 20 bytes
        </button>
      </div>

      {resultado && (
        <div className="card">
          <h3>Contenido:</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{resultado}</p>
        </div>
      )}

      {sliceResultado && (
        <div className="card">
          <h3>Resultado del Blob.slice(0, 20):</h3>
          <p>{sliceResultado}</p>
        </div>
      )}
    </div>
  );
}

export default ProyectoBlob;