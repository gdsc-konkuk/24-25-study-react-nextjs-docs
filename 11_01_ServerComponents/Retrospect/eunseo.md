**2024-11-01 회고**

<h3>변천사</h3>

- **Static HTML** / **SSG (Static Site Generation)**
  - 빌드 시점에 HTML 파일을 정적으로 생성하여 저장
  - 요청이 있을 때 서버가 이미 준비된 HTML을 반환하여 빠르게 응답
- **SSR (Server Side Rendering)**
  - 콘텐츠 갱신을 위해 동적으로 html 새로 생성
  - 전체 페이지가 리로딩되어 원하지 않는 부분까지 수정된다는 문제점이 있음
- **AJAX**
  - 페이지 일부만 갱신하는 방식으로, 클라이언트와 서버 간 비동기 통신을 통해 필요한 데이터만 요청
  - 전체 페이지 리로딩 없이 콘텐츠 갱신이 가능하여 더 빠르고 응답성 좋은 UX 제공
- **CSR (Client Side Rendering) & SPA (Single Page Application)** - React
  - client가 요청하면, 뼈대의 html과 js 번들을 제공
  - JS 번들이 커지면 FCP(First Contentful Paint)가 느려지고 초기 로딩 시간이 길어질 수 있음
- **Hybrid Rendering** - Next.js
  - 정적인 페이지는 **SSG**를 통해 미리 생성 → FCP를 앞당김
  - 동적인 페이지는 **SSR**을 사용하여 최신 데이터를 제공
    - 그 후 Client Components의 js bundle을 제공한 후 hydration → TTI(Time to Interactive)
      - 이때부터 client와 상호작용 가능
- **ISR(Incremental Static Regeneration)**

<h3>Component</h3>

| Server Components | Client Components |
|--|--|
|no interaction|with interaction|
|executed on the server only|executed on both sides(pre-render, hydration)|
|지시어 없음|`use client` 지시어|
| |need hydration|

<h3>Server Action</h3>

- `use server` 지시어
- Client Component가 서버에서 실행되는 비동기 함수를 호출 가능


<h3>느낀 점</h3>
빠른 페이지 렌더링을 위해 굉장히 많은 변화를 해 온 거 같고 앞으로도 많은 공부를 해야 할 것 같다...
