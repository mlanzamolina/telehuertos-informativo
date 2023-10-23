import PropTypes from "prop-types";
import React from "react";

export const DownloadFile = (props) => (
  <a href={props.file} download>
    {props.file.NombreArchivo}
  </a>
);

DownloadFile.propTypes = {
  file: PropTypes.string.isRequired,
};

export default DownloadFile;
