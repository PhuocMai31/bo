import {Op} from "sequelize";
import {countBoV2ExchangeMd, sequelize} from "@model";

export const findDataWithFieldandBetween = async (model,field,valueStartOfField,valueEndOfField) => {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    const regexVarChar = /[a-zA-Z]/;
    const regexNumber = /^\d+$/;
    if(regexDate.test(valueStartOfField)){
        console.log(1)
        if (!valueEndOfField){
            var result = await model.findAll({
                where: {
                    [field]: {
                        [Op.gte]: `${valueStartOfField}`,
                        // [Op.lte]: `${valueEndOfField}`
                    }
                }
            });
        } else {
                var result = await model.findAll({
                    where: {
                        [field]: {
                            [Op.gte]: `${valueStartOfField}`,
                            [Op.lte]: `${valueEndOfField}`
                        }
                    }
                });
            }
    } else if(regexVarChar.test(valueStartOfField)){
        console.log(2)
        var result = await model.findAll({
            where: {
                [field]: {
                    [Op.like]: `%${valueStartOfField}%`
                }
            }
        });
    } else if(regexNumber.test(valueStartOfField)){
        console.log(3)
        if(!valueEndOfField){
            const result = await model.findAll({
                attributes: [field],
                order: [[field, 'DESC']],
                limit: 1,
            });
            valueEndOfField = result[0].age
            console.log(valueEndOfField,99)
        }
        var result = await model.findAll({
            where: {
                [field]: {
                    [Op.gte]: parseInt(valueStartOfField),
                    [Op.lte]: parseInt(valueEndOfField)
                }
            }
        })
    }
    return result
}


export const transformConditionToQuery = (where) => {
    const result = [];
    const groupedItems = {};
    for (const key in where) {
        const value = where[key];
        if (key.startsWith("$to_")) {
            const groupKey = key.substring(4);
            if (!(groupKey in groupedItems)) {
                groupedItems[groupKey] = {};
            }
            groupedItems[groupKey].to = value;
        } else if (key.startsWith("$end_")) {
            const groupKey = key.substring(5);
            if (!(groupKey in groupedItems)) {
                groupedItems[groupKey] = {};
            }
            groupedItems[groupKey].end = value || new Date().toISOString();
        } else {
            result.push({ [key]: value });
        }
    }
    for (const groupKey in groupedItems) {
        const groupItem = groupedItems[groupKey];
        result.push({
            [`$to_${groupKey}`]: groupItem.to,
            [`$end_${groupKey}`]: groupItem.end
        });
    }
    let query = {};
    for (const key in where){
        if (!key.startsWith("$to_") && !key.startsWith("$end_")) {
            query[key] = where[key]
        }
    }
    var extractedValues = []
    for (let i = 0; i< result.length; i++){
        for (const key in result[i]) {
            if (key.startsWith("$to_")) {
                const value = key.substring(4);
                extractedValues.push(value);
                const startKey = result[i][key];
                const endKey = result[i][`$end_${value}`];
                const regexDate = /^\d{4}-\d{2}-\d{2}.*/ ;
                const regexDateTest = regexDate.test(endKey)
                if (regexDateTest && typeof (startKey) === "undefined"){
                    query[value] = {
                        [Op.lte]: endKey
                    }
                }
                else if(endKey && startKey){
                    query[value] = {
                        [Op.between]: [startKey, endKey]
                    }
                } else  {
                    query[value] = {
                        [Op.gte]: startKey
                    }
                }
            }
        }
    }
    return query
};