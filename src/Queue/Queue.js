import LinkedList from '../LinkedList';


function Queue(){
  const linkedList = LinkedList();

  function remove(){
    return linkedList.remove(0);
  }

  return {
    add: linkedList.add,
    enqueue: linkedList.add, // Alias
    get: linkedList.get,
    set: linkedList.set,
    remove,
    dequeue: remove, // Alias
    destroy: linkedList.destroy,
    getValues: linkedList.getValues,
    [Symbol.iterator]: linkedList.getValues,
    map: linkedList.map,
    setSideEffect: linkedList.setSideEffect,
  };
}

export default Queue;
