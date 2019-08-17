interface IFileObjectOpts {
  file: any;
  name: string;
}

/**
 * @api private
 * FileObject - describes a file object.
 */
class FileObject {
  public file: Blob | File;
  public name: string;
  public isValidFileObject = false;

  /**
   * @constructor
   * @param {any} file - The raw file
   * @param {string} name - The name of the file
   */
  constructor(opts: IFileObjectOpts) {
    if (!opts.file || !opts.name) {
      throw new Error('You must provide the file and its name.');
    }

    this.file = opts.file;
    this.name = opts.name;
    this.isValidFileObject = true;
  }
}

export {
  IFileObjectOpts,
  FileObject
};
