import moment from 'moment';

export const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;

export const formatedTime = () => moment().format('YYYY-MM-DDTHH:mm:ss');