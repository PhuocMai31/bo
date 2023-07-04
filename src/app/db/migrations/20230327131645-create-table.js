"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // await queryInterface.createTable("bo_v2_user", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     email: {type: "varchar(100)"},
        //     pword: {type: "varchar(254)"},
        //     status: {type: "tinyint(1)"},
        //     phone: {type: "varchar(15)"},
        //     username: {type: "varchar(254)"},
        //     calling_code: {type: "varchar(5)"},
        //     phone_status: {type: "tinyint(1)"},
        //     email_status: {type: "tinyint(1)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     update_at: {type: "DATETIME"},
        //     code_staff: {type: "int(11)"}
        // });
        // await queryInterface.createTable("bo_v2_user_token", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     client_id: {type: "varchar(150)"},
        //     bundle_id: {type: "varchar(100)"},
        //     user_id: {type: "int(11)"},
        //     token: {type: "varchar(254)", unique: true},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     update_at: {type: "DATETIME"},
        //     time_expired: {type: "int(11)"},
        //     last_login: {type: "DATETIME"},
        //     device_name: {type: "varchar(254)"},
        //     location: {type: "varchar(100)"},
        // });
        // await queryInterface.createTable("bo_v2_user_info", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     user_id: {type: "int(11)"},
        //     full_name: {type: "varchar(100)"},
        //     address: {type: "varchar(254)"},
        //     cmt_number: {type: "varchar(50)"},
        //     cmt_date: {type: "DATETIME"},
        //     cmt_address: {type: "varchar(254)"},
        //     cmt_province: {type: "varchar(100)"},
        //     cmt_image: {type: "varchar(254)"},
        //     avatar: {type: "varchar(254)"},
        //     birthday: {type: "DATETIME"},
        //     gender: {type: "tinyint(1)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     update_at: {type: "DATETIME"},
        //     cmt_status: {type: "tinyint(1)"},
        //     phone_contact: {type: "varchar(15)"},
        //     email_contact: {type: "varchar(100)"},
        // });
        // await queryInterface.createTable("bo_v2_company", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "varchar(255)"},
        //     desc: {type: "varchar(255)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        //
        // await queryInterface.createTable("bo_v2_exchange", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "varchar(255)"},
        //     desc: {type: "varchar(255)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        // await queryInterface.createTable("bo_v2_group_sale", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "varchar(255)"},
        //     desc: {type: "varchar(255)"},
        //     company_id: {type: "int(11)"},
        //     exchange_id: {type: "int(11)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        // await queryInterface.createTable("bo_v2_group_member", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     group_sale_id: {type: "int(11)"},
        //     user_id: {type: "int(11)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        //
        // await queryInterface.createTable("bo_v2_permission_group", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "varchar(255)"},
        //     desc: {type: "varchar(255)"},
        //     status: {type: "tinyint(1)"},
        //     is_master: {type: "tinyint(1)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        // await queryInterface.createTable("bo_v  2_permission_group_member", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     user_id: {type: "int(11)"},
        //     group_id: {type: "int(11)"},
        //     status: {type: "tinyint(1)"},
        //     company_id: {type: "int(11)"},
        //     exchange_id: {type: "int(11)"},
        //     staff_object_id: {type: "int(11)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        //
        // await queryInterface.createTable("bo_v2_permission_group_permission", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     tool_id: {type: "int(11)"},
        //     permission: {type: "nvarchar(255)"},
        //     staff_object_id: {type: "int(11)"},
        //     group_id: {type: "int(11)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        // await queryInterface.createTable("bo_v2_permission_tool_category", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "varchar(255)"},
        //     sort: {type: "int(11)"},
        //     status: {type: "tinyint(1)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        //
        // await queryInterface.createTable("bo_v2_work_group", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "varchar(255)"},
        //     desc: {type: "varchar(255)"},
        //     status: {type: "tinyint(1)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        //
        // await queryInterface.createTable("bo_v2_work_group_permission", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     id_work_group: {type: "int(11)"},
        //     user_id: {type: "int(11)"},
        //     status: {type: "tinyint(1)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        // await queryInterface.createTable("bo_v2_work_group_member", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     id_work_group: {type: "int(11)"},
        //     key_action: {type: "varchar(255)"},
        //     key_step: {type: "varchar(255)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        // await queryInterface.createTable("bo_v2_work_project_member", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     id_project: {type: "int(11)"},
        //     user_id: {type: "int(11)"},
        //     id_work_group_member: {type: "int(11)"},
        //     id_work_group: {type: "int(11)"},
        //     created_at: {type: "DATETIME"},
        //     deleted_at: {type: "DATETIME"},
        //     updated_at: {type: "DATETIME"},
        // })
        // await queryInterface.createTable("bo_v2_customer", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     category_id: {type: "int(11)"},
        //     user_id_sale: {type: "int(11)"},
        //     city_id: {type: "int(11)"},
        //     district_id: {type: "int(11)"},
        //     ward_id: {type: "int(11)"},
        //     cb_city_id: {type: "int(11)"},
        //     cb_district_id: {type: "int(11)"},
        //     cb_ward_id: {type: "int(11)"},
        //     country: {type: "varchar(100)"},
        //     code_area: {type: "varchar(4)"},
        //     birthday: {type: "datetime"},
        //     sex: {type: "tinyint(1)"},
        //     customer_code: {type: "nvarchar(20)"},
        //     cmt_full_name: {type: "nvarchar(255)"},
        //     full_name: {type: "nvarchar(255)"},
        //     phone: {type: "nvarchar(12)"},
        //     email: {type: "nvarchar(255)"},
        //     note: {type: "nvarchar(255)"},
        //     create_date: {type: "datetime"},
        //     create_by: {type: "int(11)"},
        //     address: {type: "nvarchar(255)"},
        //     cb_address: {type: "nvarchar(255)"},
        //     stage: {type: "tinyint(1)"},
        //     create_type: {type: "tinyint(1)"},
        //     cmt: {type: "nvarchar(50)"},
        //     source_id: {type: "int(11)"},
        //     group_customer_id: {type: "int(11)"},
        //     created_at: {type: "datetime"},
        //     deleted_at: {type: "datetime"},
        //     updated_at: {type: "datetime"},
        // })
        // await queryInterface.createTable("bo_v2_campaign", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "nvarchar(255)"},
        //     user_sale_ids: {type: "nvarchar(255)"},
        //     category_id: {type: "int(11)"},
        //     rule_time: {type: "int(11)"},
        //     penalty: {type: "int(4)"},
        //     status: {type: "tinyint(1)"},
        //     source_id: {type: "int(11)"},
        //     update_by: {type: "int(11)"},
        //     delete_by: {type: "int(11)"},
        //     create_by: {type: "int(11)"},
        //     created_at: {type: "datetime"},
        //     deleted_at: {type: "datetime"},
        //     updated_at: {type: "datetime"},
        // })
        //
        //
        // await queryInterface.createTable("bo_v2_source", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "nvarchar(255)"},
        //     status: {type: "tinyint(1)"},
        //     created_at: {type: "datetime"},
        //     deleted_at: {type: "datetime"},
        //     updated_at: {type: "datetime"},
        // })
        // await queryInterface.createTable("bo_v2_group_customer", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "nvarchar(255)"},
        //     status: {type: "tinyint(1)"},
        //     created_at: {type: "datetime"},
        //     deleted_at: {type: "datetime"},
        //     updated_at: {type: "datetime"},
        // })
        // await queryInterface.createTable("bo_v2_sale_customer_campaign_history", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     action: {type: "int(11)"},
        //     data: {type: "text"},
        //     campaign_id: {type: "int(11)"},
        //     user_id_sale: {type: "varchar(50)"},
        //     created_at: {type: "datetime"},
        //     deleted_at: {type: "datetime"},
        //     updated_at: {type: "datetime"},
        //     interactive_status: {type: "tinyint(1)"},
        //     note: {type: "text"},
        // })
        // await queryInterface.createTable("bo_v2_sale_violation", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     user_id_sale: {type: "int(11)"},
        //     status: {type: "tinyint(1)"},
        //     campaign_id: {type: "int(11)"},
        //     reason: {type: "varchar(255)"},
        //     created_at: {type: "datetime"},
        //     deleted_at: {type: "datetime"},
        //     updated_at: {type: "datetime"},
        //
        // })
        //

        // await queryInterface.createTable("bo_v2_permission_tool", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     name: {type: "nvarchar(255)"},
        //     route: {type: "nvarchar(50)"},
        //     created_at: {type: "datetime"},
        //     deleted_at: {type: "datetime"},
        //     updated_at: {type: "datetime"},
        //     category_id: {type: "int(11)"},
        //     sort: {type: "int(4)"},
        //     actions: {type: "text"},
        // })
        // await  queryInterface.createTable("bo_v2_log_campaign.js", {
        //     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
        //     violation_id : {type : "int(11)"},
        //     campaign_id : {type : "int(11)"},
        //     round_number : {type : "int(5)"},
        //     customer_id : {type : "int(11)"},
        //     user_id_sale : {type : "int(11)"},
        //     created_at : {type : "datetime"},
        //     deleted_at : {type : "datetime"},
        //     updated_at : {type : "datetime"},
        // })

        // await  queryInterface.createTable("firebase_service_account", {
        //     id: { type: "int(11)", primaryKey: true, autoIncrement: true },
        //     client_email: { type: "varchar(255)" },
        //     code: { type: "varchar(100)" },
        //     private_key: { type: "text" },
        //     project_id: { type: "varchar(255)" },
        //     updated_at: { type: "datetime" },
        //     created_at: { type: "datetime" },
        //     deleted_at: { type: "datetime" },
        // })
        //
        //
        // await  queryInterface.createTable("firebase_token_push", {
        //     id: { type: "int(11)", primaryKey: true, autoIncrement: true },
        //     user_id: { type: "int(11)" },
        //     token: { type: "varchar(500)" },
        //     client_id: { type: "varchar(200)" },
        //     type_device: { type: "tinyint(1)" },
        //     bundle_id: { type: "varchar(50)" },
        //     updated_at: { type: "datetime" },
        //     created_at: { type: "datetime" },
        //     deleted_at: { type: "datetime" },
        // })
        await queryInterface.createTable("bo_v2_sale_policy", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            title: {type: "nvarchar(255)"},
            code: {type: "nvarchar(50)"},
            building_id: {type: "int", defaultValue: 0},
            category_id: {type: "int", defaultValue: 0},
            create_date: {type: "datetime"},
            create_by: {type: "int"},
            status: {type: "tinyint"},
            from_date: {type: "datetime"},
            to_date: {type: "datetime"},
            updated_at: {type: "datetime"},
            created_at: {type: "datetime"},
            deleted_at: {type: "datetime"},
        })
        await queryInterface.createTable("bo_v2_payment_progress", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            code: {type: "nvarchar(50)"},
            sale_policy_id : {type: "int"},
            title : {type: "nvarchar(255)"},
            type_bonus: {type: "tinyint"},
            bonus :  {type: "bigint"},
            updated_at: {type: "datetime"},
            created_at: {type: "datetime"},
            deleted_at: {type: "datetime"},

        })
        await queryInterface.createTable("bo_v2_payment_progress_detail", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            payment_progress_id: {type: "int" ,defaultValue : 0},
            sale_policy_id : {type: "int" ,defaultValue : 0},
            expired_time_paid  : {type: "int"},
            desc   : {type: "text"},
            type_payment : {type: "tinyint"},
            total  : {type: "bigint"},
            type :{type: "tinyint"},
            title: {type: "nvarchar(255)"},
            note : {type : "text"},
            from_type : {type: "tinyint"},
            updated_at: {type: "datetime"},
            created_at: {type: "datetime"},
            deleted_at: {type: "datetime"},
        })
        // ------------------------------------------------------------------------

        await queryInterface.createTable("bo_v2_cart", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            code: {type: "nvarchar(50)"},
            name: {type: "nvarchar(255)"},
            desc: {type: "text"},
            category_id: {type: "int"},
            time_hold: {type: "int"},
            company_id: {type: "int"},
            status: {type: "tinyint"},
            image: {type:"text"},
            created_at: {type: "datetime"},
            deleted_at: {type: "datetime"},
            updated_at: {type: "datetime"},
        })
        await queryInterface.createTable("bo_v2_cart_member", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            cart_id : {type :"int"},
            user_id : {type :"int"},
            created_at : {type :"datetime"},
            deleted_at : {type :"datetime"},
            updated_at : {type :"datetime"},
        })
        await queryInterface.createTable("bo_v2_cart_history", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            cart_id : {type : "int"},
            product_id : {type : "int"},
            action : {type : "nvarchar(40)"},
            created_at : {type : "datetime"},
            deleted_at : {type : "datetime"},
            updated_at : {type : "datetime"},
        })
        await queryInterface.createTable("bo_v2_required", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            status: {type: "int"},
            title: {type: "nvarchar(255)"},
            user_sale_id: {type: "int"},
            building_id: {type: "int"},
            product_id: {type: "int"},
            deleted_at: {type: "datetime"},
            updated_at: {type: "datetime"},
            created_at: {type: "datetime"},
            category_id: {type: "int"},
            bug_log_time: {type: "datetime"},
            bill_id: {type: "int"},
            type: {type: "tinyint(1)"},
            data: {type: "text"},
        })
        await queryInterface.createTable("bo_v2_payment_history", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            bill_id: {type: "int"},
            total: {type: "bigint"},
            type_payment: {type: "tinyint(1)"},
            image: {type: "nvarchar(255)"},
            deleted_at: {type: "datetime"},
            updated_at: {type: "datetime"},
            created_at: {type: "datetime"},
        })
        await queryInterface.createTable("bo_v2_bill",  {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            parent_id : {type : "int" ,defaultValue : 0},
            status : {type : "tinyint(1)" , defaultValue:  1},
            title : {type : "nvarchar(255)"},
            code : {type : "nvarchar(50)"},
            user_sale_id : {type : "int"},
            note : {type : "text"},
            type : {type : "tinyint"},
            deleted_at : {type : "datetime"},
            updated_at : {type : "datetime"},
            created_at : {type : "datetime"},
            customer_id : {type : "int"},
            product_id : {type : "int"},
            campaign_sale_id : {type : "int"},
            category_id : {type : "int"},
            building_id : {type : "int"},
            file : {type : "nvarchar(255)"},
            opt : {type : "nvarchar(20)"},
            wish : {type : "nvarchar(255)"},
            info_customer : {type : "longtext"}
        })
        await queryInterface.createTable("bo_v2_campaign_sale",  {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            title : {type : "varchar(255)"},
            max : {type : "int" , defaultValue : 1},
            time_start : {type : "datetime"},
            time_end : {type : "datetime"},
            category_id : {type : "int"},
            total : {type : "bigint"},
            company_id : {type : "int"},
            building_id : {type : "int" , defaultValue : 0},
            deleted_at : {type : "datetime"},
            updated_at : {type : "datetime"},
            created_at : {type : "datetime"},
            desc : {type : "text"},
            status : {type : "tinyint(1)" ,defaultValue : 1},
        })
        await  queryInterface.createTable("bo_v2_payment_info", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            bank_number :{type :"varchar(100)"},
            account_holder :{type :"varchar(255)"},
            short_name :{type :"varchar(50)"},
            bin :{type :"varchar(50)"},
            bank_name :{type :"varchar(255)"},
            status : { type : "tinyint"  ,defaultValue : 1},
            type_payment : { type : "nvarchar(10)"  },
            deleted_at :{type :"datetime"},
            updated_at :{type :"datetime"},
            created_at :{type :"datetime"},
        })
        await  queryInterface.createTable("bo_v2_investor", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            code : {type : "varchar(50)"},
            name : {type : "varchar(255)"},
            status : {type : "tinyint" , defaultValue : 1},
            created_at : {type : "datetime"},
            updated_at : {type : "datetime"},
            deleted_at : {type : "datetime"},
        })

        await queryInterface.createTable("bo_v2_template", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            type: {type: "tinyint"},
            type_product: {type: "tinyint"},
            code: {type: "nvarchar(50)"},
            title: {type: "nvarchar(255)"},
            category_id: {type: "int"},
            stage: {type: "tinyint"},
            type_pattern: {type: "tinyint"},
            status: {type: "tinyint"},
            created_at: {type: "datetime"},
            updated_at: {type: "datetime"},
            deleted_at: {type: "datetime"},
            data : {type : "longtext"},
            email_term: {type : "longtext"}
        })
        await queryInterface.createTable("bo_v2_log_request", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            user_id : {type : "int"},
            action : {type : "nvarchar(20)"},
            status : {type : "tinyint"},
            created_at: {type: "datetime"},
            updated_at: {type: "datetime"},
            deleted_at: {type: "datetime"},

        })
        await queryInterface.createTable("bo_v2_log_request_detail", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            user_id : {type : "int"},
            action : {type : "nvarchar(20)"},
            status : {type : "tinyint"},
            created_at: {type: "datetime"},
            updated_at: {type: "datetime"},
            deleted_at: {type: "datetime"},
        })


        await queryInterface.createTable("bo_v2_log_import", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            user_id : {type : "int"},
            data : {type : "longtext"},
            status : {type : "tinyint"},
            error : {type : "longtext"},
            created_at: {type: "datetime"},
            updated_at: {type: "datetime"},
            deleted_at: {type: "datetime"},
        })
        await queryInterface.createTable("bo_v2_campaign_member", {
            id: {type: "int(11)", primaryKey: true, autoIncrement: true},
            user_id : {type : "int"},
            sort: {type : "tinyint(1)"},
            campaign_id: {type : "int"},
            created_at: {type: "datetime"},
            updated_at: {type: "datetime"},
            deleted_at: {type: "datetime"},
        })
    },
    async down(queryInterface, Sequelize) {
        // await queryInterface.dropTable("bo_v2_user");
        // await queryInterface.dropTable("bo_v2_user_token");
        // await queryInterface.dropTable("bo_v2_user_info");
    },
};
