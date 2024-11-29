# 3주차(11/29) React Fiber

### Reading

- fiber란?
    - react에서 내가 원하는 부분만 re렌더링 하는 느낌이랄까…… 그것을 위해서 필요한 놈
- 공식문서에서 ui가 컴포넌트 tree로 설계된다는 점이 핵심

### Presentation

공식 문서에서 ui가 어떻게 트리로 구현되는가를 집중적으로 살펴보자가 발표의 주제

### **Reconciliation(조화시키다) 알고리즘**

컴포넌트가 변환된 부분을 찾아서 그것만 그 상태로 변환해주는 거 → 변환된 상태가 원래와 조화되도록

<aside>
💡

발표에서 렌더링을 화면에 그리는 것이라고 표현하겠다….

</aside>

→ 이 의미에서 reconciliation은 화면에 다시 변경된 부분만 렌더링한다고 생각할 수 있겠음..

⇒ 개발자가 효율적인 렌더링을 고민할 이유가 없음

**virtual DOM이라고 이해해도 되나요?**

reconciliation은 브라우저에서 그려지는 dom이랑 일대일 매핑되는 느낌이 아님

fiber tree라고 이해해보자

추적은 reconciliation, 화면 그림은 DOM ⇒ 여러가지 타겟을 그려주는 친구 라고 이해해보자

**WHEN?**

컴포넌트에서 hook을 사용할 때 reconciliation이 작동됨

**Scheduling**

reconciliation의 update → fiber tree의 구조를 변경 혹은 fiber의 prop을 변경 등의 작업이 나타나야 함

⇒ 해당 작업 단위를 work라고 함.

→ fiber 구현에서 work를 어떻게 스케쥴링 하느냐가 중요

**리액트의 디자인원칙**

fiber 도입으로 work의 우선순위(사용자 경험에 많이 미치는 것)을 먼저 처리해서 ux 성능을 올리는 알고리즘을 구현함 → reconciliation

개발자의 따로 지정 없이 리액트가 자체적으로 우선순위를 매김

---

### **Fiber**

js 엔진 : react element↔fiber object가 대응함

→ 우선순위에 따른 스케쥴링이 가능해짐

**그럼 우선순위는 어떻게 판단?**

Lanes로 판단

**fiber 변수**

1. type : 함수형 or HTMLElement 넣음
2. key : 재사용 가능한 fiber인지 판단
3. child & sibling : 값이 하나씩만 가지고 있음  
    1. dfs로 tree를 탐색하면서 탐색할 때마다 work가 실행됨
    2. work에 해당하는? wip가 붙은 프로세스가 다음 fiber tree를 만든다?….

---

### 지환짱의 질문..

1. work가 어디에 등록되는건가?
    
    준필: fiber는 담는 통일 뿐, 스케쥴러에 등록된다!
    
2. fiber가 성능 저하를 가져오는 거 아닌가?
    
    모두의 결론 : 개발자가 편리, ux 향상…
    
3. setState가 비동기적 뭐라고?
    
    지환짱이 적어줘…
    
4. 준필 : React에 10%나 Rust 코드가 있다리? react 번들러 쪽에 있다리
    
    공부해봄직 하겠다~~~…
    
    Rust 메모리 소유권…. 참 문법 비슷하다리
    
    Rust 타입 지원이 편함
