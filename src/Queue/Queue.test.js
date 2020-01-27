// Data Structures
import Queue from './Queue';


describe('Queue', () => {
  it('initialize without errors', () => {
    const queue = new Queue();
    expect(queue).not.toBe(undefined);
  });

  test('enqueue function should return the index of the value', () => {
    const newValue = 'John Cleese';
    const queue = new Queue();

    const index = queue.enqueue(newValue);

    expect(index).toBe(0);
  });

  test('get function should return the same reference of the enqueued value', () => {
    const queue = new Queue();
    const objectReference = {monty: 'Python'};

    queue.enqueue(objectReference);
    const reference = queue.dequeue();

    expect(reference).toBe(objectReference);
  });

  test('enqueue function should be an alias of the add function', () => {
    const queue = new Queue();

    queue.add('x');
    queue.enqueue('y');

    expect(queue.get(0)).toBe('x');
    expect(queue.get(1)).toBe('y');
  });

  test('get function should return the same reference of the enqueued values', () => {
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    const queue = new Queue();

    queue.enqueue(john);
    queue.enqueue(graham);
    queue.enqueue(terry);

    expect(queue.get(0)).toBe(john);
    expect(queue.get(1)).toBe(graham);
    expect(queue.get(2)).toBe(terry);
  });
  test('get function should throws a RangeError exception when index < 0', () => {
    const queue = new Queue();

    expect(() => queue.get(-45)).toThrow(RangeError);
  });
  test('get function should throws a RangeError exception when index is out of range', () => {
    const queue = new Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');

    expect(() => queue.get(86)).toThrow(RangeError);
  });

  test('set function should set the correct value in the indicated index', () => {
    const queue = new Queue();
    const value = 'Coconut';
    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');

    queue.set(1, value);

    expect(queue.get(0)).toBe('x');
    expect(queue.get(1)).toBe(value);
    expect(queue.get(2)).toBe('z');
  });

  test('set function should return the previous value', () => {
    const queue = new Queue();
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    queue.enqueue(john);
    queue.enqueue(graham);
    queue.enqueue(terry);

    const returnedValue = queue.set(0, 'Coconut');

    expect(returnedValue).toBe(john);
  });

  test('set function should throw a RangeError exception when the index < zero', () => {
    const queue = new Queue();

    expect(() => queue.set(-6, 'Horse')).toThrow(RangeError);
  });

  test('set function should throw a RangeError exception when the index is out of range', () => {
    const queue = new Queue();
    queue.enqueue('x');

    expect(() => queue.set(38, 'Horse')).toThrow(RangeError);
  });

  test('dequeue function should be an alias of the remove function', () => {
    const firstQueue = new Queue();
    const secondQueue = new Queue();

    firstQueue.add('A');
    secondQueue.add('Z');

    firstQueue.remove();
    secondQueue.dequeue();

    expect(firstQueue.getLength()).toBe(0);
    expect(secondQueue.getLength()).toBe(0);
  });

  test('dequeue function should return the same reference of the enqueued value', () => {
    const queue = new Queue();
    const objectReference = {monty: 'Python'};

    queue.enqueue(objectReference);
    const reference = queue.dequeue();

    expect(reference).toBe(objectReference);
  });

  test('dequeue function should return the same reference of the enqueued values', () => {
    const queue = new Queue();
    const objectReferenceA = {monty: 'Python'};
    const objectReferenceB = {holy: 'Grail'};
    const objectReferenceC = {meaning: 'Life'};

    queue.enqueue(objectReferenceA);
    queue.enqueue(objectReferenceB);
    queue.enqueue(objectReferenceC);
    const referenceA = queue.dequeue();
    const referenceB = queue.dequeue();
    const referenceC = queue.dequeue();

    expect(referenceA).toBe(objectReferenceA);
    expect(referenceB).toBe(objectReferenceB);
    expect(referenceC).toBe(objectReferenceC);
  });

  test('dequeue function should call destroy in the node removed', () => {
    const queueu = new Queue();

    queueu.add('x');
    queueu.add('y');
    queueu.add('z');

    const nodeX = queueu._getNode(0);

    queueu.dequeue();

    expect(nodeX.getNext()).toBe(undefined);
    expect(nodeX.getValue()).toBe(undefined);
  });

  test('dequeue function should throws a RangeError exception when index is out of range', () => {
    const queue = new Queue();

    expect(() => queue.remove()).toThrow(RangeError);
  });

  test('getLength function should return 0 when the Queue is empty', () => {
    const queue = new Queue();

    expect(queue.getLength()).toBe(0);
  });

  test('getLength function should return the correct number of elements', () => {
    const queue = new Queue();

    queue.enqueue('Parrot');
    queue.dequeue();
    queue.enqueue('Monty');
    queue.enqueue('Python\'s');
    queue.enqueue('Flying');
    queue.enqueue('Spanish Inquisition');
    queue.dequeue();
    queue.enqueue('Circus');

    expect(queue.getLength()).toBe(4);
  });

  test('getLength function should return 0 after calling destroy', () => {
    const queue = new Queue();

    queue.enqueue('Monty');
    queue.enqueue('Python');

    expect(queue.getLength()).toBe(2);

    queue.destroy();

    expect(queue.getLength()).toBe(0);
  });

  test('destroy function should empty the Queue', () => {
    const queue = new Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');
    queue.destroy();

    expect(() => queue.get(0)).toThrow(RangeError);
  });

  test('getValues function return all the values', () => {
    const queue = new Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');
    const generator = queue.getValues();

    expect(generator.next().value).toBe('x');
    expect(generator.next().value).toBe('y');
    expect(generator.next().value).toBe('z');
  });

  it('is a iterator', () => {
    const queue = new Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');

    expect([...queue]).toEqual(['x', 'y', 'z']);
  });

  it('has the function map', () => {
    const queue = new Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');

    expect(queue.map(_ => _)).toEqual(['x', 'y', 'z']);
  });

  it('execute sideEffect after enqueue', () => {
    const queue = new Queue();
    const sideEffect = jest.fn();

    queue.setSideEffect(sideEffect);
    queue.enqueue('x');

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after set', () => {
    const queue = new Queue();
    const sideEffect = jest.fn();
    queue.enqueue('x');

    queue.setSideEffect(sideEffect);
    queue.set(0, 'y');

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after dequeue', () => {
    const queue = new Queue();
    const sideEffect = jest.fn();
    queue.enqueue('y');

    queue.setSideEffect(sideEffect);
    queue.dequeue();

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after destroy', () => {
    const queue = new Queue();
    const sideEffect = jest.fn();

    queue.setSideEffect(sideEffect);
    queue.destroy();

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

});
