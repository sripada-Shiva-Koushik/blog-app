import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useEffect, useState } from "react";

// interface AppBarProps {
//     authorName: string;
// }

export const Appbar = () => {

    const [username, setUsername] = useState<string>("Anonymous");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");  // Get username instead of name
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");  // Remove stored username
        navigate("/signin");
    };


    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
            Medium
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none
                focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
            </Link>
            <Avatar size="big" name={username} />
            <button
                onClick={handleSignOut}
                className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm px-4 py-2"
            >
                Sign Out
            </button>
        </div>

    </div>
}