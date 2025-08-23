import React, { useEffect, useState } from "react";
import Container from '../components/container/Container.jsx';
import PostCard from '../components/PstCard.jsx';

import AppwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts]= useState([]);
    useEffect(()=>{

    },[])
    AppwriteService.getPosts([]).then((posts) =>{
        if(posts){
            setPosts(posts.documents)
        }
    })

    return (
        <div className=" w-full py-8">
            <Container>
                <div className="flex flex-wrap">

                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PstCard post={post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
