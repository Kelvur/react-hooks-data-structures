import LinkedList from '../LinkedList';


export default class Queue extends LinkedList{

  enqueue(newValue){
    return this.add(newValue);
  }

  dequeue(){
    return this.remove();
  }

  remove(){
    return super.remove(0);
  }

}
