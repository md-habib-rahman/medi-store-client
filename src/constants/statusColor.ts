export const getStatusColor = (status: string) => {
	switch (status) {
		case "DELIVERED":
			return "bg-green-100 text-green-800";
		case "RECEIVED":
			return "bg-blue-100 text-blue-800";
		case "SHIPPED":
			return "bg-purple-100 text-purple-800";
		case "CANCELLED":
			return "bg-red-100 text-red-800";
		case "PENDING":
			return "bg-[#FA941E]/20 text-[#FA941E]";
		default:
			return "bg-gray-100 text-gray-800";
	}
};