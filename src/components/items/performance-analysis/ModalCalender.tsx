import { Button, Calendar, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { Div } from "../../styles/Div"
import { DownOutlined } from '@ant-design/icons';
import moment from "moment";
import { ModalCalenderProps } from "../../../models/performance-analysis";
export const ModalCalender = (props: ModalCalenderProps) => {
    const { date, setDate } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange = (value: any) => {
        if (setDate != undefined) {
            setDate(value.format('YYYY-MM-DD hh:mm:ss'));
        }
    };
    return (
        <ModalCalenderStyled>
            <Button type="text" onClick={showModal}>{date == "" ? moment(date).format('MMMM YYYY') : moment(date).format('MMMM YYYY')} <DownOutlined /></Button>
            <Modal title="Select date" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Calendar fullscreen={false} onChange={onChange} />
            </Modal>
        </ModalCalenderStyled>
    )
}
const ModalCalenderStyled = styled(Div)(({ }) => ({

}));
