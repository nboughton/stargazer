import sanitize from 'sanitize-html';
import { ISFTable } from 'src/components/models';

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validTags = ['br', 'b', 'i', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li'];
export const stripTags = (text: string): string => {
  return sanitize(text, {
    allowedTags: validTags,
  });
};

export const tableOpts = (t: ISFTable): string[] => {
  const out: string[] = [];
  t.items.forEach((i) => {
    out.push(i.data);
  });
  return out;
};
