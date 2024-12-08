<h1  align="center">Marvel Backend</h1>

  <p align="center">
	<img src="https://thumbs.gfycat.com/BitesizedTightElephant-size_restricted.gif" width="800">
</p>

## Overview

Replique du site de Marvel avec React, projet Fullstack

Inspiration : marvel.com


Deploiement sur Netlify : <a  href="https://marvel-lph-project.netlify.app/"  target="_blank"> https://marvel-lph-project.netlify.app/</a>

<p align="center">
<a  href="https://marvel-lph-project.netlify.app/"><img  src="https://res.cloudinary.com/dkfawp1r9/image/upload/f_auto,q_auto/marvel-homepage" alt="Marvel backend"></a>
</p>



Marvel frontend : <a  href="https://github.com/lauraphanhoang/marvel-frontend.git">https://github.com/lauraphanhoang/marvel-frontend.git</a>

API utilisée : https://lereacteur-marvel-api.netlify.app/

## Packages

- Node.js

- Express

- Mongoose

- Crypto-js

- Uid2

- Cors

- Dotenv

## Architecture

Route marvel

- get comics : axios request to Marvel API
- get comics by id : axios request to Marvel API
- get characters : axios request to Marvel API
- get character by id : axios request to Marvel API

Route user :

- signup : créer un compte avec un mot de passe cripté (salt, hash) et un token, le tout enregistrés dans la base de données mongoDB 
- login : utilisation du middleware isAuthenticated



