import { sequelize } from "@model";
import { QueryTypes } from "sequelize";

export class QuerySql {
  static a() {}
  constructor() {}
  static {
    this.query = {};
  }
  static run() {
    for (const key of Object.keys(this.query)) {
      /**
       * @type {Function}
       */
      this[key] = (plain) =>
        sequelize.query(this.query[key], { plain, type: QueryTypes.SELECT });
    }
  }
}
class Exc_sql extends QuerySql {}

export class ModelQuery {
  constructor(table, params = {}) {
    const { page = false, limit = false, plain = false } = params;
    this.table = table;
    this.plain = plain;
    this.page = page;
    this.limit = limit;
  }
  having = ``;
  condition_1 = ``;
  condition_2 = ``;
  condition_3 = ``;
  condition_4 = ``;
  condition_5 = ``;
  condition_6 = ``;
  condition_7 = ``;
  condition_8 = ``;
  condition_9 = ``;
  condition_10 = ``;
  condition_11 = ``;
  condition_12 = ``;
  condition_13 = ``;
  condition_14 = ``;
  condition_15 = ``;
  condition_16 = ``;
  condition_17 = ``;
  condition_18 = ``;
  condition_19 = ``;
  condition_20 = ``;


  order = [["created_at", "desc"]];
  group = [];

  table = ``;

  attr = [];

  genQuery() {
    const attr = this.attr.length === 0 ? "*" : `${this.attr.join(",")}`;
    const key = `condition_`;
    const condition = (() => {
      let string = "";
      for (let i = 1; i <= 20; i++) {
        if (!this[key + i]) continue;
        if (!string) {
          string += `where ${this[key + i]} `;
          continue;
        }
        string += `and ${this[key + i]} `;
      }
      return string;
    })();
    const order = (() => {
      let ord = ``;
      for (let i = 0; i < this.order.length; i++) {
        if (i === 0) {
          ord += `order by ${this.order[i][0]} ${this.order[i][1]} `;
          continue;
        }
        ord += `, ${this.order[i][0]} ${this.order[i][1]}`;
      }
      return ord;
    })();

    const group = (() => {
      if (this.group.length) return `group by ${this.group}`;
      return ``;
    })();

    const limit = (() => {
      if (this.limit && this.page) {
        return `limit ${this.limit * this.page - this.limit} , ${this.limit}`;
      }
      return ``;
    })();

    const having = (() => {
      if (this.having) return `having ${this.having}`;
      return this.having;
    })();

    return `select ${attr} From  ${this.table} ${condition} ${group}  ${having}  ${order}  ${limit}`;
  }

  exe() {
    return sequelize.query(this.genQuery(), {
      plain: this.plain,
      type: QueryTypes.SELECT,
    });
  }
  async _exe() {
    const attr = this.attr.length === 0 ? "*" : `${this.attr}`;
    const key = `condition_`;
    const condition = (() => {
      let string = "";
      for (let i = 1; i <= 20; i++) {
        if (!this[key + i]) continue;
        if (!string) {
          string += `where ${this[key + i]} `;
          continue;
        }
        string += `and ${this[key + i]} `;
      }
      return string;
    })();

    const order = (() => {
      let ord = ``;
      for (let i = 0; i < this.order.length; i++) {
        if (i === 0) {
          ord += `order by ${this.order[i][0]} ${this.order[i][1]} `;
          continue;
        }
        ord += `, ${this.order[i][0]} ${this.order[i][1]}`;
      }
      return ord;
    })();

    const group = (() => {
      if (this.group.length) return `group by ${this.group}`;
      return ``;
    })();

    const limit = (() => {
      if (this.limit && this.page) {
        return `limit ${this.limit * this.page - this.limit} , ${this.limit}`;
      }
      return ``;
    })();
    const query = `select ${attr} From  ${this.table} ${condition} ${group} ${order}  ${limit}`;
    const countQuery = `select count(*) count From  ${this.table} ${condition} ${group} `;
    const data = await sequelize.query(query, {
      plain: this.plain,
      type: QueryTypes.SELECT,
    });
    const count = await sequelize.query(countQuery, {
      plain: true,
      type: QueryTypes.SELECT,
    });

    return { list: data, ...count };
  }
}

// order by  a
