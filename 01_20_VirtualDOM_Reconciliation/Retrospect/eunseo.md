React Study#5 2025-01-20
발표자: @Minboy

# 관련 문서

1. Virtual DOM - https://legacy.reactjs.org/docs/faq-internals.html
2. Reconciliation - https://legacy.reactjs.org/docs/reconciliation.html

# 공식 문서
## Virtual DOM이란?
UI의 가상적인 표현을 메모리에 저장하고 실제 DOM과 동기화하는 프로그래밍 개념. 이 과정을  Reconciliation이라고 함.

React 세계에서 virtual DOM은 보통 UI를 나타내는 객체이지만 react는 fibers라는 내부 객체를 사용한다. React Fiber는 React 16의 새로운 Reconciliation 엔진이다.

## Reconciliation
React의 "비교(diffing)" 알고리즘을 만들 때 어떤 선택을 했는지...
이 비교 알고리즘 덕분에 컴포넌트의 갱신이 예측 가능해짐 & 충분히 빨라짐

### Motivation
'`render()` 함수는 React 엘리멘트 트리를 만드는 것이다.'라고 생각이 듦
state나 props가 갱신되면 새로운 React 엘리멘트 트리를 반환함

하나의 트리를 가지고 다른 트리로 변환하기 위한 최소한의 연산수를 구하는 최첨단의 알고리즘의 시간 복잡도는 O($n^3$)임. 이건 에바임.

저 알고리즘 대신, 두 가지 가정을 기반하여 O(n) 복잡도의 ==휴리스틱 알고리즘==을 구현해냄. (최악의 경우엔 O($n^3$)이라고 함)
1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
2. 개발자가 `key` prop을 통해, 여러 렌더링 사이에서 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.
### Diffing Algorithm

두 개의 트리를 비교할 때, 먼저 두 루트 엘리먼트를 비교함. 이후
- 두 루트 엘리먼트의 타입이 다른 경우:
	이전 트리를  버리고 완전히 새로운 트리를 구축함. 이때 이전 DOM 노드들은 모두 파괴된다.
- 두 루트 엘리먼트의 타입이 같은 경우:
	동일한 내역은 유지하고 변경된 속성들만 갱신함.

# 발표
- '전문가를 위한 리액트'를 읽어보세용
## 1. Virtual DOM

DOM(Document Object Model): 자바스크립트로 HTML을 조작할 수 있게 해주는 모델
HTML을 자바스크립트의 객체로

Virtual DOM이 뭐냐? 리액트가 렌더링을 하기 위해 선택한 방식.
실제 돔을 카피한 가상 돔, 데이터에 변화가 생기면 실제 돔에 반영하는 식으로 리액트가 렌더링을 함. 두 개의 가상 돔을 비교하는 방식이 reconciliation.

DOM API의 문제..
DOM의 내용 변경 안하고 접근만해도 Reflow 과정이 수행됨! → 굉장히 무겁 → 가상 돔을 선택하게 됨

"c언어에서 시스템콜 말고 버퍼를 이용해서 비싼 연산을 최소화하자"처럼 돔 api를 최소화하자!

DOM은 브라우저에만 존재, 두 부분이 분리되어있기 때문에 react native → 플랫폼에 종속되지 않는 게 장점임

#### React Element
JSX != js라 리액트가 이해 불가, BABEL로 리액트 엘리먼트를 만드는 문법으로 변환

#### Fiber
React Element를 기반으로 생성되는 작업에 대한 내용이 담긴 객체.
`createFiberFromTypeAndProps()`  

~React의 렌더링 과정~
1. **Render Phase**: 컴포넌트 트리가 어떻게 렌더링될지 결정
	- React Element 생성
	- Fiber 생성
		- 트리를 순차적으로 탐색하면서 부모에서 자식으로 내려감
		- LRD와 비슷한 느낌? 형제 노드를 우선하는 sibling 개념을 사용함
			- 순서도 면접에서 물어보는 중요한 내용.
2. **Commit Phase**: Render phase에서 계산된 변경사항을 실제 DOM에 반영하는 단계, 이 단계에서 실제 UI를 업데이트함
## 2. Reconcilation
#### Diff
- 공식 문서 내용 참조
- kep prop에 배열의 인덱스를 넣지 마라!

### 리액트팀이 Virtual DOM이라는 용어를 폐기하려는 이유

개념적 설명을 위해 등장한 용어. 리액트 개발자도 이야기하는 게 다 다름.

>“virtual DOM”은 특정 기술이라기보다는 패턴에 가깝기 때문에 사람들마다 의미하는 바가 다릅니다. React의 세계에서 “virtual DOM”이라는 용어는 보통 사용자 인터페이스를 나타내는 객체이기 때문에 [React elements](https://ko.legacy.reactjs.org/docs/rendering-elements.html)와 연관됩니다. ==그러나== React는 컴포넌트 트리에 대한 추가 정보를 포함하기 위해 “fibers”라는 내부 객체를 사용합니다. 또한 React에서 “virtual DOM” 구현의 일부로 간주할 수 있습니다.

react element + fiber을 이용해서 DOM API를 최적화하는 느낌. 

Dan Abramov는 Virtual DOM 폐기하자고 주장. because 다른 사람들이 DOM보다 더 좋은 무언가라고 오해하기 시작함

#### Virtual DOM vs Real DOM

Virtual DOM is pure overhead... 두 개의 가상 돔 트리를 비교해서 실제 돔에다 patch할 때 DOM API를 써야 함 → DOM API + diff 둘 다 쓰니까 DOM API보다 느린 거 아니냐??
그래도 가상돔을 쓰는 건 돔 api 접근을 줄이기 위해서. + cross flatform. 돔보다 빠른 건 아님!!
