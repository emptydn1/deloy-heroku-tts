import React from "react";

const AudioPlay = ({ src, ...other }) => {
  return <audio src={src} {...other} />;
};

export default AudioPlay;
