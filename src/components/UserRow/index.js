import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NotificationDialog from '../NotificationDialog';

import { editUser, deleteUser } from '../../redux/constants/ManageUserConst';

const UserRow = ({ user, columns, editUser, page, rowsPerPage, setUserList }) => {
    const [isDialogOpened, setIsDialogOpened] = useState(false);

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
            const res = await axios({
                url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`,
                method: "DELETE",
                data: id,
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzMTJkc2FkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYwMTA5MTAxNSwiZXhwIjoxNjAxMDk0NjE1fQ.DC8MV5aqbg52857QpcMt9eZyIrHtsuMcx7c0PQC2HMw`
                }
            })
            try {
                const haha = await axios({
                    url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${page + 1}&soPhanTuTrenTrang=${rowsPerPage}`,
                    method: 'GET'
                })
                setUserList(haha.data)
            } catch{
                console.log(-1)
            }
        } catch{
            console.log(0)
        }
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
                {columns.map((column) => {
                    if (column.id === "option")
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <button onClick={() => editUser(user)}>
                                    Edit
                                </button>
                                <button onClick={handleOpenDialog}>Delete</button>
                            </TableCell>
                        )
                    const value = user[column.id];
                    return (
                        <TableCell key={column.id} align={column.align}>
                            {column.id === "maLoaiNguoiDung" ? formatUserType(value) : value}
                        </TableCell>
                    );
                })}
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