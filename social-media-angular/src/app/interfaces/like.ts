export interface Like {
    likedId?: number;
    liked: boolean;
    post: {
        postId: number
    };
    user: {
        userId: number
    }
}
