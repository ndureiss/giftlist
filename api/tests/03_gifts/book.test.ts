import { expect } from "chai";

import { GlobalVar, Url_GiftBook, Url_GiftGetOne } from "../global";
import { Gift1, Gift3 } from "../global/objects";
import { get, put } from "../helpers/crud";
import { expectError, expectValidationFailed } from "../helpers/error";
import { expect204 } from "../helpers/success";

export default function suite() {
	it("Returns 401 Unauthorized, if not owned not granted", async () => {
		const response = await put(Url_GiftBook(GlobalVar.List2_Id, GlobalVar.Gift3_Id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204 Unauthorized, if not owned but granted", async () => {
		const response = await put(Url_GiftBook(GlobalVar.List2_Id, GlobalVar.Gift3_Id), {});
		expect204(response);
		const changedGift = await get(Url_GiftGetOne(GlobalVar.List2_Id, GlobalVar.Gift3_Id));
		expect(changedGift)
			.to.have.property("body")
			.to.eql({ ...Gift3, isBooked: true });
	});
	it("Returns 401 Unauthorized, if owned but gift does not belong to list", async () => {
		const response = await put(Url_GiftBook(GlobalVar.List1_Id, GlobalVar.Gift3_Id), {});
		expectError(response, 401, "Unauthorized");
	});
	it("Returns 204, if owned", async () => {
		const response = await put(Url_GiftBook(GlobalVar.List1_Id, GlobalVar.Gift1_Id), {});
		expect204(response);
		const changedGift = await get(Url_GiftGetOne(GlobalVar.List1_Id, GlobalVar.Gift1_Id));
		expect(changedGift)
			.to.have.property("body")
			.to.eql({ ...Gift1, isBooked: true });
	});
	it("Returns 422, with validation error, if path param is not UUID", async () => {
		const wrongUUID: string = "toto";
		const responses = [
			await put(Url_GiftBook(wrongUUID, GlobalVar.Gift2_Id)),
			await put(Url_GiftBook(GlobalVar.List1_Id, wrongUUID)),
		];
		responses.forEach((response) => expectValidationFailed(response));
	});
}
