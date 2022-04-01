import axios from "axios";

const instanceAxios = axios.create();

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
    return instanceAxios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/auth/refresh-tokens",
        data: {
            refreshToken: refreshToken,
        },
    });
}

export function logout(refreshToken) {
    localStorage.clear();
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

export function getQuestionByAdmin(limit) {
    return axios({
        method: "GET",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit?limit=${limit}`,
    });
}

export function getQuestionById(id) {
    return axios({
        method: "GET",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${id}`,
    });
}

export function updateQuestionById(id, question) {
    return axios({
        method: "PATCH",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${id}`,
        data: question,
    });
}

export function deleteQuestionById(id) {
    return axios({
        method: "DELETE",
        url: `https://fwa-ec-quiz.herokuapp.com/v1/questions/edit/${id}`,
    });
}

export function addNewQuestion(question) {
    return axios({
        method: "POST",
        url: "https://fwa-ec-quiz.herokuapp.com/v1/questions/edit",
        data: question,
    });
}

export default {};
