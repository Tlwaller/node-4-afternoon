const users = require('../models/users');

var id = 1;

const login = (req, res) => {
    const {session} = req;
    const {username, password} = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if(user) {
        session.user.username = user.username;
        res.status(200).send(session.user);
    } else {
        res.status(500).send('Username or password incorrect');
    }
}

const register = (req, res) => {
    const {session} = req;
    const {username, password} = req.body;

    users.push({id, username, password});
    id++;

    session.user.username = username;

    res.status(200).send(session.user);
}

const signout = (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
}

const getUser = (req, res) => {
    const {session} = req;
    res.status(200).send(session.user);
}

module.exports = {
    login,
    register,
    signout,
    getUser
}