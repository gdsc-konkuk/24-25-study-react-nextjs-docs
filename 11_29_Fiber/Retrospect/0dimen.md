Fiber
  - 스케줄링에서의 작업의 단위.
  - 필요성
    - 당장 필요하거나 중요한 작업을 먼저 처리하고, 프레임 저하를 방지한다.
  - 구조
    - type & key
      - key : 재사용 가능한 fiber인지 판단
    - child & sibling
      - 트리 탐색시 DFS로 탐색.
    - ...
  - 우선 순위 부여 방식 : Lane.
