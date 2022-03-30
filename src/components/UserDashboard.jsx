import { Typography, Radio, Space, Divider, Button, InputNumber } from "antd";
import { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../context/Context";
import { getQuestionByPage, submitAnswers } from "../api/api";

function UserDashboard() {
    const context = useContext(userContext);
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

    console.log(answers.current);

    const _onClickNext = () => {
        setIndex(index + 1);
    };

    const _onClickPrevious = () => {
        setIndex(index - 1);
    };

    const _onClickSubmit = () => {
        submitAnswers(answers.current)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    };

    const _onChangeRadio = (e) => {
        answers.current[index].correctanswer = e.target.value;
    };

    return (
        <div
            style={{
                margin: "150px auto",
                width: "800px",
            }}
        >   
            {/* <InputNumber min={1} max={}></InputNumber> */}
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
