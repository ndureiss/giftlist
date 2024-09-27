import { DeleteResult, In, Repository, UpdateResult } from "typeorm";

import { dbInstance } from "../";
import Gift from "../models/Gift";
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
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		const user: User = userRepository.create(userInfos);
		return await userRepository.save(user);
	}

	/**
	 * Edit user properties.
	 * @param {string} userAuth0Id id of user to update
	 * @param {Partial<User>} userNewProps new props of user to apply
	 * @returns {Promise<UpdateResult>}
	 */
	static async edit(userAuth0Id: string, userNewProps: Partial<User>): Promise<UpdateResult> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		return await userRepository.update({ auth0Id: userAuth0Id }, { ...userNewProps });
	}

	/**
	 * Delete a user from Database.
	 * @param {string} userAuth0Id id of user to delete
	 * @returns {Promise<DeleteResult>}
	 */
	static async delete(userAuth0Id: string): Promise<DeleteResult> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		return await userRepository.delete({ auth0Id: userAuth0Id });
	}

	/**
	 * Return all users from Database.
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getAll(): Promise<User[]> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		return await userRepository.find();
	}

	/**
	 * Return a user from Database from Auth0 ID.
	 * @param {string} userAuth0Id auth0 id of user to get
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getByAuth0Id(userAuth0Id: string): Promise<User> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		return await userRepository.findOneOrFail({
			where: { auth0Id: userAuth0Id },
			relations: { bookings: true },
		});
	}

	/**
	 * Return a user from Database.
	 * @param {email} userMail email of user to get
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getByMail(userMail: email): Promise<User> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		return await userRepository.findOneOrFail({ where: { email: userMail } });
	}

	/**
	 * Return a user from Database.
	 * @param {UUID[]} userIds id of user to get
	 * @returns {Promise<User[]>} The user matching the userId parameter
	 */
	static async getMany(userIds: UUID[]): Promise<User[]> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		return await userRepository.findBy({ id: In(userIds) });
	}

	/**
	 * Returns all user lists.
	 * @param {string} userAuth0Id id of user which owns the list
	 * @param {SelectKindList} select filter tag to return "all" lists, "owns" or "granted" ones only
	 * @returns {Promise<List[]>} the userId lists
	 */
	static async getUserLists(
		userAuth0Id: string,
		select: SelectKindList,
		reallyAll: boolean = false
	): Promise<List[]> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		const user: User = await userRepository.findOneOrFail({
			where: { auth0Id: userAuth0Id },
			relations: {
				lists: {
					owners: true,
					grantedUsers: true,
					gifts: true,
				},
				friendLists: {
					owners: true,
					grantedUsers: true,
				},
			},
		});
		let res: List[] = [];
		const ownedLists = (user.lists || []).map((list) => ({ ...list, isOwner: true }));
		const grantedLists = (user.friendLists || [])
			.filter((l) => reallyAll || l.isShared)
			.map((list) => ({ ...list, isOwner: false }));
		switch (select) {
			case SelectKindList.OWNED:
				res = ownedLists;
				break;
			case SelectKindList.GRANTED:
				res = grantedLists;
				break;
			case SelectKindList.ALL:
			default:
				res = ownedLists.concat(grantedLists);
				break;
		}
		return res.sort((a, b) => a.createdDate.valueOf() - b.createdDate.valueOf());
	}

	/**
	 * Returns all user gifts.
	 * @param {string} userAuth0Id id of user which books the gift
	 * @returns {Promise<Gift[]>} the userId booked gifts
	 */
	static async getUserGifts(userAuth0Id: string): Promise<Gift[]> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		const user: User = await userRepository.findOneOrFail({
			where: { auth0Id: userAuth0Id },
			relations: { bookings: true },
		});
		return user.bookings;
	}

	/**
	 * Add a gift to a user booked gifts list.
	 * @param {string} userAuth0Id id of user which books the gift
	 * @param {Gift} gift the gift to add into booked list
	 * @returns {Promise<User[]>} the User matching userAuth0Id
	 */
	static async addUserGifts(userAuth0Id: string, gift: Gift): Promise<User> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		const user: User = await userRepository.findOneOrFail({
			where: { auth0Id: userAuth0Id },
			relations: { bookings: true },
		});
		user.bookings = (user.bookings || []).concat(gift);
		return await userRepository.save(user);
	}

	/**
	 * Add a gift to a user booked gifts list.
	 * @param {string} userAuth0Id id of user which books the gift
	 * @param {Gift} gift the gift to add into booked list
	 * @returns {Promise<User[]>} the User matching userAuth0Id
	 */
	static async removeUserGifts(userAuth0Id: string, gift: Gift): Promise<User> {
		const userRepository: Repository<User> = dbInstance.getRepository(User);
		const user: User = await userRepository.findOneOrFail({
			where: { auth0Id: userAuth0Id },
			relations: { bookings: true },
		});
		user.bookings = user.bookings.filter((booked_gift) => booked_gift.id !== gift.id);
		return await userRepository.save(user);
	}
}

export default UserService;
