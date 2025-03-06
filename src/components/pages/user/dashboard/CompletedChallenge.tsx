import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { UserChallengeStart } from "../../../../models/dashboard";
import { getDataChallengeCompletedService } from "../../../../services/ChallengeService";
import { Div } from "../../../styles/Div"
import { ContentChallengeComplated } from "../../../views/dashboard/ContentChallengeComplated";
import { TopContentSearch } from "../../../views/TopContentSearch";
// const data: any = {
//     imgItem: "https://s3-alpha-sig.figma.com/img/13b8/80b5/c4399d1f767489ed7f3bc69161f9e667?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i~9~MbATNeq7n4uRDGsyuwj7aHZquXhKkxzu9dv1y8I65GLo5pIByNMFMpZqbgQee6gc2dc16opu8f4J3L26V~E6zSuSHVlBKiqq6A5Xtf9sI2zvrXXg2yTv37tY-KVOspwVzzIvO7fgTHeMxxGpFnM7qAQyW~GpiDlJU5OUTlA8BTyXBWYetwbYcZ5aaSW44YbFSU0n8jC~jTYrI20VM0gnh10yWNosy81kdEA2SX-9cN1jC2KGOm5NtiwIHXLx2LQxdB0Gpvr3d6EWL1ZobUn4Zu5E2a56LcTF5yPK~OlRq6n5Ad7k2MXMmA3Si7dYy-hswG-ge2zlfa5vgyJuoQ__",
//     title: "Shopify API Integration Challenge fads",
//     status: "Complated",
//     score: 812,
//     complatedDate: "2024-09-15",
//     id: 1
// };
export const CompletedChallenge = () => {
    const { id } = useParams();
    const [data, setData] = useState<UserChallengeStart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const getDataChallengeCompleted = async () => {
        setLoading(true);
        try {
            const res = await getDataChallengeCompletedService(Number(id));
            if (res.status == 200) {
                const success = res.data as UserChallengeStart;
                setData(success);

            }
        } catch (error) {

        }

        setLoading(false);
    }
    useEffect(() => {
        getDataChallengeCompleted();
    }, [])
    return (
        <Spin spinning={loading}>
            <CompletedChallengeStyled>
                <TopContentSearch
                    routes={["Dashboard", "Available challenge"]}
                    routeActive={"Name challenge"}
                    title={"Shopify API Integration Challenge"}
                />
                {data &&
                    <ContentChallengeComplated
                        data={data}
                    />
                }
            </CompletedChallengeStyled>
        </Spin>
    )
}
const CompletedChallengeStyled = styled(Div)(({ }) => ({

}));