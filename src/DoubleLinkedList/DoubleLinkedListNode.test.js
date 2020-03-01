// Data Structure
import DoubleLinkedListNode, { DEFAULT_REFERENCE } from './DoubleLinkedListNode';


describe('DoubleLinkedListNode', () => {
  it('initialize without errors', () => {
    const node = new DoubleLinkedListNode();
    expect(node).not.toBe(null);
  });

  it('accepts an argument', () => {
    const node = new DoubleLinkedListNode('asd');
    expect(node).not.toBe(null);
  });

  it('returns the value passed as argument', () => {
    const value = 'Monty';
    const node = new DoubleLinkedListNode(value);
    expect(node.getValue()).toBe(value);
  });

  it('returns the same ref of value passed as argument', () => {
    const objectReference = {monty: 'Python'};
    const node = new DoubleLinkedListNode(objectReference);
    expect(node.getValue()).toBe(objectReference);
  });

  it('setValue can override the last value', () => {
    const firstObjectReference = {monty: 'Python'};
    const secondObjectReference = {holy: 'Grail'};
    const node = new DoubleLinkedListNode(firstObjectReference);
    node.setValue(secondObjectReference);
    expect(node.getValue()).toBe(secondObjectReference);
  });

  it('getNext return DEFAULT_REFERENCE by default', () => {
    const node = new DoubleLinkedListNode('Parrot');
    expect(node.getNext()).toBe(DEFAULT_REFERENCE);
  });

  it('getNext return the value passed in setNext', () => {
    const node = new DoubleLinkedListNode('Monty');
    const nextNode = new DoubleLinkedListNode('Python');
    node.setNext(nextNode);
    expect(node.getNext()).toBe(nextNode);
  });

  it('getPrevious return DEFAULT_REFERENCE by default', () => {
    const node = new DoubleLinkedListNode('Death');
    expect(node.getPrevious()).toBe(DEFAULT_REFERENCE);
  });

  it('getPrevious return the value passed in setPrevious', () => {
    const node = new DoubleLinkedListNode('Monty');
    const prevNode = new DoubleLinkedListNode('Python');
    node.setPrevious(prevNode);
    expect(node.getPrevious()).toBe(prevNode);
  });

  it('the destroy function put next, previous and value to the default values', () => {
    const node = new DoubleLinkedListNode('Movie');
    const nextNode = new DoubleLinkedListNode('Holy');
    const prevNode = new DoubleLinkedListNode('Grail');
    node.setNext(nextNode);
    node.setPrevious(prevNode);
    node.destroy();
    expect(node.getValue()).toBe(undefined);
    expect(node.getNext()).toBe(DEFAULT_REFERENCE);
    expect(node.getPrevious()).toBe(DEFAULT_REFERENCE);
  });
});
