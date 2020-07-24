import * as fs from 'fs-extra' // Docs: https://github.com/jprichardson/node-fs-extra
interface DiffObj {
    changed: Array<String>;
    insertion: Array<String>;
    destructive: Array<String>;
};

export async function fsSaveJson(fileName: string, json: object) {
    const saveToFile = './' + fileName + '.json';
    await fs.outputJson(saveToFile, json);
}
const foldersNeedingFolder = ['aura', 'lwc'];
const foldersNeedingMetaXml = ['components', 'classes', 'contentassets', 'email', 'pages', 'triggers'];
export async function fsCopyChangesToNewDir(diff: DiffObj) {
    let fileSet = new Set();
    Object.keys(diff).forEach(key => {
        if (key === 'destructive') return;
        diff[key].forEach(element => {
            fileSet.add(element);
        });
    });
    let copiedPaths = new Set();
    fileSet.forEach(element => {
        const folder = element.replace('force-app/main/default/','').substring(0, element.replace('force-app/main/default/','').indexOf('/'));
        const folderPath = element.substring(0, element.indexOf(folder))+folder+'/';
        // console.log('folder: ' + folder);
        if(foldersNeedingFolder.includes(folder)) {
            const subfolder = element.replace(folderPath,'').substring(0, element.replace(folderPath,'').indexOf('/'));
            const newPath = element.substring(0, element.indexOf(folder))+folder+'/'+subfolder;
            if(!copiedPaths.has(newPath)) copiedPaths.add(newPath);
            return;
        }
        if(foldersNeedingMetaXml.includes(folder)) {
            const metaDataPath = element + '-meta.xml';
            if(!copiedPaths.has(metaDataPath)) copiedPaths.add(metaDataPath);
            if(!copiedPaths.has(element)) copiedPaths.add(element);
            return;
        }
        if(!copiedPaths.has(element)) copiedPaths.add(element);
    });
    copiedPaths.forEach(element => {
        const newLocation = '.releaseArtifacts/tempParcel/'+ element;
        fs.copySync(element, newLocation);
    });
}

export async function cleanupTempDirectory() {
    await fs.remove('.releaseArtifacts/tempParcel/');
}