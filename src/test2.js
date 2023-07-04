
const strign = "toi_la_ai";
function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param s {String}
 * @param method  {String |Boolean}
 * @return {*}
 */
function genName(s, method = false) {
    if (method) s = method + "_" + s;
    return s
        .split("_")
        .map((value, index) => (index === 0 ? value : jsUcfirst(value)))
        .join("");
}

function genAdd(name) {
    const funcame = genName(name, "add");

    return `
/**
 *
 * @param params {${name}|any}
 * @param transaction {any}
 * @return {Promise<${name}>}
 */
export  const ${funcame}Md = (params, transaction = false)=> {
    return ${name}.create(params, {transaction})
}



`;
}
function genUpdate(name) {
    const funcame = genName(name, "update");

    return `
/**
 *
 * @param attr {${name}|any}
 * @param where {${name}|any}
 * @param transaction {any}
 * @return {Promise<${name}>}
 */
export  const ${funcame}Md = (attr , where ,transaction = false)=> {
    return ${name}.findOneAndUpdate(attr , where,transaction)
}


`;
}

/**
 *
 * @param name
 * @param keys {String[]}
 */
const genC = (name, keys) => {
    const add = genName(name, "add");
    const update = genName(name, "update");
    const str = `
   import {${add}Md , ${update}Md   } from "@model";
/**
 *
 * @param p
 * @param c {Controller}
 */
export const ${add} = async (p, c) => {
  const {
  ${keys},id
  } = p;
  if (id) {
    c.runValidAlNull({
       ${keys}, id
    });
    if (!c.status) return;
    c.data = await ${update}Md(
      {
         ${keys}
      },
      { id }
    );
  } else {
    c.runValid({
      ${keys}
    });
    if (!c.status) return;
    c.data = await ${add}Md({
         ${keys}
    });
    c.mess = c.MESS.addData;
  }
};
  
  `;

    console.log(str);
};
// genC("Agent_customer", [
//   "name",
//   "address",
//   "phone",
//   "email",
//   "image",
//   "id_agent",
//   "note",
//   "bank",
//   "type_customer",
//   "vat",
// ]);

/**
 *
 * @param name {string}
 * @param str {string}
 */

const genModelBase = (name, str) => {
    return `
  import { ModelBase } from "@config/ModelBase";

class ${name} extends ModelBase {
}
${name}.init("${name.charAt(0).toLocaleLowerCase(1) + name.slice(1)}", {
${str}
});
    ${genAdd(name)}
    ${genUpdate(name)}
    ${genGet(name)}
    ${getDetail(name)}
    ${count(name)}
export default ${name};
  `;
};
//
// console.log(
//   genModelBase(
//     "Agent_product_unit_price_sell",
//     `
//     id: {type: "int(11)", primaryKey: true, autoIncrement: true},
//             name: {type: "varchar(255)"},
//             id_agent: {type: "int (11)"},
//             type_customer: {type: "tinyint(1)"},
//             created_at: {type: "DATETIME"},
//             deleted_at: {type: "DATETIME"},
//             updated_at: {type: "DATETIME"},
// `
//   )
// );

const genGet = (name) => {
    const funcameA = genName(name, "getList");
    return `

 /**
 *
 * @param where {${name}|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<${name}[]>}
 */
export  const ${funcameA}Md = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return ${name}.findArr( where ,transaction,limit,page,order,group,attr)
}
`;
};
// console.log(genGet("Agent_base_type_business"));
const getDetail = (name) => {
    const funcameA = genName(name, "getDetail");
    return `

 /**
 *  
 * @param where {${name}|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<${name}>}
 */
export  const ${funcameA}Md = ( where,transaction =false , attr =false)=> {
    return ${name}.findItem( where ,transaction ,attr)
}
`;
};
const count = (name) => {
    const funcameA = genName(name, "count");
    return `

 /**
 *  
 * @param where {${name}|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const ${funcameA}Md = ( where,transaction =false )=> {
    return ${name}.count( {where,transaction} )
}
`;
};

// const genRoute = (name) =>
//     `
//     import { MethodBase } from "@lib";
// class ${name} extends MethodBase {}
// export default ${name};
//     `;
//
console.log(
    genModelBase(
        "Bo_v2_payment_progress_detail",
        `
id: {type: "int(11)", primaryKey: true, autoIncrement: true},
id_payment_progress: {type: "int"},
sale_policy_id : {type: "int"},
expired_time_paid  : {type: "int"},
desc   : {type: "text"},
type_payment : {type: "tinyint"},
total  : {type: "bigint"},
type :{type: "tinyint"},
title: {type: "nvarchar(255)"},
updated_at: {type: "datetime"},
created_at: {type: "datetime"},
deleted_at: {type: "datetime"},
            `
    )
);


// bo_v2_sale_customer_campaign_history
// bo_v2_sale_violation




