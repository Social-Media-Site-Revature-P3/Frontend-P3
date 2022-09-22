import { Likes } from "./likes";
import { Post } from "./Posts"

export interface User {
    email : string;
    nickname : string;
    password : string;
    firstName : string;
    lastName : string;
    posts? : Post[];
    securityQuestions? : SecurityQuestions[]; 
    likes? : Likes[];
    following? : Following[];
    followed? : Followed[];
    bookmarks? : Bookmarks[];
}

//need to import all of the ones that are underlined, Matthew and I 
//working on the likes and search for now. (9/21)