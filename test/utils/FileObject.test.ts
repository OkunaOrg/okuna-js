import { expect } from 'chai';
import { FileObject } from '../../src/utils/FileObject';

describe('FileObject', function () {
  describe('@constructor', function () {
    it('should throw if file is not provided', function () {
      return expect(() => new FileObject({ name: 'myfile' } as any))
        .to.throw('You must provide the file and its name.');
    });

    it('should throw if filename is not provided', function () {
      return expect(() => new FileObject({ file: 'yay' } as any))
        .to.throw('You must provide the file and its name.');
    });
  });

  it('should have all parameters', function () {
    const file = {
      file: 'yay',
      name: 'filename'
    };
    const fileObject = new FileObject(file);

    return expect({ file: fileObject.file, name: fileObject.name }).to.eql(file);
  });
});
