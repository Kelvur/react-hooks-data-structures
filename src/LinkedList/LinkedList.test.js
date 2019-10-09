// Data Structures
import LinkedList from './LinkedList';


describe('LinkedList', () => {
  it('initialize without errors', () => {
    const linkedList = LinkedList();
    expect(linkedList).not.toBe(undefined);
  });

  it('add function should return the index of the value', () => {
    const newValue = 'John Cleese';
    const linkedList = LinkedList();

    const index = linkedList.add(newValue);

    expect(index).toBe(0);
  });

  it('get function should return the same reference of the added value', () => {
    const linkedList = LinkedList();
    const objectReference = {monty: 'Python'};

    linkedList.add(objectReference);
    const getReference = linkedList.get(0);

    expect(getReference).toBe(objectReference);
  });

  it('get function should return the same reference of the added values', () => {
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    const linkedList = LinkedList();

    linkedList.add(john);
    linkedList.add(graham);
    linkedList.add(terry);

    expect(linkedList.get(0)).toBe(john);
    expect(linkedList.get(1)).toBe(graham);
    expect(linkedList.get(2)).toBe(terry);
  });

  it('get function should throws a RangeError exception when index < 0', () => {
    const linkedList = LinkedList();

    try{
      linkedList.get(-45);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  it('get function should throws a RangeError exception when index is out of range', () => {
    const linkedList = LinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    try{
      linkedList.get(86);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  it('set function should set the correct value in the indicated index', () => {
    const linkedList = LinkedList();
    const value = 'Coconut';
    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    linkedList.set(1, value);

    expect(linkedList.get(0)).toBe('x');
    expect(linkedList.get(1)).toBe(value);
    expect(linkedList.get(2)).toBe('z');
  });

  it('set function should the previous value', () => {
    const linkedList = LinkedList();
    const john = 'John Cleese';
    const graham = 'Graham Chapman';
    const terry = 'Terry Gilliam';
    linkedList.add(john);
    linkedList.add(graham);
    linkedList.add(terry);

    const returnedValue = linkedList.set(0, 'Coconut');

    expect(returnedValue).toBe(john);
  });

  it('set function should throw a RangeError exception when the index < zero', () => {
    const linkedList = LinkedList();

    try {
      linkedList.set(-6, 'Horse');
    }catch(error){
      expect(error instanceof RangeError).toBe(true);
    }
  });

  it('set function should throw a RangeError exception when the index is out of range', () => {
    const linkedList = LinkedList();
    linkedList.add('x');

    try {
      linkedList.set(38, 'Horse');
    }catch(error){
      expect(error instanceof RangeError).toBe(true);
    }
  });

  it('remove function should return the same reference of the added value', () => {
    const linkedList = LinkedList();
    const objectReference = {monty: 'Python'};

    linkedList.add(objectReference);
    const reference = linkedList.remove(0);

    expect(reference).toBe(objectReference);
  });

  it('remove function should return the same reference of the added values', () => {
    const linkedList = LinkedList();
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

  it('remove function should throws a RangeError exception when index < 0', () => {
    const linkedList = LinkedList();

    try{
      linkedList.remove(-45);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  it('remove function should throws a RangeError exception when index is out of range', () => {
    const linkedList = LinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    try{
      linkedList.remove(32);
    } catch(error) {
      expect(error instanceof RangeError).toBe(true);
    }
  });

  it('destroy function should empty the LinkedList', () => {
    const linkedList = LinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');
    linkedList.destroy();

    expect(linkedList.get(0)).toBe(undefined);
  });

  it('getValues function return all the values', () => {
    const linkedList = LinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');
    const generator = linkedList.getValues();

    expect(generator.next().value).toBe('x');
    expect(generator.next().value).toBe('y');
    expect(generator.next().value).toBe('z');
  });

  it('\'s a iterator', () => {
    const linkedList = LinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    expect([...linkedList]).toEqual(['x', 'y', 'z']);
  });

  it('has the function map', () => {
    const linkedList = LinkedList();

    linkedList.add('x');
    linkedList.add('y');
    linkedList.add('z');

    expect(linkedList.map(_ => _)).toEqual(['x', 'y', 'z']);
  });

  it('execute sideEffect after add', () => {
    const linkedList = LinkedList();
    const sideEffect = () => {
      expect(true).toBe(true);
    };

    linkedList.setSideEffect(sideEffect);

    linkedList.add('x');
  });

  it('execute sideEffect after set', () => {
    const linkedList = LinkedList();
    const sideEffect = () => {
      expect(true).toBe(true);
    };
    linkedList.add('x');
    linkedList.setSideEffect(sideEffect);

    linkedList.set(0, 'y');
  });

  it('execute sideEffect after remove', () => {
    const linkedList = LinkedList();
    const sideEffect = () => {
      expect(true).toBe(true);
    };
    linkedList.add('y');

    linkedList.setSideEffect(sideEffect);

    linkedList.remove(0);
  });

  it('execute sideEffect after destroy', () => {
    const linkedList = LinkedList();
    const sideEffect = () => {
      expect(true).toBe(true);
    };

    linkedList.setSideEffect(sideEffect);

    linkedList.destroy();
  });

});
