import sanitize from 'sanitize-html';
import Showdown from 'showdown';

export const validTags = ['p', 'br', 'b', 'i', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li'];

const converter = new Showdown.Converter({
  tables: true,
});

// For on the fly Markdown -> HTML conversion
const clean = (text: string, stripAll?: boolean): string => {
  return sanitize(text, {
    allowedTags: stripAll ? [] : validTags,
    transformTags: {
      a: 'i',
    },
  });
};

export const mdToHtml = (md: string): string => clean(converter.makeHtml(md));
export const mdToText = (md: string): string => clean(converter.makeHtml(md), true);

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// For stripping tags when loading potentially user generated content
export const stripTags = (text: string): string => {
  return sanitize(text, {
    allowedTags: validTags,
  });
};

export const now = (): string => {
  const fmt = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

  const d = new Date();
  const YYYY = d.getFullYear();
  const MM = fmt(d.getMonth() + 1);
  const DD = fmt(d.getDate());
  const hh = fmt(d.getHours());
  const mm = fmt(d.getMinutes());

  return `${YYYY}${MM}${DD}_${hh}${mm}`;
};

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;
