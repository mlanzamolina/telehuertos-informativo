import React from "react";

export const Header = () => {
    return (
        <header id="layout-header">
            <nav class="navbar navbar-fixed">
                <div class="navbar-container">
                    <a href="{{ url('/') }}">
                        <img
                            class="navbar-logo"
                            src="https://www.sanpedrosula.hn/themes/msps/assets/images/logos/msps_logo.svg"
                            alt="Logo Municipalidad de San Pedro Sula"
                        />
                    </a>
                    <ul class="navbar-links">
                        <li class="active"><a href="/" class="h6" target="_blank">Inicio</a></li>
                        <li><a href="https://www.sanpedrosula.hn/teleturismo" class="h6" target="_blank">TeleTurismo</a></li>
                        <li><a href="https://www.sanpedrosula.hn/municipalidad" class="h6" target="_blank">Municipalidad</a></li>
                        <li><a href="https://www.sanpedrosula.hn/plan-maestro-desarrollo-municipal" class="h6" target="_blank">PMDM</a></li>
                        <li><a href="https://www.sanpedrosula.hn/gobierno-digital" class="h6" target="_blank">Gobierno Digital</a></li>
                        <li><a href="https://www.sanpedrosula.hn/transparencia" class="h6" target="_blank">Transparencia</a></li>
                        <li><a href="https://www.sanpedrosula.hn/noticias" class="h6" target="_blank">Noticias</a></li>
                        <li><a href="https://www.sanpedrosula.hn/contacto" class="h6" target="_blank">Contáctanos</a></li>
                    </ul>
                    <div class="navbar-bars">
                        <a class="navbar-m-toggle navicon-button x">
                            <div class="navicon"></div>
                        </a>
                    </div>
                </div>
            </nav>
            <div class="navbar-level"></div>
        </header>
    );
};