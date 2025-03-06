import { FormUpdateUserInformation } from '../../../views/profile/FormUpdateUserInformation';
import { TopContentSearch } from '../../../views/TopContentSearch';

const Profile = () => {
    return (
        <>
        <TopContentSearch
            routes={["Dashboard", "Available challenges"]}
            routeActive={"Edit your profile"}
            onClickSearch={null}
            title={"Edit your profile"}
            className={null}
        />
            <FormUpdateUserInformation />
        </>
    );
};

export default Profile;
