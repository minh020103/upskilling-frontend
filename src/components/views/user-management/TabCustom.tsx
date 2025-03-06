import { Tabs, TabsProps } from "antd";
import styled from "styled-components";
import PerformanceAnalysis from "../../pages/user/PerformanceAnalysis";
import { Div } from "../../styles/Div";
import { About } from "./About";
import { ContentUserProps } from "../../../models/usermanagement";

export const TabCustom = (props: ContentUserProps) => {
  const { user } = props;
  const onChange = (key: string) => {};

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Performance Analysis",
      children: <PerformanceAnalysis />,
    },
    {
      key: "2",
      label: "About",
      children: <About user={user} />,
    },
  ];
  return (
    <TabCustomStyled>
      <Tabs
        className="tab-custom"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </TabCustomStyled>
  );
};
const TabCustomStyled = styled(Div)(({}) => ({
  "& .tab-custom": {
    "& .ant-tabs-nav": {
      margin: 0,
      "& .ant-tabs-nav-wrap": {
        background: "#fff",
        padding: "0 16px",
      },
    },
  },
}));
