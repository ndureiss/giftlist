import { expect } from "chai";

import { Url_UserGetOne, User1 } from "../global";
import { get } from "../helpers/crud";
import { expectValidationFailed } from "../helpers/error";
import { expect200 } from "../helpers/success";

export default function suite() {
	it("Returns 200 with user informations", async () => {
		const { id: id1, ...user1 } = User1;
		const response = await get(Url_UserGetOne(User1.email));
		expect200(response);
		expect(response).to.have.property("body").to.eql(user1);
	});
	it("Returns 422, with validation error, if path param is not mail", async () => {
		const wrongMail: string = "toto";
		const response = await get(Url_UserGetOne(wrongMail));
		expectValidationFailed(response);
	});
}
