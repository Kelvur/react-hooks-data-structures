// Core
import React, { useRef } from 'react';
// Test
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// Hooks
import useLinkedList from './useLinkedList';


let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('useLinkedList', () => {
  it('render without errors', () => {
    const TestComponent = () => {
      useLinkedList();
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });

    expect(container.textContent).toBe('Hello');
  });

  it('return a object', () => {
    const TestComponent = () => {
      const linkedList = useLinkedList();

      // Assert
      expect(linkedList).not.toBe(null);
      expect(linkedList).not.toBe(undefined);
      expect(typeof linkedList).toBe('object');

      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component add a value', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const value = 'Monty';
      const linkedList = useLinkedList();

      if(counter.current === 0){
        linkedList.add(value);
      }

      if(counter.current === 1){
        // Assert
        expect(linkedList.get(0)).toBe(value);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component set a value', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const originalValue = 'Monty';
      const replaceValue = 'Python';
      const linkedList = useLinkedList();

      if(counter.current === 0){
        linkedList.add(originalValue);
      }

      if(counter.current === 1){
        linkedList.set(0, replaceValue);
      }

      if(counter.current === 2){
        // Assert
        expect(linkedList.get(0)).toBe(replaceValue);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('updating the component multiple times only trigger one render', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const valueOne = 'Monty';
      const valueTwo = 'Python';
      const valueTree = 'Flyng';
      const linkedList = useLinkedList();

      if(counter.current === 0){
        linkedList.add(valueOne);
        linkedList.add(valueTwo);
        linkedList.add(valueTree);
      }

      if(counter.current === 1){
        // Assert
        expect(linkedList.get(0)).toBe(valueOne);
        expect(linkedList.get(1)).toBe(valueTwo);
        expect(linkedList.get(2)).toBe(valueTree);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component remove a value', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const valueOne = 'Monty';
      const valueTwo = 'Python';
      const linkedList = useLinkedList();

      if(counter.current === 0){
        linkedList.add(valueOne);
        linkedList.add(valueTwo);
      }

      if(counter.current === 1){
        linkedList.remove(0);
      }

      if(counter.current === 2){
        // Assert
        expect(linkedList.get(0)).toBe(valueTwo);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component destroy the LinkedList', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const valueOne = 'Monty';
      const valueTwo = 'Python';
      const valueTree = 'Flyng';
      const linkedList = useLinkedList();

      if(counter.current === 0){
        linkedList.add(valueOne);
        linkedList.add(valueTwo);
        linkedList.add(valueTree);
        linkedList.remove(2);
      }

      if(counter.current === 1){
        linkedList.destroy();
      }

      if(counter.current === 2){
        // Assert
        expect(() => linkedList.get(0)).toThrow(RangeError);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });
});
