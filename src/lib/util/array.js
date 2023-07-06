import {deserialize} from "./serialize";
import {Op} from "sequelize";

export const sumArr = (arr, key) => {
  let sum = 0;
  if (key)
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i][key];
    }
  else
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
  return sum;
};

export const groupArrToObjectLog = (arrObj, sort) => {
  let endObject = null;
  let item = {};
  for (let i = arrObj.length - 1; i >= 0; i--) {
    // for (let i = 0; i < arrObj.length; i++) {
    arrObj[i] = deserialize(arrObj[i]);
    if (arrObj[i].status === true) endObject = arrObj[i];
    else
      item = {
        ...item,
        ...arrObj[i],
        param: { ...item.param, ...arrObj[i].param },
      };
  }
  item = { ...item, ...endObject };
  return item;
};
export const contain = (arr, key, value) => {
  if (!key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == value) {
        return true;
      }
    }
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == value) {
      return true;
    }
  }

  return false;
};

export const calulatorArr = (arr, id, key, operator) => {
  let result = [];
  switch (operator) {
    case "minus":
      for (let i = 0; i < arr.length; i++) {
        // arr
      }
      break;
  }
};
export const searchArr = (arr, key, search, notIn = false) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const check = notIn ? arr[i][key] != search : arr[i][key] == search;
    if (check) {
      result.push(arr[i]);
    }
  }
  return result;
};
export const searchArrOne = (arr, key, search) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == search) {
      return arr[i];
    }
  }
  return null;
};
export const getArrayAttr = (arr, key) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!contain(result, undefined, arr[i][key])) {
      result.push(arr[i][key]);
    }
  }
  return result;
};
/**
 * @param arr {[]}
 * @param attr {[]}
 */
export const removeAttr = (arr, attr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < attr.length; j++) {
      delete arr[i][attr[j]];
    }
  }
  return arr;
};

/**
 *
 * @param arr {[]}
 * @param oldAttr {[]}
 * @param  newAttr {[]}
 */
export const renameAttr = (arr, oldAttr, newAttr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < oldAttr.length; j++) {
      if (arr[i][oldAttr[j]] !== undefined)
        arr[i][newAttr[j]] = arr[i][oldAttr[j]];
      delete arr[i][oldAttr[j]];
    }
  }
  return arr;
};
/**
 * @param arr {[]}
 * @param attrSort {[]}
 */
export const sortAttr = (arr, attrSort) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = {};
    for (let j = 0; j < attrSort.length; j++) {
      item[attrSort[j]] = arr[i][attrSort[j]];
    }
    result.push(item);
  }
  return result;
};

/**
 * @param arr {[]}
 * @param groupBy {String}
 * @param attrGroup {String}
 */
export const groupAttrBy = (arr, groupBy, attrGroup, flowAttribute) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (!contain(result, groupBy, arr[i][groupBy])) {
      const arrSearch = searchArr(arr, groupBy, arr[i][groupBy]);
      if (arrSearch.length > 1) {
        item = groupAttr(arrSearch, attrGroup, flowAttribute);
      }
      result.push(item);
    }
  }
  return result;
};

export const sortByList = (arr, listId, key) => {
  const result = [];
  for (let i = 0; i < listId.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j][key] == listId[i]) result.push(arr[j]);
    }
  }
  return result;
};

/**
 *
 * @param arr {[]}
 * @param by {String}
 */
export const groupAttr = (arr, by, flowAttribute) => {
  const result = arr[0];
  const item = [];
  const flowItem = {};
  for (let i = 0; i < arr.length; i++) {
    item.push(arr[i][by]);

    for (let j = 0; j < flowAttribute.length; j++) {
      if (!Array.isArray(flowItem[flowAttribute[j]])) {
        flowItem[flowAttribute[j]] = [arr[i][flowAttribute[j]]];
      } else {
        flowItem[flowAttribute[j]].push(arr[i][flowAttribute[j]]);
      }
    }
  }
  result[by] = `${item}`;
  for (let i = 0; i < flowAttribute.length; i++) {
    result[flowAttribute[i]] = `${flowItem[flowAttribute[i]]}`;
  }
  return result;
};
/**
 *
 * @param arr
 * @param arr2 {{}|Boolean}
 * @return {*}
 */
export const filterSameArr = (arr, arr2 = false) => {
  if (arr2)
    return (
      arr.filter(
        (value) => arr2.find((value_) => value_ === value) !== undefined
      ) || []
    );
  const result = [];
  return (
    arr.forEach((value) =>
      result.find((value_) => value_ === value) === undefined
        ? result.push(value)
        : false
    ) || []
  );
};

export const filterArrNotSame = (arr, arr2) => {
  return (
    arr.filter(
      (value) => arr2.find((value_) => value_ === value) === undefined
    ) || []
  );
};

/**
 *
 * @param arr {[]}
 * @param value
 */
export  const pushNotSame = (arr , value)=> {
  for (let arrElement of arr) {
    if(arrElement == value) return
  }
  arr.push(value)
}

// export const reverseWhere = (where) => {
//   const result = [];
//   const groupedItems = {};
//   for (const key in where) {
//     const value = where[key];
//     if (key.startsWith("$to_")) {
//       const groupKey = key.substring(4);
//       if (!(groupKey in groupedItems)) {
//         groupedItems[groupKey] = {};
//       }
//       groupedItems[groupKey].to = value;
//     } else if (key.startsWith("$end_")) {
//       const groupKey = key.substring(5);
//       if (!(groupKey in groupedItems)) {
//         groupedItems[groupKey] = {};
//       }
//       groupedItems[groupKey].end = value || new Date().toISOString();
//     } else {
//       result.push({[key]: value});
//     }
//   }
//   for (const groupKey in groupedItems) {
//     const groupItem = groupedItems[groupKey];
//     result.push({
//       [`$to_${groupKey}`]: groupItem.to,
//       [`$end_${groupKey}`]: groupItem.end
//     });
//   }
//   let query = {};
//   for (const key in where) {
//     if (!key.startsWith("$to_") && !key.startsWith("$end_")) {
//       query[key] = where[key]
//     }
//   }
//   console.log(result,789)
//   var extractedValues = []
//   for (let i = 0; i < result.length; i++) {
//     for (const key in result[i]) {
//       if (key.startsWith("$to_")) {
//         const value = key.substring(4);
//         extractedValues.push(value);
//         const startKey = result[i][key];
//         const endKey = result[i][`$end_${value}`];
//         const regexDate = /^\d{4}-\d{2}-\d{2}.*/;
//         const regexDateTest = regexDate.test(endKey)
//         if (regexDateTest && typeof (startKey) === "undefined") {
//           query[value] = {
//             [Op.lte]: endKey
//           }
//         } else if (endKey && startKey) {
//           query[value] = {
//             [Op.between]: [startKey, endKey]
//           }
//         } else {
//           query[value] = {
//             [Op.gte]: startKey
//           }
//         }
//       }
//       // else if (key.startsWith("$like_")){
//       //   query[value]
//       // }
//     }
//   }
//   return query
// };
