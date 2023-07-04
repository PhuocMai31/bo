import { REGEX } from "./regex";
import {
  validEmail,
  validImg,
  validJsonArr,
  validPhoneNumber,
  validVideo,
} from "../lib/util/validate";
import { TYPE_VALID } from "./main";
import { excelDateToJSDate } from "@util";

const NAME_V = {
  desc: { VI: "Nội dung", EN: "Description" },
  start_date: { VI: "Ngày bắt đầu", EN: "start day" },
  end_date: { VI: "Ngày kết thúc", EN: "end day" },
  priority_task: { VI: "Độ ưu tên", EN: "priority level" },
  title_task: { VI: "Tên công việc ", EN: "Job name" },
  title: { VI: "Tiêu đề  ", EN: "title" },
  apartment: { VI: "Căn hộ", EN: "Apartment" },
  building: { VI: "Tòa nhà", EN: "Building" },
  type_request: { VI: "Loại yêu cầu", EN: "Type of request" },
  transfer_time: { VI: "Thời gian chuyển đồ", EN: "Transfer Time" },
  request_code: { VI: "Mã yêu cầu", EN: "Request code" },
  moving_day: { VI: "Ngày chuyển đồ", EN: "Moving Day" },
  id: { VI: "mã id", EN: "code id" },
  name_task_category: { VI: "tên danh mục", EN: "category name" },
  status: { VI: "Trạng thái", EN: "Status" },
  files: { VI: "Tệp", EN: "File" },
  assigned_task: { VI: "Người đươc giao việc", EN: "Job assignee" },
  checklist_id_task: { VI: "Mã mẫu giao việc", EN: "assignment sample code" },
  category_task_id_task: {
    VI: "Loại giao việc",
    EN: "Type assign job",
  },
  department_id_task: { VI: "Mã phòng ban", EN: "Department code" },
  assigned_monitor_task: { VI: "Người giám sát", EN: "Supervisor" },
};

export const LIST_VALID = [
  {
    key: "apartment_id",
    format: "number",
    name: NAME_V.apartment,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "building_id",
    format: "number",
    name: NAME_V.building,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "type_arr",
    format: "string",
    name: NAME_V.type_request,
    func: validJsonArr,
    type: TYPE_VALID.FUNC,
  },
  {
    key: "times",
    format: "string",
    name: NAME_V.transfer_time,
    func: validJsonArr,
    type: TYPE_VALID.FUNC,
  },
  {
    key: "id_request",
    format: "string",
    name: NAME_V.request_code,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "id",
    format: "Number",
    name: NAME_V.id,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "name_task_category",
    format: "String",
    name: NAME_V.name_task_category,
    type: TYPE_VALID.NUMBER_STRING,
    max: 500,
    min: 6,
  },
  {
    key: "title_task",
    format: "String",
    name: NAME_V.title_task,
    type: TYPE_VALID.NUMBER_STRING,
    max: 500,
    min: 6,
  },
  {
    key: "title",
    format: "String",
    name: NAME_V.title,
    type: TYPE_VALID.NUMBER_STRING,
    max: 500,
    min: 6,
  },
  {
    key: "title_task_form_list",
    format: "String",
    name: { VI: "Tên biểu mẫu ", EN: "Form" },
    type: TYPE_VALID.NUMBER_STRING,
    max: 500,
    min: 1,
  },
  {
    key: "id_task_form_list",
    format: "Number",
    name: { VI: "Mã biểu mẫu ", EN: " Id form" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "priority_task",
    format: "Number",
    name: NAME_V.priority_task,
    type: TYPE_VALID.NUMBER_STRING,
    max: 4,
    min: 1,
  },
  {
    key: "desc",
    format: "string",
    name: NAME_V.desc,
    type: TYPE_VALID.FORMAT,
  },
  // ???
  {
    key: "status_task",
    format: "String",
    name: NAME_V.status,
    type: TYPE_VALID.NUMBER_STRING,
    max: 6,
    min: 0,
  },
  {
    key: "attach_file_task",
    format: "String",
    name: NAME_V.files,
    type: TYPE_VALID.FUNC,
    func: validJsonArr,
  },
  {
    key: "file",
    format: "String",
    name: NAME_V.files,
    type: TYPE_VALID.FUNC,
    func: validJsonArr,
  },
  {
    key: "email",
    format: "String",
    type: TYPE_VALID.FUNC,
    func: validEmail,
  },
  {
    key: "phone",
    format: "String",
    type: TYPE_VALID.FUNC,
    func: validPhoneNumber,
  },
  {
    key: "code",
    format: "String",
    type: TYPE_VALID.REGEX,
    func: REGEX.C_CODE,
  },
  {
    key: "assigned_task",
    format: "string",
    name: NAME_V.assigned_task,
    type: TYPE_VALID.FUNC,
    func: validJsonArr,
  },
  {
    key: "checklist_id_task",
    format: "String",
    name: NAME_V.checklist_id_task,
    type: TYPE_VALID.FUNC,
    func: validJsonArr,
  },
  {
    key: "category_task_id_task",
    format: "String",
    name: NAME_V.category_task_id_task,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "department_id_task",
    format: "String",
    name: NAME_V.department_id_task,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "assigned_monitor_task",
    format: "String",
    name: NAME_V.assigned_monitor_task,
    type: TYPE_VALID.FUNC,
    func: validJsonArr,
  },

  {
    key: "start_date",
    format: "String",
    name: NAME_V.start_date,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_BIRTHDAY,
  },
  {
    key: "end_date",
    format: "String",
    name: NAME_V.end_date,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_BIRTHDAY,
  },
  {
    key: "maintain_time",
    format: "String",
    name: NAME_V.end_date,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_DATE_TIME,
  },
  {
    key: "task_id",
    format: "Number",
    name: { VI: "Mã công việc", EN: "JOB code" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "parent_id",
    format: "Number",
    name: { VI: "Mã bình luận parent_id", EN: "Comment code parent_id" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "page",
    format: "Number",
    name: { VI: "Trang", EN: "Page" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "limit",
    format: "Number",
    name: { VI: "Số dòng", EN: "Limit" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "video",
    format: "String",
    name: NAME_V.files,
    type: TYPE_VALID.FUNC,
    func: validVideo,
  },
  {
    key: "image",
    format: "String",
    name: NAME_V.files,
    type: TYPE_VALID.FUNC,
    func: validImg,
  },
  {
    key: "image_required",
    format: "Number",
    name: { VI: "Kiểm tra ảnh", EN: "Check images" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "sort",
    format: "Number",
    name: { VI: "Sắp xếp", EN: "Sort" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "video_required",
    format: "Number",
    name: { VI: "Kiểm tra videos", EN: "Check videos" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "status",
    format: "Number",
    name: { VI: "Trạng thái", EN: "Status" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "status",
    format: "Number",
    name: { VI: "Trạng thái", EN: "Status" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "asset_category_id",
    format: "Number",
    name: { VI: "mã loại tài sản", EN: "asset category code" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "asset_category_id",
    format: "Number",
    name: { VI: "mã loại tài sản", EN: "asset category code" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "type_maintain",
    format: "Number",
    name: { VI: "loại thời gian bảo trì", EN: "maintenance type" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "asset_detail_name",
    format: "string",
    name: { VI: "tên tài sản", EN: "asset detail name" },
    type: TYPE_VALID.NOT_NULL,
  },
  {
    key: "maintain_time",
    format: "string",
    name: { VI: "khoảng thoài gian bảo trì", EN: "maintenance interval" },
    type: TYPE_VALID.NOT_NULL,
  },
  {
    key: "asset_last_time_maintain",
    format: "string",
    name: { VI: "thời gian lần cuối bảo trì", EN: "last time maintain" },
    type: TYPE_VALID.FUNC,
    func: excelDateToJSDate,
  },
  {
    key: "asset_amount",
    format: "number",
    name: { VI: "số lượng tài sản ", EN: "asset amount" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "floor_id",
    format: "number",
    name: { VI: "mã tầng ", EN: "floor code" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "asset_department_id",
    format: "number",
    name: { VI: "mã phòng ban ", EN: "department code" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "status",
    format: "number",
    name: NAME_V.status,
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
  {
    key: "asset_detail_id",
    format: "number",
    name: { VI: "mã tài sản", EN: "asset code" },
    type: TYPE_VALID.REGEX,
    regex: REGEX.C_NUMBER,
  },
];

/**
 *
 * @param name
 * @param la
 * @param mess
 * @return {*|string}
 */
export const getConfigVal = (name, la, mess = false) => {
  if(mess) return  mess
  return (
      ((NAME_V[name] && NAME_V[name][la]) || name) +
      (mess || la === "VI"
          ? " không đúng định dạng"
          : " is not in the correct format")
  );
};
