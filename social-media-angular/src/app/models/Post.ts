import { User }from "./User"

export default class Post {
    postId: number
    text: string
    title: string
    imageUrl: string
    author: User
    comments: Post[]
    createDateTime: string;
    updateDateTime: string;
    userId: number;

    constructor (id: number, text: string, imageUrl: string, author: User, comments: Post[]) {
        this.postId = id
        this.text = text
        this.imageUrl = imageUrl
        this.author = author
        this.comments = comments
    }
}

// export interface Post {
//     postId?: number;
//     text: string;
//     title: string;
//     imageUrl: string;
//     createDateTime?: string;
//     updateDateTime?: string;
//     user: {
//         userId: number
//     }
// }