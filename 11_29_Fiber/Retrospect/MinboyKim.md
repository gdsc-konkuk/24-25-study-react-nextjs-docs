Fiber는 몇몇 프로퍼티를 가진 그냥 플레인 자바스크립트 객체일 뿐이다.

Fiber reconciler = Fiber를 기반으로 동작하는 리액트 reconciler

reconciler = diffing 과정을 통해 변경사항을 파악하고 실제 DOM에 반영해주는 역할을 수행

**Fiber의 본질** - Fiber는 애니메이션, 반응형에 집중한다.
* Fiber는 작업을 청크단위로 쪼개고 우선순위를 매길 수 있다.
* 작업을 일시 중지하거나 나중에 다시 돌아올 수 있다.
* 작업을 재사용하거나 필요하지 않다면 중단할 수 있다.

기존 리액트의 reconciler와 다르게 비동기적이다.

Fiber의 존재 이유를 생각해보기 위해 이전 방식의 reconciler에 대해 알아보자.

기존 리액트의 reconciler : **STACK**
* 스택은 동기적이다.
* 스택이 빌 때까지 작업해야만 한다. 즉 인터럽트 될 수 없다.

>[!example]
사용자가 텍스트 인풋에 키보드 입력을 한다고 생각해보자.
이상적으로는, 키보드 입력을 하는 즉시 글자가 인풋에 나타나야하고, 텍스트 인풋만 존재할 때는 문제가 없다. 
 하지만 만약 다른 엘리먼트들을 렌더링하고 있다던가하는 백그라운드 작업이 동작중이라면, 스택 방식의 이전 reconciler에서는 유저가 텍스트 입력의 *딜레이를 겪을 수 밖에 없다.* (우선순위화 및 인터럽트 불가능)

`결국 동기적으로밖에 작업을 처리할 수 없는 스택 방식이 문제인 것`

그렇다면 Fiber는 리액트를 더 빠르게 해주는 것 뿐인가?

틀린말은 아니지만, 좀 더 본질적인 문제이다. Fiber는 리액트를 더 빠르게 해줄 뿐만아니라 더 똑똑하게 만들었다.

Fiber는 새로운 기능을 쉽게 추가할 수 있게 하는 등 리액트 개발을 획기적으로 향상시켰다.

---
# Fiber
Fiber의 구현에 대해 더 깊게 살펴보자.

Fiber는 자바스크립트 객체라고 했다. 그렇다면 뭘 위한 객체일까?
#### Fiber는 `작업의 단위`를 표현한 객체이다.
리액트는 처리해야할 일들을 Fiber로 쪼개서 생성하고, 하나씩 처리하는 것이다.

리액트는 Fiber들을 처리하고, `finished work` 로 만든다. 이후에 이것들은 실제 DOM에 반영되고, 이렇게 반영되는 과정을 `commit` 이라고 한다.

Fiber가 처리되는 과정을 좀 더 자세히 살펴보자.

## Two Fiber phases
Fiber는 두 페이즈로 처리된다.
### Render phase
* 이 페이즈는 비동기적이다.
* 작업들은 우선순위화 될 수 있고, 일시 중지되거나 버려질 수 있다.
* 각 Fiber들은 `beginWork()` 함수를 통해 처리가 시작되고, `completeWork()` 함수를 호출해 완료된다.
### Commit phase
* 이 페이즈는 동기적이다. (인터럽트 될 수 없다.)
* `commitWork()` 함수가 호출되는 것으로 시작된다.

Fiber 객체의 프로퍼티에 대해 살펴보자.
* 각 Fiber는 항상 `무언가`와 1:1 관계이다. `무언가` 는 컴포넌트 인스턴스, DOM 노드 등이다.
* `무언가` 의 타입이 *tag* 프로퍼티에 저장된다.
* *stateNode* 프로퍼티에 `무언가` 의 레퍼런스, 즉 그자체가 연결된다.
	내부 코드를 보면 이런 함수들이 있다.
	* `createFiberFromElement()`
	* `createFiberFromFragment()`
	* `createFiberFromText()`
	무언가와 1:1이라는 점이 명확히 보인다.
* *child*, *sibling*, *return*
	리액트 엘리먼트가 `tree(Virtual DOM)`를 구성하는 것처럼, Fiber들도 `tree`를 구성한다.
	이 세개의 프로퍼티는 tree를 구성하는데 필요한 포인터들이다.
	* child - 첫번째 자식 포인터
	* sibling - 형제 포인터
	* return - 부모 포인터

> [!info] 그래서 리액트가 처리해야하는 작업이 뭔데?
> * state 변경
> * 생명주기 함수
> * DOM 변경
> 이러한 것들이 `작업(work)`이며, 앞서 말했던대로 작은 단위(chunk)로 쪼개질 수 있다.
> 
> 	작업들은 즉시 다뤄질 수도, 스케쥴되어 차후에 처리될 수도있다.
> 	애니메이션같은 높은 우선순위를 가진 작업은 즉시 처리된다. ex) requestAnimationFrame()
>	네트워크 요청과 같은 낮은 우선순위를 가진 작업은 딜레이된다. ex) requestIdleCallback()

사실 Fiber 트리는 두 개가 존재한다.
* current
* workInProgress
현재 화면을 나타내는 current 트리를 직접 수정하게 되면 일관성 없는 UI와 온갖 종류의 불편함을 가져오기 때문에, workInProgress 트리를 수정하고 포인터를 바꾸는 방식으로 동작한다.

workInProgress => current
current => workInProgress

이 작업은 Commit 페이즈에서 일어난다.

>[!info]
> 이쯤되면 의문이든다. Fiber와 리액트 엘리먼트(Virtual DOM)은 같은 것인가?
> * `리액트 엘리먼트`는 **실제 DOM, 즉 UI의 가벼운 객체 표현**이다.
> * 하지만 `Fiber`는 **리액트가 처리해야하는 작업**의 단위이다.
> 결국 *Fiber를 처리하면서 리액트 엘리먼트로 구성된 Virtual DOM을 조작하고, 그를 실제 DOM에 반영하는 것으로 화면을 구성*한다고 생각할 수 있겠다.
> * 리액트 엘리먼트는 매번 재생성되지만, Fiber는 첫 마운트시에 생성되고 대부분 재사용된다는 차이도 있다.

---
Render 페이즈는 결국 current 트리로 바뀔 workInProgress 트리를 구성하는 작업이라고 생각할 수 있겠다.

하지만 또한 `Effects`의 리스트도 Render 페이즈의 결과물이라고 할 수 있다.

> [!info] EFFECT란?
> DOM을 수정하거나, 특정 생명주기 메소드를 호출하는 등의 작업들을 `side effects`라 한다.
> 이러한 작업들은 다른 컴포넌트들에 영향을 끼치고, *렌더링 과정에서 실행될 수 없다.*
> 따라서 이러한 Effects들은 Fiber의 `firstEffect`, `lastEffect`, `nextEffect` 등의 프로퍼티로 추적되고 차후 Commit 페이즈에서 처리된다.

* Commit 페이즈에서 리액트는 모든 `Effects`들을 확인하며 컴포넌트 인스턴스에 반영한다.
* 해당 결과는 유저에게 보여진다.
* 리액트는 이 과정을 단일 순회로 처리한다.

#### Fiber Tree 처리 과정
DFS 방식처럼 동작한다. 하지만 재귀방식이 아닌 `while loop`을 이용함에 주의

자식 => 형제 => 부모 순으로 탐색

---

Fiber의 `alternate` 프로퍼티를 통해 두 개의 Fiber 트리는 서로를 참조 가능, 이를 통해 Fiber 재사용을 돕는다.

[영상 참고](https://www.youtube.com/watch?v=0ympFIwQFJw)
