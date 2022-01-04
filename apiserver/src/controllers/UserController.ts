import { UUID } from "./../types/express/UUID";
import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Response,
	Route,
	Security,
	SuccessResponse,
	Tags,
} from "@tsoa/runtime";
import UserService from "./../services/UserService";
import User from "./../models/User";
import MailAlreadyUsedError from "./../errors/UserErrors/MailAlreadyUsedError";
import MailIsInvalidError from "./../errors/UserErrors/MailIsInvalidError";
import FieldIsMissingError from "./../errors/FieldIsMissingError";
import UserNotFoundError from "./../errors/UserErrors/UserNotFoundError";
import { isValidEmail } from "./../helpers/validators";

// TODO: Follow https://github.com/lukeautry/tsoa/issues/911 to remove this workaround
type Expand<T> = { [K in keyof T]: T[K] };
interface CreateUserDTO extends Expand<Omit<User, "id" | "friends" | "createdDate">> {}
interface UserIdDTO extends Expand<Pick<User, "id">> {}
interface UserDTO extends Expand<Pick<User, "displayName" | "email">> {}

@Security("auth0") // Follow https://github.com/lukeautry/tsoa/issues/1082 for root-level security
@Route("users")
@Tags("User")
export class UserController extends Controller {
	/**
	 * Create a new user during sign up. Even if users are authenticated and
	 * created by Auth0, we manage a user database to store preferences,
	 * friends and much more.
	 * @param {CreateUserDTO} body data to create a user
	 * @returns {Promise<UUID>} UUID of the created user
	 */
	@SuccessResponse(200)
	@Response<FieldIsMissingError | MailIsInvalidError | MailAlreadyUsedError>(
		400,
		"If one field is missing, mail is invalid or already used"
	)
	@Post()
	async create(@Body() body: CreateUserDTO): Promise<UserIdDTO> {
		if (!body.email || !body.displayName) {
			throw new FieldIsMissingError(!body.email ? "email" : "displayName");
		}
		if (!isValidEmail(body.email)) {
			throw new MailIsInvalidError();
		}
		try {
			const { id }: User = await UserService.create(body.email, body.displayName);
			return { id } as UserIdDTO;
		} catch (err: any) {
			if ((err.code = "23505" && /^Key \(email\)=\('.*'\) already exists\./.test(err.detail))) {
				throw new MailAlreadyUsedError();
			}
			throw err;
		}
	}

	/**
	 * Edit a user.
	 * @returns {Promise<UUID>} UUID of the created user
	 * @param {UUID} userId the GUID of user
	 * @param {UserDTO} body data to edit a user
	 */
	@SuccessResponse(200)
	@Put("{userId}")
	async edit(@Path() userId: UUID, @Body() body: Partial<UserDTO>): Promise<void> {
		await UserService.edit(userId, body);
	}

	/**
	 * Delete logged user.
	 * @param {UUID} userId the GUID of user
	 */
	@SuccessResponse(204)
	@Delete("{userId}")
	async delete(@Path() userId: UUID): Promise<void> {
		await UserService.delete(userId);
	}

	/**
	 * Gets all user's data.
	 * @returns {Promise<UserDTO[]>} all users
	 */
	@SuccessResponse(200)
	@Get()
	async getAll(): Promise<UserDTO[]> {
		const users: User[] = await UserService.getAll();
		return users.map((user) => {
			const { id, friends, createdDate, ...rest } = user;
			return { ...rest } as UserDTO;
		});
	}

	/**
	 * Gets logged user's data.
	 * @param {UUID} userId the GUID of user
	 * @returns {Promise<UserDTO>} the required user
	 */
	@SuccessResponse(200)
	@Response<UserNotFoundError>(400, "If userId is incorrect")
	@Get("{userId}")
	async get(@Path() userId: UUID): Promise<UserDTO> {
		const user: User | undefined = await UserService.get(userId);
		if (!user) {
			throw new UserNotFoundError();
		} else {
			const { id, createdDate, ...rest } = user;
			return rest;
		}
	}
}
