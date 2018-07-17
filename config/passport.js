const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user-model')
const { setReqAuthUser } = require('../utils/request-util')

passport.serializeUser((user, done) => {
	console.log('serializeUser')
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	console.log('deserializeUser')
	User.findById(id)
		.then(user => {
			done(null, user)
		})
		.catch(() => {
			done(err, false)
		})
})

passport.use(
	'local-plugin',
	new LocalStrategy(async function(username, password, done) {
		try {
			const user = await User.findOne({ where: { username } })
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' })
			}
			const isValid = await user.comparePassword(password)
			if (!isValid) {
				return done(null, false, { message: 'Incorrect password.' })
			}
			return done(null, user)
		} catch (error) {
			return done(error)
		}
	})
)

passport.use(
	'basic-plugin',
	new BasicStrategy(async function(username, password, done) {
		try {
			const user = await User.findOne({ where: { username } })
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' })
			}
			const isValid = await user.comparePassword(password)
			if (!isValid) {
				return done(null, false, { message: 'Incorrect password.' })
			}
			return done(null, user)
		} catch (error) {
			return done(error)
		}
	})
)

passport.use(
	new GoogleStrategy(
		{
			clientID:
				'21905509934-bgp1qmk243hion1mt5s4qub52a7766on.apps.googleusercontent.com',
			clientSecret: 'TERflqKZSonnY6iEcZBvGTJl',
			callbackURL: 'http://localhost:8080/auth/google/callback'
		},
		async function(accessToken, refreshToken, profile, done) {
			try {
				const username = profile.id
				console.log(profile)
				// TODO: use findOrCreate
				const user = await User.findOne({ where: { username } })
				if (user) {
					return done(null, user)
				}
				const createdUser = await User.create({
					username,
					password: 'no_password'
				})
				return done(null, createdUser)
			} catch (error) {
				return done(error, false)
			}
		}
	)
)

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'this_is_a_secret',
			passReqToCallback: true
		},
		async function(req, jwtPayload, done) {
			try {
				const user = await User.findByPayload(jwtPayload)
				if (user) {
					// TODO: refactor to middleware
					setReqAuthUser(req, user)
					return done(null, user)
				}
				return done(null, false)
			} catch (error) {
				return done(error)
			}
		}
	)
)

module.exports = passport
