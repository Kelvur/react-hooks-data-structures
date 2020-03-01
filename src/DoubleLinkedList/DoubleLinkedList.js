import DoubleLinkedListNode from './DoubleLinkedListNode';


const DEFAULT_HEAD = undefined;

export default class DoubleLinkedList {

  constructor(){
    this.head = DEFAULT_HEAD;
    this.length = 0;
    this.sideEffect = {
      current: () => {},
    };

    // The classes who extends this class and override
    // the functions listed below will pass they own
    // implementation to this._runSideEffectAfter
    this.set = this._runSideEffectAfter(this.set);
    this.add = this._runSideEffectAfter(this.add);
    this.remove = this._runSideEffectAfter(this.remove);
    this.destroy = this._runSideEffectAfter(this.destroy);
  }

  add(value){
    if(this._isDefaultHead()){
      this.head = new DoubleLinkedListNode(value);
    } else if(this.length === 1) {
      const newNode = new DoubleLinkedListNode(value);
      newNode.setNext(this.head);
      newNode.setPrevious(this.head);
      this.head.setNext(newNode);
      this.head.setPrevious(newNode);
    } else {
      const newLastNode = new DoubleLinkedListNode(value);
      const actualLastNode = this.head.getPrevious();
      actualLastNode.setNext(newLastNode);
      newLastNode.setPrevious(actualLastNode);
      newLastNode.setNext(this.head);
      this.head.setPrevious(newLastNode);
    }
    return this.length++;
  }

  get(index){
    this._validateIndex(index);
    return this._getNode(index).getValue();
  }

  set(index, newValue){
    this._validateIndex(index);
    const node = this._getNode(index);
    const prevValue = node.getValue();
    node.setValue(newValue);
    return prevValue;
  }

  remove(index){
    this._validateIndex(index);
    const targetNode = this._getNode(index);
    if(index === 0){
      this.head = this.head.getNext() || DEFAULT_HEAD;
    } else {
      const prevNode = targetNode.getPrevious();
      const nextNode = targetNode.getNext();
      prevNode.setNext(nextNode);
      nextNode.setPrevious(prevNode);
    }
    const value = targetNode.getValue();
    targetNode.destroy();
    this.length--;
    return value;
  }

  destroy(){
    let current = this.head;
    for(let i = 0; i < this.length; i++){
      const next = current.getNext();
      current.destroy();
      current = next;
    }
    this.head = DEFAULT_HEAD;
    this.length = 0;
  }

  getLength(){
    return this.length;
  }

  *getValues(){
    let current = this.head;
    for(let i = 0; i < this.length; i++){
      yield current.getValue();
      current = current.getNext();
    }
  }

  [Symbol.iterator](){
    return this.getValues();
  }

  map(callback){
    return [...this.getValues()].map(callback);
  }

  setSideEffect(newSideEffect){
    this.sideEffect.current = newSideEffect;
  }

  _isDefaultHead(){
    return this.head === DEFAULT_HEAD;
  }

  _generateIndexIsNotAIntegerError(index){
    return new TypeError(`The argment index should be a interger, instead get a ${typeof index}`);
  }

  _generateIndexLessThanZeroError(){
    return new RangeError('The argument Index cannot be less than zero');
  }

  _generateOutOfRangeError(){
    return new RangeError('The argument Index is out of range');
  }

  _validateIndex(index){
    if(!Number.isInteger(index)) throw this._generateIndexIsNotAIntegerError(index);
    if(index < 0) throw this._generateIndexLessThanZeroError();
    if(index >= this.length) throw this._generateOutOfRangeError();
  }

  _getNode(index){
    let current = this.head;
    for(let i = 0;i < index; i++){
      current = current.getNext();
    }
    return current;
  }

  _runSideEffectAfter(func){
    const bindedFunction = func.bind(this);
    return (...arg) => {
      const value = bindedFunction(...arg);
      this.sideEffect.current();
      return value;
    };
  }

}
