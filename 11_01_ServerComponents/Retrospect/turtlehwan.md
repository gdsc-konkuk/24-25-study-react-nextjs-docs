# Session 1 - Server Components

1. Server Components(https://react.dev/reference/rsc/server-components)
2. Server Actions(https://react.dev/reference/rsc/server-actions)
3. Directives(https://react.dev/reference/rsc/directives) - 'use client' & 'use server'

https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md

## 1. Server Components

서버 컴포넌트는 번들링 전에 클라이언트 앱이나 SSR(Server Side Rendering) 서버와는 분리된 환경에서 미리 렌더링되는 새로운 유형의 컴포넌트입니다.

이 별도의 환경이 바로 React 서버 컴포넌트에서의 “서버”입니다. 서버 컴포넌트는 빌드 시간에 CI 서버에서 한 번 실행되거나, 각 요청마다 웹 서버를 통해 실행될 수 있습니다.

서버 컴포넌트는 빌드 시간에 파일 시스템에서 읽거나 정적 콘텐츠를 가져올 수 있으므로 웹 서버가 필요하지 않습니다.

이 패턴은 사용자가 정적 콘텐츠를 렌더링하기 위해 페이지가 로드된 후 추가 75K (gzipped) 라이브러리를 다운로드하고 파싱해야 하며, 데이터를 가져오기 위해 두 번째 요청을 기다려야 합니다.

서버 컴포넌트를 사용하면 이러한 컴포넌트를 빌드 시간에 한 번만 렌더링할 수 있습니다.

렌더링된 출력은 서버 측 렌더링(SSR)을 통해 HTML로 변환되어 CDN에 업로드될 수 있습니다. 앱이 로드될 때, 클라이언트는 기존의 `Page` 컴포넌트나 마크다운 렌더링을 위한 고비용의 라이브러리를 보지 않게 됩니다. 클라이언트는 렌더링된 출력만 보게 됩니다.

- 비동기 컴포넌트?

서버 컴포넌트는 브라우저로 전송되지 않으므로 `useState`와 같은 상호작용 API를 사용할 수 없습니다.

- 서버 컴포넌트는 그 자체가 전송되는 것이 아니라, 렌더링된 HTML or JSX만 뿌려주는 건가?
    
    ## 리액트 서버 컴포넌트
    
    ### HTML과는 관련 없음
    
    **리액트 서버 컴포넌트는 HTML과는 아무런 관련이 없습니다.** 서버 컴포넌트는 페이지가 아니라 '컴포넌트'니까요. 이 친구들은 JSON처럼 직렬화가 가능한 자료형으로 바뀌어 클라이언트에 도착합니다. 이러면 리액트는 그 자료에 나와 있는 렌더링 결과물, 해당 컴포넌트의 자바스크립트 위치, 해당 컴포넌트의 실제 위치 등을 바탕으로 클라이언트의 화면에 컴포넌트를 그리죠.
    
    참고) Next.js는 서버 컴포넌트를 활용하더라도 자체적으로 서버에서 렌더링해보고 첫 결과를 HTML을 묶어서 보내주는데요. 이건 Next.js에서 제공하는 일종의 편의성이지 실제 리액트 서버 컴포넌트의 개념과는 관계가 없어요.
    
    ### 상태의 유지
    
    서버 사이드 렌더링은 새로운 HTML을 주고, 거기에서 새로운 자바스크립트 코드를 다운받습니다. 하지만 리액트 서버 컴포넌트가 받는 건 JSON과 같은 일반 자료에 불과합니다. 그리고 그걸 처리해서 실제 DOM에 붙여주는 건 이미 클라이언트에서 돌아가고 있는 리액트고요. 그렇기 때문에 옆집 다른 컴포넌트에 들어있는 리액트 상태나, input focus와 같은 클라이언트 측의 상태를 유지할 수 있습니다.
    
    ## 결론
    
    - 서버 사이드 렌더링은 페이지의 첫 로딩에 이미 만들어진 HTML을 보여주는 것입니다.
    - 리액트 서버 컴포넌트는 컴포넌트의 렌더링 함수를 서버에서 실행하는 것입니다.

심지어 서버에서 Promise를 생성하고 클라이언트에서 이를 기다릴 수 있습니다.

비동기 컴포넌트는 [클라이언트에서 지원되지 않으므로](https://ko.react.dev/reference/rsc/server-components#why-cant-i-use-async-components-on-the-client) Promise를 `use`로 기다립니다.

### **서버 컴포넌트에 대한 지시어는 없습니다.**

서버 컴포넌트는 `"use server"`로 표시된다는 오해가 있지만, 서버 컴포넌트에 대한 지시어는 없습니다. `"use server"` 지시어는 서버 액션에 사용됩니다.

자세한 내용은 [지시어](https://ko.react.dev/reference/rsc/directives)를 참조하세요.

## 2. Server Action

서버 액션이 `"use server"` 지시어로 정의되면, 프레임워크는 자동으로 서버 함수에 대한 참조를 생성하고 해당 참조를 클라이언트 컴포넌트에 전달

```jsx

// Server Component
import Button from './Button';

function EmptyNote () {
  async function createNoteAction() {
    // Server Action
    'use server';
    
    await db.notes.create();
  }

  return <Button onClick={createNoteAction}/>;
}
```

서버 액션은 클라이언트의 액션(Action)과 함께 구성할 수 있습니다.

이렇게 하면 클라이언트의 액션으로 래핑하여 서버 액션의 `isPending` 상태에 접근할 수 있습니다.

자세한 내용은 [`<form>` 외부에서 서버 액션 호출하기](https://ko.react.dev/reference/rsc/use-server#calling-a-server-action-outside-of-form) 문서를 참조하세요.

서버 액션은 React 19의 새로운 폼(Form) 기능과 함께 동작합니다.

서버 액션을 폼에 전달하여 폼을 서버에 자동으로 제출할 수 있습니다.

액션 대기(Pending) 상태와 마지막으로 반환된 응답(Response)에 접근하는 일반적인 경우에는 `useActionState`를 사용하여 서버 액션을 구성할 수 있습니다.

## 3. Directives 지시어

- [`'use client'`](https://ko.react.dev/reference/rsc/use-client)를 사용하면 클라이언트에서 실행되는 코드를 표시할 수 있습니다.
- [`'use server'`](https://ko.react.dev/reference/rsc/use-server)는 클라이언트 측 코드에서 호출할 수 있는 서버 측 함수를 표시합니다.

https://velog.io/@huurray/React-Hydration-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

RFC(Request for Comments) 문서는 **비평을 기다리는 문서**라는 의미로, 컴퓨터 네트워크 공학 등에서 인터넷 기술에 적용 가능한 새로운 연구, 혁신, 기법 등을 아우르는 메모를 나타낸다.

---

## 1부 : 웹의 역사 SSR, SSG, CSR, Hybrid Rendering

- 최초의 웹 사이트도 보존되어 확인할 수 있다. HTML
    - 서버에 모든 html 파일이 있어야 하고, 특정 file을 url로 요청하면
- SSR : 정적 HTML의 동적 데이터 보여주기
    - PHP 코드가 돌면서 다른 외부 API 서버 등에 요청하고, 서버에서 HTML을 생성해서 사용자에게 보여줌.
    - 사용자의 요청이 있을 때마다 HTML 생성해서 보여줌
    - JSP, php / template engine pug, ejs, jinja

- SSR의 문제점
    - 새로고침 버튼을 눌러서 글자 하나를 바꿀 때도 전체 HTML을 서버에서 생성하고 받아올 수밖에 없다.
    - 이를 해결하기 위해 ajax 등장 ⇒ client가 직접 api를 호출할 수 있다면?!?! → 그렇다면 JS로 특정 element만 바꾸면 된다.
    - XMLHTTPResponse → 개선된 fetch

- CSR & SPA
    - 서버는 HTML 껍데기와 JS 파일들을 던져주고, 사용자의 브라우저가 컨텐츠를 전부 다 렌더링하도록 한다.
    - SPA도 나오게 되는데, html을 단 1개만 받고 그 안에서 routing을 톻해 페이지가 나눠진 것처럼 작동하는 것. react-router-dom

- CSR의 문제점
    - 번들 크기가 너무 커짐 수십mb~ 100mb
    - FCP 첫 로딩 시점이 너무 느리다
    - FCP이후 또 데이터를 useEffect 등으로 로딩해야 하는데 여기에도 시간이 오래 걸린다

- NEXT.js , Hybrid Rendering / revival of SSR
    - Page Router
        - 뼈대만 있는 HTML을 미리 만들고 JS와 전달
        - FCP 시점 앞당김. JS 번들 가져와서 브라우저에서 적용하는 Hydration 과정 거침.
        - FCP 이후 Hydration 거쳐서 상호작용이 가능한 시점이 TTI
            - 이동할 페이지들의 컴포넌트를 미리 가져오는 과정 : prefetching
        - pre-rendering을 통해 hybrid rendering
    - 만약 SSR 과정 중 api에 blocking이 일어나면 사용자에게 보여지는 시점이 느려지는 것 아닌가? ⇒ SSG
        - 사용자가 접속 요청 시 rendering을 하는 게 아니라 미리 generate 해놓고 요청 시 전달만 한다
        - SSG에선 빌드 타임(npm run build)에 미리 배포 html을 만들어 둔다 → 유저 접속 시의 최신화가 안 이루어졌을 텐데? ⇒ ISR (Incremental Static Regeneration)
            - ISR에서 유효 기간을 설정하고, 유효 기간이 지나면 최신 데이터가 아니라고 판단하고 사용자 접속이 이루어지면 version 업데이트한 HTML을 만든다.
            - 항상 최신 데이터 보장은 어떻게 하는가? - 실시간성이 필요한 주식 데이터 등은 SSG보단 SSR을 사용하는 것이 낫다.

- App router & server component
    - 기존 page router는 page 단위로 component hydration을 적용할 수밖에 없음. 근데 page 안에는 상호작용이 없는 component도 있는데, 실제론 상호작용이 있는 component만 hydratio 하면 됨.
    - page router는 모든 component에 hydration을 적용해야 해서 JS 번들 크기가 커짐
    - 
    - hydration이 필요 없는 것이 server component. → 이는 서버에서만 실행시키고 JS 번들에서 빼도 됨.
    - client component : 인터렉션 있음. 사전 렌더링 과정이 필요해서 서버에서도 실행 되고, hydration을 위해 client에서도 실행 된다.

Streaming : 로딩 시점 당겨올 수 있음.

Static HTML → SSR → AJAX → CSR & SPA → Hybrid Rendering

## 2부 : Server component

client component 코드가 서버에서 한 번 렌더링되어야 해서 환경 구성을 클라이언트와 같이 만들어야 한다.

그런데 server component는 db 접근 등이 있다면 client와 분리되어야 한다.

server component와 client component는 환경 분리하면 된다

서버에서 실행되는 비동기 함수를 실행할 수 있게 하는 게 Server action

use Server 지시자를 만났을 때 api endpoint 만들어서 던져준다.

외부 api 접근 등을 client 단에서 할 수 있도록

직렬화가 안 되는 애들은 인자로 포함하면 안된다.

직렬화 : byte 형태로 변환해서 올림.

직렬화 안 되는 것.

JSX

function

Classes

hook들을 쓸 땐 server component 이용 불가

use client도 직렬화가 안 되는 정보는 넣을 수 없다

use server로 된 것은 props로 전달 불가

null prototype

객체 상속 시 prototype으로 관리. 어떤 객체든 간에 최상위에 Object prototype 상속받음.

이런 것이 필요 없고 생 객체를 원할 떄 쓰는 것이 null prototype

page router보다 더 세세하게 분리 가능

CDN validation 시간 + SSR == SSG + ISR ?
