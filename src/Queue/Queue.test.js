// Data Structures
import Queue from './Queue';


describe('Queue', () => {
  it('initialize without errors', () => {
    const queue = Queue();
    expect(queue).not.toBe(undefined);
  });

  test('enqueue function should return the index of the value', () => {
    const newValue = 'John Cleese';
    const queue = Queue();

    const index = queue.enqueue(newValue);

    expect(index).toBe(0);
  });

  test('get function should return the same reference of the enqueued value', () => {
    const queue = Queue();
    const objectReference = {monty: 'Python'};

    queue.enqueue(objectReference);
    const reference = queue.dequeue();

    expect(reference).toBe(objectReference);
  });

  test('enqueue function should be an alias of the add function', () => {
    const queue = Queue();
    expect(queue.add).toBe(queue.enqueue);
  });

  test('get function should return the same reference of the enqueued values', () => {
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    const queue = Queue();

    queue.enqueue(john);
    queue.enqueue(graham);
    queue.enqueue(terry);

    expect(queue.get(0)).toBe(john);
    expect(queue.get(1)).toBe(graham);
    expect(queue.get(2)).toBe(terry);
  });

  test('get function should throws a RangeError exception when index is out of range', () => {
    const queue = Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');

    try{
      queue.get(86);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('set function should set the correct value in the indicated index', () => {
    const queue = Queue();
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
    const queue = Queue();
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
    const queue = Queue();

    try {
      queue.set(-6, 'Horse');
    }catch(error){
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('set function should throw a RangeError exception when the index is out of range', () => {
    const queue = Queue();
    queue.enqueue('x');

    try {
      queue.set(38, 'Horse');
    }catch(error){
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('dequeue function should be an alias of the remove function', () => {
    const queue = Queue();
    expect(queue.remove).toBe(queue.dequeue);
  });

  test('dequeue function should return the same reference of the enqueued value', () => {
    const queue = Queue();
    const objectReference = {monty: 'Python'};

    queue.enqueue(objectReference);
    const reference = queue.dequeue();

    expect(reference).toBe(objectReference);
  });

  test('dequeue function should return the same reference of the enqueued values', () => {
    const queue = Queue();
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

  test('dequeue function should throws a RangeError exception when index is out of range', () => {
    const queue = Queue();

    try{
      queue.dequeue();
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('destroy function should empty the Queue', () => {
    const queue = Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');
    queue.destroy();

    try{
      queue.get(0);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('getValues function return all the values', () => {
    const queue = Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');
    const generator = queue.getValues();

    expect(generator.next().value).toBe('x');
    expect(generator.next().value).toBe('y');
    expect(generator.next().value).toBe('z');
  });

  it('\'s a iterator', () => {
    const queue = Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');

    expect([...queue]).toEqual(['x', 'y', 'z']);
  });

  it('has the function map', () => {
    const queue = Queue();

    queue.enqueue('x');
    queue.enqueue('y');
    queue.enqueue('z');

    expect(queue.map(_ => _)).toEqual(['x', 'y', 'z']);
  });

  it('execute sideEffect after enqueue', () => {
    const queue = Queue();
    const sideEffect = () => {
      expect(true).toBe(true);
    };

    queue.setSideEffect(sideEffect);

    queue.enqueue('x');
  });

  it('execute sideEffect after set', () => {
    const queue = Queue();
    const sideEffect = () => {
      expect(true).toBe(true);
    };
    queue.enqueue('x');
    queue.setSideEffect(sideEffect);

    queue.set(0, 'y');
  });

  it('execute sideEffect after dequeue', () => {
    const queue = Queue();
    const sideEffect = () => {
      expect(true).toBe(true);
    };
    queue.enqueue('y');

    queue.setSideEffect(sideEffect);

    queue.dequeue();
  });

  it('execute sideEffect after destroy', () => {
    const queue = Queue();
    const sideEffect = () => {
      expect(true).toBe(true);
    };

    queue.setSideEffect(sideEffect);

    queue.destroy();
  });

});
