// Core
import LinkedListNode from './LinkedListNode';


const DEFAULT_HEAD = undefined;

export default class LinkedList {

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

  add(newValue){
    const newNode = new LinkedListNode(newValue);
    if(this._isDefaultHead()){
      this.head = newNode;
    } else {
      const last = this._getNode(this.length - 1);
      last.setNext(newNode);
    }
    this.length++;
    return this.length - 1;
  }

  get(index){
    return this._getNode(index).getValue();
  }

  set(index, newValue){
    const node = this._getNode(index);
    const previousValue = node.getValue();
    node.setValue(newValue);
    return previousValue;
  }

  remove(index){
    this._validateIndexAndHead(index);

    let value = this.head.getValue();
    let current = this.head;
    if(index === 0){ // Case: remove index 0
      this.head = current.getNext();
    } else {
      current = current.getNext();
      let previous = this.head;
      let i = 1;
      while(current.getNext()){
        if(i === index){
          break;
        }
        i++;
        previous = current;
        current = current.getNext();
      }
      value = current.getValue();
      previous.setNext(current.getNext());
    }

    current.destroy();
    this.length--;
    return value;
  }

  getLength(){
    return this.length;
  }

  destroy(){
    let current = this.head;
    while(current !== DEFAULT_HEAD){
      const next = current.getNext();
      current.destroy();
      current = next;
    }
    this.head = DEFAULT_HEAD;
    this.length = 0;
  }

  *getValues(){
    let current = this.head;
    while(current !== undefined){
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

  _isDefaultHead() {
    return this.head === DEFAULT_HEAD;
  }

  _getNode(index){
    this._validateIndexAndHead(index);

    let current = this.head;
    let i = 0;
    while(current.getNext()){
      if(i === index){
        break;
      }
      i++;
      current = current.getNext();
    }
    return current;
  }

  _generateOutOfRangeError(){
    return new RangeError('The argument Index is out of range');
  }

  _generateIndexLessThatZeroError(){
    return new RangeError('The argument Index cannot be less than zero');
  }

  _validateIndexAndHead(index){
    this._validateIndex(index);
    this._validateHead();
  }

  _validateIndex(index){
    if(index < 0) throw this._generateIndexLessThatZeroError();
    if(index > (this.length - 1)) throw this._generateOutOfRangeError();
  }

  _validateHead(){
    if(this.head === undefined) throw this._generateOutOfRangeError();
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
