import * as yup from "yup";

export const genderList = [
  {
    id: 0,
    name: "Nam",
  },
  {
    id: 1,
    name: "Nữ",
  },
  {
    id: 2,
    name: "Khác",
  },
];

const uni = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

const IMAGE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/bmp",
];

const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im;

export const schema = yup.object({
  avatar: yup
    .mixed()
    .test(
      "type",
      "* Chỉ hỗ trợ định dạng: jpeg, jpg, png, gif, bmp",
      (value) => {
        if (value?.type) {
          return IMAGE_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      }
    )
    .test("fileSize", "*Kích thước tối đa là 512Kb.", (value) => {
      if (value?.size) {
        return value?.size <= 512 * 1024;
      } else {
        return true;
      }
    }),
  lastName: yup
    .string()
    .required("* Bạn phải nhập họ.")
    .min(2, "* Tối thiểu 2 kí tự.")

    .max(32, "* Tối đa 32 kí tự."),
  firstName: yup
    .string()
    .required("* Bạn phải nhập tên.")
    .min(2, "* Tối thiểu 2 kí tự.")
    .max(32, "* Tối đa 32 kí tự."),
  phone: yup
    .string()
    .required("* Bạn phải nhập số điện thoại.")
    .min(10, "* Tối thiểu 8 kí tự.")
    .max(13, "* Tối đa 13 kí tự.")
    .matches(PHONE_REGEX, "* Bạn đã nhập số điện thoại không đúng."),
  gender: yup.string().required("* Bạn phải chọn giới tính."),
});
