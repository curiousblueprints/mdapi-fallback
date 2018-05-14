import { createReadStream, unlink } from 'fs';
import { Extract }                  from 'unzip';

export class fileCmd {
    private static zipFile = '/unpackaged.zip';

    public static generateExtractCmd(directory: String): any {
        return () => {
            return new Promise((resolve, reject) => {
                createReadStream(directory + fileCmd.zipFile).pipe(Extract({path: directory + '/unpackaged'}))
                    .on('close', () => {
                        resolve(0);
                    });
            });
        };
    }

    public static generateDeleteZipCmd(directory: String): any {
        return () => {
            return new Promise((resolve, reject) => {
                unlink(directory + fileCmd.zipFile, (err) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(0);
                });
            });
        };
    }
};