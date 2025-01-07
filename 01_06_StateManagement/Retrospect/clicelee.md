### React 상태관리: Context와 Subscribe 결합의 이해

---

### **서론**
React에서 상태 관리를 이해하기 위해 Context와 Subscribe 모델을 살펴봅시다
발표자 추천 도서: *마이크로 상태관리*

---

### **State의 특징**
1. **리렌더링**: State가 변경되면 컴포넌트는 리렌더링(재호출)된다.
2. **독립성**: State는 컴포넌트가 초기화(리렌더링)되더라도 유지되어야 한다.
3. **불변성**: State는 직접 수정할 수 없고, 새로운 값을 만들어 업데이트해야 한다.

#### **State 생성 방식**
1. `useState`: 간단한 상태 관리를 위한 기본 훅.
2. `useReducer`: 복잡한 상태 관리를 위한 순수 함수 기반의 훅.

---

### **전역 State 관리의 문제**
- **문제**: 지역 State와 전역 State 간의 경계가 불분명.
- **해결책**: 상태 관리 라이브러리 도입.

#### **Context API의 한계**
Context는 **상태 관리를 위한 도구가 아닌 데이터 전달 도구**로 설계되었다.  
따라서 **상태 관리 훅**과 결합하여 사용해야 한다.

---

### **문제와 해결책**

#### **문제: Context에서 불필요한 리렌더링**
- **예시**: 아래 이미지처럼 `count2`를 수정할 때 `count1`도 영향을 받음.  
![문제](https://i.imgur.com/bJ1Rc6P.png)

---

#### **해결책 1: Context 분리**
- Provider와 Context를 각각 나눠 독립적으로 관리.  
![Context 분리](https://i.imgur.com/ylfNo2q.png)

- **장점**: 서로 의존성을 줄이고 독립적으로 동작.
- **중요**: Provider의 초기 값을 `null`로 설정해야 함.  
![초기화](https://i.imgur.com/5iu8TSm.png)

---

#### **해결책 2: Subscribe 모델**
- **특징**: `useSyncExternalStore`와 같은 훅을 사용해 필요한 데이터만 렌더링.
- **장점**: 전체 상태 반환을 막고, 효율적으로 리렌더링 관리 가능.

---

### **Context와 Subscribe 결합**
- Context와 Subscribe 모델의 장점을 결합해 사용.
- **방법**:  
  1. Provider의 `value`에 Store 객체를 전달.  
  2. Store에서 상태를 가져오거나 수정하는 커스텀 훅 구현.  
  ![Provider 객체](https://i.imgur.com/MGy2gdt.png)  
  ![Custom Hook](https://i.imgur.com/Ufmm51Y.png)

- **사용 훅**:
  - `useSelector`: Store 객체에서 상태를 가져옴.
  - `useSetState`: 상태를 변경할 수 있는 함수 반환.

---

### **zustand와의 유사성**
- `zustand` 라이브러리는 Context와 Subscribe 결합 모델과 동일한 방식으로 동작.
- **핵심**:
  - `create`를 통해 Store 객체 생성.
  - `useStore`로 특정 상태만 선택적으로 관리.
  - 내부적으로 `useSyncExternalStore`와 Subscribe 패턴 사용.

---

### **결론**
1. **Context API와 Subscribe 모델의 장점 결합**:
   - 불필요한 리렌더링 감소한다
   - 독립적이고 효율적인 상태 관리 가능하다
2. **커스터마이징의 유용성**:
   - 외부 라이브러리에 의존하지 않고 프로젝트 요구에 맞춘 구현 가능하다
3. **상태관리를 알아야 하는 이유**:
   - 실제 환경에서 라이브러리 사용이 제한되는 경우에 직접 구현해야 한다

--- 

### **추가 팁**
- `useEffect`는 항상 최신 상태를 보장하지 않으므로, `useSyncExternalStore` 사용을 고려할 수 있다
