import { Injectable } from '@angular/core';
//import * as _moment from '../../../assets/js/moment.js';
//const moment = _moment;

import * as moment from 'moment-timezone';

@Injectable()
export class LocaleConfig {
    direction?: string;
    separator?: string;
    weekLabel?: string;
    applyLabel?: string;
    cancelLabel?: string;
    customRangeLabel?: string;
    daysOfWeek?: string[];
    monthNames?:  string[];
    firstDay?: number;
    format?: string;
}
export const DefaultLocaleConfig: LocaleConfig = {
    direction: 'ltr',
    separator: ' - ',
    weekLabel: 'W',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    customRangeLabel: 'Custom range',
    daysOfWeek: moment().localeData().weekdaysMin(),
    monthNames: moment().localeData().monthsShort(),
    firstDay: moment().localeData().firstDayOfWeek()
  };