import { OptionItem } from '~/Common/OptionItem';
import type { TypeParser } from '~/TypeParser/TypeParser';

const REGEX =
    /\[(?<label>[\w\d\sżźćńółęąśŻŹĆĄŚĘŁÓŃ]+),(?<value>[\w\d_\-.]+)]/im;

export class OptionItemStringParser implements TypeParser<OptionItem> {
    isType(val: any): val is OptionItem {
        return (
            typeof val === 'object' &&
            val !== null &&
            val.hasOwnProperty('value') &&
            val.hasOwnProperty('label')
        );
    }

    isStringifiedType(s: string): boolean {
        return REGEX.test(s);
    }

    stringifyType(val: OptionItem) {
        const temp = `[${val.label},${val.value}]`;

        if (!REGEX.test(temp))
            throw new Error(`OptionItem ${temp} includes unsupported signs`);

        return temp;
    }

    parseStringifiedType(s: string): OptionItem {
        const match = s.match(REGEX);

        if (!match || !match.groups)
            throw new Error(
                `Parsing error in OptionItem, problematic string: ${s}`,
            );

        return {
            label: match.groups.label,
            value: match.groups.value,
        };
    }

    stringifyToReadableValue(val: OptionItem) {
        return val.label;
    }
}
