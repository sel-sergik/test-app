import moment from 'moment';

export const isObjectEmpty = 
  <T extends {}>(obj: T) => Object.keys(obj).length === 0;

export const formatedTime = () => moment().format('YYYY-MM-DDTHH:mm:ss');
