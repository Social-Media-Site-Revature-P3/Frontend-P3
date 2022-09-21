export interface Likes {
    likeId : number,
    liked : boolean,
    post : {
        post : number;
    }
    user : {
        user : number;
    }
}