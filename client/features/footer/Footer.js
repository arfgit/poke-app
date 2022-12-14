import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>Developed by</p>
        <a target="_blank" href="#">
          Anthony Feliz
        </a>
      </div>
      <a target="_blank" href="https://github.com/arfgit/poke-app">
        View code on Github
        <GitHubIcon />
      </a>
    </footer>
  );
};

export default Footer;
