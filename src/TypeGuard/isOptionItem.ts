import type { OptionItem } from '~/Common/OptionItem';

export const isOptionItem = (val: any): val is OptionItem =>
    typeof val === 'object' &&
    val.hasOwnProperty('label') &&
    val.hasOwnProperty('value');
