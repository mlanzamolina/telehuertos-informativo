import React from "react";

export const HeaderTelehuertos = () => {
    return (
        <header className="header header-2" style={{ background: 'radial-gradient(circle, #008d00 0%, #008d00 70%, rgba(0,0,0,0) 70%), linear-gradient(to right, #008d00, transparent)' }}>
            <div className="container">
                <h1 className="no-lonely-words" style={{textAlign: "left"}}>TELEHUERTOS</h1>
                <p style={{textAlign: "left"}}>TELEHUERTOS es solo una parte de los nuevos programas de emprendimientos de la municipalidad de San Pedro&nbsp;Sula.</p>
            </div>
            <div className="header-2-bg"  style={{ backgroundColor: '#008d00', backgroundImage: 'url(https://www.sanpedrosula.hn/storage/app/media/Imagenes/TeleHuertos/TeleHuertos-encabezado.jpg)' }}></div>
        </header>
    );
};