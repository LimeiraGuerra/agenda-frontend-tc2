import { ServerErrorPipe } from './server-error.pipe';

describe('ServerErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ServerErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
