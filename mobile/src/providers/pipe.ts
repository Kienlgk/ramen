import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  transform(value: number): string {
    var str = value + '';
    return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: [any], field: string): [any] {
    var sortedArr = value.sort((a, b) => {
      console.log('compare', a, b, 'on ' + field, (a[field] > b[field]) );
      return (a[field] > b[field]) ? 1 : -1;
    });
    console.log('sortedArr');
    console.log(sortedArr);
    return sortedArr;
  }
}

@Pipe({
  name: 'dateName'
})
export class DatePipe implements PipeTransform {
  transform(value: number): string {
    var dateHash = {
      1: "đầu tiên",
      2: "thứ hai",
      3: "thứ ba",
      4: "thứ tư",
      5: "thứ năm",
      6: "thứ sáu",
      7: "thứ bảy",
      8: "thứ tám",
      9: "thứ chín",
      10: "thứ mười",
    }
    if (value>10) return "thứ " + value.toString()
    return dateHash[value];
  }
}

function fetchFromDate(type: string, value: Date): string {
  let dayHash = {
    0: 'Chủ nhật',
    1: "Thứ 2",
    2: "Thứ 3",
    3: "Thứ 4",
    4: "Thứ 5",
    5: "Thứ 6",
    6: "Thứ 7",
  };
  switch (type) {
    case "day": {
      return `${dayHash[value.getDay()]}`;
    }
    case "date": {
      return `Ngày ${value.getDate()}`;
    }
    case 'year': {
      return `Năm ${value.getFullYear()}`;
    }
    default:
      return null;
  }
}

@Pipe({
  name: 'dateVN'
})
export class DateVN implements PipeTransform {
  transform(value: Date, exponent: string): string {
    let result = "";

    let selector = exponent || "day|date";
    let tokens = selector.split("|");

    tokens.forEach((token) => {
      result += fetchFromDate(token.trim(), value) + " ";
    });

    return result;
  }
}
@Pipe({
  name: 'filterDay',
})
export class FilterDay implements PipeTransform {
  transform(items: any[], days: any[]): any {
    if (items) return items.filter(item => {if(days[item.day - 1]) return item});
  }
}
