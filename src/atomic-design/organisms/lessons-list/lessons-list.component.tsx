import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import styles from './lessons-list.module.scss';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props: any) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: any) => {
        onChangePage(event, 1);
    };

    const handleBackButtonClick = (event:any) => {
        onChangePage(event, (page + 1) - 1);
    };

    const handleNextButtonClick = (event:any) => {
        onChangePage(event, (page + 1) + 1);
    };

    const handleLastPageButtonClick = (event:any) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage)));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

const columns = [
    {
        header: 'Id',
        accessor: '_id',
    },
    {
        header: 'Created',
        accessor: 'createdAt',
    },
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Description',
        accessor: 'description',
    },
    {
        header: 'Activated',
        accessor: 'activated',
    },
    {
        header: 'Last Modified',
        accessor: 'updatedAt',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    }
];

export const LessonsListComponent = (props:any) => {
    const perPage = [];
    const lessons = props.data.result;
    const lessonsCount = Number(props.data.total);

    if (lessonsCount >= 10) {
        perPage.push(10)
    }
    if (lessonsCount >= 25) {
        perPage.push(25)
    }
    if (lessonsCount >= 50) {
        perPage.push(50)
    }

    return (
        <div>
            <Table stickyHeader aria-label="custom pagination table" className={styles.table}>
                <TableHead>
                    <TableRow>
                        {columns.map((column:any, idx: number) => {
                            let content = column.header;

                            if (props.canEdit && column.header === 'Activated') {
                                content = (
                                    <select onChange={props.onFilter} value={props.filterParams.activated}>
                                        <option value="null">Activated</option>
                                        <option  value="true">Only Activated</option>
                                        <option value="false">Not Activated</option>
                                    </select>
                                )
                            }

                            return <TableCell key={idx+'th'} component="th" className={styles.th}>{content}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lessons.map((row:any) => (
                        <TableRow key={row._id}>
                            {columns.map((column:any, idx) => {
                                let content = row[column.accessor];

                                if (props.canEdit && column.accessor === 'actions') {
                                    content = (
                                        <div style={{ display: "flex" }}>
                                            <div onClick={props.onEdit} data-lesson-id={row._id}>
                                                <IconButton size="small">
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </div>
                                            <div onClick={props.onDelete} data-lesson-id={row._id}>
                                                <IconButton size="small" color="secondary">
                                                    <DeleteForeverIcon color="secondary" />
                                                </IconButton>
                                            </div>
                                        </div>
                                    );
                                }

                                if (props.canEdit && column.accessor === 'activated') {
                                    content = (
                                        <select onChange={props.onChangeLesson} data-lesson-id={row._id} data-field="activated" value={content}>
                                            <option value="true">true</option>
                                            <option  value="false">false</option>
                                        </select>
                                    )
                                }

                                return (
                                    <TableCell key={idx+'cell'} scope="row" className={styles.cell}>
                                        {content}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={perPage}
                            colSpan={7}
                            count={lessonsCount}
                            rowsPerPage={Number(props.filterParams.size)}
                            page={Number(props.filterParams.page) - 1}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={props.onChange}
                            onChangeRowsPerPage={props.onChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}