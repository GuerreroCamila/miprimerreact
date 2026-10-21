import React, { useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  const [seccion, setSeccion] = useState('inicio');
  
  const nombre = "Camila";
  const datos = {
    edad: 21,
    direccion: 'San Martin 147 Campo Santo'
  };

  const mascota = ['perro', 'gato', 'tortuga'];

  const [resultado, setResultado] = useState("");
  const [blobObjeto, setBlobObjeto] = useState(null);
  const [sliceResultado, setSliceResultado] = useState("");

  const crearBlob = () => {
    const contenido = "Nombre: " + nombre + "\n" +
                      "Edad: " + datos.edad + "\n" +
                      "Dirección: " + datos.direccion + "\n" +
                      "Mascotas: " + mascota.join(', ');

    const nuevoBlob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    setBlobObjeto(nuevoBlob);

    nuevoBlob.text().then((texto) => {
      setResultado(texto);
    });
  };

  const descargarArchivo = () => {
    if (!blobObjeto) return;
    const url = URL.createObjectURL(blobObjeto);
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

  const renderizarContenido = () => {
    switch (seccion) {
      case 'inicio':
        return (
          <div className="card">
            <h3>Inicio</h3>
            <p>Utiliza el menú superior para navegar entre las secciones.</p>
          </div>
        );
      case 'blob':
        return (
          <>
            <h2 className="title">Proyecto React, Trabajo práctico 5 de Lenguaje IV</h2>
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
          </>
        );
      case 'acerca':
        return (
          <div className="card">
            <h3>Acerca de</h3>
            <p>Aplicación desarrollada en React para la materia Lenguaje IV con componentes.</p>
          </div>
        );
      case 'contacto':
        return (
          <div className="card">
            <h3>Contacto</h3>
            <p>Seccion de contacto
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ padding: 0, justifyContent: 'space-between', minHeight: '100vh' }}>
      <Header cambiarSeccion={setSeccion} />
      
      <main style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        {renderizarContenido()}
      </main>

      <Footer />
    </div>
  );
}

export default App;