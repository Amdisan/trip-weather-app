import { format } from 'date-fns';

export function extraDaysFn(date) {
  const extraDays = 15;
  const newMaxDate = new Date(
    new Date(date).getTime() + extraDays * 24 * 60 * 60 * 1000
  );
  return format(newMaxDate, 'yyyy-MM-dd');
}
