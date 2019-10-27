// Data Structures
import LinkedListNode from './LinkedListNode';


function generateIndexLessThatZeroError(){
  return new RangeError('The argument Index cannot be less than zero');
}

function generateOutOfRangeError(){
  return new RangeError('The argument Index is out of range');
}

function validateIndex(index){
  if(index < 0) throw generateIndexLessThatZeroError();
}

function validateHead(head){
  if(head === undefined) throw generateOutOfRangeError();
}

function validateIndexAndHead(index, head){
  validateIndex(index);
  validateHead(head);
}

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
    validateIndexAndHead(index, head);

    let current = head;
    let i = 0;
    while(current.getNext()){
      if(i === index){
        break;
      }
      i++;
      current = current.getNext();
    }
    if(i !== index){
      throw generateOutOfRangeError();
    }
    return current.getValue();
  }

  function set(index, value){
    validateIndexAndHead(index, head);

    let current = head;
    let i = 0;
    while(current.getNext()){
      if(i === index){
        break;
      }
      i++;
      current = current.getNext();
    }
    if(i !== index){
      throw generateOutOfRangeError();
    }

    const previousValue = current.getValue();
    current.setValue(value);
    return previousValue;
  }

  function remove(index){
    validateIndexAndHead(index, head);

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
    if(i !== index){
      throw generateOutOfRangeError();
    }
    const value = current.getValue();
    previous.setNext(current.getNext());
    current.destroy();
    return value;
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
    set: _runSideEffectAfter(set),
    remove: _runSideEffectAfter(remove),
    destroy: _runSideEffectAfter(destroy),
    getValues,
    [Symbol.iterator]: getValues,
    map,
    setSideEffect,
  };
}

export default LinkedList;
