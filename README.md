# React Hooks Data Structures

The purpose of this project is to bring you basic data structures through React hooks.


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install `react-hooks-data-structures`.

```shell
npm i react-hooks-data-structures
```


## Usage

```javascript
import { useLinkedList } from 'react-hooks-data-structures/LinkedList';


const SomeComponent = (props) => {
  const linkedList = useLinkedList();

  const handleClick = useCallback((evt) => {
    linkedList.add(evt.target.value);
  }, []);

  return (
    <>
      {linkedList.map((value, idx) => <Item key={idx}>{value}</Item>)}
    </>
  )
}

```


## License
[MIT](https://choosealicense.com/licenses/mit/)
