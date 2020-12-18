const express = require('express');
const app = express();
const usersRoutes = express.Router();

let Users = require('../models/Users');
/**
 * @swagger
 *  /users:
 *    post:
 *      summary: Creates a new user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: Create a user.
 *          schema:
 *            type: object
 *            required:
 *              - names
 *              - lastname
 *              - cc
 *              - phone
 *              - email            
 *            properties:
 *              names:
 *                type: string
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: number
 *              cc:
 *                type: number
 *      responses:
 *        '201':
 *          description: user in added successfully
 *        '400':
 *          description: unable to save to database
 */

usersRoutes.route('/').post(function(req, res) {
    let users = new Users(req.body);
    users.save()
        .then(users => {
            res.status(201).json({ 'users': 'user in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//READ


/**
 * @swagger
 *  /users:
 *    get:
 *      summary: Show all users.
 *      consumes:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Show all users
 *        '500':
 *           description: Server error
 *        
 */
usersRoutes.route('/').get(function(req, res) {
    Users.find(function(err, users) {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(users);
        }
    });
});
/**
 * @swagger
 *  /users/{cc}:
 *    get:
 *      summary: Show a user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: cc
 *      responses:
 *        '200':
 *          description: Show a user
 *        '500':
 *          description: Server error
 *        
 */
usersRoutes.route('/:cc').get(function(req, res) {
    let cc = req.params.cc;
    Users.findOne({ cc: cc }, function(err, users) {
        res.status(200).json(users);
    });
});

// UPDATE
/**
 * @swagger
 *  /users/{cc}:
 *    put:
 *      summary: Update a user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: cc
 *        - in: body
 *          name: user
 *          description: Update a user.
 *          schema:
 *            type: object
 *            required:
 *              - names
 *              - lastname
 *              - phone
 *              - email
 *            properties:
 *              names:
 *                type: string
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: number
 *      responses:
 *        '200':
 *          description: Update complete'
 *        '400':
 *          description: Unable to update the database
 *        '404':
 *          description:The user was not found
 */
usersRoutes.route('/:cc').put(function(req, res, next) {
    Users.findOne({ cc: req.params.cc }, function(err, users) {
        if (!users)
            res.status(404).json('The user was not found');
        else {
            users.names = req.body.names;
            users.lastname = req.body.lastname;
            users.phone = req.body.phone;
            users.email = req.body.email;
            users.save().then(users => {
                    res.status(200).json('Update complete');
                })
                .catch(err => {
                    res.status(400).json("Unable to update the database");
                });
        }
    });
});
/**
 * @swagger
 *  /users/{cc}:
 *    delete:
 *      summary: Delete one user.
 *      consumes:
 *        - application/json
 *      parameters:
 *         - in: path
 *           name: cc
 *      responses:
 *        '200':
 *          description: Successfully removed
 *        
 */
usersRoutes.route('/:cc').delete(function(req, res) {
    Users.findOneAndRemove({ cc: req.params.cc }, function(err, users) {
        if (err) res.json(err);
        else res.status(200).json('Successfully removed');
    });
});

module.exports = usersRoutes;