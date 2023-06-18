import React, {useState} from 'react';
import {useGetAllGroupsQuery} from "../../store/api/groups";
import Cards from "./Cards";

export const GroupPage = () => {
    const {data:groups} = useGetAllGroupsQuery();
    console.log(groups);

    return(
        <div>
            <Cards groups={groups}/>
        </div>
    )

}