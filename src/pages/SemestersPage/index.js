import React, {useEffect} from 'react';
import {useGetAllSemestersQuery} from "../../store/api/semesters";

export const SemestersPage = () => {
    const {data:semesters, isLoading} = useGetAllSemestersQuery();

    useEffect(() => console.log(semesters), [semesters]);

    //TODO Bir tablo kullanılarak semesters.result içindeki veriler görüntülenmeli
    return (
      <>SemestersPage</>
    )
}
