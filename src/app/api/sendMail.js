import axios from "axios";
import {code} from './index'
class SendMail {
    static sendOtp(email, otp, ten_khach_hang) {
        const url = "https://authv2.dxmb.vn/api/v2/notification/sendMail";
        const message = JSON.stringify({otp, ten_khach_hang});

        return axios.post(url, {
            code,
            message,
            email,
        });
    }
}
export  default      SendMail
