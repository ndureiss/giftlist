import { computed, defineComponent, inject, onMounted, Ref, ref } from "vue";

import Button from "@/components/Button/Button.vue";
import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.vue";
import Subtitle from "@/components/Subtitle/Subtitle.vue";
import labels from "@/labels/fr/labels.json";
import Users from "@/api/Users";
import { UserDTO } from "@/types/dto/UserDTO";
import { useStore } from "vuex";

export default defineComponent({
	name: "Profile",
	components: { Button, DefaultLayout, Subtitle },
	setup() {
		onMounted(async () => {
			await dispatch("getUser");
		});

		const { state, dispatch } = useStore();
		const user: Ref<UserDTO> = computed(() => state.user.user);
		const auth = ref(inject("Auth") as any);

		const friends = [
			{ id: 0, name: "ND" },
			{ id: 1, name: "ML" },
			{ id: 2, name: "PC" },
			{ id: 3, name: "ML" },
		];

		const verifyEmail = () => {
			console.log("Profile.vue - verifyEmail");
		};
		const changeEmail = () => {
			console.log("Profile.vue - changeEmail");
		};
		const changePassword = () => {
			console.log("Profile.vue - changePassword");
		};
		const downloadData = () => {
			console.log("Profile.vue - downloadData");
		};

		const deleteAccount = async () => {
			console.log("Profile.vue - deleteAccount");
			const deleteResult = await dispatch("deleteAccount");
			if (deleteResult) {
				console.log(
					"Profile.vue - Account successfully deleted -> TODO : Delete on Auth0 and logout"
				);
			}
		};

		return {
			labels,
			auth,
			user,
			friends,
			verifyEmail,
			changeEmail,
			changePassword,
			downloadData,
			deleteAccount,
		};
	},
});
