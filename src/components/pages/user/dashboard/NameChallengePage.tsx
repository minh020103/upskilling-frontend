import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Challenge } from '../../../../models/ChallengeModel';
import { FailResponseModel } from '../../../../models/ResponseModel';
import { getDetailChallengeService } from '../../../../services/ChallengeService';
import { notifyErr } from '../../../../utils/notify';
import { ContentNameChallenge } from '../../../views/dashboard/ContentNameChallenge';
import { TopContentSearch } from '../../../views/TopContentSearch';


const NameChallengePage = () => {
    const { id } = useParams<{ id: string }>();
    const [challenge, setChallenge] = useState<Challenge>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        getDetailChallenge();
    }, [])

    const getDetailChallenge = async () => {
        setLoading(true);
        try {

            const resp = await getDetailChallengeService(Number(id));
            if (resp.status == 200) {
                const success = resp.data as Challenge;
                setChallenge(success);
            }
            else {
                const fail = resp.data as FailResponseModel;
                notifyErr(fail.errorMessage);
            }
        }
        catch (err) {
            alert(err);
        }
        setLoading(false);
    }
    return (
        <Spin spinning={loading}>
            <TopContentSearch
                className={null}
                onClickSearch={null}
                routeActive={challenge?.title}
                routes={["Dashboard", "Available challenges"]}
                title={challenge?.title}
                dataLevel={["30", "45", "60", "100"]}
                dataTime={["30", "45", "60", "100"]}
                onSelectedLevel={null}
                onSelectedTime={null}
            />
            {id &&
                <ContentNameChallenge
                    id={Number(id)}
                    active={false}
                />
            }
        </Spin>
    );
};

export default NameChallengePage;
