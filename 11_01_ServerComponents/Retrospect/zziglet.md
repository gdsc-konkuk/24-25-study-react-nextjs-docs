## 🍥 1주차(11/1) : React Server Components

<br />

### Reading

<br />

**Today's Topic**

<br />

1. Server Components without a Server
    - without server component
    - with server component
2. Server Components with a Server
    - without server component
    - with server component
3. Server actions
    - useActionState
4. useClient, useServer

<br />

**느낀 점**

<br />

- 영어..어렵다..
- Server와 Client의 경계가 너무 모호해지는 거 아닌가?..
- useActionState?? 처음 들어봤음 
- 지환님이 보내주신 유익했던 링크 : SSR & Hydration 이랑 React Server Component의 차이 (https://devmill.tistory.com/m/42)

<br />

### Presentation (단순 끄적임..)

<br />

SSR : html을 변경
CSR : html은 그대로 js 변경 → 그치만 js bundle이 너무 무거워져서 컨텐츠 렌더링까지 시간이 너무 오래 걸림(FCP까지)

- useServer(하나의 엔드포인트를 지가 직접 만들어 버림??? 이게 ...)
  ⇒ 🐧의 tip : 직렬화 되는 인자만.. Next.js 공부할 때 조금 알고 하자..
- useClient : 사용하는 함수의 인자는 직렬화되는 애들만 넣어놔야 함

React : 대부분 서버 컴포넌트로 작성하고 최소한만 클라이언트 컴포넌트로 선언해서 성능을 높이기를 권장하고 있음 
  ⇒ hook을 사용할 때에는 서버 컴포넌트를 사용할 수 없음

+) null prototype : 껍데기 객체..Object.prototype 상속받지 않음
+) Serer Component : 렌더링 방식이 페이지라우터에서도 사용하지만 앱라우터 방식의 서버 컴포넌트와 클라이언트 컴포넌트를 사용할 수 있음
+) ISR vs. CDN에 올릴 때도 validation time 설정 가능 ⇒ 이 방식 차이는? : 작동 방식의 차이는 없음. 속도 차이는 있을 듯? 프레임워크에서도 지원한다는게 좀.. 눈여겨볼만한 점
