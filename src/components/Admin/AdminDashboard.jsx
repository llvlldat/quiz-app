import { Table, Space, Button, Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import { getQuestionByAdmin, deleteQuestionById } from "../../api/api";
import EditQuestionForm from "./EditQuestionForm";
import Swal from "sweetalert2";

function AdminDashboard() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [questionDetail, setQuestionDetail] = useState({});
    const [data, setData] = useState([]);
    const formRef = useRef();

    const _onClickViewDetail = (question) => {
        setQuestionDetail(question);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        formRef.current.submit();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const _onClickDelete = async (id) => {
        Swal.fire({
            title: "Do you want to delete this question?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteQuestionById(id)
                    .then((res) => console.log(res.data))
                    .catch((err) => console.log(err));
                await getDataFromBE();
                Swal.fire("Delete!", "", "success");
            }
        });
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Question",
            dataIndex: "question",
            key: "question",
        },
        {
            title: "Action",
            key: "action",
            render: (question, record, index) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => _onClickViewDetail(question)}
                    >
                        View Detail
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => _onClickDelete(question.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const _onClickAddQuestion = () => {
        setQuestionDetail({
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correctanswer: "",
        })
        setIsModalVisible(true)
    }

    const getDataFromBE = async () => {
        const res = await getQuestionByAdmin(1)
        return getQuestionByAdmin(res.data.totalResults)
            .then((res) => {
                setData(
                    res.data.results.map((result) => ({
                        ...result,
                        key: result.id,
                    }))
                );
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getDataFromBE();
    }, []);

    return (
        <div
            style={{
                width: "1000px",
                margin: "100px auto 0",
            }}
        >
            <Space direction="vertical">
                <Button type="primary" onClick={_onClickAddQuestion}>Add new question</Button>
                <Table columns={columns} dataSource={data} style={{width: '1000px'}}/>
            </Space>
            <Modal
                title={`Detail of question: `}
                visible={isModalVisible}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <EditQuestionForm
                    ref={formRef}
                    questionDetail={questionDetail}
                    key={questionDetail.key}
                    getDataFromBE={getDataFromBE}
                    status={questionDetail.id ? "update" : "create"}
                />
            </Modal>
        </div>
    );
}

export default AdminDashboard;
