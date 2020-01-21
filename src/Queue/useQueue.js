// Core
import { useState } from 'react';
// Data Structures
import Queue from './Queue';


const useQueue = () => {
  const [ queue, setQueue ] = useState(() => new Queue());
  queue.setSideEffect(() => setQueue(queue));
  return queue;
};

export default useQueue;
