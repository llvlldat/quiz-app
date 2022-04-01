import axios from "axios";
import { refreshToken } from "./api";

axios.interceptors.request.use(async (req) => {
    const expires = Number(new Date(localStorage.getItem("expires")));
    const current = Number(new Date());

    if (expires <= current) {
        await refreshToken(localStorage.getItem("refreshToken"))
            .then((res) => {
                console.log("refreshed");
                localStorage.setItem("token", res.data.access.token);
                localStorage.setItem("expires", res.data.access.expires);
                localStorage.setItem("refreshToken", res.data.refresh.token);
                req.headers = {
                    ...req.headers,
                    Authorization: `Bearer ${res.data.access.token}`,
                };

                return req;
            })
            .catch((err) => console.log(err));
    }

    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return req;
});

// axios.interceptors.response.use((res) => {
//     if (res.status === 401) {
//         refreshToken(localStorage.getItem("refreshToken"))
//             .then((res) => {
//                 localStorage.setItem("token", res.data.tokens.access.token);
//                 localStorage.setItem(
//                     "refreshToken",
//                     res.data.tokens.refresh.token
//                 );
//             })
//             .catch((err) => console.log(err));
//     }
//     return res;
// });
