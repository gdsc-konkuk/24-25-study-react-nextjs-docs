# 6주차(2/17) React19

### 1) 비동기 작업 상태 관리 간편화

- before
    - 라이브러리를 활용하여 구현할 수 있었음
- after
    - useTransition hook : 관리 간편화를 위해 업데이트 됨
        - 여러 가지의 업데이트가 동시에 이루어질 때 유저와 관련된 인터랙션 먼저 update
        - concurrent rendering : 상태 update 중 우선순위를 매겨서 업데이트할 수 있도록 함
    
    ⇒ 복잡한 상태관리가 필요한 프로젝트에서 유용하게 사용되는 Hook
    
    - 18과 19 차이
        - 19에서는 async await 사용 가능
        - api 요청도 우선순위를 나눌 수 있게 됨(사용자 입력과 api 요청에서도 우선순위 나눌 수 있음)
    - useActionState hook : useReducer랑 사용방법이 유사함. 상태관리방법, 초기값을 상태에 전달해줌 ⇒ 라이브러리에서도 공식적으로 해당 기능을 제공하게 됨
        - input이 여러 개고 좀 복잡한 Form을 구현할 때 도움이 됨
    - useFormStatus : form의 제출 버튼을 하위 컴포넌트로 따로 뺴내어 상위 폼의 컨택스트를 읽을 수 있음 → 제출 중일 때 제출되지 않도록
        
        ⇒ 라이브러리에서도 공식적으로 해당 기능을 제공하게 됨
        
        <aside>
        💡
        
        지환의 질문 : pending이 굳이 필요한가?
        
        있으면 좋음~
        
        </aside>
        
    
    → 2가지를 같이 쓰면 UX와 DX 적으로도.. 큰 도움이 되리라 생각
    

---

### 2) 낙관적 update → useOptimistic

낙관적 update?

→ 백엔드로 보낸 요청이 성공하리라 믿고 우선 성공ui로 변경해놓고, 실패가 되면 그때 ui를 변경함. ux적으로 성능 향상을 위함

- useOptimistic
    - 낙관적 상태, 상태 update 함수를 받는 친구
    
    <aside>
    💡
    
    react query에서 지원했던 낙관적 update랑 무슨 차이?
    
    react에서 공식적인 라이브러리로 지원해준다는 것이 다른 점
    
    option이 늘었다~
    
    </aside>
    
    - 백엔드 요청말고 프론트 단에서만 업데이트되어야 하는 상태를 관리할 때 유용할 것 같음

---

### 3) use

```jsx
const value = use(resource);
```

Promise, Context에서 값을 읽어올 수 있는 신기한 놈

- promise를 throw하지 않아도 callback ui를 보여줌

~~3,4년 후에는 이 친구로 많이들 건너가지 않을까..~~

---

### 4) React Compiler

1. useMemo : 부모가 rerendering되더라도 props가 변경되지 않은 자식까지 모두 rerendering되는 것을 방지
    
    → 함수 또한 참조가 달라지면 모두 리액트가 새로운 것으로 인지하여 리렌더링 됨
    
    ⇒ useCallback 사용
    
2. useCallback : 해당 함수의 dependency가 바뀌지 않는다면 같은 함수로 취급

<aside>
💡

함수의 값 → useMemo

함수 → useCallback

</aside>

이 모든 작업을 React Compiler가 모두 해줄게!! 라는 것이 공식적인 생각
