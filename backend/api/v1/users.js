const express = require('express');
const UserServices = require('../../modules/Users/Services/UserServices');

module.exports = () => {
    const router = express.Router();
    router.put('/:id', function (req, res) {
        UserServices
            .updateById(req.params.id, req.body)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.send(err);
            })
    });

    router.get('/:id', function (req, res) {
        UserServices
            .getUserById(req.params.id, true)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.send(err);
            })
    });

    router.get('/:id/activate', function (req, res) {
        UserServices
            .changeActiveStatus(req.params.id, true)
            .then(status => {
                res.send({status: "ok"});
            })
            .catch(err => {
                res.send(err);
            })
    });

    router.get('/:id/deactivate', function (req, res) {
        UserServices
            .changeActiveStatus(req.params.id, false)
            .then(status => {
                res.send({status: "ok"});
            })
            .catch(err => {
                res.send(err);
            })
    });

    router.get('/:id/startmembership', function (req, res) {
        UserServices
            .startMembership(req.params.id, false)
            .then(status => {
                res.send({status: "ok"});
            })
            .catch(err => {
                res.send(err);
            })
    });

    router.get('/:id/cancelmembership', function (req, res) {
        UserServices
            .cancelMembership(req.params.id, false)
            .then(status => {
                res.send({status: "ok"});
            })
            .catch(err => {
                res.send(err);
            })
    });


    return router;
};
