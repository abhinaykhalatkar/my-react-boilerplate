import * as fs from 'fs';
import * as path from 'path';

// Define the root directory for the React projectt
const rootDir = path.join(__dirname, '../../');
const buildDir = path.join(rootDir, 'build');

// Define the list of directories/files to copy
let copyList:{source:string, destination:string}[] 
copyList= [
//starts from project root
    // {
    //     source: path.join(rootDir, 'mailer-api'),
    //     destination: path.join(buildDir, 'mailer-api')
    // },
    // {
    //     source: path.join(rootDir, '.env'),
    //     destination: path.join(buildDir, 'mailer-api/.env')
    // }
];


function copyItem(src: string, dest: string): void {
    const normalizedDest = path.normalize(dest);

    // Ensure the destination directory exists
    const destDir = path.dirname(normalizedDest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }


    if (fs.lstatSync(src).isDirectory()) {
        if (!fs.existsSync(normalizedDest)) {
            fs.mkdirSync(normalizedDest, { recursive: true });
        }

        fs.readdirSync(src).forEach((file: string) => {
            const srcPath: string = path.join(src, file);
            const destPath: string = path.join(normalizedDest, file);

            // Recursively copy directories or files
            copyItem(srcPath, destPath);
        });
    } else {
        fs.copyFileSync(src, normalizedDest);
    }
}
try {
    if(copyList.length>0){
        copyList.forEach(({ source, destination }) => {
            copyItem(source, destination);
            console.log(`Copied from ${source} to ${destination}`);
        });
    }
} catch (error) {
    console.error('Error copying files or directories:', error);
}


