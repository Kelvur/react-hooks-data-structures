// Core
import React, { useState, useRef } from 'react';
// Test
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';


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

describe('ReactJs', () => {
  it('only render the component once after multiple updates in the same cycle', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const [state, setState] = useState(() => 'Monty');

      if(counter.current === 0){
        setState('Python');
        setState('And');
        setState('The');
        setState('Holy');
        setState('Grial');
      }

      if(counter.current === 1){
        // Assert
        expect(state).toBe('Grial');
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });

  });

  it('don\'t update the state synchronously after updates', () => {
    const TestComponent = () => {
      const counter = useRef(0);
      const [state, setState] = useState(() => 'Monty');

      if(counter.current === 0){
        setState('Python');

        // Assert
        expect(state).toBe('Monty');
      }

      if(counter.current === 1){
        // Assert
        expect(state).toBe('Python');
      }

      counter.current++;
      return <span>Hello</span>;
    };

    act(() => {
      render(<TestComponent />, container);
    });
  });
});
