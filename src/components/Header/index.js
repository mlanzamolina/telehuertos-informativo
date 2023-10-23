import React from "react";

export const Header = () => {
  return (
    <>
      <header id="layout-header">
        <nav className="navbar navbar-fixed">
          <div className="navbar-container">
            <a href="{{ url('/') }}">
              <img
                className="navbar-logo"
                src="https://www.sanpedrosula.hn/themes/msps/assets/images/logos/msps_logo.svg"
                alt="Logo Municipalidad de San Pedro Sula"
              />
            </a>
            <ul className="navbar-links">
              <li className="active">
                <a href="/" className="h6" target="_blank">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanpedrosula.hn/teleturismo"
                  className="h6"
                  target="_blank"
                >
                  TeleTurismo
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanpedrosula.hn/municipalidad"
                  className="h6"
                  target="_blank"
                >
                  Municipalidad
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanpedrosula.hn/plan-maestro-desarrollo-municipal"
                  className="h6"
                  target="_blank"
                >
                  PMDM
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanpedrosula.hn/gobierno-digital"
                  className="h6"
                  target="_blank"
                >
                  Gobierno Digital
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanpedrosula.hn/transparencia"
                  className="h6"
                  target="_blank"
                >
                  Transparencia
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanpedrosula.hn/noticias"
                  className="h6"
                  target="_blank"
                >
                  Noticias
                </a>
              </li>
              <li>
                <a
                  href="https://www.sanpedrosula.hn/contacto"
                  className="h6"
                  target="_blank"
                >
                  Contáctanos
                </a>
              </li>
            </ul>
            <div className="navbar-bars">
              <a className="navbar-m-toggle navicon-button x">
                <div className="navicon"></div>
              </a>
            </div>
          </div>
        </nav>
        <div className="navbar-level"></div>
      </header>

      {/* <header className="header header-2 header-success" style={{ backgroundColor: '#008d00' }}>
                <div className="container">
                    <h1 className="no-lonely-words">TELEHUERTOS</h1>
                    <p>TELEHUERTOS es solo una parte de los nuevos programas de emprendimientos de la municipalidad de San Pedro&nbsp;Sula.</p>
                </div>
                <div className="header-2-bg header-success" style={{ backgroundImage: 'url(https://www.sanpedrosula.hn/storage/app/media/Imagenes/TeleHuertos/TeleHuertos-encabezado.jpg)' }}></div>
            </header> */}
    </>
  );
};
