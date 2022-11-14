import { Op } from 'sequelize';
import moment from 'moment';
import { Filter } from '../models/filter-model';
import * as bcrypt from 'bcrypt';
import * as fs from "fs";

export async function encryptedPassword(password: string): Promise<string> {
  const saltOrRounds: number = parseInt(process.env.SALT_OR_ROUNDS);
  return await bcrypt.hash(password, saltOrRounds);
}

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

export async function saveImage(baseImage, uuid: string): Promise<string> {

  const fileExtensions = new Map<string, string>();
  fileExtensions.set("9j", "JPG")
  fileExtensions.set("iVB", "PNG")
  fileExtensions.set("Qk0", "BMP")
  fileExtensions.set("SUk", "TIFF")
  fileExtensions.set("JVB", "PDF")
  fileExtensions.set("UEs", "OFD")

  const uploadPath = "./users-photos/";
  const fileType = fileExtensions.get(baseImage.split(';')[0].split('/')[1]);
  const ext = baseImage.substring(baseImage.indexOf("/") + 1, baseImage.indexOf(";base64"));
  const regex = new RegExp(`^ data: ${fileType}\/${ext};base64,`, 'gi');
  const base64Data = baseImage.replace(regex, "");
  const filename = `${uuid}.${fileType}`;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  fs.writeFileSync(uploadPath + filename, base64Data, 'base64');
  return filename;
}