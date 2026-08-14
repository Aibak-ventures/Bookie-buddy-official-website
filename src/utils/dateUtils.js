import { parse, isValid, startOfDay } from 'date-fns';

/** Today at midnight — stable reference for calendar disabled-before logic. */
export const today = startOfDay(new Date());

/** Parse 'yyyy-MM-dd' string → Date. Returns undefined if invalid or missing. */
export function parseDateStr(str) {
  if (!str) return undefined;
  const d = parse(str, 'yyyy-MM-dd', new Date());
  return isValid(d) ? d : undefined;
}
