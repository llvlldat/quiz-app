import { Typography, Radio, Space, Divider, Button, InputNumber } from "antd";
import { useEffect, useState, useRef } from "react";
import { getQuestionByPage, submitAnswers } from "../api/api";
import Swal from "sweetalert2"

function UserDashboard() {
    const answers = useRef([]);
    const [numberOfQuestions, setNumberOfQuestions] = useState(10);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getQuestionByPage(numberOfQuestions)
            .then((res) => {
                answers.current = res.data.results.map((ans) => {
                    return {
                        id: ans.id,
                        correctanswer: "",
                    };
                });
                setQuestions(res.data.results);
            })
            .catch((err) => console.log(err));
    }, [numberOfQuestions]);

    const _onClickNext = () => {
        setIndex(index + 1);
    };

    const _onClickPrevious = () => {
        setIndex(index - 1);
    };

    const _onClickSubmit = () => {
        submitAnswers(answers.current)
            .then((res) => {
                console.log(res.data)
                const score = res.data.reduce((prev, current) => {
                    return current.result ? prev + 1 : prev
                } , 0)
                Swal.fire({
                    title: `Your score is ${score}/${res.data.length}`,
                });
            })
            .catch((err) => console.log(err));
    };

    const _onChangeRadio = (e) => {
        answers.current[index].correctanswer = e.target.value;
    };

    const _onChangeInputNumber = (value) => {
        setNumberOfQuestions(value);
    };

    return (
        <div
            style={{
                margin: "150px auto",
                width: "800px",
            }}
        >
            <Space align="center" style={{ marginBottom: "16px" }}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                    Total question is
                </Typography.Title>
                <InputNumber
                    min={1}
                    defaultValue={numberOfQuestions}
                    onChange={_onChangeInputNumber}
                />
            </Space>
            <Space
                direction="vertical"
                style={{
                    width: "800px",
                }}
            >
                <div
                    style={{
                        border: "1px solid #c1c1c1",
                        borderRadius: "8px",
                        padding: "32px 48px",
                    }}
                >
                    {questions[0] && (
                        <div>
                            <Typography.Title level={4}>
                                Question {index + 1}:{" "}
                                {questions[index].question}
                            </Typography.Title>
                            <Divider />
                            <Radio.Group
                                onChange={_onChangeRadio}
                                key={questions[index].id}
                                defaultValue={
                                    answers.current[index].correctanswer
                                }
                            >
                                <Space direction="vertical">
                                    <Radio value={questions[index].answer1}>
                                        {questions[index].answer1}
                                    </Radio>
                                    <Radio value={questions[index].answer2}>
                                        {questions[index].answer2}
                                    </Radio>
                                    <Radio value={questions[index].answer3}>
                                        {questions[index].answer3}
                                    </Radio>
                                    <Radio value={questions[index].answer4}>
                                        {questions[index].answer4}
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    )}
                </div>
                <Space>
                    {index > 0 && (
                        <Button type="primary" onClick={_onClickPrevious}>
                            Previous
                        </Button>
                    )}
                    {index < questions.length - 1 && (
                        <Button type="primary" onClick={_onClickNext}>
                            Next
                        </Button>
                    )}
                    {index === questions.length - 1 && (
                        <Button type="primary" onClick={_onClickSubmit} danger>
                            Submit
                        </Button>
                    )}
                </Space>
            </Space>
        </div>
    );
}

export default UserDashboard;
