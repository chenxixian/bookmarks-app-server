/// <reference path='../../typings/index.d.ts' />
import * as colors from 'colors';

const msg_404 = {message: 'The requested resource is nonexistent'};
const msg_500 = (err = {}, message = 'Internal Server Error') => ({
  error: err,
  message
});
const logError = (error = 'Internal Server Error') => {
  console.log(colors.bgRed.black('ERROR:'), error);
};

export { msg_404, msg_500, logError };
