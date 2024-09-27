import { ListDTO } from "../dto/lists";
import { List } from "../models/List";
import { cleanObject } from "./cleanObjects";
import { castUserAsUserNameDTO } from "./users";

export function castListAsListDTO(list: List): ListDTO {
	const {
		grantedUsers,
		grantedUsersIds,
		owners,
		ownersIds,
		gifts,
		createdDate,
		updatedDate,
		...rest
	} = list;
	rest.sharingCode = rest.isShared ? rest.sharingCode : "";
	rest.ownersDTO = (owners || []).map((u) => castUserAsUserNameDTO(u));
	rest.grantedUsersDTO = (grantedUsers || []).map((u) => castUserAsUserNameDTO(u));
	rest.hasBookedGifts = gifts?.filter((g) => g.isBooked).length !== 0;
	// Keep only date from ISO String
	rest.closureDate = rest.closureDate?.slice(0, 10) || undefined;
	return cleanObject(rest) as ListDTO;
}
