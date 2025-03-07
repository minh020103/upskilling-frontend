import { Col, Flex, Row, Typography } from "antd";
import styled from "styled-components";
import { ItemDownloadProps } from "../../../models/dashboard";
import { downloadFile } from "../../../services/Dowload";
import { notifyErr } from "../../../utils/notify";
import { ButtonCustom } from "../custom-item/ButtonCustom";

export const ItemDownload = (props: ItemDownloadProps) => {
    const { link, textButton, orientation } = props;
    const onClickDowload = () => {
        fetchDowloadFile()        
    }
    const fetchDowloadFile = async () => {
        try {
            const res = await downloadFile(link);
            if (res.status === 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));

                const linkElement = document.createElement('a');
                linkElement.href = url;
                linkElement.setAttribute('download', link.split('\\').pop()!);

                document.body.appendChild(linkElement);
                linkElement.click();
                document.body.removeChild(linkElement);

                window.URL.revokeObjectURL(url);
            } else {
                notifyErr(`Download ${link.split('\\').pop()} failed`);
            }
        } catch (error) {
            console.error("Error downloading file:", error);
            notifyErr("Download failed");
        }
    }
    return (
        <ItemDownloadStyled>
            {orientation == "vertical" ?
                <Col className="vertical">
                    <Row style={{ alignItems: 'center' }}>
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1766 2.07461C8.7047 0.602734 6.30783 0.602734 4.83751 2.07461L0.75939 6.14961C0.732827 6.17617 0.718764 6.21211 0.718764 6.24961C0.718764 6.28711 0.732827 6.32305 0.75939 6.34961L1.33595 6.92617C1.36231 6.95241 1.39798 6.96714 1.43517 6.96714C1.47236 6.96714 1.50804 6.95241 1.53439 6.92617L5.61251 2.85117C6.11877 2.34492 6.7922 2.0668 7.50783 2.0668C8.22345 2.0668 8.89689 2.34492 9.40158 2.85117C9.90783 3.35742 10.186 4.03086 10.186 4.74492C10.186 5.46055 9.90783 6.13242 9.40158 6.63867L5.24533 10.7934L4.57189 11.4668C3.9422 12.0965 2.91876 12.0965 2.28908 11.4668C1.98439 11.1621 1.8172 10.7574 1.8172 10.3262C1.8172 9.89492 1.98439 9.49024 2.28908 9.18555L6.41252 5.06367C6.5172 4.96055 6.6547 4.90273 6.80158 4.90273H6.80314C6.95002 4.90273 7.08595 4.96055 7.18908 5.06367C7.29376 5.16836 7.35002 5.30586 7.35002 5.45273C7.35002 5.59805 7.2922 5.73555 7.18908 5.83867L3.81876 9.20586C3.7922 9.23242 3.77814 9.26836 3.77814 9.30586C3.77814 9.34336 3.7922 9.3793 3.81876 9.40586L4.39533 9.98242C4.42168 10.0087 4.45736 10.0234 4.49455 10.0234C4.53174 10.0234 4.56741 10.0087 4.59377 9.98242L7.96251 6.61367C8.27345 6.30273 8.44377 5.89023 8.44377 5.45117C8.44377 5.01211 8.27189 4.59805 7.96251 4.28867C7.32033 3.64648 6.27658 3.64805 5.63439 4.28867L5.23439 4.69023L1.51251 8.41055C1.25991 8.66167 1.05967 8.96045 0.923413 9.28956C0.787158 9.61866 0.717597 9.97154 0.718764 10.3277C0.718764 11.0512 1.00158 11.7309 1.51251 12.2418C2.0422 12.7699 2.73595 13.034 3.4297 13.034C4.12345 13.034 4.8172 12.7699 5.34533 12.2418L10.1766 7.41367C10.8875 6.70117 11.2813 5.75273 11.2813 4.74492C11.2828 3.73555 10.8891 2.78711 10.1766 2.07461Z" fill="black" fill-opacity="0.45" />
                        </svg>
                        <Typography className="name-file">{link.split('\\').pop()}</Typography>
                    </Row>
                    <ButtonCustom type="primary" onClickButton={onClickDowload} className={'download'} label={textButton} />
                </Col>
                :
                <Row className="horizontal">
                    <Row style={{ alignItems: 'center' }}>
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1766 2.07461C8.7047 0.602734 6.30783 0.602734 4.83751 2.07461L0.75939 6.14961C0.732827 6.17617 0.718764 6.21211 0.718764 6.24961C0.718764 6.28711 0.732827 6.32305 0.75939 6.34961L1.33595 6.92617C1.36231 6.95241 1.39798 6.96714 1.43517 6.96714C1.47236 6.96714 1.50804 6.95241 1.53439 6.92617L5.61251 2.85117C6.11877 2.34492 6.7922 2.0668 7.50783 2.0668C8.22345 2.0668 8.89689 2.34492 9.40158 2.85117C9.90783 3.35742 10.186 4.03086 10.186 4.74492C10.186 5.46055 9.90783 6.13242 9.40158 6.63867L5.24533 10.7934L4.57189 11.4668C3.9422 12.0965 2.91876 12.0965 2.28908 11.4668C1.98439 11.1621 1.8172 10.7574 1.8172 10.3262C1.8172 9.89492 1.98439 9.49024 2.28908 9.18555L6.41252 5.06367C6.5172 4.96055 6.6547 4.90273 6.80158 4.90273H6.80314C6.95002 4.90273 7.08595 4.96055 7.18908 5.06367C7.29376 5.16836 7.35002 5.30586 7.35002 5.45273C7.35002 5.59805 7.2922 5.73555 7.18908 5.83867L3.81876 9.20586C3.7922 9.23242 3.77814 9.26836 3.77814 9.30586C3.77814 9.34336 3.7922 9.3793 3.81876 9.40586L4.39533 9.98242C4.42168 10.0087 4.45736 10.0234 4.49455 10.0234C4.53174 10.0234 4.56741 10.0087 4.59377 9.98242L7.96251 6.61367C8.27345 6.30273 8.44377 5.89023 8.44377 5.45117C8.44377 5.01211 8.27189 4.59805 7.96251 4.28867C7.32033 3.64648 6.27658 3.64805 5.63439 4.28867L5.23439 4.69023L1.51251 8.41055C1.25991 8.66167 1.05967 8.96045 0.923413 9.28956C0.787158 9.61866 0.717597 9.97154 0.718764 10.3277C0.718764 11.0512 1.00158 11.7309 1.51251 12.2418C2.0422 12.7699 2.73595 13.034 3.4297 13.034C4.12345 13.034 4.8172 12.7699 5.34533 12.2418L10.1766 7.41367C10.8875 6.70117 11.2813 5.75273 11.2813 4.74492C11.2828 3.73555 10.8891 2.78711 10.1766 2.07461Z" fill="black" fill-opacity="0.45" />
                        </svg>
                        <Typography className="name-file">{link.split('\\').pop()}</Typography>
                    </Row>
                    <ButtonCustom type="primary" onClickButton={onClickDowload} className={'download'} label={textButton} />
                </Row>
            }

        </ItemDownloadStyled>
    )
}
const ItemDownloadStyled = styled(Flex)(({ }) => ({
    '& .vertical': {
        border: '1px solid #0000000F',
        width: '100%',
        padding: '16px',
        '& .name-file': {
            marginLeft: '10px',
            color: '#1890FF'
        },
        '& .download': {
            width: '100%',
            marginTop: '8px',
        }
    },
    '& .horizontal': {
        border: '1px solid #0000000F',
        minWidth: '395px',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
        padding: '16px',
        marginRight: '10px',
        '& .name-file': {
            marginLeft: '10px',
            marginRight: '20px',
            color: '#1890FF'
        },
        '& .download': {
            borderRadius: '0',
        }
    }
}));