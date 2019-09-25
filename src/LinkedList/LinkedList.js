// Data Structures
import LinkedListNode from './LinkedListNode';


function LinkedList(){
  let head = undefined;
  const sideEffect = {
    current: () => {},
  };

  function add(newValue){
    const newNode = LinkedListNode(newValue);
    let index = 0;
    if(head === undefined){
      head = newNode;
    } else {
      let current = head;
      while(current.getNext() !== undefined){
        index++;
        current = current.getNext();
      }
      current.setNext(newNode);
    }
    return index;
  }

  function get(index){
    if(index < 0 || head === undefined){
      return undefined;
    }
    let current = head;
    let i = 0;
    while(current.getNext()){
      if(i === index){
        break;
      }
      i++;
      current = current.getNext();
    }
    return i === index ? current.getValue() : undefined;
  }

  function remove(index){
    if(index < 0 || head === undefined){
      return undefined;
    }
    // Case: remove index 0
    if(index === 0){
      const value = head.getValue();
      head = head.getNext();
      return value;
    }
    let current = head.getNext();
    let previous = head;
    let i = 1;
    while(current.getNext()){
      if(i === index){
        break;
      }
      i++;
      previous = current;
      current = current.getNext();
    }
    if(i === index){
      const value = current.getValue();
      previous.setNext(current.getNext());
      current.destroy();
      return value;
    }
    return undefined;
  }

  function destroy(){
    let current = head;
    while(current !== undefined){
      const next = current.getNext();
      current.destroy();
      current = next;
    }
  }

  function *getValues(){
    let current = head;
    while(current !== undefined){
      yield current.getValue();
      current = current.getNext();
    }
  }

  function map(callback){
    return [...getValues()].map(callback);
  }

  function setSideEffect(newSideEffect){
    sideEffect.current = newSideEffect;
  }

  function _runSideEffectAfter(func){
    return (function(sideEffect, ...arg){
      const value = func(...arg);
      sideEffect.current();
      return value;
    }).bind(null, sideEffect);
  }

  return {
    add: _runSideEffectAfter(add),
    get,
    remove: _runSideEffectAfter(remove),
    destroy: _runSideEffectAfter(destroy),
    getValues,
    [Symbol.iterator]: getValues,
    map,
    setSideEffect,
  };
}

export default LinkedList;
