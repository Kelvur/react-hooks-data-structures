
const DEFAULT_NEXT = undefined;

export default class LinkedListNode {

  constructor(newValue){
    this.next = DEFAULT_NEXT;
    this.value = newValue;
  }

  setValue(newValue){
    this.value = newValue;
  }

  getValue(){
    return this.value;
  }

  setNext(newNext){
    this.next = newNext;
  }

  getNext(){
    return this.next;
  }

  destroy(){
    this.next = DEFAULT_NEXT;
    this.value = undefined;
  }

}
