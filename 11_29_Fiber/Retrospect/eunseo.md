# React #3

- 날짜: 2024년 11월 29일 오후 1:00 (GMT+9) → 오후 3:00
  
# Official Docs

## Understanding Your UI as a Tree

[Understanding Your UI as a Tree – React](https://react.dev/learn/understanding-your-ui-as-a-tree)

- React가 컴포넌트 구조를 “이해하는” 방법
- 렌더 트리가 무엇이고 어떤 용도로 사용되는지
- 모듈 의존성 트리가 무엇이고 어떤 용도로 사용되는지

# React Fiber: How does react draw UI
### Reconciliation

- 변경 사항을 찾아서 어떤 부분이 변경되어야 하는지 찾는 알고리즘
- 사전적 의미: 조화시키다
- 변경된 부분만 다시 렌더링
- when? Update가 발생할 때
    - `useState`
    - `useEffect`
    - `useReducer`

### Scheduling

- **우선적으로 처리해야 할 것들을 처리하자!!**
- Work: update로 인해 실행되어야 하는 연산
    - Fiber tree의 구조를 변경한다
    - Fiber의 prop을 변경한다
- 리액트의 디자인 원칙
    - UI 라이브러리는 모든 update가 즉시 적용되지 않아도 된다
    - animation의 update의 우선순위가 date 저장보다 높다
    - Fiber가 도입되기 전까지는 이러한 원칙이 적용되지 않았다.

## Fiber

ReactElement에 대응하는 js 객체

- stack frame → 순서가 고정되어 실행순서가 원하는대로 변경 X

Fiber는 스택을 react 컴포넌트들을 위해 재구현한 구현체이다. 한 fiber는 하나의 가상 스택 프레임과 유사하다. 이를 통해서 기존의 스택에서는 하지 못했던 **scheduling**을 구현할 수 있다.

- 우선순위 판단: Lanes
    - 발생하는 이벤트별로 우선순위를 미리 지정해 Work를 스케쥴링
    - `setState()` API 호출 시 또는 DOM 이벤트 호출 시 Lane이 할당된다.

### 구조

- type
    - 대응하는 ReactElement가 함수형 컴포넌트 → function(), HTMLElement →요소의 이름을 type으로
- key
    - key를 이용해 재사용 가능한 Fiber인지 판단
- child & sibling
    - 트리 구조로…
    - 둘 다 다른 fiber를 가리키며 fiber의 재귀적인 tree 구조를 표현한다.
- return
- pendingProps & memorizedProps
    - WIP Fiber를 생성할 때 변경사항이 Fiber에 존재하는지 확인하기 위해 사용됨
- Fiber tree를 DFS 방식으로 순회하며 update가 필요한 Fiber를 찾아 WIP(work in progress) Fiber를 생성
    1. Fiber의 update가 발생했을 때
    2. Parent Fiber가 새로 렌더링됐을 때

### Fiber는 update를 어떻게 알아요?

- `mountState()`

Fiber를 통해 의존성 주입 → `setState` → `dispatchSetState` 를 통해 Fiber가 변경을 알아차림 → `requestUpdateLane` 호출로 lane 부여 & 스케쥴링 실행
