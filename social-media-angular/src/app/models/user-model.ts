export default class UserModel {
    userId?: number;
    firstName: string;
    lastName: string;

    constructor (id: number, firstName: string, lastName: string) {
        this.userId = id
        this.firstName = firstName
        this.lastName = lastName
    }
}