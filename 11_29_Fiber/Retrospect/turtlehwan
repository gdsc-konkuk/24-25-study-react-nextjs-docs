# 문서 읽기

## UI를 트리로 이해하기

https://react.dev/learn/understanding-your-ui-as-a-tree

HTML DOM, CSS CSSOM 등의 트리 모델을 이용해 표현

- React도 render tree를 이용해 컴포넌트를 구성한다.

### Render Tree

컴포넌트를 부모 - 자식 관계로 중첩할 수 있고, 이를 렌더 트리라 부른다.

React는 플랫폼에 독립적이다. 즉 HTML 태그를 추상화 해서 개발자는 React Component만 잘 작성하면 React가 HTML에다 렌더링 해준다.

### 모듈 종속성 트리

JS를 imports 하면서 종속성 트리가 생긴다.

## React Fiber Architecture

https://github.com/acdlite/react-fiber-architecture?tab=readme-ov-file

React Fiber의 주요 기능 : **incremental rendering**

## Reconciliation

React는 한 트리를 다른 트리랑 비교해서 어떤 부분을 변경해야 하는지 확인한다.

React API의 핵심 아이디어는 update가 전체 앱을 re-render하는 것처럼 생각하는 것이다. 이를 통해 개발자는 앱을 특정 상태에서 다른 상태로 전환하는 것을 깊게 생각할 필요 없이 선언적 추론 가능하다

React에서 성능 유지하면서 re-rendering 하는 최적화가 Reconciliation

Virtual DOM으로 알려진 알고리즘이 Reconciliation

- Fiber는 Reconciler를 ground-up rewrite 한 것
    - React는 tree를 비교하려 하지 않고, 이전 tree를 완전히 대체한다.
    - list의 diffing은 key를 사용하여 수행되고, key는 stable, predictable, unique 해야 한다.

### 참고 자료

- https://en.wikipedia.org/wiki/Call_stack
- https://github.com/acdlite/react-fiber-architecture?tab=readme-ov-file
- https://github.com/facebook/react/tree/main/packages/react-reconciler
- https://youtu.be/6-MYouU_GGk?si=HGbGf_EUHrE0n2QQ
- https://react.dev/learn/understanding-your-ui-as-a-tree
- https://goidle.github.io/react/in-depth-react-hooks_1/
- https://goidle.github.io/react/in-depth-react18-lane/
- https://d2.naver.com/helloworld/2690975

# 발표 내용

React가 어떻게 UI를 그리는가

Reconciliation : 렌더링 시 변경 사항을 찾아 트리에 적용시키는 것

Reconcile : 조화시키다

State 변경 등으로 발생하는 Rendering하는 경우 Reconciliation으로 최적화.

Virtual DOM이라 불리는 Fiber tree는 실제로 브라우저 뿐 아니라 iOS, Android의 뷰와도 매핑 가능하다. 그래서 Virtual DOM은 Fiber 구조와 정확히 맞지 않다.

- Reconciler가 언제 발생하느냐?
    - useState, useEffect, useReducer 등으로 화면 업데이트가 발생할 때

- Update로 실행되는 연산
    - Fiber tree 구조 변경
    - Fiber props 변경
    - 이 변경 단위를 Work라 부르고, Work를 어떻게 스케쥴링하는지가 중요 관건

- React 디자인 원칙
    - UI 라이브러리는 모든 update가 즉시 적용되지 않아도 된다
        - 키보드 입력 등은 먼저 처리!
    - animation의 update의 우선순위가 data 저장보다 높다
    - Fiber가 도입되기 전까지는 이러한 원칙이 적용되지 않았다 🤔
        - 기존엔 단순 stack base로 work 처리해서 우선순위에 따른 처리를 못했다.
    - React 내부에서 우선순위를 정해서 update 적용한다. ⇒ Scheduling

- Fiber 객체 하나가 React Element 하나에 대응된다.

- 우선순위 work 판단 : Lanes
    - 발생하는 이벤트별로 우선순위를 미리 지정해 Work를 스케쥴링
    - setState( ) API 호출 시 또는 DOM 이벤트 호출 시 Lane이 할당된다
    - 가장 오른쪽 비트가 1일수록 우선순위가 높다.

- Fiber 구조
    - type & key
        - 대응하는 ReactElement가 함수형 컴포넌트라면 function( ), HTMLElement이면 요소의 이름를 type으로 가진다.
        - Key를 이용해 재사용 가능한 Fiber인지 판단한다.
    - child & sibling
        - Fiber의 update가 발생했을 때
        - Parent Fiber가 새로 렌더링 됐을 때
        - 트리 탐색 시 DFS로.
        - Work In Progress로 다음 DOM에 그릴 것을 찾는다.
        - pendingProps & memoizedProps는 WIP Fiber를 생성할 때 변경사항이 Fiber에 존재하는지 확인하기 위해 사용된다.
    - return
    - pendingProps & memoizedProps

- FIber는 Update를 어떻게 아는가?
    - mountState() : useState hook 생성될 때 Fiber에 등록하는 함수
    - dispatchSetState

- Fiber는 상태와 hook을 담는 자료구조, 공간
    - Scheduler가 실제로 work를 처리
