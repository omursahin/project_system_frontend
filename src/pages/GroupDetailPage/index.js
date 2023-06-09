import React from 'react';
import {useParams} from "react-router-dom";
import {useGetGroupByIdQuery} from "../../store/api/groups";

export const GroupDetailPage = () => {
    const {id} = useParams();
    const {data:group} = useGetGroupByIdQuery(id);

    console.log(group);
    return (
        <>
            <div>
                Grup Detay {id}
            </div>
        </>
    );
};
