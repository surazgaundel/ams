import Artist from "../components/Artist";
import User from "../components/User";
import Songs from "../components/Songs";

export const routerLinks=[
    {
        id:'r01',
        path:'/user',
        element:<User/>,
    },
    {
        id:'r02',
        path:'/artist',
        element:<Artist/>,
    },
    {
        id:'r03',
        path:'/songs',
        element:<Songs/>,
    }
]