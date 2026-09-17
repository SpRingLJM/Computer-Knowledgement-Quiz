# 공개 퀴즈 사이트 개편 설계

- 날짜: 2026-09-17
- 저장소: SpRingLJM/Computer-Knowledgement-Quiz
- 목적: 개인 학습용 DevOps 퀴즈를 일반 사용자도 쓸 수 있는 공개 사이트로 확장

## 배경

현재 사이트는 DevOps 실무 문제 555개(Linux/Container/AWS/Network/SQL)로 이루어져 있고,
빌드 없이 `index.html` 을 여는 정적 사이트다. 기능(일일 세트, 오답노트 간격반복, 통계)은
충실하지만 (1) 비전공자가 풀 수 있는 문제가 없고 (2) 처음 방문한 사람에게 사이트를 설명하는
화면이 없으며 (3) 어디에도 배포되어 있지 않다.

## 범위

1. 트랙 분리 — 일반 상식 / DevOps 실무
2. 일반 상식 문제은행 신규 작성 (5 카테고리 × 30 = 150문제)
3. 신규 문제 유형 2종 — 서술형(essay), 과제형(task)
4. 라이트/다크 테마 토글
5. 공개 사이트용 정비 — 소개 섹션, 데이터 저장 안내, 메타태그/파비콘, 기록 초기화
6. GitHub Pages 배포 (저장소 public 전환)

## 1. 트랙 분리

홈 진입 시 트랙을 먼저 고른다. 비전공자가 첫 화면에서 `chmod` 문제를 만나지 않게 하는 것이 목적.

| 트랙 | 키 | 카테고리 |
|---|---|---|
| 🙂 컴퓨터 상식 | `general` | basics, internet, security, office, ittrend |
| 🛠️ DevOps 실무 | `devops` | linux, container, aws, network, sql (기존) |

`Quiz.CATEGORIES` 의 각 항목에 `track` 필드를 추가한다. 선택한 트랙은 `settings.track` 으로
localStorage 에 저장한다. 기존 사용자의 저장 데이터는 `track` 이 없으므로 `devops` 로 마이그레이션한다.

## 2. 일반 상식 문제은행

| 카테고리 | 키 | 아이콘 | 다루는 것 |
|---|---|---|---|
| 컴퓨터 기초 | basics | 💻 | 하드웨어, 운영체제, 파일·폴더, 저장장치, 강제종료 |
| 인터넷 · 웹 | internet | 🌐 | 브라우저, URL, 와이파이, 이메일, 쿠키·캐시 |
| 보안 · 개인정보 | security | 🔐 | 피싱·스미싱, 비밀번호, 2단계 인증, 백신, 공용 와이파이 |
| 오피스 · 생산성 | office | 📄 | 단축키, 파일 확장자, 클라우드 드라이브, PDF·인쇄, 백업 |
| IT 상식 · 신기술 | ittrend | 🤖 | AI, 클라우드, 빅데이터, 스마트폰, 간편결제·인증 |

각 30문제. 유형은 O/X · 객관식 · 단답형 · 서술형을 섞는다(단답형 유지). 과제형은 넣지 않는다.
난이도는 기존 easy/normal/hard/extreme 스케일을 쓰되 일반인 기준으로 잡는다.

## 3. 신규 문제 유형

기존 데이터 포맷(`diff`/`type`/`q`/`explain`/`example`)을 그대로 따르므로
오답노트·스케줄러·통계 로직은 수정하지 않는다.

### 3.1 서술형 `essay`

```js
{ diff: 'hard', type: 'essay',
  q: '질문',
  keywords: ['부하', '로그', '네트워크', '디스크', '프로세스'],
  minKeywords: 3,
  model: '모범답안 전문',
  explain: '...', example: '...' }
```

- 채점: 입력 텍스트에 `keywords` 가 `minKeywords` 개 이상 포함되면 잠정 정답.
  키워드 매칭은 공백·대소문자 무시, 한글은 부분 문자열 일치.
- 결과 화면에 모범답안과 함께 `포함한 키워드 / 놓친 키워드` 를 표시한다.
- 최종 이해도는 기존 O/△/X 자기평가로 기록한다(동작 변경 없음).
- 적용 트랙: 일반 · DevOps 둘 다.

### 3.2 과제형 `task`

```js
{ diff: 'normal', type: 'task',
  q: '상황 설명',
  lang: 'bash',
  steps: [
    { hint: '# 1. nginx:alpine 이미지를 80포트에 백그라운드로 실행',
      answer: 'docker run -d -p 80:80 nginx:alpine',
      accept: ['docker container run -d -p 80:80 nginx:alpine'] },
    ...
  ],
  explain: '...', example: '...' }
```

- 코드 블록 모양의 UI. 주석(`hint`)이 단계 지시문이고 그 아래 입력칸에 명령어를 입력한다.
- 채점: 단답형과 같은 정규화(대소문자·앞뒤 공백·선행 `$` 무시) 후 `answer`/`accept` 비교.
- 부분 점수를 "3단계 중 2단계 정답"으로 표시하되, **전 단계 정답일 때만** 정답 처리한다.
  한 단계라도 틀리면 오답노트에 들어간다.
- 적용 트랙: DevOps 전용.

## 4. 테마 토글

- `<html data-theme="dark|light">` 로 제어. CSS 는 이미 전부 변수를 쓰므로 팔레트 한 벌만 추가.
- 최초 진입은 `prefers-color-scheme` 을 따르고, 사용자가 한 번 고르면 localStorage(`quiz_theme`)에 저장한다.
- 토글 버튼은 헤더 시계 옆.
- FOUC 방지를 위해 `<head>` 인라인 스크립트에서 `data-theme` 을 먼저 세팅한다.

## 5. 공개 사이트 정비

- 첫 방문(세션 기록 0건)일 때만 홈 상단에 소개 섹션 노출 — 무엇을 푸는 사이트인지, 몇 문제인지, 기록이 어디 저장되는지.
- `<head>` 에 description / Open Graph / Twitter Card 메타, 이모지 SVG 파비콘 인라인.
- 통계 화면에 "기록 전체 초기화" 버튼 (`Store.reset`, 확인 대화상자).
- README 갱신 — 데모 링크, 트랙·유형 설명.

## 6. 배포

저장소를 public 으로 전환하고 GitHub Pages(main 브랜치 루트)를 켠다.
정적 파일뿐이라 빌드 파이프라인은 필요 없다. 주소: `https://springljm.github.io/Computer-Knowledgement-Quiz/`

## 작업 순서

1. 테마 토글
2. 트랙 분리 UI + 마이그레이션
3. 신규 유형 2종 (quiz.js 채점 → app.js 렌더링 → CSS)
4. 일반 상식 문제은행 150문제
5. DevOps 트랙에 서술형·과제형 추가
6. 메타/소개/초기화
7. README + Pages 배포

각 단계마다 로컬 서버에서 확인한다.
