import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import UserRow from '../UserRow';

import './styles.scss';

const columns = [
    { id: 'hoTen', label: 'Name', minWidth: 200 },
    { id: 'taiKhoan', label: 'Account', minWidth: 200 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'soDt', label: 'Phone', minWidth: 100 },
    { id: 'maLoaiNguoiDung', label: 'Type', minWidth: 100 },
    { id: 'option', label: 'Option', minWidth: 100 }
];

const ManageUser = () => {
    const [userList, setUserList] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios({
            url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page + 1}&soPhanTuTrenTrang=${rowsPerPage}`,
            method: 'GET'
        })
            .then(res => { setUserList(res.data) })
            .catch(err => { console.log(2) })
    }, [page, rowsPerPage]);

    return (
        <>
            <h2>a</h2>
            <Paper className="root">
                <TableContainer className="container">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.items?.map((user) => {
                                return <UserRow user={user} columns={columns} />;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={userList.totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default ManageUser;