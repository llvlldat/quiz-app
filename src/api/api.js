import axios from "axios";

export function register(username, password, email) {
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/register",
        data: {
            username: username,
            password: password,
            email: email,
        },
    });
}

export function login(username, password) {
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/login",
        data: {
            username: username,
            password: password,
        },
    });
}

export function refreshToken(refreshToken) {
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/refresh-tokens",
        data: {
            refreshToken: refreshToken,
        },
    });
}

export function logout(refreshToken) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/logout",
        data: {
            refreshToken: refreshToken,
        },
    });
}

export function getQuestionByPage(limit) {
    return axios({
        method: "GET",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions?page=1&limit=${limit}`,
    });
}

export function submitAnswers(answersArray) {
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/questions/submit",
        data: answersArray,
    });
}

export default {};
