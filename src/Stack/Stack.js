import LinkedList from '../LinkedList';


function Stack(){
  const linkedList = LinkedList();

  function remove(){
    return linkedList.remove(linkedList.getLength() - 1);
  }

  return {
    add: linkedList.add,
    push: linkedList.add, // Alias
    get: linkedList.get,
    set: linkedList.set,
    remove,
    pop: remove, // Alias
    getLength: linkedList.getLength,
    destroy: linkedList.destroy,
    getValues: linkedList.getValues,
    [Symbol.iterator]: linkedList.getValues,
    map: linkedList.map,
    setSideEffect: linkedList.setSideEffect,
  };
}

export default Stack;
