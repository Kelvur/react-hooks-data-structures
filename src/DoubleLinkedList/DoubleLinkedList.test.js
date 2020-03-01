// Data Structures
import DoubleLinkedList from './DoubleLinkedList';


describe('DoubleLinkedList', () => {
  it('initialize without errors', () => {
    const linkedList = new DoubleLinkedList();
    expect(linkedList).not.toBe(undefined);
  });

  test('add function should return the index of the value', () => {
    const newValue = 'John Cleese';
    const linkedList = new DoubleLinkedList();

    const index = linkedList.add(newValue);

    expect(index).toBe(0);
  });

  test('get function should return the same reference of the added value', () => {
    const linkedList = new DoubleLinkedList();
    const objectReference = {monty: 'Python'};

    linkedList.add(objectReference);
    const reference = linkedList.get(0);

    expect(reference).toBe(objectReference);
  });

  test('get function should return the same reference of the added values', () => {
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    const linkedList = new DoubleLinkedList();

    linkedList.add(john);
    linkedList.add(graham);
    linkedList.add(terry);

    expect(linkedList.get(0)).toBe(john);
    expect(linkedList.get(1)).toBe(graham);
    expect(linkedList.get(2)).toBe(terry);
  });

  test('get function should throws a RangeError exception when index < 0', () => {
    const linkedList = new DoubleLinkedList();

    expect(() => linkedList.get(-45)).toThrow(RangeError);
  });

  test('get function should throws a RangeError exception when index is out of range', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');

    expect(() => linkedList.get(1)).toThrow(RangeError);
  });

  test('get function should throws a TypeError when passed a index which type is not integer', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');

    expect(() => linkedList.get(null)).toThrow(TypeError);
    expect(() => linkedList.get()).toThrow(TypeError);
    expect(() => linkedList.get('1')).toThrow(TypeError);
    expect(() => linkedList.get(6.4)).toThrow(TypeError);
    expect(() => linkedList.get(true)).toThrow(TypeError);
  });

  test('set function should set the correct value in the indicated index', () => {
    const linkedList = new DoubleLinkedList();
    const value = 'Coconut';
    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    linkedList.set(1, value);

    expect(linkedList.get(0)).toBe('x');
    expect(linkedList.get(1)).toBe(value);
    expect(linkedList.get(2)).toBe('z');
  });

  test('set function should return the previous value', () => {
    const linkedList = new DoubleLinkedList();
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    linkedList.add(john);
    linkedList.add(graham);
    linkedList.add(terry);

    const returnedValue = linkedList.set(0, 'Coconut');

    expect(returnedValue).toBe(john);
  });

  test('set function should throw a RangeError exception when the index < zero', () => {
    const linkedList = new DoubleLinkedList();

    expect(() => linkedList.set(-6, 'Horse')).toThrow(RangeError);
  });

  test('set function should throw a RangeError exception when the index is out of range', () => {
    const linkedList = new DoubleLinkedList();
    linkedList.add('x');

    expect(() => linkedList.set(38, 'Horse')).toThrow(RangeError);
  });

  test('set function should throws a TypeError when passed a index which type is not integer', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');

    expect(() => linkedList.set(null)).toThrow(TypeError);
    expect(() => linkedList.set()).toThrow(TypeError);
    expect(() => linkedList.set('1')).toThrow(TypeError);
    expect(() => linkedList.set(6.4)).toThrow(TypeError);
    expect(() => linkedList.set(true)).toThrow(TypeError);
  });

  test('remove function should return the same reference of the added value', () => {
    const linkedList = new DoubleLinkedList();
    const objectReference = {monty: 'Python'};

    linkedList.add(objectReference);
    const reference = linkedList.remove(0);

    expect(reference).toBe(objectReference);
  });

  test('remove function should return the same reference of the added values', () => {
    const linkedList = new DoubleLinkedList();
    const objectReferenceA = {monty: 'Python'};
    const objectReferenceB = {holy: 'Grail'};
    const objectReferenceC = {meaning: 'Life'};

    linkedList.add(objectReferenceA);
    linkedList.add(objectReferenceB);
    linkedList.add(objectReferenceC);
    const referenceA = linkedList.remove(0);
    const referenceC = linkedList.remove(1);
    const referenceB = linkedList.remove(0);

    expect(referenceA).toBe(objectReferenceA);
    expect(referenceB).toBe(objectReferenceB);
    expect(referenceC).toBe(objectReferenceC);
  });

  test('remove function should call destroy in the node removed', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    const nodeY = linkedList._getNode(1);

    linkedList.remove(1);

    expect(nodeY.getNext()).toBe(undefined);
    expect(nodeY.getValue()).toBe(undefined);
  });

  test('remove function should call destroy when removing the head', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');
    linkedList.add('y');

    const nodeX = linkedList._getNode(0);

    linkedList.remove(0);

    expect(nodeX.getNext()).toBe(undefined);
    expect(nodeX.getValue()).toBe(undefined);
  });

  test('remove function should throws a RangeError exception when index < 0', () => {
    const linkedList = new DoubleLinkedList();

    expect(() => linkedList.remove(-45)).toThrow(RangeError);
  });

  test('remove function should throws a RangeError exception when index is out of range', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    expect(() => linkedList.remove(32)).toThrow(RangeError);
  });

  test('remove function should throws a TypeError when passed a index which type is not integer', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');

    expect(() => linkedList.remove(null)).toThrow(TypeError);
    expect(() => linkedList.remove()).toThrow(TypeError);
    expect(() => linkedList.remove('1')).toThrow(TypeError);
    expect(() => linkedList.remove(6.4)).toThrow(TypeError);
    expect(() => linkedList.remove(true)).toThrow(TypeError);
  });

  test('getLength function should return 0 when the DoubleLinkedList is empty', () => {
    const linkedList = new DoubleLinkedList();

    expect(linkedList.getLength()).toBe(0);
  });

  test('getLength function should return the correct number of elements', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('Parrot');
    linkedList.remove(0);
    linkedList.add('Monty');
    linkedList.add('Python\'s');
    linkedList.add('Flying');
    linkedList.add('Spanish Inquisition');
    linkedList.remove(3);
    linkedList.add('Circus');

    expect(linkedList.getLength()).toBe(4);
  });

  test('getLength function should return 0 after calling destroy', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('Monty');
    linkedList.add('Python');

    expect(linkedList.getLength()).toBe(2);

    linkedList.destroy();

    expect(linkedList.getLength()).toBe(0);
  });

  test('destroy function should empty the DoubleLinkedList', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');
    linkedList.destroy();

    expect(() => linkedList.get(0)).toThrow(RangeError);
  });

  test('getValues function return all the values', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');
    const generator = linkedList.getValues();

    expect(generator.next().value).toBe('x');
    expect(generator.next().value).toBe('y');
    expect(generator.next().value).toBe('z');
  });

  it('is a iterator', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    expect([...linkedList]).toEqual(['x', 'y', 'z']);
  });

  it('has the function map', () => {
    const linkedList = new DoubleLinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    expect(linkedList.map(_ => _)).toEqual(['x', 'y', 'z']);
  });

  it('execute sideEffect after add', () => {
    const linkedList = new DoubleLinkedList();
    const sideEffect = jest.fn();

    linkedList.setSideEffect(sideEffect);
    linkedList.add('x');

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after set', () => {
    const linkedList = new DoubleLinkedList();
    const sideEffect = jest.fn();
    linkedList.add('x');

    linkedList.setSideEffect(sideEffect);
    linkedList.set(0, 'y');

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after remove', () => {
    const linkedList = new DoubleLinkedList();
    const sideEffect = jest.fn();
    linkedList.add('y');

    linkedList.setSideEffect(sideEffect);
    linkedList.remove(0);

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after destroy', () => {
    const linkedList = new DoubleLinkedList();
    const sideEffect = jest.fn();

    linkedList.setSideEffect(sideEffect);
    linkedList.destroy();

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

});
