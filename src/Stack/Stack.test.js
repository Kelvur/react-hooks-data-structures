// Data Structures
import Stack from './Stack';


describe('Stack', () => {
  it('initialize without errors', () => {
    const stack = Stack();
    expect(stack).not.toBe(undefined);
  });

  test('push function should return the index of the value', () => {
    const newValue = 'John Cleese';
    const stack = Stack();

    const index = stack.push(newValue);

    expect(index).toBe(0);
  });

  test('get function should return the same reference of the pushed value', () => {
    const stack = Stack();
    const objectReference = {monty: 'Python'};

    stack.push(objectReference);
    const reference = stack.pop();

    expect(reference).toBe(objectReference);
  });

  test('push function should be an alias of the add function', () => {
    const stack = Stack();
    expect(stack.add).toBe(stack.push);
  });

  test('get function should return the same reference of the pushed values', () => {
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    const stack = Stack();

    stack.push(john);
    stack.push(graham);
    stack.push(terry);

    expect(stack.get(0)).toBe(john);
    expect(stack.get(1)).toBe(graham);
    expect(stack.get(2)).toBe(terry);
  });

  test('get function should throws a RangeError exception when index is out of range', () => {
    const stack = Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');

    try{
      stack.get(86);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('set function should set the correct value in the indicated index', () => {
    const stack = Stack();
    const value = 'Coconut';
    stack.push('x');
    stack.push('y');
    stack.push('z');

    stack.set(1, value);

    expect(stack.get(0)).toBe('x');
    expect(stack.get(1)).toBe(value);
    expect(stack.get(2)).toBe('z');
  });

  test('set function should return the previous value', () => {
    const stack = Stack();
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    stack.push(john);
    stack.push(graham);
    stack.push(terry);

    const returnedValue = stack.set(0, 'Coconut');

    expect(returnedValue).toBe(john);
  });

  test('set function should throw a RangeError exception when the index < zero', () => {
    const stack = Stack();

    try {
      stack.set(-6, 'Horse');
    }catch(error){
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('set function should throw a RangeError exception when the index is out of range', () => {
    const stack = Stack();
    stack.push('x');

    try {
      stack.set(38, 'Horse');
    }catch(error){
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('pop function should be an alias of the remove function', () => {
    const stack = Stack();
    expect(stack.remove).toBe(stack.pop);
  });

  test('po function should return the same reference of the pushed value', () => {
    const stack = Stack();
    const objectReference = {monty: 'Python'};

    stack.push(objectReference);
    const reference = stack.pop();

    expect(reference).toBe(objectReference);
  });

  test('pop function should return the same reference of the pushed values', () => {
    const stack = Stack();
    const objectReferenceA = {monty: 'Python'};
    const objectReferenceB = {holy: 'Grail'};
    const objectReferenceC = {meaning: 'Life'};

    stack.push(objectReferenceA);
    stack.push(objectReferenceB);
    stack.push(objectReferenceC);
    const referenceC = stack.pop();
    const referenceB = stack.pop();
    const referenceA = stack.pop();

    expect(referenceA).toBe(objectReferenceA);
    expect(referenceB).toBe(objectReferenceB);
    expect(referenceC).toBe(objectReferenceC);
  });

  test('pop function should throws a RangeError exception when index is out of range', () => {
    const stack = Stack();

    try{
      stack.pop();
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('getLength function should return 0 when the Stack is empty', () => {
    const stack = Stack();

    expect(stack.getLength()).toBe(0);
  });

  test('getLength function should return the correct number of elements', () => {
    const stack = Stack();

    stack.push('Parrot');
    stack.pop();
    stack.push('Monty');
    stack.push('Python\'s');
    stack.push('Flying');
    stack.push('Spanish Inquisition');
    stack.pop();
    stack.push('Circus');

    expect(stack.getLength()).toBe(4);
  });

  test('getLength function should return 0 after calling destroy', () => {
    const stack = Stack();

    stack.push('Monty');
    stack.push('Python');

    expect(stack.getLength()).toBe(2);

    stack.destroy();

    expect(stack.getLength()).toBe(0);
  });

  test('destroy function should empty the Stack', () => {
    const stack = Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');
    stack.destroy();

    try{
      stack.get(0);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  test('getValues function return all the values', () => {
    const stack = Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');
    const generator = stack.getValues();

    expect(generator.next().value).toBe('x');
    expect(generator.next().value).toBe('y');
    expect(generator.next().value).toBe('z');
  });

  it('\'s a iterator', () => {
    const stack = Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');

    expect([...stack]).toEqual(['x', 'y', 'z']);
  });

  it('has the function map', () => {
    const stack = Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');

    expect(stack.map(_ => _)).toEqual(['x', 'y', 'z']);
  });

  it('execute sideEffect after push', () => {
    const stack = Stack();
    const sideEffect = () => {
      expect(true).toBe(true);
    };

    stack.setSideEffect(sideEffect);

    stack.push('x');
  });

  it('execute sideEffect after set', () => {
    const stack = Stack();
    const sideEffect = () => {
      expect(true).toBe(true);
    };
    stack.push('x');
    stack.setSideEffect(sideEffect);

    stack.set(0, 'y');
  });

  it('execute sideEffect after pop', () => {
    const stack = Stack();
    const sideEffect = () => {
      expect(true).toBe(true);
    };
    stack.push('y');

    stack.setSideEffect(sideEffect);

    stack.pop();
  });

  it('execute sideEffect after destroy', () => {
    const stack = Stack();
    const sideEffect = () => {
      expect(true).toBe(true);
    };

    stack.setSideEffect(sideEffect);

    stack.destroy();
  });

});
