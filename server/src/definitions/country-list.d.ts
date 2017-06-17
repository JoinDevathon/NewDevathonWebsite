declare module CountryList {
    export class Countries {
        getName(code: string): string | undefined;
        getCode(name: string): string | undefined;
        getNames(): string[];
        getCodes(): string[];
        getNameList(): {[key: string]: string};
        getCodeList(): {[key: string]: string};
        getData(): any;
    }

}
declare module "country-list" {
    const val: typeof CountryList.Countries;

    export = val;
}