export interface Post {
    postId?: number;
    text: string;
    title: string;
    imageUrl: string;
    comment: boolean;
    createDateTime?: string;
    updateDateTime?: string;
    user: {
        userId: number
    }
}
