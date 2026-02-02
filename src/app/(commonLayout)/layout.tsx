import Navbar from "@/components/shared/Navbar";
import { userService } from "@/services/user.service";



const CommonLayout = async ({children}:{children:React.ReactNode}) => {
	
	return (
		<div>
			<Navbar/>
			{children}
		</div>
	);
};

export default CommonLayout;