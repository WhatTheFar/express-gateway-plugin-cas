import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
	AllowNull,
	BeforeCreate,
	Column,
	Model,
	Table,
	Unique
} from 'sequelize-typescript';

@Table({
	tableName: 'users'
})
class User extends Model<User> {
	@BeforeCreate
	public static hasPassword(instance: User) {
		return hashPassword(instance.password).then(
			hashed => (instance.password = hashed)
		);
	}

	public static findByPayload = (payload: any) => {
		return (User.findOne({
			where: { username: payload.username }
		}) as PromiseLike<User | null>) as Promise<User | null>;
	};

	@AllowNull(false)
	@Unique
	@Column
	public username!: string;

	@AllowNull(false)
	@Column
	public password!: string;

	@Column public firstname!: string;

	@Column public lastname!: string;

	public comparePassword(password: string) {
		return bcrypt.compare(password, this.password);
	}

	public generateAuthToken() {
		return jwt.sign(
			{
				username: this.username,
				password: this.password
			},
			'this_is_a_secret'
		);
	}
}

const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export default User;
