
function LinkedListNode(newValue){
  let next = undefined;
  let value = newValue;

  function setValue(newValue){
    value = newValue;
  }

  function getValue(){
    return value;
  }

  function setNext(reference){
    next = reference;
  }

  function getNext(){
    return next;
  }

  function destroy(){
    next = undefined;
    value = undefined;
  }

  return {
    setValue,
    getValue,
    setNext,
    getNext,
    destroy,
  };
}

export default LinkedListNode;
