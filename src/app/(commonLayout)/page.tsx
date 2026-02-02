import HeroCarousel from '@/components/modules/home/HeroCarousel';
import { cookies } from 'next/headers';

const page = async() => {
	const cookieStore=await cookies()
	
	const res=await fetch('http://localhost:5000/api/auth/get-session',{
		headers:{
			Cookie:cookieStore.toString()
		},
		cache:"no-store"
	})
	
	const session=await res.json()

console.log(res.json())
	return (
		<div>
			<HeroCarousel/>
		</div>
	);
};

export default page;