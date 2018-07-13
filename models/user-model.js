const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	first_name: {
		type: Sequelize.STRING
	}
}

const User = sequelize.define('user', UserSchema)
User.sync({ force: false })

User.beforeCreate(user => {
	return hashPassword(user.password).then(hashed => (user.password = hashed))
})

User.prototype.comparePassword = function(password) {
	return bcrypt.compare(password, this.password)
}

User.prototype.generateAuthToken = function() {
	return jwt.sign(
		{
			username: this.username
		},
		'this_is_a_secret'
	)
}

User.findByPayload = async payload =>
	User.findOne({ where: { username: payload.username } })

const hashPassword = async password => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

module.exports = User
