import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Div } from '../styles/Div';

const { Dragger } = Upload;


const UploadFileStyled = styled(Div)(({ }) => ({
    '& .ant-upload-list': {
        width: '395px',
    }
}));
const UploadFile: React.FC<{ onFileSelect: (file: RcFile | null) => void }> = ({ onFileSelect }) => {
    const [file, setFile] = useState<RcFile | null>(null);

    const uploadprops: UploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload: (selectedFile) => {
            setFile(selectedFile);
            onFileSelect(selectedFile);
            return false;
        },
        onRemove: () => {
            setFile(null);
            onFileSelect(null);
        },
        fileList: file ? [file] : [],
    };
    return (
        <UploadFileStyled>
            <Dragger {...uploadprops} style={{ width: '395px', height: '150px' }}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Max upload file 250 MB
                </p>
            </Dragger>
        </UploadFileStyled>
    );
}

export default UploadFile;