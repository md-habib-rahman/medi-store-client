import HeroCarousel from "@/components/modules/home/HeroCarousel";
import { userService } from "@/services/user.service";

const page = async () => {
	const {data}=await userService.getSession()
// console.log(data)
	return (
		<div>
			<HeroCarousel/>
		</div>
	);
};

export default page;