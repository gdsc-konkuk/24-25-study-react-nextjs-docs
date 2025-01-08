# 4주차(01/06) State Management

### Presentation

동민쌤의 추천: 리액트 훅을 활용한 마이크로 상태 관리 읽어보기

**state란?**

컴포넌트의 동작이나 UI에 영향을 미치는 데이터

**state의 특징**

1. 리렌더링 트리거
2. 독립적으로 관리됨
    - 컴포넌트는 하나의 함수이며, 리렌더링은 재호출을 의미함
    - 재호출 시 변수는 초기화됨
    - 하지만 state는 함수가 재실행되어도 초기화되지 않음
3. 불변성 — state는 직접 수정할 수 없으며, 새로운 값으로만 대체 가능
    - state 변화 감지가 트리거를 유발함
    - React는 state의 메모리 주소 변화로 상태 변화를 감지함

**React에서 state 생성하기**

1. `useState`
2. `useReducer`

**컴포넌트 내부에서 state(지역 상태)를 생성하면 순수 함수가 아니게 됨**

억제된 컴포넌트임

**전역 상태란?**

지역 상태와 전역 상태는 완벽히 구분하기 어려운 추상적 개념임

여러 컴포넌트에 걸쳐 사용되는 것이 전역 상태임

이는 전역과 지역을 대비하기 위한 개념적 구분임

전역 상태는 최소한으로 사용하는 것이 좋음

→ prop drilling과 같은 안티 패턴을 피하기 위해 전역 상태가 필요하지만, 가능한 한 지역 상태를 사용하는 것이 바람직함

React는 전역 상태 관리를 기본 제공하지 않아 Redux 같은 라이브러리를 사용함

**Context란?**

prop 없이 데이터를 공유하기 위한 수단임

(상태 관리용 API가 아닌, 단순 공유 목적)

Context의 Provider는 중첩 사용이 가능함

**Context의 단점**

Provider의 value 중 하나만 변경되어도 전체 컴포넌트가 리렌더링됨

→ 특히 컴포넌트가 루트에 가까울수록 성능 문제가 커짐

⇒ Provider와 Context를 분리해서 사용하면 효율적임(상태 쪼개기)

**useReducer hook 사용**

state를 부분적으로 사용할 수 있어 Context Provider만 분리하고 단일 state 사용이 가능함

커스텀 훅으로 value가 null인지 확인하여 Provider 외부 여부를 판단할 수 있음

동민쌤의 추천: Provider, Hook, Component를 별도 파일로 분리하기

**Subscribe 패턴**

일반적인 구독 패턴

→ store의 전체 객체를 가져와 Context와 같은 문제가 발생함

useStoreSelector 커스텀 훅으로 해결 가능(state의 일부만 반환)

→ useEffect 사용 시 비동기 처리로 인한 즉시 실행 문제 발생 가능

⇒ React의 useSyncExternalStore 훅으로 외부 state의 최신값 유지가 보장됨

**Context와 Subscribe를 함께 사용하면 각각의 장점을 모두 활용할 수 있음**

**Zustand 라이브러리도 동일한 selector 전달 패턴으로 구현되어 있음**

+) 실무에서는 라이브러리 사용이 제한되는 경우가 많아 직접 구현해야 할 수 있음. 이런 직접 구현 경험도 좋은 학습이 됨
