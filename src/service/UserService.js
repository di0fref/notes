import http from "./http-common";

class UserService {
    get() {
        return http.get(`/user`);
    }
}
