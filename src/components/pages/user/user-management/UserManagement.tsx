import styled from "styled-components";
import { Div } from "../../../styles/Div";
import { TopContentSearch } from "../../../views/TopContentSearch";
import { ListUser } from "../../../views/user-management/ListUser";
import { useEffect, useState } from "react";
import { PageImpl } from "../../../../models/PaginationModel";
import { UserInformationProps } from "../../../../models/UserModel";
import { searchUser } from "../../../../services/UserService";
import { FailResponseModel } from "../../../../models/ResponseModel";

const itemNumberInPage = 6;
const initData: PageImpl<UserInformationProps> = {
  size: 0,
  totalElements: 0,
  totalPages: 0,
  content: [],
};
const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<PageImpl<UserInformationProps>>(initData);
  const [loading, setLoading] = useState<boolean>(true);
  const [keySearch, setKeySearch] = useState<string>("");
  const onClickSearch = (key: string) => {
    setKeySearch(key);
  };
  useEffect(() => {
    getData();
  }, [currentPage, keySearch]);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchUser(
        currentPage - 1,
        itemNumberInPage,
        keySearch
      );
      const { status, data } = response;
      if (status == 200) {
        const success = data as PageImpl<UserInformationProps>;

        setData(success);
      } else {
        const fail = data as FailResponseModel;
        alert(fail.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };
  const onPageChange = (page: number, _: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <UserManagementStyled>
        <TopContentSearch
          routes={null}
          routeActive={null}
          title={"User management"}
          onClickSearch={onClickSearch}
          className={null}
          onSelectedLevel={null}
          onSelectedTime={null}
          dataLevel={null}
          dataTime={null}
        />
        {!loading && (
          <ListUser
            currentPage={currentPage}
            data={data}
            loading={loading}
            onPageChange={onPageChange}
          />
        )}
      </UserManagementStyled>
    </>
  );
};
export default UserManagement;
const UserManagementStyled = styled(Div)(({}) => ({}));
