const express = require("express");
const routerProducts = require('./routerProduct');
const routerClients = require('./routerClient');
const routerUser = require('./routerUser');

const routerCategories = require('./routerCategories');
const routerAuth = require('./routerAuth');
const router = express.Router();

module.exports = () => {
  //Users endpoints para crear un ausuario para el sistema
  router.use("/food/api/user", routerUser);
  //auth endpoints users
  router.use("/food/api/auth-sesion", routerAuth);
  //productos
  router.use("/food/api/products", routerProducts);
  //Client endpoints
  router.use("/food/api/client", routerClients);
  //categories
  router.use("/food/api/category", routerCategories);
  //usuarios
  router.use("/food/api/auth-sesion", routerAuth);

  return router;
};
