export default function getColorStatus(status) {
    switch (status) {
        case "DELIVERED":
            return "bg-blue-400 text-white";
        case "PICKUP":
            return "bg-purple-400 text-white";
        case "UNPAID":
        case "PENDING":
            return "bg-yellow-400 text-white";
        case "PAID":
        case "PROCESS":
            return "bg-green-400 text-white";
        case "DELIVERY":
            return "bg-indigo-400 text-white";
        default:
            return "bg-gray-500 text-white";
    }
}
