import { verify,sign } from "jsonwebtoken";

class JwtService {
    private token: string;
    constructor(token: string) {
        this.token = token;
    }
    create(payload: any): string {
        return sign(payload, this.token, {
            expiresIn: "10d"
        });
    }
    validate(jwt: string): any{
        var result = null;
        try {
            result = verify(jwt, this.token);
        } catch(e) {

        }
        return result;
    }
}

export { JwtService };