import React from 'react';
import {useGetAllGroupsQuery} from "../../store/api/groups";

export const GroupPage = () => {
    const {data:groups} = useGetAllGroupsQuery();
    console.log(groups);

    return (
        <>
            <div>
                Groups
            </div>
        </>
    );
};
