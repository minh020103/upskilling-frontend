import styled from "styled-components";
import { ItemAvailableChallenges } from "../../items/dashboard/ItemAvailableChallenges";
import { Div } from "../../styles/Div";
import { ChallengeAndViewAll } from "../../views/ChallengeAndViewAll";
import { AreasNeedingImprovement } from "../../views/performance-analysis/AreasNeedingImprovement";
import { ComplatedChallenge } from "../../views/performance-analysis/ComplatedChallenge";
import { ProgressionOverTime } from "../../views/performance-analysis/ProgressionOverTime";
import { Strengths } from "../../views/performance-analysis/Strengths";
import { useEffect, useState } from "react";
import { PageImpl } from "../../../models/PaginationModel";
import { ContentChallengeCompletedProps } from "../../../models/usermanagement";
import {
  analysisSkill,
  getAvailableChallengesSuggestService,
  getChallengeCompleted,
  getChallengeCompletedByUser,
} from "../../../services/ChallengeService";
import { FailResponseModel } from "../../../models/ResponseModel";
import { useParams } from "react-router-dom";
import { notifyErr, notifySuccess } from "../../../utils/notify";
import { ContentAnalysisSkill } from "../../../models/performance-analysis";
import { Challenge } from "../../../models/ChallengeModel";
import { Skeleton } from "antd";

const itemNumberInPage = 4;
const PerformanceAnalysis = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataAnalysis, setDataAnalysis] = useState<ContentAnalysisSkill>();
  const [dataChallengeCompleted, setDataChallengeCompleted] =
    useState<PageImpl<ContentChallengeCompletedProps>>();
    const [loadingChallengeSuggest, setLoadingChallengeSuggest] = useState<boolean>(true);
  const [currenPageChallengeSuggest, setCurrenPageChallengeSuggest] = useState<number>(1);
  const [dataChallengeSuggest, setDataChallengeSuggest] = useState<PageImpl<Challenge>>();
  
  const setDataChallengeCompletedResponse = (response: any) => {
    const { status, data } = response;
    if (status == 200) {
      const success =
      data as PageImpl<ContentChallengeCompletedProps>;

      setDataChallengeCompleted(success);
    } else {
      const fail = data as FailResponseModel;
      alert(fail.errorMessage);
    }
  };
  const getData = async () => {
    setLoading(true);
    try {
      if (id != undefined) {
        const response = await getChallengeCompletedByUser(
          currentPage - 1,
          itemNumberInPage,
          Number(id)
        );
        setDataChallengeCompletedResponse(response);
      } else {
        const response = await getChallengeCompleted(
          currentPage - 1,
          itemNumberInPage
        );
        setDataChallengeCompletedResponse(response);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };
console.log(dataChallengeCompleted);

  const onClickLeft = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      notifyErr("This is the first page");
    }
  };
  const onClickRight = () => {
    if (
      dataChallengeCompleted &&
      dataChallengeCompleted.totalPages > currentPage
    ) {
      setCurrentPage(currentPage + 1);
    } else {
      notifyErr("This is the last page");
    }
  };
  const onClickViewAll = () => {
    notifySuccess("Comming soon");
  };
  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    getDataAnalysis();
  },[id]);

  const getDataAnalysis = async () => {
    try {
      const response = await analysisSkill();
      const { status, data } = response;
      if (status === 200) {
        const success = data as ContentAnalysisSkill;
        setDataAnalysis(success);
      }else{
        alert("Failt");
      }
    } catch (error) {
      alert(error);
    }
  };
  const onClickLeftChallengeSuggest = () => {
    if (currenPageChallengeSuggest > 1) {
      setCurrenPageChallengeSuggest(currenPageChallengeSuggest - 1);
    }
    else {
      notifyErr("This is the first page");
    }
  }
  const onClickRightChallengeSuggest = () => {
    if (dataChallengeSuggest && dataChallengeSuggest.totalPages > currenPageChallengeSuggest) {
      setCurrenPageChallengeSuggest(currenPageChallengeSuggest + 1);
    }
    else {
      notifyErr("This is the last page");
    }
  }
  useEffect(() => {
    getDataChallengeSuggest();
  }, [currenPageChallengeSuggest])
  const getDataChallengeSuggest = async () => {
    setLoadingChallengeSuggest(true);
    try {
      const response = await getAvailableChallengesSuggestService(currenPageChallengeSuggest - 1, itemNumberInPage);
      const { status, data } = response;
      if (status == 200) {
        const success = data as PageImpl<Challenge>;
        setDataChallengeSuggest(success);
      } else {
        const fail = data as FailResponseModel;
        alert(fail.errorMessage);
      }

    } catch (error) {
      alert(error);
    }
    setLoadingChallengeSuggest(false);
  }
  const onClickViewAllChallengeSuggest = () => {
    notifySuccess("Comming soon");
  }
  return (
    <PerformanceAnalysisStyled>
      {!loadingChallengeSuggest ?
        dataChallengeSuggest && dataChallengeSuggest.totalElements > 0 ?
          <ChallengeAndViewAll
            className={null}
            title="Recommends your next challenge"
            description={"Based on your performance and skill level"}
            onClickLeft={onClickLeftChallengeSuggest}
            onClickRight={onClickRightChallengeSuggest}
            onClickViewAll={onClickViewAllChallengeSuggest}
            loadMoreActive={dataChallengeSuggest.totalElements > itemNumberInPage ? "active" : "in-active"}
            render={
              dataChallengeSuggest?.content.map(item => (
                <ItemAvailableChallenges
                  className={"custom-available-challenge-top"}
                  imgItem={item.image}
                  title={item.title}
                  description={item.description}
                  time={item.duration}
                  avatars={[]}
                  id={item.id} />
              ))
            } />
          :
          <></>
        :
        <Skeleton active style={{ height: "451px" }} />
      }
      <ProgressionOverTime />
      <Strengths strengths={dataAnalysis?.strengths} />
      <AreasNeedingImprovement
        areasneedingimprovement={dataAnalysis?.areasNeedingImprovements}
      />
      <ComplatedChallenge
        data={dataChallengeCompleted}
        loading={loading}
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        onClickViewAll={onClickViewAll}
      />
    </PerformanceAnalysisStyled>
  );
};
export default PerformanceAnalysis;
const PerformanceAnalysisStyled = styled(Div)(({}) => ({
  margin: "24px",
  '& .custom-available-challenge-top':{
    maxWidth: '284px',
    minWidth: '284px'
  },
}));
