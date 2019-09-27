// Core
import { useState } from 'react';
// Data Structures
import LinkedList from './LinkedList';


const useLinkedList = () => {
  const [ linkedList, setLinkedList ] = useState(() => LinkedList());
  linkedList.setSideEffect(() => setLinkedList(linkedList));
  return linkedList;
};

export default useLinkedList;
