import { DeleteResult, getRepository, Repository, UpdateResult } from "typeorm";

import List from "../models/List";
import User from "../models/User";
import { email } from "../types/email";
import { SelectKindList } from "../types/SelectKindList";
import { UUID } from "../types/UUID";

class UserService {
	/**
	 * Create a new user during sign up. Even if users are authenticated and created by Auth0,
	 * we manage a user database to store preferences, friends and much more.
	 * @param {Partial<User>} userInfos partial user infos, required for creation of entity
	 * @returns {Promise<User>} the created user
	 */
	static async create(userInfos: Partial<User>): Promise<User> {
		const userRepository: Repository<User> = getRepository(User);
		const user: User = userRepository.create(userInfos);
		return await userRepository.save(user);
	}

	/**
	 * Edit user properties.
	 * @param {string} userId id of user to update
	 * @param {Partial<User>} userNewProps new props of user to apply
	 * @returns {Promise<UpdateResult>}
	 */
	static async edit(userId: string, userNewProps: Partial<User>): Promise<UpdateResult> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.update(userId, { ...userNewProps });
	}

	/**
	 * Delete a user from Database.
	 * @param {string} userId id of user to delete
	 * @returns {Promise<DeleteResult>}
	 */
	static async delete(userId: string): Promise<DeleteResult> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.delete(userId);
	}

	/**
	 * Return all users from Database.
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getAll(): Promise<User[]> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.find();
	}

	/**
	 * Return a user from Database.
	 * @param {string} userId id of user to get
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getById(userId: string): Promise<User> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.findOneOrFail(userId);
	}

	/**
	 * Return a user from Database.
	 * @param {email} userMail email of user to get
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getByMail(userMail: email): Promise<User> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.findOneOrFail({ where: { email: userMail } });
	}

	/**
	 * Return a user from Database.
	 * @param {string} userId id of user to get, uuid v4 formatted
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getMany(userIds: UUID[]): Promise<User[]> {
		const userRepository: Repository<User> = getRepository(User);
		return await userRepository.findByIds(userIds);
	}

	/**
	 * Returns all user lists.
	 * @param {UUID} userId id of user which owns the list, uuid v4 formatted
	 * @param {SelectKindList} select filter tag to return "all" lists, "owns" or "granted" ones only
	 * @returns {Promise<List[]>} the userId lists
	 */
	static async getUserLists(userId: UUID, select: SelectKindList): Promise<List[]> {
		const userRepository: Repository<User> = getRepository(User);
		const user: User = await userRepository.findOneOrFail(userId, {
			relations: ["lists", "friendLists", "lists.owners", "friendLists.owners"],
		});
		let res: List[] = [];
		switch (select) {
			case SelectKindList.OWNED:
				res = user.lists || [];
				break;
			case SelectKindList.GRANTED:
				res = user.friendLists || [];
				break;
			case SelectKindList.ALL:
			default:
				res = (user.lists || []).concat(user.friendLists || []);
				break;
		}
		return res.sort((a, b) => a.createdDate.valueOf() - b.createdDate.valueOf());
	}
}

export default UserService;
