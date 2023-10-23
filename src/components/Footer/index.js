import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer id="layout-footer">
      <div className="contact-bar">
        {/* Email */}
        <a href="mailto:info@sanpedrosula.hn" style={{ padding: "100px" }}>
          <div className="contact-bar-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <span>info@sanpedrosula.hn</span>
        </a>

        {/* Social Media Links */}
        <a href="https://www.instagram.com/municipalidaddesps/">
          <div className="contact-bar-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </div>
        </a>
        <a href="https://www.facebook.com/MunicipalidadDeSanPedroSula">
          <div className="contact-bar-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
        </a>
        <a href="https://twitter.com/MuniDeSPS">
          <div className="contact-bar-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </a>

        <a href="https://www.youtube.com/channel/UCkAiCLYll4Muh83z4S3KBsw/videos">
          <div className="contact-bar-icon">
            <FontAwesomeIcon icon={faYoutube} />
          </div>
        </a>

        {/* Phone */}

        <a href="tel:+504 2552-1588" style={{ padding: "100px" }}>
          <div className="contact-bar-icon">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <span>+504 2552-1588</span>
        </a>
      </div>

      {/* Footer Content */}
      <div className="footer">
        <div className="container">
          <a href="/" className="footer-logo">
            <img
              src="https://www.sanpedrosula.hn/themes/msps/assets/images/logos/msps_logo.svg"
              alt="Logo Municipalidad de San Pedro Sula"
            />
          </a>
          <div className="footer-links">
            <div className="footer-links-category">
              <strong>Hashtag Facebook</strong>
              <a
                href="https://www.facebook.com/hashtag/SanPedroSula"
                style={{ color: "#313232" }}
              >
                #SanPedroSula
              </a>
              <a
                href="https://www.facebook.com/hashtag/SPS"
                style={{ color: "#313232" }}
              >
                #SPS
              </a>
              <a
                href="https://www.facebook.com/hashtag/CiudadDeEmprendedores"
                style={{ color: "#313232" }}
              >
                #CiudadDeEmprendedores
              </a>
              <a
                href="https://www.facebook.com/hashtag/SPSCiudadEnOrden"
                style={{ color: "#313232" }}
              >
                #SPSCiudadEnOrden
              </a>
              <a
                href="https://www.facebook.com/hashtag/YoSoy0501"
                style={{ color: "#313232" }}
              >
                #YoSoy0501
              </a>
            </div>
            <div className="footer-links-category">
              <strong>Hashtag Instagram</strong>
              <a
                href="https://www.instagram.com/explore/tags/SanPedroSula"
                style={{ color: "#313232" }}
              >
                #SanPedroSula
              </a>
              <a
                href="https://www.instagram.com/explore/tags/SPS"
                style={{ color: "#313232" }}
              >
                #SPS
              </a>
              <a
                href="https://www.instagram.com/explore/tags/CiudadDeEmprendedores"
                style={{ color: "#313232" }}
              >
                #CiudadDeEmprendedores
              </a>
              <a
                href="https://www.instagram.com/explore/tags/SPSCiudadEnOrden"
                style={{ color: "#313232" }}
              >
                #SPSCiudadEnOrden
              </a>
              <a
                href="https://www.instagram.com/explore/tags/YoSoy0501/"
                style={{ color: "#313232" }}
              >
                #YoSoy0501
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-xs background-success-light">
        <div className="container text-center">
          <small>
            &copy; {new Date().getFullYear()} Municipalidad de San Pedro Sula.{" "}
            <br className="d-md-none" />
            Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
