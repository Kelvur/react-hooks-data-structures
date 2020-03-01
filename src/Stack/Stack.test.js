// Data Structures
import Stack from './Stack';


describe('Stack', () => {
  it('initialize without errors', () => {
    const stack = new Stack();
    expect(stack).not.toBe(undefined);
  });

  test('push function should return the index of the value', () => {
    const newValue = 'John Cleese';
    const stack = new Stack();

    const index = stack.push(newValue);

    expect(index).toBe(0);
  });

  test('get function should return the same reference of the pushed value', () => {
    const stack = new Stack();
    const objectReference = {monty: 'Python'};

    stack.push(objectReference);
    const reference = stack.pop();

    expect(reference).toBe(objectReference);
  });

  test('push function should do the same of the add function', () => {
    const stackOne = new Stack();
    const stackTwo = new Stack();

    stackOne.push('Monty');
    stackTwo.add('Python');

    expect(stackOne.getLength()).toBe(stackTwo.getLength());
  });

  test('get function should return the same reference of the pushed values', () => {
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    const stack = new Stack();

    stack.push(john);
    stack.push(graham);
    stack.push(terry);

    expect(stack.get(0)).toBe(john);
    expect(stack.get(1)).toBe(graham);
    expect(stack.get(2)).toBe(terry);
  });

  test('get function should throws a RangeError exception when index is out of range', () => {
    const stack = new Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');

    expect(() => stack.get(86)).toThrow(RangeError);
  });

  test('get function should throws a TypeError when passed a index which type is not integer', () => {
    const stack = new Stack();

    stack.add('x');

    expect(() => stack.get(null)).toThrow(TypeError);
    expect(() => stack.get()).toThrow(TypeError);
    expect(() => stack.get('1')).toThrow(TypeError);
    expect(() => stack.get(6.4)).toThrow(TypeError);
    expect(() => stack.get(true)).toThrow(TypeError);
  });

  test('set function should set the correct value in the indicated index', () => {
    const stack = new Stack();
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
    const stack = new Stack();
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
    const stack = new Stack();

    expect(() => stack.set(-6, 'Horse')).toThrow(RangeError);
  });

  test('set function should throw a RangeError exception when the index is out of range', () => {
    const stack = new Stack();
    stack.push('x');

    expect(() => stack.set(38, 'Horse')).toThrow(RangeError);
  });

  test('set function should throws a TypeError when passed a index which type is not integer', () => {
    const stack = new Stack();

    stack.add('x');

    expect(() => stack.set(null)).toThrow(TypeError);
    expect(() => stack.set()).toThrow(TypeError);
    expect(() => stack.set('1')).toThrow(TypeError);
    expect(() => stack.set(6.4)).toThrow(TypeError);
    expect(() => stack.set(true)).toThrow(TypeError);
  });

  test('pop function should do the same of the remove function', () => {
    const stackOne = new Stack();
    const stackTwo = new Stack();
    stackOne.push('x');
    stackOne.push('y');
    stackTwo.push('A');
    stackTwo.push('B');

    stackOne.pop();
    stackTwo.remove();

    expect(stackOne.getLength()).toBe(stackTwo.getLength());
  });

  test('pop function should return the same reference of the pushed value', () => {
    const stack = new Stack();
    const objectReference = {monty: 'Python'};

    stack.push(objectReference);
    const reference = stack.pop();

    expect(reference).toBe(objectReference);
  });

  test('pop function should return the same reference of the pushed values', () => {
    const stack = new Stack();
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
    const stack = new Stack();

    expect(() => stack.pop()).toThrow(RangeError);
  });

  test('getLength function should return 0 when the Stack is empty', () => {
    const stack = new Stack();

    expect(stack.getLength()).toBe(0);
  });

  test('getLength function should return the correct number of elements', () => {
    const stack = new Stack();

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
    const stack = new Stack();

    stack.push('Monty');
    stack.push('Python');

    expect(stack.getLength()).toBe(2);

    stack.destroy();

    expect(stack.getLength()).toBe(0);
  });

  test('destroy function should empty the Stack', () => {
    const stack = new Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');
    stack.destroy();

    expect(() => stack.get(0)).toThrow(RangeError);
  });

  test('destroy function should work when empty', () => {
    const stack = new Stack();

    stack.destroy();

    expect(stack.getLength()).toBe(0);
    expect(() => stack.get(0)).toThrow(RangeError);
  });

  test('getValues function return all the values', () => {
    const stack = new Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');
    const generator = stack.getValues();

    expect(generator.next().value).toBe('x');
    expect(generator.next().value).toBe('y');
    expect(generator.next().value).toBe('z');
  });

  it('is a iterator', () => {
    const stack = new Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');

    expect([...stack]).toEqual(['x', 'y', 'z']);
  });

  it('has the function map', () => {
    const stack = new Stack();

    stack.push('x');
    stack.push('y');
    stack.push('z');

    expect(stack.map(_ => _)).toEqual(['x', 'y', 'z']);
  });

  it('execute sideEffect after push', () => {
    const stack = new Stack();
    const sideEffect = jest.fn();

    stack.setSideEffect(sideEffect);
    stack.push('x');

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after set', () => {
    const stack = new Stack();
    const sideEffect = jest.fn();
    stack.push('x');
    stack.setSideEffect(sideEffect);

    stack.set(0, 'y');

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after pop', () => {
    const stack = new Stack();
    const sideEffect = jest.fn();
    stack.push('y');

    stack.setSideEffect(sideEffect);
    stack.pop();

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

  it('execute sideEffect after destroy', () => {
    const stack = new Stack();
    const sideEffect = jest.fn();

    stack.setSideEffect(sideEffect);
    stack.destroy();

    expect(sideEffect).toHaveBeenCalledTimes(1);
  });

});
