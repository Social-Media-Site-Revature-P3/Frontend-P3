export default class User {
    id: number
    email: string
    firstName: string
    lastName: string

    constructor (id: number, email: string, firstName: string, lastName: string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
    }
}

// export default class User {
//     userId?: number;
//     email: string;
//     nickname?: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     aboutMe?: String;
//     profilePicutre?: string
// }