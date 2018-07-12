const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user-model')
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
				const user = await User.findOne({ username })
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
		function(req, jwtPayload, done) {
			console.log('jwt verify')
			User.findOne({ username: jwtPayload.username })
				.then(user => {
					if (user) {
						req.headers['USERINFO'] = JSON.stringify(user)
						return done(null, user)
					}
					console.log('no userrrrrrrrrrrr')
					return done(null, false)
				})
				.catch(err => {
					return done(err, false)
				})
		}
	)
)

module.exports = passport
