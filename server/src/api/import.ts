import { readFileSync } from 'fs';
import { API_FILENAME, BAD_API_FLAG } from '../const';

export default class ApiFactory {
    private static instance: ApiFactory;

    private apis: Map<string, Map<string, string>> = new Map();

    private constructor() {
        const data = JSON.parse(readFileSync(API_FILENAME,
            {encoding: 'utf8', flag: 'r'}));
        const versions: Object[] = data.versions;
        console.log("***** Installing APIs *****")
        for (const v of versions) {
            // Read in APIs in this version
            const versionNum: string = v["version"];
            if (versionNum === undefined) {
                throw new Error(`Found unexpected item in ${API_FILENAME} file.`);
            }
            const versionApis: Map<string, string> = v["api-list"];
            if (versionApis === undefined) {
                throw new Error(`Did not find api-list for version ${versionNum}.`);
            }
            this.apis.set(versionNum, versionApis);

            console.log(`Found version ${versionNum}.`);
        }

        console.debug(this.apis);
    }

    static getInstance(): ApiFactory {
        if (!ApiFactory.instance) {
            ApiFactory.instance = new ApiFactory();
        }
        return ApiFactory.instance;
    }

    public getApi(version: string, description: string) {
        const versionApis = this.apis.get(version);
        if (versionApis === undefined) {
            return BAD_API_FLAG;
        }
        console.log(versionApis)
        const api = versionApis[description];
        if (api === undefined) {
            return BAD_API_FLAG;
        }
        return api;
    }
}