import config from '@/config';
import {
  addTicket,
  findAllTicket,
  findOrAddTicket,
  findTicketByDate,
  findTicketByNumber,
} from '@/service/ticket';
import { getHTML } from '@/utils/getHtml';
import { sleep } from '@/utils/tool';
import { load } from 'cheerio';

export async function getTickets(pageNo: number, pageSize: number) {
  const res = await findAllTicket(pageNo, pageSize);
  return res;
}

type SearchParams = Date | string | string[];

export async function getTicket(params: SearchParams) {
  let res;
  if (params instanceof Date || typeof params === 'string') {
    res = await findTicketByDate(params);
  } else if (params instanceof Array) {
    res = await findTicketByNumber(params);
  }
}

export async function syncTicket() {
  let page = 1,
    total = 1,
    isEnd = false;
  try {
    while (page <= total && !isEnd) {
      const res = await getOnePageTicket(page);
      let htmlData = parseHtml(res.body);
      total = htmlData.page;
      let data = htmlData.res;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const [, created] = await findOrAddTicket(element);
        isEnd = !created;
        if (isEnd) {
          break;
        }
      }
      await sleep(5000);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function initTicket() {
  let page = 1,
    total = 1;
  try {
    while (page <= total) {
      const res = await getOnePageTicket(page);
      let htmlData = parseHtml(res.body);
      total = htmlData.page;
      let data = htmlData.res;
      data.forEach((item) => {
        addTicket(item);
      });
      page++;
      await sleep(5000);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getOnePageTicket(page: number) {
  const { url } = config(page);
  const res = await getHTML(url);
  return res;
}

function parseHtml(html: string) {
  const $ = load(html);
  const trs = $('tr');
  const page = $('.pg').find('strong').eq(0).text();
  const res = [];
  for (let i = 2; i < trs.length - 1; i++) {
    const tr = trs[i];
    const tds = $(tr).find('td');
    const date = tds.eq(0).text();
    const phase = tds.eq(1).text();
    const numbers = tds.eq(2).find('em');
    const sale = +tds.eq(3).text().replace(/\,/g, '');
    const firstPrize = +tds.eq(4).find('strong').text();
    const secondPrize = +tds.eq(5).text();
    res.push({
      date,
      phase,
      sale,
      firstPrize,
      secondPrize,
      number1: numbers.eq(0).text(),
      number2: numbers.eq(1).text(),
      number3: numbers.eq(2).text(),
      number4: numbers.eq(3).text(),
      number5: numbers.eq(4).text(),
      number6: numbers.eq(5).text(),
      number7: numbers.eq(6).text(),
      numbers: Array.from(numbers)
        .map((item) => $(item).text())
        .join(''),
    });
  }

  return {
    page: +page,
    res,
  };
}
