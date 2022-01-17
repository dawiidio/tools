export interface OptionItem<T = string> {
    value: T;
    label: string;
    disabled?: boolean;
}
