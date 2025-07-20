import React from "react";
import { Container ,Logo, LogoutBtn} from "../indes";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";



function Header() {

    const authStatus = useSelector((state) => state.status);
    const navigate= useNavigate();
    const navItems =[
        {
            name: "Home",
            slug: "/",
            active: true,
        },{
            name: "Login",
            slug: "/login",
            active: !authStatus,
        }, {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        }, {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        }, {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        }
    ]
    return (
        <header className="p-3 shadow bg-gray-500">

            <Container>
                <nav className="flex ">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo  width="70px"/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) =>(
                            item.active?(
                                <li key={item.slug}>
                                    <Link to={item.slug}>{item.name}</Link>
                                </li>
                            ):(
                                <li key={item.slug}>
                                    <span>{item.name}</span>
                                </li>
                            )
                    ))}
                    </ul>
                </nav>

            </Container>
        </header>
    );
}

export default Header;