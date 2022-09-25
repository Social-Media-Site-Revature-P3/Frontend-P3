export interface Post {
    postId?: number;
    text: string;
    title: string;
    imageUrl: string;
    createDateTime?: string;
    updateDateTime?: string;
    user: {
        userId: number
    }
}
