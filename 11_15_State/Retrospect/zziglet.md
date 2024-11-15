# 2주차(11/15) State

### Reading

- trouble shooting
  
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/05918415-3f0e-4564-bed2-99de1628a020/a150b8b7-609b-4353-a46d-4fd483c8584f/image.png)

    
- 준필 : 왜 React의 hook은 객체가 아닌 배열을 반환하는가?
    - 모두의 결론 : 가독성과 편의성

### Presentation

- state란 무엇인가..?
    
    지환 : 저장… 렌더링…
    
    준필 : dom에서 저장소 유지..
    
    - 과거 : innerHTML ⇒ 페이지가 복잡해질수록 비효율적인 방식임
        
        ⇒ React의 State를 활용하면 
        

- Data Binding이란?
    
    js 데이터를 html view에 반영하는 과정을 말함
    
    - js는 단방향 데이터 바인딩 → 부모가 자식을 가져오는 방향만 가능

- **다시 state를 정의해보자**
    1. Rerendering
        - rerender되었을 때 변화된 값을 추적, 저장이 가능해야 함
    2. Asynchronous update
        - 렌더링 과정 → 이벤트 발생 시 자식은 부모가 렌더링 되면 중복으로 리렌더링 되는 비효율적인 현상 발생
            
            ⇒ batch 작업으로 한 번에 처리하면 성능을 개선할 수 있지 않을까?
            
            → 리액트 사용하자!
            
    3. isolated /private
        - 각 state는 컴포넌트별로 독립적이다
            - 동일한 컴포넌트를 호출해도 각 컴포넌트는 각자의 상태를 가지게 됨

- **공식문서에서 좋았던?유익했던 점**
    1. pitfall : 함수 컴포넌트의 최상단에서만 hook을 호출할 수 있음
        - conditions, loop, function 내에서 선언하지 말것
    2. Rules of Hooks
        - 하나의 컴포넌트 내에서 여러 개의 state를 선언했을 때 어떻게 구별?
            
            → 따로 식별자 없이 호출되는 순서에 따라 index를 부여해서 가지고 있음
            
            ⇒ 최상단이 아닌 조건문/반복문 등에 hooks가 호출되면 어떤 state인지 react가 구분이 어려움
            
    3. useState
        - strict mode : 두번씩 initializier가 호출되는 모드임 → 좀 더 견고하게? 유지하기 위함
        - set함수 → 값이 동일한 것으로 변경되면 리렌더링이 일어나지 않음
        - state도 객체로 선언될 수 있음 but 직접 수정하지 말아야 함. 리렌더링이 일어나서 수정되도록 작성해야 함
        - 함수의 결과값으로 state를 초기화하고 싶다면 함수 호출식이 아닌 함수 자체를 넘기면 React가 알아서 인식함
        - 함수 자체로 state를 선언하고 싶다면 콜백함수에 담아서 인식하도록!
