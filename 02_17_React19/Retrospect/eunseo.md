# useTransition

: 유저가 원하는 업데이트를 먼저 하도록

Low priority update를 하다가도 urgent update를 하도록

# useActionState

```jsx
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

폼 액션의 결과를 기반으로 State를 업데이트할 수 있다.

# useFormStatus

하위 컴포넌트에서 상위 컨텍스트의 값(data, pending)을 잘 읽어올 수 있다.

# useOptimistic

낙관적 업데이트: 요청을 보낼 때 그게 성공할 거라고 믿고 업데이트를 미리 하는 것

요청 성공 → 그대로, 요청 실패 → 에러

ux를 위한 것!

# use

promise와 context에서 값을 읽어올 수 있는 훅

# React Compiler
