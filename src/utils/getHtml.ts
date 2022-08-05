import got, { OptionsOfTextResponseBody } from 'got-cjs';

export function getHTML(url: string) {
  const options: OptionsOfTextResponseBody = {
    url: url,
    // 设置一个浏览器头
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };
  return got(options);
}
