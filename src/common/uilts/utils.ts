import { Op } from 'sequelize';
import moment from 'moment';
import { Filter } from '../models/filter-model';

export function groupAndSum(arr: any, groupKeys: any, sumKeys: any) {
  return Object.values(
    arr.reduce((acc, curr) => {
      const group = groupKeys.map((k) => curr[k]).join('-');
      acc[group] = acc[group] || Object.fromEntries(groupKeys.map((k) => [k, curr[k]]).concat(sumKeys.map((k) => [k, 0])));
      sumKeys.forEach((k) => (acc[group][k] += curr[k]));
      return acc;
    }, {}),
  );
}

export function getValue(op: string, value: any): number {
  if (op === 'gt' || op === 'lt') {
    return parseInt(value);
  } else {
    return value;
  }
}

export function getOp(op: string): any {
  if (op === 'eq') {
    return Op.eq;
  } else if (op === 'ne') {
    return Op.ne;
  } else if (op === 'in') {
    return Op.in;
  } else if (op === 'ni') {
    return Op.notIn;
  } else if (op === 'gt') {
    return Op.gt;
  } else if (op === 'lt') {
    return Op.lt;
  } else if (op === 'ge') {
    return Op.gte;
  } else if (op === 'le') {
    return Op.lte;
  }
}

export function getFilter(params: Filter): any {
  let where: {};
  if (params.search && params.search.column && params.search.value) {
    where = {
      ...where,
      [params.search.column]: {
        [Op.or]: {
          [Op.like]: `%${params.search.value}%`,
        },
      },
    };
  }

  if (params.date && params.date.column && params.date.startDate && params.date.endDate) {
    where = {
      ...where,
      [params.date.column]: { [Op.between]: [params.date.startDate, params.date.endDate] },
    };
  }
  return where;
}

export function getDateDiff(from: Date, to: Date): number {
  const date1: any = new Date(from);
  const date2: any = new Date(to);
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
