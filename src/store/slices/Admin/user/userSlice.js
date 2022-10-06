import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import notificationSlice from "../../notifications/notificationSlice";
const baseURL = process.env.REACT_APP_API;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    profile: {},
    user: {},
    idRole: null,
    notification: {},
    page: 0,
    error: [],
    statusForgotPassword: false,
    totalPages: 0,
    totalItems: 0,
    onSearch: false
  },
  reducers: {
    updateStatusForgotPassword: (state, action) => {
      state.statusForgotPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload.data.contents;
      state.totalPages = payload.data.totalPages;
      state.totalItems = payload.data.totalItems;
      state.onSearch = false;
    });
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getProfileByIdUser.fulfilled, (state, { payload }) => {
      state.profile = payload;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.profile = payload;
      toast.success("Chỉnh sửa thành công", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      if (payload.httpCode === 200) {
        state.statusForgotPassword = true;
        toast.success(
          "Mật khẩu đã được tạo mới, vui lòng kiểm tra lại email !"
        );
      } else {
        state.statusForgotPassword = false;
        toast.error("Không tìm thấy địa chỉ email !");
      }
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      if (action.payload.httpCode === 400) {
        state.statusForgotPassword = "fail";
        toast.error("Mật khẩu cũ không đúng!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else if (action.payload.httpCode === 500) {
        state.statusForgotPassword = "fail";
        toast.error("Đổi mật khẩu không thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        state.statusForgotPassword = "success";
        toast.success("Đổi mật khẩu thành công!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    });
    builder.addCase(searchUser.fulfilled, (state, { payload }) => {
      state.userList = payload.data.contents;
      state.totalPages = payload.data.totalPages;
      state.totalItems = payload.data.totalItems;
      state.onSearch = true;
    });
  },
});

export const getUserList = createAsyncThunk("user/getUserList", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[2],
    },
  };
  return await axios
    .get(`${baseURL}/api/r2s/admin/user?no=${args[0] - 1}&limit=${args[1]}`, header)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
});

// function use for get basic information match to each role through idUser
/**
 * args[0] : id of user
 * args[1] : token
 */
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (args) => {

    const header = {
      headers: {
        Authorization: "Bearer " + args[1],
      },
    };
    return await axios
      .get(`${baseURL}/api/r2s/admin/user/get-id/${args[0]}`, header)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

// function use for get all of information match to each role through idUser
/**
 * args[0] : id of user
 * args[1] : token
 */
export const getProfileByIdUser = createAsyncThunk(
  "user/getProfileByIdUser",
  async (args) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args[1],
      },
    };

    switch (JSON.parse(sessionStorage.getItem("userPresent")).role) {
      case "Role_HR":
        return await axios
          .get(`${baseURL}/api/r2s/hr/user/${args[0]}`, header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Partner":
        return await axios
          .get(`${baseURL}/api/r2s/partner/user/${args[0]}`, header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Candidate":
        return await axios
          .get(`${baseURL}/api/r2s/candidate/user/${args[0]}`, header)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      default:
        return null;
    }
  }
);

// function use for update profile of user
/**
 * args[0] : id match to the each role
 * args[1] : token
 * args[2] : data
 */
export const updateUser = createAsyncThunk("user/updateUser", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[1],
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios
    .put(`${baseURL}/api/r2s/hr/${args[0]}`, args[2], header)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

// function use for feature forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (emailUser) => {
    return await axios
      .get(`${baseURL}/api/user/forgotPassword/${emailUser}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (args, thunkAPI) => {

    const header = {
      headers: {
        Authorization: "Bearer " + args[1],
        "Content-Type": "multipart/form-data",
      },
    };
    return axios
      .delete(`${baseURL}/api/r2s/admin/user/${args[0]}`, header)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess(
            "Đã disabled người dùng thành công"
          )
        )
      })
      .catch((error) => {
        return error
      });
  }
);

export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (args, thunkAPI) => {
    const header = {
      headers: {
        Authorization: "Bearer " + args[1],
        "Content-Type": "multipart/form-data",
      },
    };
    return axios
      .get(`${baseURL}/api/r2s/admin/user/re/${args[0]}`, header)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess(
            "Đã verified người dùng thành công"
          )
        );
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data) => {
    const { token, dataChangePassword } = data;
    return axios
      .put(`${baseURL}/api/user/changePassword`, dataChangePassword, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const createUser = createAsyncThunk("user/createUser", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[1],
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios
    .post(`${baseURL}/api/r2s/admin/user/add`, args[0], header)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
})

export const adminUpdateUser = createAsyncThunk("user/adminUpdateUser", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[1],
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios
    .put(`${baseURL}/api/r2s/admin/user/edit`, args[0], header)
    .then((res) => {
      console.log("res", res)
      return res;
    })
    .catch((err) => {
      console.log("errrrrr", err)
      return err.response.data;
    });
  return res;
})

export const searchUser = createAsyncThunk("user/searchUser", async (args) => {
  const header = {
    headers: {
      Authorization: "Bearer " + args[3],
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios
    .get(`${baseURL}/api/user/search/${args[0]}?no=${args[1] - 1}&limit=${args[2]}`, header)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
})


export const { updateStatusForgotPassword } = userSlice.actions;
export default userSlice;
