import LinkedList from '../LinkedList';


export default class Queue extends LinkedList{

  enqueue(newValue){
    return this.add(newValue);
  }

  dequeue(){
    return this.remove();
  }

  remove(){
    // Don't call to this.remove because
    // cause a infinity call chain.
    // this.remove doesn't reference
    // this own function, the reason is
    // because how LinkedList add side effects
    // to the functions
    return super.remove(0);
  }

}
