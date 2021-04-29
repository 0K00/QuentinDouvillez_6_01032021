const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

function crypt(sentence) {
	if (typeof sentence === 'string') {
		let headMail = sentence.slice(0, 1);
		let bodyMail = sentence.slice(1, sentence.length - 4);
		let bottomMail = sentence.slice(sentence.length - 4, sentence.length);
		let final = [];
		var masked = bodyMail.split('');
		var maskedMail = [];
		for (let i in masked) {
			masked[i] = '*';
			maskedMail += masked[i];
		}
		final += headMail + maskedMail + bottomMail;
		return final;
	}
	console.log(sentence + ' is not a mail');
	return false;
}

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				email: crypt(req.body.email),
				password: hash
			});
			user
				.save()
				.then(() => res.status(201).json({ message: 'User created!' }))
				.catch(error => res.status(400).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	User.findOne({ email: crypt(req.body.email) })
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: 'User not found!' });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ error: 'Incorrect password!' });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign({ userId: user._id }, process.env.TOKEN, { expiresIn: '24h' })
					});
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};
