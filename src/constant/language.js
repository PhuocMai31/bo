const VI = {
  getData: "Bạn đã nhận dữ liệu thành công",
  addData: "Thêm dữ liệu thành công",
  update: "Cập nhập dữ liệu thành công",
  validError: "Bạn gửi thiếu thông tin hoặc dữ liệu sai định dạng ",
  delete: "Bạn xóa dữ liệu thành công ",
  login_time_expired: "Phiên đăng nhập đã hết hạn",
  not_permission: "Có lỗi xảy ra  vui lòng thoát ra vào lại để ",
  error_system: "Lỗi Hệ thống Không thể đăng nhập",
  error_occurred_token: "Có lỗi xảy ra khi xác nhận kiểm tra quền ",
  owner_apartment: "Bạn đã sở hưu căn hộ này",
  error_account:
    "Thông tin tài khoản bị lỗi vui lòng thông báo với ban quản lý  ",
  error_not_found: "Không tìm thấy dữ liệu",
  token_not_found: "Token đã hêt hạn",
  mess_oke: "Oke",
  mess_not_oke: "Not oke",
  err_acc_format: "Số điện thoại hoặc email không đúng định dạng",
  err_acc_pass: "Tên tài khoản hoặc mật khẩu không chính xác ",
  login_success: "Dăng nhập thành công",
  token_expired: "Token has expired",
  success: "Thành công",
  spam: "Quá nhiều request ",
  user_not_register: "Số điện thoại hoặc email  chưa đăng ký",
  err_send_code: "Gửi mã xác nhận thất bại",
  err_time_exp_verify: "Mã xác nhận hết hạn",
  err_verify_data: "Xác thực mã OTP thất bại!",
  err_pass_length: "Mật khẩu không  được nhỏ 6 ký tự",
  maintain: "Hệ thống đang bảo trì",
  install_app:
    "Ứng dụng này đã có bản cập nhập , vui lòng  vào google play hoặc app store cài lại",
  change_pass_success: "Thay đổi mật khẩu thành công",
  err_pass_old: "Mật khẩu cũ không khớp",
  transaction_not_found: "Không tìm thấy lịch sử giao dịch",
  err_apartment: "Sai căn hộ",
  err_building_not_found: "Không tìm thấy tòa nhà",
  err_bank_not_found: "Không tìm thấy tài khoản ngân hàng",
  err_valid_date: "Không đúng định dạng ngày tháng",
  err_change_bill: "Hóa đơn có biến động thanh toán vui reload lại trang ",
  register_success: "Tham gia thành công",
  un_register_success: "Bỏ tham gia thành công",
  err_post_deleted: "Bài viết này đã bị xóa",
  err_not_provided_service: "Toà nhà của bạn không cung cấp dịch vụ này",
  err_not_have_service: "Bạn không có dịch vụ này",
  maintain_building: "Tòa Nhà đang bảo trì",
  user_not_found: "Không tìm thấy user",
  promotion_not_found: "Không tìm thấy khuyến mại nào",
  err_cmt_valid: "Số chứng minh thư sai định dạng",
  err_cmt_register: "Số chứng minh thư đã được đăng ký",
  err_phone_valid: "Số điện thoại sai định dạnh",
  err_email_valid: "Email sai sai định dạnh",
  err_phone_email_registered: "Số điện thoại hoặc email đã có người đăng ký ",
  err_gender_valid: "Giới tính không đúng định dạng",
  reset_pass_success: "Bạn đã  reset user thanh cong",
  err_not_found_vehicle: "Không tìm thấy phương tiện",
  err_file_format: "File sai định dạng",
  err_plate_used: "Biển số xe đã được sử dụng",
  err_version_not_sp:
    "Phiêm bản ứng dụng này không còn được hỗ trợ nữa vui lòng xóa và tải lại ứng dụng ",
  err_link: "Có lỗi xảy ra xin vui lòng thử lại sau",
  create_payment_transaction_success: "Tạo giao dịch thành công",
  function_maintain: "Chức năng này hiện đang bảo trì",
  err_type_payment: "Loại thanh toán này đã tồn tại",
  err_payment_ipn: "Giao dich that bai ",
  err_payment_ipn2: "Checksum fail ",
  err_promotion_date: "Thời gian khuyến mại chưa bắt đầu hoặc kết thúc",
  err_promotion_service: "Dịch vụ không tồn tại",
  err_promotion_apartment_u_exits:
    "Khuyến mại đã được áp dụng không thể cập nhập",
  err_imp_pay_not_found_transaction: "Giao dịch không tồn tại ",
  err_imp_pay_err: "Lỗi bạn vui lòng kiểm tra lại format  và thử lại ",
  err_imp_payed: "Mã hóa đơn này đã được thanh toán ",
  err_imp_pay_not_hav_build:
    "Tòa nhà của bạn không có tài khoản ngân hàng thanh toán",
  err_imp_pay_not_code_tran:
    "Tòa nhà của bạn không có tài khoản ngân hàng thanh toán",
  err_imp_pay_money_faile:
    "Số tiền bạn phải nhập đúng giá trị lớn hơn 0 và phải là số ",
  err_time_move_obj: "đã có người đăng ký thời  gian này ",
  err_pay_be_save: "giao dịch đã có trên hệ thống",
  BUILDING_NOT_FOUND_AUTO:
    "tòa nhà không tồn tại hoặc không sử dụng dịch vụ thanh toán tự động",
  apartment_not_found: "Không tìm thấy căn hộ",
  err_exit_vehicle_card: "mã thẻ xe đã được sử dụng",
  error_null: "giá trị không để rỗng",
};
const EN = {
  getData: "Get data success",
  validError: "You submitted missing information or malformed data ",
  owner_apartment: "You already own this apartment",
  addData: "Add data successfully",
  update: "Successful data update",
  error_account:
    "Your account information is incorrect, please notify the management",
  error_not_found: "Data not found",
  mess_oke: "Oke",
  mess_not_oke: "Not oke",
  err_acc_format: "Malformed phone number or email",
  err_acc_pass: "Incorrect username or password ",
  login_success: "Login success",
  token_expired: "Token has expired",
  success: "Success",
  spam: "To many request",
  user_not_register: "Unregistered phone number or email",
  err_send_code: "Send verification code failed",
  err_verify_data: "OTP verification failed!",
  err_pass_length: "Password cannot be less than 6 characters",
  maintain: "The system is maintenance",
  install_app:
    "This app has been updated, please go to google play or app store to reinstall it",
  change_pass_success: "Password changed successfully",
  err_pass_old: "Old password not match",
  register_success: "Join successfully",
  un_register_success: "Unsubscribed successfully",
  err_post_deleted: "This post has been deleted",
  maintain_building: "Building is under maintenance",
  user_not_found: "User not found",
  err_not_found_vehicle: "Vehicle not found",
  err_file_format: "Invalid file format",
  err_plate_used: "Already used license plate",
  err_version_not_sp:
    "This version of the app is no lon ger supported please delete and re-download the app",
  err_type_payment: "This payment type already exists",
  err_link: "An error occurred, please try again later",
  err_not_have_service: "You don’t have this service",
  not_permission: "Has an error, please exit to back to",
  err_time_move_obj: "already subscribed this time",
  err_exit_vehicle_card: "vehicles already in use",
  error_null: "value is not empty",
  token_not_found: "Expired token",

};

export const LANGUAGE = {
  VI,
  EN,
};

export class MESS {
  error_null;
  getData;
  addData;
  update;
  validError;
  delete;
  login_time_expired;
  not_permission;
  error_system;
  error_occurred_token;
  owner_apartment;
  error_account;
  error_not_found;
  mess_oke;
  mess_not_oke;
  err_acc_format;
  err_acc_pass;
  login_success;
  token_expired;
  success;
  spam;
  user_not_register;
  err_send_code;
  err_time_exp_verify;
  err_verify_data;
  err_pass_length;
  maintain;
  install_app;
  change_pass_success;
  err_pass_old;
  transaction_not_found;
  err_apartment;
  err_building_not_found;
  err_bank_not_found;
  err_valid_date;
  err_change_bill;
  register_success;
  un_register_success;
  err_post_deleted;
  err_not_provided_service;
  err_not_have_service;
  maintain_building;
  user_not_found;
  promotion_not_found;
  err_cmt_valid;
  err_cmt_register;
  err_phone_valid;
  err_email_valid;
  err_phone_email_registered;
  err_gender_valid;
  reset_pass_success;
  err_not_found_vehicle;
  err_file_format;
  err_plate_used;
  err_version_not_sp;
  err_link;
  create_payment_transaction_success;
  function_maintain;
  err_type_payment;
  err_payment_ipn;
  err_payment_ipn2;
  err_promotion_date;
  err_promotion_service;
  err_promotion_apartment_u_exits;
  err_imp_pay_not_found_transaction;
  err_imp_pay_err;
  err_imp_payed;
  err_imp_pay_not_hav_build;
  err_imp_pay_not_code_tran;
  err_imp_pay_money_faile;
  err_time_move_obj;
  err_pay_be_save;
  BUILDING_NOT_FOUND_AUTO;
  apartment_not_found;
  constructor(language) {
    for (const key of Object.keys(LANGUAGE[language])) {
      this[key] = LANGUAGE[language][key];
    }
  }
}
