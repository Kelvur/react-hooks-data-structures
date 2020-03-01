
export const DEFAULT_REFERENCE = undefined;

export default class DoubleLinkedListNode {

  constructor(newValue){
    this.value = newValue;
    this.next = DEFAULT_REFERENCE;
    this.prev = DEFAULT_REFERENCE;
  }

  getValue(){
    return this.value;
  }

  setValue(newValue){
    this.value = newValue;
  }

  getNext(){
    return this.next;
  }

  setNext(newNext){
    this.next = newNext;
  }

  getPrevious(){
    return this.prev;
  }

  setPrevious(newPrevious){
    this.prev = newPrevious;
  }

  destroy(){
    this.setValue(undefined);
    this.setNext(DEFAULT_REFERENCE);
    this.setPrevious(DEFAULT_REFERENCE);
  }

}
