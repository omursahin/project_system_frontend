export const getSemesterType = (id) => {
    if (id === 0) {
        return "Güz";
    } else if (id === 1) {
        return "Bahar";
    } else if (id === 2) {
        return "Yaz";
    } else {
        return "Tanımsız Dönem";
    }
};
