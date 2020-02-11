// Core
import React, { useRef } from 'react';
// Test
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// Hooks
import useStack from './useStack';


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

describe('useStack', () => {
  it('render without errors', () => {
    const TestComponent = () => {
      useStack();
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });

    expect(container.textContent).toBe('Hello');
  });

  it('return a object', () => {
    const TestComponent = () => {
      const linkedList = useStack();

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

  it('trigger a render when the component push a value', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const value = 'Monty';
      const linkedList = useStack();

      if(counter.current === 0){
        linkedList.push(value);
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
      const linkedList = useStack();

      if(counter.current === 0){
        linkedList.push(originalValue);
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
      const linkedList = useStack();

      if(counter.current === 0){
        linkedList.push(valueOne);
        linkedList.push(valueTwo);
        linkedList.push(valueTree);
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

  it('trigger a render when the component pop a value', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const valueOne = 'Monty';
      const valueTwo = 'Python';
      const linkedList = useStack();

      if(counter.current === 0){
        linkedList.push(valueOne);
        linkedList.push(valueTwo);
      }

      if(counter.current === 1){
        linkedList.pop();
      }

      if(counter.current === 2){
        // Assert
        expect(linkedList.get(0)).toBe(valueOne);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component destroy the Stack', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const valueOne = 'Monty';
      const valueTwo = 'Python';
      const valueTree = 'Flyng';
      const linkedList = useStack();

      if(counter.current === 0){
        linkedList.push(valueOne);
        linkedList.push(valueTwo);
        linkedList.push(valueTree);
        linkedList.pop();
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
