import axios from 'axios';
import NotificationDialog from '../../components/NotificationDialog';

import { getUserList, addUser, deleteUser, editUser, findUserByName } from '../constants/ManageUserConst';

const initialState = {
    userList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case deleteUser: {
            console.log(action.userAccount)
            axios({
                url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${action.userAccount}`,
                method: "DELETE",
                data: action.userAccount,
                header: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzNDU2IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUXVhblRyaSIsIm5iZiI6MTYwMDU3MTgyNiwiZXhwIjoxNjAwNTc1NDI2fQ.Zc5kVuJi8e6-GS67G5UUhWHnDEJuDsnvWU9wko20yy4`
                }
            })
                .then(res => { console.log('succ') })
                .catch(err => { console.log(err) })
            return state;
        }

        case editUser: {
            console.log(action.user)
            return state;
        }

        default:
            return state;
    };
};