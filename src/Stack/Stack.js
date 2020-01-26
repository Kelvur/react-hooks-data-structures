import LinkedList from '../LinkedList';


export default class Stack extends LinkedList{

  push(newValue){
    return this.add(newValue);
  }

  pop(){
    return this.remove();
  }

  remove(){
    return super.remove(this.getLength() - 1);
  }

}

