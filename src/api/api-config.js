import axios from "axios";
import refreshToken from "./api";

axios.interceptors.request.use((req) => {
    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return req;
});

axios.interceptors.response.use((res) => {
    if (res.status === 401) {
        refreshToken(localStorage.getItem("refreshToken"))
            .then((res) => {
                localStorage.setItem("token", res.data.tokens.access.token);
                localStorage.setItem(
                    "refreshToken",
                    res.data.tokens.refresh.token
                );
            })
            .catch((err) => console.log(err));
    }
    return res;
});
