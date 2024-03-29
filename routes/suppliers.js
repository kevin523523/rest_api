var express = require('express');
var router = express.Router();

const { Sequelize, Op } = require('sequelize');
const Suppliers = require('../models').suppliers;

router.get('/findAll', function (req, res, next) {
      /* Verificador de autorización */

  const { role } = req.user;

  if (role !== process.env.ADMIN) {
      return res.sendStatus(401);
  }

    Suppliers.findAll({
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(400).send(error))
});
router.get('/findById/:id', function (req, res, next) {

    let id = parseInt(req.params.id);

    Suppliers.findOne({
        where: {
            [Op.and]: [
                { SupplierID: id }
            ]
        }
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(400).send(error))
});
router.post('/save', function (req, res, next) {
    let { SupplierName, ContactName, Address, City, PostalCode, Country, Phone } = req.body;

    Suppliers.create({
        SupplierName: SupplierName,
        ContactName: ContactName,
        Address: Address,
        City: City,
        PostalCode: PostalCode,
        Country: Country,
        Phone: Phone
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(400).send(error))
});
router.put('/update', function (req, res, next) {

    let {id, SupplierName, ContactName, Address, City, PostalCode, Country, Phone } = req.body;

    Suppliers.update({
        SupplierName: SupplierName,
        ContactName: ContactName,
        Address: Address,
        City: City,
        PostalCode: PostalCode,
        Country: Country,
        Phone: Phone
    },
        {
            where: {
                SupplierID: parseInt(id)
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(400).send(error))
});
router.delete('/delete/:id', function (req, res, next) {

    let id = parseInt(req.params.id);

    Suppliers.destroy({
        where: {
            SupplierID: id
        }
    })
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(400).send(error))
});

module.exports = router;