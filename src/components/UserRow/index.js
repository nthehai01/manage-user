import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationDialog from '../NotificationDialog';

import { editUser, deleteUser } from '../../redux/constants/ManageUserConst';
import './styles.scss';

const UserRow = ({ user, columns, editUser, page, rowsPerPage, setUserList }) => {
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [open, setOpen] = useState(false);
    const [columnNeedToEdit, setColumnNeedToEdit] = useState(null);

    const formatUserType = (type) => {
        if (type === "KhachHang")
            return "Customer";
        return "Admin";
    };

    const handleOpenDialog = () => {
        setIsDialogOpened(true);
    };

    const deleteUser = async (id) => {
        try {
            const resForDeletingUser = await axios({
                url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`,
                method: "DELETE",
                data: id,
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzMTJkc2FkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYwMTA5MTAxNSwiZXhwIjoxNjAxMDk0NjE1fQ.DC8MV5aqbg52857QpcMt9eZyIrHtsuMcx7c0PQC2HMw`
                }
            })
            try {
                const resForReloadingUserList = await axios({
                    url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page + 1}&soPhanTuTrenTrang=${rowsPerPage}`,
                    method: 'GET'
                })
                setUserList(resForReloadingUserList.data)
            } catch{
                console.log(-1)
            }
        } catch{
            console.log(0)
        }
    };

    const handleClick = (column) => {
        setOpen(!open);
        console.log(column);
        // setColumnNeedToEdit(column);
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
                {columns.map((column) => {
                    const value = user[column.id];
                    return (
                        <TableCell key={column.id} align={column.align} onClick={() => handleClick(column)}>
                            {column.id === "maLoaiNguoiDung" ? formatUserType(value) : value}
                        </TableCell>
                    );
                })}
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton aria-label="expand row" size="small" onClick={handleOpenDialog}>
                        <HighlightOffIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Edit User for {columnNeedToEdit}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                {/* <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead> */}
                                <TableBody>
                                    {columns.map((column) => {
                                        const value = user[column.id];
                                        return (
                                            <TableRow>
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <NotificationDialog
                isOpened={isDialogOpened}
                setIsOpened={setIsDialogOpened}
                text={"aa"}
                options={[
                    { text: "Delete User", onClick: () => deleteUser(user.taiKhoan) },
                    { text: "Cancel" },
                ]}
            />
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        editUser: (user) => {
            dispatch({
                type: editUser,
                user
            })
        },
        deleteUser: (userAccount) => {
            dispatch({
                type: deleteUser,
                userAccount
            })
        }
    };
};

export default connect(null, mapDispatchToProps)(UserRow);