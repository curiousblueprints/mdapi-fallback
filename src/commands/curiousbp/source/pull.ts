import { flags }              from '@oclif/command';
import { SfdxCommand, core }  from '@salesforce/command';
import { sfdxCmd }            from '../../../helpers/sfdxCmd';
import { fileCmd }            from '../../../helpers/fileCmd';

core.Messages.importMessagesDirectory(__dirname);
const messages = core.Messages.loadMessages('mdapi-fallback', 'org');

export default class Pull extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static examples = [];
  public static args = [];
  protected static flagsConfig = {};

  protected static requiresUsername = false;
  protected static supportsUsername = true;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = true;

  private mdapiDir = 'mdapi';

  public async run(): Promise<any> { // tslint:disable-line:no-any

    let mdapiRetrieve = () => {
      let args = {
        ...this.flags,
        'r' : this.mdapiDir,
        'k' : this.mdapiDir + '/package.xml'
      };

      return sfdxCmd.run('force:mdapi:retrieve', args);
    };

    let sourcePull = () => {
      let args = {
        ...this.flags
      };

      return sfdxCmd.run('force:source:pull', args);
    };

    return sourcePull()
      .then(mdapiRetrieve)
      .then(fileCmd.generateExtractCmd(this.mdapiDir))
      .then(fileCmd.generateDeleteZipCmd(this.mdapiDir));
  }
}
