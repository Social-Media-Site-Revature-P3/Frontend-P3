export interface Bookmark {
    bookmarkId?: number;
    post: {
        postId: number
    };
    user: {
        userId: number
    }
}
