import RequestStrategy from './core';
import AxiosStrategy from './AxiosStrategy';
import FetchStrategy from './FetchStrategy';

const getRequestStrategy = (strategy: any) => {
  if (typeof strategy === 'function' && strategy.prototype instanceof RequestStrategy) {
    return new strategy();
  }

  if (strategy === 'axios') {
    return new AxiosStrategy();
  }
  
  if (strategy === 'fetch') {
    return new FetchStrategy();
  }

  throw new Error(`Unknown request strategy: ${strategy}.`);
};

export {
  getRequestStrategy,
  RequestStrategy
};
