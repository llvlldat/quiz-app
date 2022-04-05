import { Form, Input, Button } from "antd";
import { useImperativeHandle, useRef, forwardRef } from "react";
import { updateQuestionById, addNewQuestion } from "../../api/api";

function EditQuestionForm({ questionDetail, getDataFromBE, status }, ref) {
    const buttonRef = useRef();

    const _onFinishForm = async (value) => {
        if (status === "update") {
            await updateQuestionById(questionDetail.id, value)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
        } else {
            await addNewQuestion(value)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
        }
        await getDataFromBE();
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            buttonRef.current.click();
        },
    }));

    return (
        <Form
            initialValues={{
                question: questionDetail.question,
                answer1: questionDetail.answer1,
                answer2: questionDetail.answer2,
                answer3: questionDetail.answer3,
                answer4: questionDetail.answer4,
                correctanswer: questionDetail.correctanswer,
            }}
            onFinish={_onFinishForm}
            size="large"
        >
            <Form.Item
                label="Question: "
                name="question"
                rules={[{ required: true, message: "Question is required!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Answer 1: "
                name="answer1"
                rules={[{ required: true, message: "Answer 1 is required!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Answer 2: "
                name="answer2"
                rules={[{ required: true, message: "Answer 2 is required!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Answer 3: "
                name="answer3"
                rules={[{ required: true, message: "Answer 3 is required!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Answer4: "
                name="answer4"
                rules={[{ required: true, message: "Answer 4 is required!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Correct Answer: "
                name="correctanswer"
                rules={[
                    { required: true, message: "Correct Answer is required!" },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                !value ||
                                getFieldValue("answer1") === value ||
                                getFieldValue("answer2") === value ||
                                getFieldValue("answer3") === value ||
                                getFieldValue("answer4") === value
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(
                                    "Correct answer must match with 1 of 4 above questions!"
                                )
                            );
                        },
                    }),
                ]}
            >
                <Input />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                ref={buttonRef}
                style={{
                    display: "none",
                }}
            >
                submit
            </Button>
        </Form>
    );
}

export default forwardRef(EditQuestionForm);
