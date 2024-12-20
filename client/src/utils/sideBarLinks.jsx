
import { FaUser } from "react-icons/fa";
import { ImUser, ImMusic  } from "react-icons/im";

export const sideBarLinks = [
    {
        id: "sbl01",
        name: "user",
        icon: <FaUser size={20} />,
    },
    {
        id: "sbl02",
        name: "artist",
        icon: <ImUser  size={20} />,
    },
    {
        id: "sbl03",
        name: "songs",
        icon: <ImMusic size={20} />,
    },
];