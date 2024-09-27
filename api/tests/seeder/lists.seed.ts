import { v4 as uuidv4 } from "uuid";

import List from "../../src/models/List";
import { getDateFromNow } from "./helper";
import { User1, User2, UserTest } from "./users.seed";

export const ListOwned: List = {
	id: uuidv4(),
	title: "TestList1",
	description: "A description",
	closureDate: new Date(new Date().setTime(0)).toISOString(),
	owners: [UserTest],
	ownersIds: [UserTest.id],
	isOwner: true,
	isShared: false,
	sharingCode: uuidv4(),
	grantedUsers: [User1],
	grantedUsersIds: [User1.id],
	hasBookedGifts: false,
	createdDate: getDateFromNow(-5),
	updatedDate: getDateFromNow(-5),
};

export const ListGranted: List = {
	id: uuidv4(),
	title: "TestList2",
	owners: [User2],
	ownersIds: [User2.id],
	isOwner: false,
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsers: [UserTest],
	grantedUsersIds: [UserTest.id],
	hasBookedGifts: false,
	createdDate: getDateFromNow(-4),
	updatedDate: getDateFromNow(-4),
};

export const ListGrantedButNotShared: List = {
	id: uuidv4(),
	title: "TestList2b",
	owners: [User2],
	ownersIds: [User2.id],
	isShared: false,
	sharingCode: uuidv4(),
	grantedUsers: [UserTest],
	grantedUsersIds: [UserTest.id],
	hasBookedGifts: false,
	createdDate: getDateFromNow(-3),
	updatedDate: getDateFromNow(-3),
};

export const ListInvited: List = {
	id: uuidv4(),
	title: "TestList3",
	owners: [User1, User2],
	ownersIds: [User1.id, User2.id],
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsersIds: [],
	hasBookedGifts: false,
	createdDate: getDateFromNow(-2),
	updatedDate: getDateFromNow(-2),
};

export const ListUnauthorized: List = {
	id: uuidv4(),
	title: "TestList4",
	owners: [User1],
	ownersIds: [User1.id],
	isShared: true,
	sharingCode: uuidv4(),
	grantedUsersIds: [],
	hasBookedGifts: false,
	createdDate: getDateFromNow(-1),
	updatedDate: getDateFromNow(-1),
};
