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