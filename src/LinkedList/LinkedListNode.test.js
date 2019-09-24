// Data Structure
import LinkedListNode from './LinkedListNode';


describe('LinkedListNode', () => {
  it('initialice without errors', () => {
    const node = LinkedListNode();
    expect(node).not.toBe(null);
  });

  it('accepts an argument', () => {
    const node = LinkedListNode('asd');
    expect(node).not.toBe(null);
  });

  it('returns the value passed as argument', () => {
    const value = 'Monty';
    const node = LinkedListNode(value);
    expect(node.getValue()).toBe(value);
  });

  it('returns the same ref of value passed as argument', () => {
    const objectReference = {monty: 'Python'};
    const node = LinkedListNode(objectReference);
    expect(node.getValue()).toBe(objectReference);
  });

  it('setValue can override the last value', () => {
    const firstObjectReference = {monty: 'Python'};
    const secondObjectReference = {holy: 'Grail'};
    const node = LinkedListNode(firstObjectReference);
    node.setValue(secondObjectReference);
    expect(node.getValue()).toBe(secondObjectReference);
  });

  it('getNext return undefined by default', () => {
    const objectReference = {monty: 'Python'};
    const node = LinkedListNode(objectReference);
    expect(node.getNext()).toBe(undefined);
  });

  it('getNext return the value passed in setNext', () => {
    const firstObjectReference = {monty: 'Python'};
    const secondObjectReference = {holy: 'Grail'};
    const node = LinkedListNode(firstObjectReference);
    node.setNext(secondObjectReference);
    expect(node.getNext()).toBe(secondObjectReference);
  });

  it('the destroy function put next and value to undefined', () => {
    const firstObjectReference = {monty: 'Python'};
    const secondObjectReference = {holy: 'Grail'};
    const node = LinkedListNode(firstObjectReference);
    node.setNext(secondObjectReference);
    node.destroy();
    expect(node.getValue()).toBe(undefined);
    expect(node.getNext()).toBe(undefined);
  });
});
