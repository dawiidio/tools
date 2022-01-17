export class FormDataParser<T> {
    static fromObject<T>(object: Record<any, any>): FormDataParser<T> {
        const formData = new FormData();

        for (const [key, val] of Object.entries(object)) {
            if (val === undefined) continue;

            if (Array.isArray(val)) {
                for (const v of val) {
                    if (typeof v === 'object' && !(v instanceof File))
                        throw new Error(
                            `Serializing nested objects while parsing to FormData is not supported`,
                        );

                    formData.append(key, v);
                }

                continue;
            }

            if (typeof val === 'object' && !(val instanceof File)) {
                throw new Error(
                    `Serializing nested objects while parsing to FormData is not supported`,
                );
            }

            formData.set(key, val);
        }

        return new FormDataParser<T>(formData);
    }

    constructor(public formData: FormData = new FormData()) {}

    /**
     * *** WARNING ***
     *
     * DO NOT CHANGE THIS TO "Object.fromEntries(formData.entries())" !!!
     *
     * Object.fromEntries is incompatible with FormData because
     * FormData may contain many values under same key while
     * regular object can not. If that will happen fromEntries
     * will override other values in result object
     *
     * @param formData {FormData}
     */
    toObject(): T {
        const acc = {} as unknown as { [k: string | number | symbol]: any };

        for (const [key, val] of this.formData.entries()) {
            if (acc[key]) {
                if (Array.isArray(acc[key])) {
                    acc[key].push(val);
                } else {
                    acc[key] = [acc[key], val];
                }

                continue;
            }

            acc[key] = val;
        }

        if (acc['table']) acc['table'] = JSON.parse('[' + acc['table'] + ']');

        return acc as T;
    }
}
