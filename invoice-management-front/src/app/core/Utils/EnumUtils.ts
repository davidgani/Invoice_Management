export default class EnumUtils {
    static enumToMap(enumValues: string[], MyEnum: any): Map<number, string> {
        const enumMap = new Map<number, string>();

        for (const enumString of enumValues) {
            const enumValue = MyEnum[enumString as keyof typeof MyEnum];
            if (enumValue !== undefined) {
                enumMap.set(enumValue, enumString);
            }
        }

        return enumMap;
    }
}
