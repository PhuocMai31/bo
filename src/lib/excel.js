import XLSX from "xlsx";

export const convertJsonToExcel = (data, header) => {
  const opts = {};
  if (header) opts.header = header;
  const workSheet = XLSX.utils.json_to_sheet(data, opts);
  const workBook = XLSX.utils.book_new();
  workSheet["!cols"] = fitToColumn(data);
  XLSX.utils.book_append_sheet(workBook, workSheet, "sheet 1");
  // Generate buffer
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  // Binary string
  const a = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  return a;
};

// const worksheet = XLSX.utils.aoa_to_sheet(arrayOfArray);
// worksheet['!cols'] = fitToColumn(arrayOfArray);

export const fitToColumn = (arrayOfArray) => {
  const result = [];
  Object.keys(arrayOfArray[0]).map((value) => {
    const item = [];
    for (let i = 0; i < arrayOfArray.length; i++) {
      item.push(`${arrayOfArray[i][value]}`.length);
    }
    result.push({ wch: Math.max(...item) });
  });
  return result;
  // return arrayOfArray[0].map((a, i) => ({
  //   wch: Math.max(
  //     // ...arrayOfArray.map((a2) => (a2[i] ? a2[i].toString().length : 0))
  //     ...arrayOfArray.((a2) => (a2[i] ? a2[i].toString().length : 0))
  //
  //   ),
  // }));
};

export const readExcel = (buffer) => {
  const a = XLSX.read(buffer, { bookType: "xlsx", type: "buffer" });
  const sheetNames = a.SheetNames;

  // Convert to json using xlsx
  const tempData = XLSX.utils.sheet_to_json(a.Sheets[sheetNames[0]], {
    blankrows: false,
    header: 1,
    defval: null,
  });
  const data = [];
  for (let i = 1; i < tempData.length; i++) {
    let item = {};
    for (let index = 0; index < tempData[0].length; index++) {
      if (tempData[0][index] === null) continue;
      item[tempData[0][index]] = tempData[i][index];
    }
    data.push(item);
  }

  return data;
};
/**
 *
 * @param buffer
 * @param attributes
 * @return {*[]}
 */
export const readExel2 = (buffer, attributes) => {
  const a = XLSX.read(buffer, { bookType: "xlsx", type: "buffer" });
  const sheetNames = a.SheetNames;
  // Convert to json using xlsx
  const tempData = XLSX.utils.sheet_to_json(a.Sheets[sheetNames[0]], {
    blankrows: false,
    header: 1,
    defval: null,
  });
  const data = [];
  for (let i = 1; i < tempData.length; i++) {
    let item = {};
    for (let index = 0; index < attributes.length; index++) {
      if (typeof tempData[i][index] == "string") {
        item[attributes[index]] = tempData[i][index].trim();
      } else if (tempData[i][index] == 0 || tempData[i][index]) {
        item[attributes[index]] = tempData[i][index];
      }
    }
    Object.keys(item).length && data.push(item);
  }
  return data;
};
