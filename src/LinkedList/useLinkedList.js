// Core
import { useState } from 'react';
// Data Structures
import LinkedList from './LinkedList';


const useLinkedList = () => {
  const [ linkedList, setLinkedList ] = useState(() => new LinkedList());
  linkedList.setSideEffect(() => setLinkedList(linkedList));
  return linkedList;
};

export default useLinkedList;
