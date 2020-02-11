// Core
import { useState } from 'react';
// Data Structures
import Stack from './Stack';


const useStack = () => {
  const [ linkedList, setStack ] = useState(() => new Stack());
  linkedList.setSideEffect(() => setStack(linkedList));
  return linkedList;
};

export default useStack;
