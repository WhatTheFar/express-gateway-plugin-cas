const Sequelize = require('sequelize')


// const uri = 'postgres://user:pass@example.com:5432/dbname'
const uri = 'postgres://postgres:password@localhost:5432/postgres'
const sequelize = new Sequelize(uri)

module.exports = sequelize