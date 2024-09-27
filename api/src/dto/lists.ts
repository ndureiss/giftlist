import List from "../models/List";
import Expand from "./expand";

/* prettier-ignore */
export type CreateListDTO = Omit<List, "id"	| "sharingCode"	| "gifts" | "hasBookedGifts" | "owners"	| "grantedUsers" | "ownersDTO" | "grantedUsersDTO" | "createdDate" | "updatedDate">;

export interface ListIdDTO extends Expand<Pick<List, "id">> {}

/* prettier-ignore */
export type ListDTO = Pick<List, "id" | "description" | "title"	| "isShared" | "sharingCode" | "hasBookedGifts" | "closureDate"	| "ownersDTO" | "grantedUsersDTO" | "isOwner">;

export type EditListDTO = CreateListDTO;
