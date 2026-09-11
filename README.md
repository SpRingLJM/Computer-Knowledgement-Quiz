# DevOps Daily Quiz

Linux · Docker/Kubernetes · AWS · Network · SQL 명령어/지식 퀴즈. 빌드·서버 없이 `index.html` 을 브라우저로 열면 바로 동작합니다.

## 기능
- **매일 새로운 세트**: 날짜 + 카테고리 + 문제 수 + 난이도를 시드로 삼아 매일 다른 문제를 뽑습니다 (아직 안 푼 문제 우선).
- **문제 수** 10 / 20 / 30 (선택한 난이도 문제가 부족하면 인접 난이도에서 보충하고 화면에 표시), **난이도** Random(Easy 40% · Normal 35% · Hard 20% · Extreme 5%) / Easy / Normal / Hard / Extreme.
- **문제 유형**: O/X · 객관식 · 단답형(명령어 입력, 대소문자·공백·`$` 무시, 허용 답 여러 개).
- 매 문제마다 **정답 / 해설 / 실사용 예시** 표시, 우측 상단 **O(완전 이해) · △(애매) · X(모름/찍음)** 자기 평가.
- **오답노트 자동 생성** 및 복습 스케줄:
  ```
  오답 → 1일 뒤 재출제
          ├ 정답 → 7일 뒤 재출제 (마지막)
          └ 오답 → 3일 뒤 재출제 (마지막)
  이후 자동 출제 없음 (오답노트에서 수동 테스트 가능)
  ```
- 오답노트에서 카테고리/이해도/상태 필터 → 문제 선택 → **선택 문제로 테스트** (수동 테스트는 스케줄에 영향 없음).
- 통계: 세션 이력, 카테고리별 진도·정답률.
- 우측 상단 실시간 날짜·시간(시:분:초).

## 구조
```
index.html
css/style.css
js/store.js      localStorage 저장소
js/scheduler.js  오답노트 복습 스케줄
js/quiz.js       문제은행 로딩, 일일 세트 생성(시드 난수), 채점
js/app.js        라우팅/화면
js/data/*.js     카테고리별 문제은행 (총 555문제, *-extra.js 는 추가분)
```

## 문제 추가
`js/data/<category>.js` 배열에 항목을 추가하면 됩니다.
```js
{ diff: 'easy|normal|hard|extreme', type: 'short', q: '질문', answer: '정답', accept: ['허용 답'], explain: '해설', example: '실사용 예시' }
{ diff: 'normal', type: 'mcq', q: '질문', options: ['a','b','c','d'], answer: 1, explain: '...', example: '...' }
{ diff: 'hard',   type: 'ox',  q: '진술', answer: true, explain: '...', example: '...' }
```
