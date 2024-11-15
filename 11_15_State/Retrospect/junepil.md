# useState 
```js
const [state, setState] = useState(initialState);
```
`useState` 훅은 다음과 같이 사용할 수 있다, `setState` 함수를 통해 state의 상태를 변경하면 컴포넌트가 다시 랜더링된다.

state의 생명 주기는 컴포넌트의 생명 주기와 동일하다. 따라서 컴포넌트가 Fiber에서 삭제되기 전까지 state는 유지된다. 
> prop이 변경되더라도 랜더링이 다시 일어나지 않는다. **vue**에서는 `prop`이 변경될 경우 그 트리에 있는 모든 컴포넌트들이 다시 랜더링되는 것과 차이가 있다.

만약 Fibar에서 동일한 위치에 있을 때 컴포넌트를 초기화시키고 싶다면 컴포넌트에 `key`를 사용하면 된다. `key`가 변경되면 동일한 컴포넌트라고 인식하지 않는다.
- `key`는 parent specific하다.
- `key`에 객체를 사용할 수 없다.
