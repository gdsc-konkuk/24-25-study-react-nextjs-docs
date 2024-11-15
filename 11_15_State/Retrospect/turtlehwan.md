# 세션 2. React state

### 질문 : React의 hook은 왜 배열을 반환하는가? 객체를 반환해도 될 것 같은데.

객체를 반환하면 가독성에 문제가 생길 수 있다.

https://medium.com/@hossein.khoshnevis77/choosing-between-objects-and-arrays-as-return-types-for-custom-react-hooks-4c26aae67f0b

https://stackoverflow.com/questions/74184431/when-to-return-vs-when-creating-a-custom-hook

## State란?

상태 저장

기존 JavaScript + HTML

JS로 변수 값을 변화시킨다 해서 화면에 나타나지 않으니, inerHTML로 View를 수정해주어야 한다.

JS Data → Data Binding → View(HTML)

react가 data binding을 대신 선언적으로 수행해준다. → 서비스나 비즈니스 로직에 집중할 수 있다.

rerendering 과정을 react가 처리해준다.

### State 특징

- rerendering / async / isolate

리렌더링의 트리거 / 값을 기억해서 리렌더링 이후 재적용

값 변화를 추적하고 변화해야 한다.

- rerendering : 값 변화를 잊어서는 안된다.
- Asynchronous : setState, setter의 비동기적 동작
    
    해결하기 위해 콜백 불러오거나
    

- 왜 비동기적 상태 업데이트를 선택했는가?
    - 자식 컴포넌트의 setState
    - 렌더링 과정이 시간이 오래 걸려서 최소화 해야 하는데 하나의 event로 부모와 자식이 업데이트 되며 리렌더링이 중복될 수 있다.
    - → 변화를 모아서 마지막에 한 번에 처리하자. batch 작업
    

- isolated / private : 각 컴포넌트끼리 분리되어 있고, 각 컴포넌트 안의 state는 고립되어 있다.

pitfall - hook은 컴포넌트의 최상단에서만 호출 가능하고, 함수 반복문, 조건문 등에서 호출하지 말라.

useState는 동일하게 선언되는데 어떻게 다른 state임을 알고 관리하는가? ⇒ 선언순서에 따라 배열로 정의해둔다. 그래서 식별자를 붙이지 않아도 된다!!!

선언 순서가 중요하기 때문에 위에서 모아서 관리하자.

옵저버 패턴을 통해 state를 관리하기??

- strictmode에선 initial function 두 번 호출.
- state 변경 시 이전 값과 동일하면 react가 이를 감지하고 rerendering을 유발시키지 않는다.
- useState initializer 안에 함수 호출을 넣지 말라 ( () 붙여서 호출하는 것) → 함수 호출을 넣으면 만약 함수가 시간 비용이 큰 것일 경우 초기화 시 호출되는 것이 어쩔 수 없다. ⇒ 함수 자체를 넘기면 초기화 할 때 사용해 준다.
    - 함수 자체를 상태로 선언하려면 useState initializer에 콜백 함수로 넘기면 된다.
