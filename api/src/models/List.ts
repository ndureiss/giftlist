import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from "typeorm";

import { UserNameDTO } from "../dto/users";
import { ISOString } from "../types/isostring";
import { UUID } from "../types/UUID";
import { Gift } from "./Gift";
import User from "./User";

@Entity("List", { orderBy: { createdDate: "ASC" } })
export class List {
	@PrimaryGeneratedColumn("uuid")
	public id!: UUID;

	@Column()
	public title!: string;

	@Column({ type: "string", nullable: true })
	public description?: string;

	@Column({ type: "date", nullable: true })
	public closureDate?: ISOString | null;

	@ManyToMany(() => User, (user) => user.lists)
	@JoinTable({ name: "List_Owners" })
	public owners!: User[];

	@RelationId((list: List) => list.owners)
	public ownersIds!: UUID[];

	public ownersDTO?: UserNameDTO[];

	public isOwner?: boolean;

	@Column({ default: false })
	public isShared!: boolean;

	@Column({ generated: "uuid", unique: true, update: false })
	public sharingCode!: UUID;

	@ManyToMany(() => User, (user) => user.friendLists)
	@JoinTable({ name: "List_GrantedUsers" })
	public grantedUsers?: User[];

	@RelationId((list: List) => list.grantedUsers)
	public grantedUsersIds?: UUID[];

	public grantedUsersDTO?: UserNameDTO[];

	@OneToMany(() => Gift, (gift) => gift.list)
	public gifts?: Gift[];

	public hasBookedGifts?: boolean;

	@CreateDateColumn()
	createdDate!: Date;

	@UpdateDateColumn()
	updatedDate!: Date;
}

export default List;
