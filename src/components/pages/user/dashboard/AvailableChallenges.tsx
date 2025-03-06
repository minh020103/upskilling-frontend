import { useEffect, useState } from "react";
import { Challenge } from "../../../../models/ChallengeModel";
import { PageImpl } from "../../../../models/PaginationModel";
import { FailResponseModel } from "../../../../models/ResponseModel";
import { getAvailableChallengesSearchService, getChallengeLevelService, getChallengeTimeService } from "../../../../services/ChallengeService";
import { ContentAvailableChallenges } from "../../../views/dashboard/ContentAvailableChallenges";
import { TopContentSearch } from "../../../views/TopContentSearch";

const itemNumberInPage = 8;
const initData: PageImpl<Challenge> = {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    content: [

    ]
}
const AvailableChallenges = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<PageImpl<Challenge>>(initData);
    const [loading, setLoading] = useState<boolean>(true);
    const [keySearch, setKeySearch] = useState<string>('');
    const [valueLevel, setValueLevel] = useState<string>('');
    const [valueTime, setValueTime] = useState<string>('');
    const [dataLevel, setDataLevel] = useState<string[]>([]);
    const [dataTime, setDataTime] = useState<string[]>([]);
    const onClickSearch = (key: string) => {
        setKeySearch(key);
    }
    const onSelectedLevel = (value: string) => {
        setValueLevel(value);
    }
    const onSelectedTime = (value: string) => {
        setValueTime(value);
    }
    useEffect(() => {
        getData();
        getDataLevel();
        getDataTime();
    }, [currentPage, keySearch, valueLevel, valueTime])
    const getData = async () => {
        setLoading(true);
        try {            
            const response = await getAvailableChallengesSearchService(currentPage - 1, itemNumberInPage, keySearch, valueLevel, valueTime);
            const { status, data } = response;
            if (status == 200) {
                const success = data as PageImpl<Challenge>;
                
                setData(success);
            } else {
                const fail = data as FailResponseModel;
                alert(fail.errorMessage);
            }

        } catch (error) {
            alert(error);
        }
        setLoading(false);
    }
    const onPageChange = (page: number, _: number) => {
        setCurrentPage(page);
    }
    const getDataLevel = async () => {
        try {
            const response = await getChallengeLevelService();
            const { status, data } = response;
            if (status == 200) {
                const success = data as string[];

                setDataLevel(success);
            } else {
                const fail = data as FailResponseModel;
                alert(fail.errorMessage);
            }

        } catch (error) {
            alert(error);
        }
    }
    const getDataTime = async () => {
        try {
            const response = await getChallengeTimeService();
            const { status, data } = response;
            if (status == 200) {
                const success = data as string[];
                setDataTime(success);
            } else {
                const fail = data as FailResponseModel;
                alert(fail.errorMessage);
            }

        } catch (error) {
            alert(error);
        }
    }
    return (
        <>
            <TopContentSearch
                routes={["Dashboard"]}
                title={"Available challenges"}
                onClickSearch={onClickSearch}
                routeActive={"Available challenges"}
                className={null}
                onSelectedLevel={onSelectedLevel}
                onSelectedTime={onSelectedTime}
                dataLevel={dataLevel}
                dataTime={dataTime}
            />
            {
                !loading &&
                <ContentAvailableChallenges
                    currentPage={currentPage}
                    data={data}
                    loading={loading}
                    onPageChange={onPageChange}
                />
            }

        </>
    );
};

export default AvailableChallenges;
