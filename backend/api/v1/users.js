const express = require('express');
const UserServices = require('../../modules/Users/Services/UserServices');

module.exports = () => {
    const router = express.Router();
    router.put('/:id', function (req, res){
        UserServices
            .updateById(req.params.id, req.body)
            .then(user => {
              res.send(user);
            })
            .catch(err => {
                res.send(err);
            })
    });

    router.get('/:id/activate', function (req, res){
        UserServices
            .changeActiveStatus(req.params.id, true)
            .then(status =>{
                res.redirect('/');
            })
    });

    router.get('/:id/deactivate', function (req, res){
        UserServices
            .changeActiveStatus(req.params.id, false)
            .then(status =>{
                res.redirect('/');
            })
    });

    return router;
}
