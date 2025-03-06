import { Flex, Pagination } from "antd";
import React from "react";
import styled from "styled-components"

export const PageCustom: React.FC<{ total: number, currentPage: number, itemNumberInPage: number, onPageChange: (page: number, pageSize: number) => void }> = ({ total, currentPage, itemNumberInPage, onPageChange }) => {
    return (
        <PageCustomStyled>
            <Pagination
                total={total}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={itemNumberInPage}
                defaultCurrent={currentPage}
                onChange={onPageChange}
            />
        </PageCustomStyled>
    )
}
const PageCustomStyled = styled(Flex)(({ }) => ({
    justifyContent: 'center',
    margin: '24px',
    '& .ant-pagination-item': {
        borderRadius: 0,
        border: '1px solid #D9D9D9'
    },
    '& .ant-select-selector': {
        borderRadius: 0,
    },
    '& .ant-pagination-item-active': {
        border: '1px solid #1890FF'
    }
}));