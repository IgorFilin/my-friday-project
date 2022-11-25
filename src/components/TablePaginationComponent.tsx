import React from "react";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {setPageAC, setPageCountAC} from "redux/decksReducer";


export const TablePaginationComponent = () => {

    const dispatch = useAppDispatch()

    const cardsTotalCount = useAppSelector(state => state.decks.cardsState.cardsTotalCount)
    const page = useAppSelector(state => state.decks.cardsState.page)
    const pageCount = useAppSelector(state => state.decks.cardsState.pageCount)

    const TotalCountPages = Math.round(cardsTotalCount / pageCount)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        dispatch(setPageAC(newPage + pageCount))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch(setPageCountAC(parseInt(event.target.value, 10)));
    };

    const currentPageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setPageAC(page))
    }

    return (
        <div style={{display: "flex", width: "100%", margin: "10px auto"}}>
            <Pagination
                color={'primary'}
                count={TotalCountPages}
                variant="outlined"
                shape="rounded"
                page={page}
                defaultPage={1}
                onChange={currentPageHandler}
            />
            <TablePagination
                sx={{
                    mt: -1,
                }}
                component="div"
                count={cardsTotalCount}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={pageCount}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};
