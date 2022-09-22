export interface SecurityQuestion {
    questionId?: number;
    question : string;
    answer : string;
    user : {
        userId: number
    }
}
