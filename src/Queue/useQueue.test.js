// Core
import React, { useRef } from 'react';
// Test
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
// Hooks
import useQueue from './useQueue';


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

describe('useQueue', () => {
  it('render without errors', () => {
    const TestComponent = () => {
      useQueue();
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });

    expect(container.textContent).toBe('Hello');
  });

  it('return a object', () => {
    const TestComponent = () => {
      const queue = useQueue();

      // Assert
      expect(queue).not.toBe(null);
      expect(queue).not.toBe(undefined);
      expect(typeof queue).toBe('object');

      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component enqueue a value', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const value = 'Monty';
      const queue = useQueue();

      if(counter.current === 0){
        queue.enqueue(value);
      }

      if(counter.current === 1){
        // Assert
        expect(queue.get(0)).toBe(value);
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
      const queue = useQueue();

      if(counter.current === 0){
        queue.enqueue(originalValue);
      }

      if(counter.current === 1){
        queue.set(0, replaceValue);
      }

      if(counter.current === 2){
        // Assert
        expect(queue.get(0)).toBe(replaceValue);
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
      const queue = useQueue();

      if(counter.current === 0){
        queue.enqueue(valueOne);
        queue.enqueue(valueTwo);
        queue.enqueue(valueTree);
      }

      if(counter.current === 1){
        // Assert
        expect(queue.get(0)).toBe(valueOne);
        expect(queue.get(1)).toBe(valueTwo);
        expect(queue.get(2)).toBe(valueTree);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component dequeue a value', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const valueOne = 'Monty';
      const valueTwo = 'Python';
      const queue = useQueue();

      if(counter.current === 0){
        queue.enqueue(valueOne);
        queue.enqueue(valueTwo);
      }

      if(counter.current === 1){
        queue.dequeue();
      }

      if(counter.current === 2){
        // Assert
        expect(queue.get(0)).toBe(valueTwo);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });

  it('trigger a render when the component destroy the Queue', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const valueOne = 'Monty';
      const valueTwo = 'Python';
      const valueTree = 'Flyng';
      const queue = useQueue();

      if(counter.current === 0){
        queue.enqueue(valueOne);
        queue.enqueue(valueTwo);
        queue.enqueue(valueTree);
        queue.dequeue(0);
      }

      if(counter.current === 1){
        queue.destroy();
      }

      if(counter.current === 2){
        // Assert
        expect(() => queue.get(0)).toThrow(RangeError);
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });
});
