import { exec }         from 'child_process';
import * as cmdConfigs  from './cmdConfig.json';

export class sfdxCmd {
  private static generateExecCallback(resolve, reject): any {
    return (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      console.log(`${stdout}`);
      resolve(0);
    };
  };

  private static cleanArgs(command, args): Object {
    let allowedArgs = cmdConfigs[command].args;
    let cleanedArgs = {};

    for (let arg of allowedArgs) {
      if (args[arg]) {
        cleanedArgs[arg] = args[arg];
      }
    }

    return cleanedArgs;
  }

  public static async run(command, args): Promise<any> {
    let cleanedArgs = sfdxCmd.cleanArgs(command, args);

    for (var flag in cleanedArgs) {
        if (cleanedArgs.hasOwnProperty(flag)) {
            command += flag.length > 1 ?
              ` --${flag} ${cleanedArgs[flag]}` :
              ` -${flag} ${cleanedArgs[flag]}`;
        }
    }

    return new Promise((resolve, reject) => {
      exec('sfdx ' + command, sfdxCmd.generateExecCallback(resolve, reject));
    });
  }
}
