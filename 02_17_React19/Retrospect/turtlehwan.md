# react 19 발표

비동기 작업에 대한 상태관리 간편화

## useTransition
동시성 관련
상태관리 복잡할 때 유의미.

유저 인터렉션 관련 상태가 먼저 업데이트될 필요가 있을때 사용.

start transition에서 작업 시작

## useActionState
최초 상태와 상태 변경 방법 전달
react hook form
여러개의 input 모은 form의 상태 변경 선언적

## useFormStatus
제출 버튼을 맨 위로 빼내서 상위 폼 상태값 읽어올 수 있음
하위 버튼에서 상위 폼 컨텍스트 읽어오기

## useOptimistic
낙관적 업데이트
백 요청이 성공할 것이라 믿고 일단 유저 작동에 대한 응답을 보여주고 이후 판단해서 추가 업데이트

react query와의 차이??

## use
promise와 context에서 값을 읽어올 수 있다

이전엔 워터폴 방식 api 요청만 가능했는데
suspense로 구역 나눠서 api 콜 가능하다

context에서도 값을 읽어올 수 있다

리액트는 추상화의 달인인가..

## react compiler
기존엔 부모가 렌더링되어도 자식 리렌더 막기 위해 useMemo
단 함수 참조값 변경의 경우엔 useMemo를 써도 리랜더되므로 useCallback

번들링 시점에 컴파일 되는군요

