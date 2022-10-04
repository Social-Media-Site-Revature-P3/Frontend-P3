export interface Like {
    likeId?: number;
    liked?: boolean;
    post: {
        postId: number
    };
    user: {
        userId: number
    }
}
