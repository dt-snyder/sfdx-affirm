import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra

export async function fsSaveJson(fileName: string, json: object) {
    const saveToFile = './' + fileName + '.json';
    await fs.outputJson(saveToFile, json);
}