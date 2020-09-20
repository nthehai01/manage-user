import React, { useState } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NotificationDialog from '../NotificationDialog';

import { editUser, deleteUser } from '../../redux/constants/ManageUserConst';

const UserRow = ({ user, columns, editUser, deleteUser }) => {
    const [isDialogOpened, setIsDialogOpened] = useState(false);

    const formatUserType = (type) => {
        if (type === "KhachHang")
            return "Customer";
        return "Admin";
    };

    const handleOpenDialog = () => {
        setIsDialogOpened(true);
    };

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