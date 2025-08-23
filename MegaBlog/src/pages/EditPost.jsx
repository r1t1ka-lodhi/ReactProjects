import React, {useEffect, useState} from "react";
import Container from '../components/container/Container.jsx';

import PostForm from '../components/post-form/PostForm.jsx';
import AppwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){
    const[post,setPosts]=useState(null);
    const {slug}= useParams();
    const navigate= useNavigate();

    useEffect(() =>{
        if(slug){
            AppwriteService.getPosts(slug).then((post)=>{
                if(post){
                    setPosts(post);
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
    return (
        post?  <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>:null
    )

}
export default EditPost