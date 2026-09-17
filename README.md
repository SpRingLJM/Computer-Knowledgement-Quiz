# 컴퓨터 상식 퀴즈

컴퓨터·인터넷·보안 상식부터 Linux·Docker/Kubernetes·AWS·네트워크·SQL 실무까지, 매일 새로 뽑히는 문제로 점검하는 퀴즈 사이트입니다.

**https://springljm.github.io/Computer-Knowledgement-Quiz/**

가입도 서버도 없습니다. 빌드 과정 없이 `index.html` 을 브라우저로 열면 그대로 동작하는 정적 사이트이고, 학습 기록은 브라우저의 localStorage 에만 저장됩니다.

## 두 개의 트랙

| 트랙 | 대상 | 분야 |
|---|---|---|
| 🙂 **컴퓨터 상식** | 누구나 | 컴퓨터 기초 · 인터넷/웹 · 보안/개인정보 · 오피스/생산성 · IT 상식/신기술 |
| 🛠️ **DevOps 실무** | 개발·인프라 | OS/Linux · 컨테이너 · Cloud/AWS · 네트워크 · SQL |

현재 총 **746문제** (상식 151 · 실무 595).

## 문제 유형

| 유형 | 설명 |
|---|---|
| **O/X** | 참·거짓 판별 |
| **객관식** | 4지선다 |
| **단답형** | 명령어나 용어를 직접 입력. 대소문자·앞뒤 공백·앞의 `$` 는 무시 |
| **서술형** | 문장으로 설명. 핵심 키워드 포함 개수로 잠정 채점하고 모범답안을 나란히 제시 |
| **과제형** | 상황이 주어지고, 주석으로 된 단계 지시문 아래에 명령어를 순서대로 입력. 단계별 정오와 부분 점수를 표시하며 전 단계를 맞혀야 정답 처리 |

## 기능

- **매일 새로운 세트** — 날짜 + 분야 + 문제 수 + 난이도를 시드로 삼아 매일 다른 문제를 뽑습니다 (아직 안 푼 문제 우선).
- **문제 수** 10 / 20 / 30, **난이도** Random(Easy 40% · Normal 35% · Hard 20% · Extreme 5%) / Easy / Normal / Hard / Extreme. 선택한 난이도 문제가 부족하면 인접 난이도에서 보충하고 화면에 알립니다.
- 매 문제마다 **정답 · 해설 · 실사용 예시**를 보여 주고, 우측 상단에서 **O(완전 이해) · △(애매) · X(모름/찍음)** 자기 평가를 남깁니다.
- **오답노트 자동 생성** 및 복습 스케줄:
  ```
  오답 → 1일 뒤 재출제
          ├ 정답 → 7일 뒤 재출제 (마지막)
          └ 오답 → 3일 뒤 재출제 (마지막)
  이후 자동 출제 없음 (오답노트에서 수동 테스트 가능)
  ```
- 오답노트에서 분야/이해도/상태로 거른 뒤 원하는 문제만 골라 테스트 (수동 테스트는 스케줄에 영향 없음).
- **통계** — 세션 이력, 트랙·분야별 진도와 정답률.
- **라이트/다크 테마** — 처음에는 시스템 설정을 따르고, 한 번 고르면 기억합니다.

## 구조

```
index.html
og.png            공유 미리보기 이미지
css/style.css
js/store.js       localStorage 저장소
js/theme.js       라이트/다크 테마
js/scheduler.js   오답노트 복습 스케줄
js/quiz.js        문제은행 로딩, 일일 세트 생성(시드 난수), 채점
js/app.js         라우팅/화면
js/data/*.js      분야별 문제은행
```

문제은행 파일 구성:

- 상식 트랙: `basics` · `internet` · `security` · `office` · `ittrend`
- 실무 트랙: `linux` · `container` · `aws` · `network` · `sql`
  - `*-extra.js` 는 추가 문제, `*-adv.js` 는 서술형·과제형

## 문제 추가

해당 분야의 `js/data/<category>.js` 배열에 항목을 추가하면 됩니다.

```js
{ diff: 'easy|normal|hard|extreme', type: 'ox',  q: '진술', answer: true, explain: '...', example: '...' }
{ diff: 'normal', type: 'mcq',   q: '질문', options: ['a','b','c','d'], answer: 1, explain: '...', example: '...' }
{ diff: 'normal', type: 'short', q: '질문', answer: '정답', accept: ['허용 답'], explain: '...', example: '...' }

{ diff: 'hard', type: 'essay',
  q: '질문',
  keywords: ['로그', ['부하', '트래픽']],   // 배열로 주면 동의어 중 하나만 맞아도 인정
  minKeywords: 3,                          // 생략하면 키워드 수의 60%
  model: '모범답안',
  explain: '...', example: '...' }

{ diff: 'normal', type: 'task',
  q: '상황 제목',
  scene: '# 상황: ...',
  steps: [
    { hint: '# 1. 단계 지시문', answer: 'docker ps', accept: ['docker container ls'] },
  ],
  explain: '...', example: '...' }
```

새 분야를 추가할 때는 `js/quiz.js` 의 `CATEGORIES` 에 `track` 과 함께 등록하고, `index.html` 에 스크립트 태그를 추가합니다.

## 로컬에서 실행

`index.html` 을 그대로 열어도 되지만, 브라우저에 따라 localStorage 가 제한될 수 있어 간단한 정적 서버를 권장합니다.

```bash
python -m http.server 8765
# http://localhost:8765
```
