/* sql — 정답 명령어 풀이 (문제 ID → 조각별 설명, 순서 규칙)
 * 결과 화면의 "명령어 풀이" 칸에 표시된다. 조각은 정답 문자열의 부분 문자열이며 tools/validate.js 가 검증한다. */
window.QUIZ_PARTS = window.QUIZ_PARTS || {};
Object.assign(window.QUIZ_PARTS, {
 "sql-001": {
  "parts": [
   [
    "SELECT *",
    "`SELECT` 는 결과로 가져올 컬럼을 지정하는 절이고, `*` 는 `모든 컬럼`을 뜻합니다."
   ],
   [
    "FROM users",
    "`FROM` 절은 데이터를 읽어 올 테이블을 지정합니다. 여기서는 `users` 테이블이며, WHERE 가 없으므로 모든 행이 나옵니다."
   ]
  ],
  "order": "SQL 은 절의 순서가 문법으로 정해져 있어 SELECT 목록 다음에 FROM 이 와야 합니다. `FROM users SELECT *` 처럼 바꾸면 문법 오류입니다."
 },
 "sql-002": {
  "parts": [
   [
    "SELECT",
    "조회 절입니다. 뒤에 결과로 받을 값(컬럼이나 식)을 적습니다."
   ],
   [
    "COUNT(*)",
    "집계 함수 `COUNT` 에 `*` 를 넣으면 조건을 통과한 행의 개수를 셉니다(컬럼 값이 NULL 이어도 행으로 셉니다)."
   ],
   [
    "FROM users",
    "행을 읽어 올 테이블을 `users` 로 지정합니다."
   ],
   [
    "WHERE age >= 30",
    "`WHERE` 절은 집계 전에 개별 행을 거르는 조건입니다. `>=` 는 `이상`이므로 age 가 정확히 30 인 행도 포함됩니다."
   ]
  ],
  "order": "절 순서는 SELECT → FROM → WHERE 로 고정입니다. WHERE 로 먼저 행을 거른 뒤 남은 행에 대해 COUNT 가 계산됩니다."
 },
 "sql-003": {
  "parts": [
   [
    "ORDER BY",
    "결과 행을 정렬하는 절입니다. 쿼리의 거의 끝(LIMIT 앞)에 옵니다."
   ],
   [
    "created_at",
    "정렬 기준 컬럼입니다. 여기서는 생성 시각입니다."
   ],
   [
    "DESC",
    "DESC(descending, 내림차순): 큰 값(최신 시각)이 먼저 나옵니다. 생략하면 기본값 ASC(ascending, 오름차순)입니다."
   ]
  ],
  "order": "`ASC`/`DESC` 는 반드시 해당 정렬 컬럼 바로 뒤에 붙습니다. `ORDER BY DESC created_at` 은 문법 오류입니다."
 },
 "sql-005": {
  "parts": [
   [
    "INSERT INTO users",
    "`INSERT INTO` 는 테이블에 새 행을 추가하는 명령입니다. 대상은 `users` 테이블입니다."
   ],
   [
    "(name, age)",
    "값을 넣을 컬럼 목록입니다. 여기 적은 순서대로 VALUES 의 값과 짝지어집니다."
   ],
   [
    "VALUES ('kim', 25)",
    "`VALUES` 는 실제로 넣을 값 목록입니다. 문자열 `kim` 은 작은따옴표로 감싸고, 숫자 25 는 따옴표 없이 씁니다."
   ]
  ],
  "order": "INSERT INTO 테이블 → (컬럼 목록) → VALUES (값 목록) 순서는 고정입니다. 컬럼과 값은 위치로 짝지어지므로 `(age, name) VALUES (25, 'kim')` 처럼 양쪽을 함께 바꾸면 같은 결과지만, 한쪽만 바꾸면 값이 엉뚱한 컬럼에 들어가거나 타입 오류가 납니다."
 },
 "sql-006": {
  "parts": [
   [
    "UPDATE users",
    "`UPDATE` 는 이미 있는 행의 값을 수정하는 명령입니다. 대상 테이블은 `users` 입니다."
   ],
   [
    "SET age = 26",
    "`SET` 절은 바꿀 컬럼과 새 값을 지정합니다. age 를 26 으로 바꿉니다."
   ],
   [
    "WHERE id = 7",
    "수정 대상을 id 가 7 인 행으로 한정합니다. 이 절을 빠뜨리면 테이블의 모든 행이 age = 26 이 됩니다."
   ]
  ],
  "order": "UPDATE 테이블 → SET → WHERE 순서가 고정입니다. WHERE 를 SET 앞에 쓰면 문법 오류입니다."
 },
 "sql-009": {
  "parts": [
   [
    "SELECT city, COUNT(*)",
    "SELECT 목록입니다. 그룹 기준인 `city` 와 각 그룹의 행 수 `COUNT(*)` 를 이 순서대로 결과 컬럼으로 출력합니다."
   ],
   [
    "FROM users",
    "행을 읽어 올 테이블 `users` 입니다."
   ],
   [
    "GROUP BY city",
    "`GROUP BY` 는 city 값이 같은 행끼리 하나의 그룹으로 묶습니다. 그래서 COUNT(*) 가 도시별 사용자 수가 됩니다."
   ]
  ],
  "order": "절 순서는 SELECT → FROM → GROUP BY 로 고정입니다. SELECT 목록의 순서가 결과 컬럼 순서이므로 `COUNT(*), city` 로 쓰면 컬럼 순서가 달라집니다."
 },
 "sql-011": {
  "parts": [
   [
    "SELECT DISTINCT",
    "`DISTINCT` 는 결과에서 완전히 같은 행을 하나만 남기고 중복을 제거합니다. SELECT 바로 뒤에 씁니다."
   ],
   [
    "city",
    "조회할 컬럼입니다. 중복 여부도 이 컬럼 값 기준으로 판단합니다."
   ],
   [
    "FROM users",
    "행을 읽어 올 테이블 `users` 입니다."
   ]
  ],
  "order": "`DISTINCT` 는 SELECT 바로 뒤, 컬럼 목록 앞에 와야 합니다. `SELECT city DISTINCT` 는 오류입니다."
 },
 "sql-013": {
  "parts": [
   [
    "ALTER TABLE users",
    "`ALTER TABLE` 은 이미 만든 테이블의 구조를 바꾸는 명령입니다. 대상은 `users` 입니다."
   ],
   [
    "ADD COLUMN",
    "새 컬럼을 추가하는 동작입니다. `COLUMN` 키워드는 생략해 `ADD email ...` 로 써도 됩니다."
   ],
   [
    "email",
    "추가할 컬럼 이름입니다."
   ],
   [
    "VARCHAR(100)",
    "컬럼 타입입니다. VARCHAR(variable character: 가변 길이 문자열)이며 최대 100자까지 저장합니다."
   ]
  ],
  "order": "ALTER TABLE 테이블 → ADD COLUMN → 컬럼 이름 → 타입 순서가 고정입니다. 타입을 이름보다 앞에 쓰면 오류입니다."
 },
 "sql-014": {
  "parts": [
   [
    "LIMIT 10",
    "`LIMIT` 은 반환할 최대 행 수입니다. 여기서는 최대 10개."
   ],
   [
    "OFFSET 20",
    "`OFFSET` 은 앞에서부터 건너뛸 행 수입니다. 여기서는 처음 20개를 건너뛰고 21번째 행부터 가져옵니다."
   ]
  ],
  "order": "PostgreSQL 은 `OFFSET 20 LIMIT 10` 순서도 허용하지만 MySQL 은 `LIMIT 10 OFFSET 20` 순서만 허용합니다. MySQL 의 축약형 `LIMIT 20, 10` 은 앞이 건너뛸 수, 뒤가 가져올 수라서 헷갈리기 쉽습니다."
 },
 "sql-016": {
  "parts": [
   [
    "SELECT",
    "조회 절입니다. 뒤에 쉼표로 여러 식을 나열하면 결과 컬럼도 그만큼 생깁니다."
   ],
   [
    "SUM(amount)",
    "SUM(합계): amount 값을 모두 더합니다. NULL 은 건너뜁니다."
   ],
   [
    "AVG(amount)",
    "AVG(average, 평균): NULL 이 아닌 amount 값들의 평균입니다."
   ],
   [
    "MAX(amount)",
    "MAX(maximum, 최댓값): 가장 큰 amount 값입니다."
   ],
   [
    "FROM orders",
    "행을 읽어 올 테이블 `orders` 입니다. GROUP BY 가 없으므로 전체가 한 그룹이 되어 결과는 1행입니다."
   ]
  ],
  "order": "SELECT → FROM 순서는 고정이고, SELECT 목록의 순서가 결과 컬럼 순서입니다. 문제에서 합계·평균·최댓값 순을 요구하므로 이 순서로 씁니다."
 },
 "sql-017": {
  "parts": [
   [
    "||",
    "표준 SQL 의 문자열 연결 연산자입니다. PostgreSQL 에서 `a || b` 로 두 문자열을 이어 붙입니다."
   ],
   [
    "또는",
    "두 방법 중 어느 쪽이든 쓸 수 있다는 뜻입니다."
   ],
   [
    "CONCAT()",
    "문자열 연결 함수입니다. `CONCAT(a, b)` 형태로 쓰며, MySQL 은 기본 모드에서 `||` 가 OR 이라 이 함수를 씁니다."
   ]
  ]
 },
 "sql-019": {
  "parts": [
   [
    "SELECT u.name, o.amount",
    "SELECT 목록입니다. users 의 name 과 orders 의 amount 를 출력하며, `u.`, `o.` 는 어느 테이블의 컬럼인지 밝히는 별칭 접두어입니다."
   ],
   [
    "FROM users u",
    "기준이 되는 왼쪽 테이블 users 이고, 뒤의 `u` 는 테이블 별칭입니다(`AS u` 에서 AS 생략)."
   ],
   [
    "LEFT JOIN orders o",
    "`LEFT JOIN`(= LEFT OUTER JOIN)은 왼쪽 users 의 행을 모두 유지하면서 orders(별칭 o)를 붙입니다. 주문이 없는 사용자는 o.amount 가 NULL 로 나옵니다."
   ],
   [
    "ON o.user_id = u.id",
    "조인 조건입니다. 주문의 user_id 와 사용자의 id 가 같은 행끼리 연결합니다."
   ]
  ],
  "order": "SELECT → FROM → LEFT JOIN → ON 순서는 고정입니다. ON 안의 등식 양변(`u.id = o.user_id`)은 바꿔도 같지만, users 와 orders 의 위치를 바꾸면 어느 쪽이 모두 유지되는지가 달라집니다."
 },
 "sql-021": {
  "parts": [
   [
    "CREATE INDEX",
    "인덱스를 새로 만드는 명령입니다. 종류를 지정하지 않으면 B-tree 인덱스가 생성됩니다."
   ],
   [
    "idx_orders_user_id",
    "만들 인덱스의 이름입니다."
   ],
   [
    "ON orders",
    "인덱스를 만들 대상 테이블 `orders` 입니다."
   ],
   [
    "(user_id)",
    "인덱스에 포함할 컬럼 목록입니다. 여기서는 user_id 하나이며, 여러 개일 때는 적은 순서가 인덱스 순서가 됩니다."
   ]
  ],
  "order": "CREATE INDEX 이름 → ON 테이블 → (컬럼) 순서가 고정입니다. 컬럼이 여러 개인 복합 인덱스는 괄호 안 순서도 의미가 달라집니다."
 },
 "sql-023": {
  "parts": [
   [
    "BEGIN",
    "트랜잭션을 시작합니다(`START TRANSACTION` 과 같음). 이후 변경은 COMMIT 또는 ROLLBACK 전까지 확정되지 않습니다."
   ],
   [
    "/",
    "문제에서 두 키워드를 구분하려고 쓴 기호일 뿐 SQL 문법은 아닙니다. 실제로는 두 문장을 따로 실행합니다."
   ],
   [
    "ROLLBACK",
    "트랜잭션 안에서 한 변경을 모두 취소하고 트랜잭션을 끝냅니다."
   ]
  ],
  "order": "BEGIN 으로 먼저 시작하고, 작업한 뒤 마지막에 ROLLBACK 해야 합니다. 순서를 바꾸면 되돌릴 트랜잭션이 없습니다."
 },
 "sql-025": {
  "parts": [
   [
    "EXPLAIN",
    "뒤에 오는 쿼리를 실행하지 않고, 옵티마이저가 세운 실행 계획(Seq Scan/Index Scan, 예상 행 수 등)만 보여줍니다."
   ],
   [
    "SELECT *",
    "계획을 볼 대상 쿼리의 SELECT 목록입니다. 모든 컬럼을 조회합니다."
   ],
   [
    "FROM orders",
    "대상 테이블 `orders` 입니다."
   ],
   [
    "WHERE user_id = 5",
    "user_id 가 5 인 주문만 거르는 조건입니다. 이 조건에 인덱스가 쓰이는지가 계획에서 확인할 포인트입니다."
   ]
  ],
  "order": "`EXPLAIN` 은 대상 쿼리 맨 앞에 붙입니다. 대상 쿼리 내부는 SELECT → FROM → WHERE 순서입니다."
 },
 "sql-027": {
  "parts": [
   [
    "ALTER TABLE users",
    "테이블 구조를 바꾸는 명령이며, 대상은 `users` 입니다."
   ],
   [
    "ADD CONSTRAINT uq_users_email",
    "`ADD CONSTRAINT 이름` 으로 이름 붙은 제약 조건을 추가합니다. 이름이 있으면 나중에 이 이름으로 제약을 찾거나 삭제하기 쉽습니다."
   ],
   [
    "UNIQUE (email)",
    "제약 종류 UNIQUE 입니다. email 값이 테이블 안에서 중복될 수 없게 하며, 내부적으로 유니크 인덱스가 함께 만들어집니다."
   ]
  ],
  "order": "ALTER TABLE → ADD CONSTRAINT 이름 → 제약 종류 (컬럼) 순서가 고정입니다. 제약 이름은 CONSTRAINT 바로 뒤에 와야 합니다."
 },
 "sql-028": {
  "parts": [
   [
    "status = 'a'",
    "status 가 `a` 인지 비교하는 조건입니다."
   ],
   [
    "OR",
    "둘 중 하나라도 참이면 참입니다. IN 목록의 각 값을 OR 로 이은 것과 같습니다."
   ],
   [
    "status = 'b'",
    "status 가 `b` 인지 비교하는 조건입니다."
   ]
  ],
  "order": "OR 로 연결된 조건은 순서를 바꿔도 결과가 같습니다(`status = 'b' OR status = 'a'`)."
 },
 "sql-029": {
  "parts": [
   [
    "SELECT user_id, MAX(created_at)",
    "SELECT 목록입니다. 사용자 id 와 그 사용자의 가장 늦은(최근) 주문 시각 MAX(maximum)을 출력합니다."
   ],
   [
    "FROM orders",
    "행을 읽어 올 테이블 `orders` 입니다."
   ],
   [
    "GROUP BY user_id",
    "같은 user_id 의 주문끼리 묶어 사용자별로 MAX 를 계산하게 합니다."
   ],
   [
    "HAVING MAX(created_at)",
    "`HAVING` 은 그룹화가 끝난 뒤 그룹 단위로 거르는 조건입니다. 여기서는 각 사용자의 최근 주문일을 비교합니다."
   ],
   [
    "< NOW() - INTERVAL '30 days'",
    "`NOW()` 는 현재 시각, `INTERVAL '30 days'` 는 30일 길이의 기간입니다. 최근 주문일이 `지금부터 30일 전`보다 과거인 사용자만 남깁니다."
   ]
  ],
  "order": "SELECT → FROM → GROUP BY → HAVING 순서가 고정이며 HAVING 은 반드시 GROUP BY 뒤에 옵니다. 집계 함수 조건이라 WHERE 에는 쓸 수 없습니다."
 },
 "sql-032": {
  "parts": [
   [
    "SELECT user_id, SUM(amount)",
    "SELECT 목록입니다. 사용자 id 와 그 사용자의 주문 금액 합계 SUM 을 출력합니다."
   ],
   [
    "FROM orders",
    "행을 읽어 올 테이블 `orders` 입니다."
   ],
   [
    "GROUP BY user_id",
    "user_id 별로 행을 묶어 SUM 이 사용자별 총액이 되게 합니다."
   ],
   [
    "ORDER BY SUM(amount) DESC",
    "총액 기준으로 정렬하며, DESC(descending, 내림차순)이므로 큰 금액이 먼저 옵니다."
   ],
   [
    "LIMIT 3",
    "정렬된 결과에서 앞의 3행만 반환합니다. 즉 총액 상위 3명입니다."
   ]
  ],
  "order": "SELECT → FROM → GROUP BY → ORDER BY → LIMIT 순서가 고정입니다. LIMIT 은 정렬이 끝난 뒤 적용되므로 반드시 ORDER BY 뒤에 와야 상위 3명이 됩니다."
 },
 "sql-035": {
  "parts": [
   [
    "\\d",
    "psql 메타 명령 d(describe: 설명)입니다. SQL 이 아니라 psql 클라이언트가 처리하며, 테이블의 컬럼·타입·인덱스·제약을 보여줍니다."
   ],
   [
    "users",
    "구조를 볼 대상 테이블 이름입니다."
   ]
  ]
 },
 "sql-037": {
  "parts": [
   [
    "RANK()",
    "순위 윈도우 함수입니다. 동률이면 같은 순위를 주고 다음 순위를 건너뜁니다(1, 1, 3)."
   ],
   [
    "OVER",
    "앞의 함수가 윈도우 함수임을 나타내며, 뒤 괄호 안에 어떤 행 묶음(창)에서 계산할지 정의합니다."
   ],
   [
    "PARTITION BY dept_id",
    "부서(dept_id)별로 행을 나누어, 부서마다 순위를 1부터 따로 매깁니다."
   ],
   [
    "ORDER BY salary DESC",
    "순위 기준입니다. 급여 내림차순(DESC: descending)이라 급여가 가장 높은 사람이 1위입니다."
   ]
  ],
  "order": "OVER 괄호 안에서는 PARTITION BY 가 먼저, ORDER BY 가 뒤에 와야 합니다. 반대로 쓰면 문법 오류입니다."
 },
 "sql-039": {
  "parts": [
   [
    "INSERT INTO users",
    "users 테이블에 새 행을 삽입하는 명령입니다."
   ],
   [
    "(email, name)",
    "값을 넣을 컬럼 목록입니다. VALUES 의 값과 위치로 짝지어집니다."
   ],
   [
    "VALUES ('a@b.com', 'kim')",
    "넣을 값입니다. email = `a@b.com`, name = `kim` 입니다."
   ],
   [
    "ON CONFLICT (email)",
    "email 의 UNIQUE 제약에 걸려 충돌(이미 같은 email 이 있음)이 나면 오류 대신 뒤의 동작을 하라는 뜻입니다. 괄호 안은 충돌 판단 대상 컬럼입니다."
   ],
   [
    "DO UPDATE",
    "충돌 시 삽입 대신 기존 행을 갱신합니다. 무시하려면 `DO NOTHING` 을 씁니다."
   ],
   [
    "SET name = EXCLUDED.name",
    "기존 행의 name 을 바꿉니다. `EXCLUDED` 는 삽입하려다 충돌로 제외된 새 행을 가리키므로 EXCLUDED.name 은 `kim` 입니다."
   ]
  ],
  "order": "INSERT INTO → (컬럼) → VALUES → ON CONFLICT (대상) → DO UPDATE SET 순서가 고정입니다. 컬럼 목록과 VALUES 는 양쪽을 함께 바꿀 때만 같은 결과입니다."
 },
 "sql-041": {
  "parts": [
   [
    "SELECT *",
    "잠그면서 읽을 컬럼입니다. 여기서는 모든 컬럼입니다."
   ],
   [
    "FROM products",
    "대상 테이블 `products` 입니다."
   ],
   [
    "WHERE id = 1",
    "잠글 행을 id 가 1 인 상품 하나로 한정합니다."
   ],
   [
    "FOR UPDATE",
    "읽은 행에 배타적 행 락을 겁니다. 이 트랜잭션이 끝날 때까지 다른 트랜잭션의 UPDATE/DELETE/FOR UPDATE 는 대기합니다."
   ]
  ],
  "order": "`FOR UPDATE` 는 쿼리 맨 끝(WHERE, ORDER BY, LIMIT 뒤)에 옵니다. 락은 트랜잭션이 끝날 때 풀리므로 BEGIN 안에서 실행해야 의미가 있습니다."
 },
 "sql-044": {
  "parts": [
   [
    "WITH t AS",
    "CTE(Common Table Expression)를 정의합니다. 뒤 괄호 안 쿼리 결과에 `t` 라는 이름을 붙여 본 쿼리에서 테이블처럼 씁니다."
   ],
   [
    "(SELECT user_id, SUM(amount) AS total",
    "CTE 안쪽 SELECT 목록입니다. 사용자 id 와 금액 합계를 뽑고, 합계에 `total` 이라는 별칭을 붙입니다."
   ],
   [
    "FROM orders",
    "CTE 가 읽는 테이블 `orders` 입니다."
   ],
   [
    "GROUP BY user_id)",
    "사용자별로 묶어 SUM 이 사용자별 총액이 되게 하고, 닫는 괄호로 CTE 정의를 끝냅니다."
   ],
   [
    "SELECT u.name, t.total",
    "본 쿼리의 SELECT 목록입니다. 사용자 이름과 CTE 에서 계산한 총액을 출력합니다."
   ],
   [
    "FROM t",
    "CTE `t` 를 테이블처럼 읽습니다."
   ],
   [
    "JOIN users u",
    "`JOIN`(= INNER JOIN)으로 users(별칭 u)를 붙입니다. 매칭되는 사용자만 남습니다."
   ],
   [
    "ON u.id = t.user_id",
    "조인 조건입니다. 사용자 id 와 CTE 의 user_id 가 같은 행끼리 연결합니다."
   ],
   [
    "WHERE t.total > 1000",
    "총액이 1000 초과인 행만 남깁니다(1000 은 제외)."
   ]
  ],
  "order": "WITH 절이 맨 앞에 오고, 그 뒤 본 쿼리가 SELECT → FROM → JOIN ... ON → WHERE 순서로 옵니다. `t` 와 `users` 의 조인 순서나 ON 등식 양변은 바꿔도 결과가 같습니다."
 },
 "sql-046": {
  "parts": [
   [
    "SELECT pid, state, query",
    "SELECT 목록입니다. 백엔드 프로세스 ID(pid), 세션 상태(state), 실행 중인 쿼리 텍스트(query)를 출력합니다."
   ],
   [
    "FROM pg_stat_activity",
    "PostgreSQL 시스템 뷰로, 서버에 접속한 세션(백엔드)마다 한 행씩 현재 활동을 보여줍니다."
   ],
   [
    "WHERE state = 'active'",
    "지금 쿼리를 실행 중인 세션만 남깁니다(idle, idle in transaction 등 제외)."
   ]
  ],
  "order": "SELECT → FROM → WHERE 순서가 고정입니다. SELECT 목록 순서는 결과 컬럼 순서입니다."
 },
 "sql-049": {
  "parts": [
   [
    "SHOW PROCESSLIST",
    "MySQL 서버에 연결된 스레드(세션)와 각자 실행 중인 쿼리·상태·경과 시간을 보여줍니다. 쿼리 텍스트는 앞부분만 나오며 전문은 `SHOW FULL PROCESSLIST` 로 봅니다."
   ]
  ]
 },
 "sql-052": {
  "parts": [
   [
    "SELECT",
    "함수 호출 결과를 조회합니다. FROM 없이 식만 SELECT 할 수 있습니다."
   ],
   [
    "pg_blocking_pids(1234)",
    "PID 1234 인 백엔드를 막고 있는(락을 쥐고 있는) 백엔드 PID 들을 정수 배열로 반환합니다. 막는 것이 없으면 빈 배열입니다."
   ]
  ]
 },
 "sql-054": {
  "parts": [
   [
    "SUM(amount)",
    "합계 함수입니다. OVER 와 함께 쓰여 윈도우 함수로 동작하므로 행을 줄이지 않고 각 행마다 값을 계산합니다."
   ],
   [
    "OVER",
    "앞의 SUM 이 윈도우 함수임을 나타내며, 뒤 괄호 안에서 계산할 행 범위(창)를 정의합니다."
   ],
   [
    "PARTITION BY user_id",
    "사용자별로 행을 나누어 사용자마다 누적 합을 0 부터 따로 시작합니다."
   ],
   [
    "ORDER BY created_at",
    "시간순으로 정렬합니다. OVER 안에 ORDER BY 가 있으면 기본 프레임이 `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, 즉 파티션 처음부터 현재 행까지(현재 행과 `created_at` 이 같은 동률 행까지 포함)가 되어 누적 합이 됩니다. 그래서 `created_at` 이 같은 주문들은 같은 누적 합을 받습니다."
   ]
  ],
  "order": "OVER 괄호 안에서는 PARTITION BY 가 먼저, ORDER BY 가 뒤에 와야 합니다. 프레임 절(ROWS ...)을 쓸 때는 ORDER BY 다음에 옵니다."
 },
 "sql-057": {
  "parts": [
   [
    "SELECT email",
    "결과로 email 컬럼만 가져옵니다."
   ],
   [
    "FROM users",
    "행을 읽어 올 테이블 `users` 입니다."
   ],
   [
    "WHERE name = 'kim'",
    "name 이 `kim` 인 행만 남깁니다. 문자열 값은 작은따옴표로 감쌉니다."
   ]
  ],
  "order": "SELECT → FROM → WHERE 순서가 고정입니다."
 },
 "sql-058": {
  "parts": [
   [
    "SELECT *",
    "모든 컬럼을 가져옵니다."
   ],
   [
    "FROM orders",
    "행을 읽어 올 테이블 `orders` 입니다."
   ],
   [
    "WHERE amount",
    "WHERE 절로 행을 거르며, 조건 대상은 amount 컬럼입니다."
   ],
   [
    "BETWEEN 100 AND 500",
    "100 이상 500 이하(양 끝 포함)인지 검사합니다. `amount >= 100 AND amount <= 500` 과 같습니다."
   ]
  ],
  "order": "SELECT → FROM → WHERE 순서가 고정이고, BETWEEN 은 작은 값을 앞에 써야 합니다. `BETWEEN 500 AND 100` 은 오류는 아니지만 아무 행도 반환하지 않습니다."
 },
 "sql-060": {
  "parts": [
   [
    "DELETE FROM users",
    "`DELETE FROM` 은 테이블에서 행을 삭제하는 명령입니다. 대상은 `users` 이며 테이블 구조는 남습니다."
   ],
   [
    "WHERE id = 5",
    "삭제할 행을 id 가 5 인 행으로 한정합니다. 빠뜨리면 모든 행이 삭제됩니다."
   ]
  ],
  "order": "DELETE FROM 테이블 → WHERE 순서가 고정입니다."
 },
 "sql-062": {
  "parts": [
   [
    "DROP TABLE",
    "테이블 자체를 삭제합니다. 데이터뿐 아니라 구조·인덱스·제약까지 모두 사라집니다."
   ],
   [
    "logs",
    "삭제할 테이블 이름입니다."
   ]
  ]
 },
 "sql-064": {
  "parts": [
   [
    "SELECT *",
    "모든 컬럼을 가져옵니다."
   ],
   [
    "FROM products",
    "행을 읽어 올 테이블 `products` 입니다."
   ],
   [
    "ORDER BY price DESC",
    "price 기준 내림차순(DESC: descending) 정렬이라 가장 비싼 상품이 맨 앞에 옵니다."
   ],
   [
    "LIMIT 1",
    "정렬된 결과에서 첫 1행만 반환합니다."
   ]
  ],
  "order": "SELECT → FROM → ORDER BY → LIMIT 순서가 고정입니다. LIMIT 은 정렬 뒤에 적용되므로 ORDER BY 다음에 와야 가장 비싼 1개가 됩니다."
 },
 "sql-066": {
  "parts": [
   [
    "UPDATE users",
    "`UPDATE`: 기존 행의 값을 바꾸는 명령입니다. 대상 테이블은 `users` 입니다."
   ],
   [
    "SET status = 'active'",
    "`SET 컬럼 = 값`: 바꿀 컬럼과 새 값을 지정합니다. 여기서는 `status` 를 문자열 'active' 로 바꿉니다. WHERE 절이 없으므로 모든 행이 대상입니다."
   ]
  ],
  "order": "`UPDATE 테이블` → `SET ...` → (`WHERE ...`) 순서가 고정입니다. 이 문제처럼 SET 에 상수 값만 넣을 때는 여러 컬럼을 쉼표로 나열하는 순서가 자유입니다. 단 MySQL 은 SET 의 대입을 왼쪽부터 차례로 적용하므로, `SET a = a + 1, b = a` 처럼 다른 컬럼 값을 참조하면 순서에 따라 결과가 달라질 수 있습니다(PostgreSQL 은 항상 수정 전 값을 사용)."
 },
 "sql-068": {
  "parts": [
   [
    "SELECT COUNT(*)",
    "`SELECT`: 조회할 값을 지정합니다. `COUNT(*)` 는 조건을 만족하는 행의 개수를 셉니다."
   ],
   [
    "FROM users",
    "`FROM`: 조회 대상 테이블, 여기서는 `users` 입니다."
   ],
   [
    "WHERE email LIKE '%@gmail.com'",
    "`WHERE`: 행을 거르는 조건입니다. `LIKE` 에서 `%` 는 0글자 이상의 임의 문자열이므로 `'%@gmail.com'` 은 `@gmail.com` 으로 끝나는 이메일을 뜻합니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. 이 문제는 SELECT → FROM → WHERE 순서입니다."
 },
 "sql-070": {
  "parts": [
   [
    "NOW()",
    "`NOW()`: 현재 날짜와 시각(timestamp)을 돌려주는 함수입니다. 인자는 없지만 괄호는 붙여야 합니다. 표준 이름인 `CURRENT_TIMESTAMP` 도 같은 값을 돌려줍니다."
   ]
  ]
 },
 "sql-071": {
  "parts": [
   [
    "SELECT u.name, COUNT(o.id)",
    "`SELECT`: 출력 컬럼입니다. 사용자 이름(`u.name`)과 그 사용자의 주문 수(`COUNT(o.id)`, NULL 이 아닌 주문 id 개수)를 보여줍니다."
   ],
   [
    "FROM users u",
    "`FROM users u`: 기준 테이블 `users` 에 짧은 별칭 `u` 를 붙입니다."
   ],
   [
    "JOIN orders o",
    "`JOIN`(= INNER JOIN): `orders` 테이블(별칭 `o`)을 결합합니다. 양쪽에 짝이 있는 행만 남습니다."
   ],
   [
    "ON o.user_id = u.id",
    "`ON`: 결합 조건입니다. 주문의 `user_id` 가 사용자의 `id` 와 같은 행끼리 묶습니다."
   ],
   [
    "GROUP BY u.id, u.name",
    "`GROUP BY`: 사용자 단위로 묶어 COUNT 를 계산합니다. 동명이인을 구분하려고 `u.id` 로 묶고, SELECT 에 쓴 `u.name` 도 함께 적습니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. `JOIN ... ON` 은 FROM 바로 뒤에 옵니다. `ON` 의 좌우(`u.id = o.user_id`)와 GROUP BY 안의 컬럼 순서는 바꿔도 결과가 같습니다."
 },
 "sql-073": {
  "parts": [
   [
    "SELECT status, COUNT(*)",
    "`SELECT`: 상태값(`status`)과 그 상태의 주문 건수(`COUNT(*)`)를 출력합니다."
   ],
   [
    "FROM orders",
    "`FROM`: 조회 대상 테이블 `orders` 입니다."
   ],
   [
    "GROUP BY status",
    "`GROUP BY`: `status` 값이 같은 행끼리 하나의 그룹으로 묶습니다."
   ],
   [
    "HAVING COUNT(*) >= 10",
    "`HAVING`: 묶인 그룹을 거르는 조건입니다. 집계 결과(건수)가 10 이상인 그룹만 남깁니다. 집계 조건은 WHERE 가 아니라 HAVING 에 씁니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. HAVING 은 반드시 GROUP BY 뒤에 옵니다."
 },
 "sql-075": {
  "parts": [
   [
    "SELECT DATE_TRUNC('month', created_at) AS month, COUNT(*)",
    "`SELECT`: `DATE_TRUNC('month', created_at)` 는 시각을 그 달의 1일 0시로 잘라 월 단위로 맞추고, `AS month` 로 별칭을 붙입니다. `COUNT(*)` 는 월별 주문 수입니다."
   ],
   [
    "FROM orders",
    "`FROM`: 조회 대상 테이블 `orders` 입니다."
   ],
   [
    "GROUP BY month",
    "`GROUP BY`: 앞에서 만든 별칭 `month` 기준으로 묶습니다(PostgreSQL 은 SELECT 별칭을 GROUP BY 에 쓸 수 있습니다)."
   ],
   [
    "ORDER BY month",
    "`ORDER BY`: 결과를 월 순서(오름차순)로 정렬합니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. GROUP BY 가 ORDER BY 보다 앞에 와야 합니다."
 },
 "sql-077": {
  "parts": [
   [
    "DROP INDEX",
    "`DROP INDEX`: 인덱스를 삭제하는 DDL 입니다."
   ],
   [
    "idx_orders_user_id",
    "삭제할 인덱스 이름입니다. PostgreSQL 은 이름만 쓰고, MySQL 은 뒤에 `ON 테이블명` 을 붙입니다."
   ]
  ]
 },
 "sql-079": {
  "parts": [
   [
    "SELECT * FROM users u",
    "바깥 쿼리입니다. `users` 테이블(별칭 `u`)의 모든 컬럼(`*`)을 조회합니다."
   ],
   [
    "WHERE EXISTS",
    "`WHERE EXISTS (서브쿼리)`: 괄호 안 서브쿼리가 한 행이라도 돌려주면 참이 되어 그 사용자를 남깁니다."
   ],
   [
    "(SELECT 1 FROM orders o",
    "서브쿼리 시작입니다. `orders`(별칭 `o`)에서 찾으며, 존재 여부만 보므로 선택 값은 관례적으로 상수 `1` 을 씁니다."
   ],
   [
    "WHERE o.user_id = u.id)",
    "상관 조건입니다. 바깥 행의 `u.id` 를 참조해 그 사용자의 주문만 찾습니다. 닫는 괄호로 서브쿼리가 끝납니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. 서브쿼리 안에서도 같은 순서를 따릅니다. `o.user_id = u.id` 의 좌우는 바꿔도 같습니다."
 },
 "sql-081": {
  "parts": [
   [
    "SELECT",
    "`SELECT`: 조회할 값을 지정합니다. 여기서는 CASE 식 하나를 출력합니다."
   ],
   [
    "CASE WHEN status = 'paid' THEN '결제완료'",
    "`CASE WHEN 조건 THEN 값`: `status` 가 'paid' 인 행은 '결제완료' 를 돌려줍니다."
   ],
   [
    "ELSE '기타'",
    "`ELSE`: 위 조건에 해당하지 않는 나머지 모든 행은 '기타' 로 표시합니다. ELSE 가 없으면 NULL 이 됩니다."
   ],
   [
    "END AS label",
    "`END`: CASE 식의 끝입니다. `AS label` 로 결과 컬럼 이름을 label 로 붙입니다."
   ],
   [
    "FROM orders",
    "`FROM`: 조회 대상 테이블 `orders` 입니다."
   ]
  ],
  "order": "CASE 식은 `CASE → WHEN ... THEN ... → ELSE → END` 순서로 쓰며, WHEN 은 위에서부터 먼저 맞는 것이 적용됩니다. 전체 문장은 SELECT → FROM 순서입니다."
 },
 "sql-083": {
  "parts": [
   [
    "ALTER TABLE users",
    "`ALTER TABLE`: 기존 테이블의 구조를 바꾸는 DDL 입니다. 대상은 `users` 입니다."
   ],
   [
    "DROP COLUMN phone",
    "`DROP COLUMN`: 컬럼을 삭제합니다. 여기서는 `phone` 컬럼입니다(`COLUMN` 키워드는 생략 가능)."
   ]
  ],
  "order": "`ALTER TABLE 테이블` 다음에 변경 동작(`DROP COLUMN ...`)이 옵니다."
 },
 "sql-085": {
  "parts": [
   [
    "ALTER TABLE users",
    "`ALTER TABLE`: 기존 테이블 `users` 의 구조를 바꿉니다."
   ],
   [
    "ADD COLUMN role",
    "`ADD COLUMN`: 새 컬럼을 추가합니다. 컬럼 이름은 `role` 입니다."
   ],
   [
    "VARCHAR(20)",
    "컬럼 타입입니다. 최대 20글자의 가변 길이 문자열입니다."
   ],
   [
    "NOT NULL",
    "`NOT NULL`: NULL 을 허용하지 않는 제약입니다."
   ],
   [
    "DEFAULT 'user'",
    "`DEFAULT`: 값을 주지 않으면 들어갈 기본값입니다. 기존 행도 'user' 로 채워집니다."
   ]
  ],
  "order": "컬럼 이름 → 타입 → 제약 순서입니다. 타입 뒤의 `NOT NULL` 과 `DEFAULT 'user'` 끼리는 순서를 바꿔도 같습니다."
 },
 "sql-087": {
  "parts": [
   [
    "SELECT user_id, MAX(created_at) AS last_order",
    "`SELECT`: 사용자 id 와, 그 사용자의 주문 중 가장 늦은 시각(`MAX(created_at)`)을 `last_order` 라는 이름으로 출력합니다."
   ],
   [
    "FROM orders",
    "`FROM`: 조회 대상 테이블 `orders` 입니다."
   ],
   [
    "GROUP BY user_id",
    "`GROUP BY`: 사용자별로 묶어 MAX 를 사용자마다 계산합니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT."
 },
 "sql-088": {
  "parts": [
   [
    "SELECT DISTINCT ON (user_id) *",
    "`DISTINCT ON (user_id)`: PostgreSQL 전용 문법으로, `user_id` 값마다 정렬상 첫 번째 행 하나만 남깁니다. `*` 는 그 행의 모든 컬럼입니다."
   ],
   [
    "FROM orders",
    "`FROM`: 조회 대상 테이블 `orders` 입니다."
   ],
   [
    "ORDER BY user_id, created_at DESC",
    "`ORDER BY`: 첫 정렬 기준은 DISTINCT ON 키(`user_id`)와 같아야 하고, 그 안에서 `created_at DESC`(DESC=descending, 내림차순)로 최신 주문이 첫 행이 되게 합니다."
   ]
  ],
  "order": "`ORDER BY` 의 맨 앞은 반드시 DISTINCT ON 의 키(`user_id`)여야 합니다. `created_at DESC` 를 앞으로 옮기면 오류가 납니다. SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT."
 },
 "sql-090": {
  "parts": [
   [
    "CREATE INDEX",
    "`CREATE INDEX`: 인덱스를 만드는 DDL 입니다."
   ],
   [
    "CONCURRENTLY",
    "`CONCURRENTLY`: 테이블 쓰기를 막지 않고 온라인으로 인덱스를 만듭니다. 시간이 더 걸리고 트랜잭션 블록 안에서는 쓸 수 없습니다."
   ],
   [
    "idx_orders_user_created",
    "새 인덱스의 이름입니다."
   ],
   [
    "ON orders (user_id, created_at)",
    "`ON 테이블 (컬럼들)`: `orders` 테이블의 `user_id`, `created_at` 두 컬럼으로 복합 인덱스를 만듭니다. `user_id` 가 선두 컬럼입니다."
   ]
  ],
  "order": "`CONCURRENTLY` 는 `CREATE INDEX` 바로 뒤, 인덱스 이름 앞에 와야 합니다. 괄호 안 컬럼 순서는 인덱스 구조 자체를 바꾸므로 `(created_at, user_id)` 는 다른 인덱스입니다."
 },
 "sql-092": {
  "parts": [
   [
    "UPDATE jobs",
    "`UPDATE`: `jobs` 테이블의 행을 수정합니다."
   ],
   [
    "SET status = 'running'",
    "`SET`: 선택된 작업의 `status` 를 'running' 으로 바꿉니다."
   ],
   [
    "WHERE id = (",
    "`WHERE id = (서브쿼리)`: 서브쿼리가 고른 id 한 건만 수정합니다."
   ],
   [
    "SELECT id FROM jobs WHERE status = 'pending'",
    "서브쿼리입니다. `jobs` 에서 대기 중(`pending`)인 작업의 id 를 찾습니다."
   ],
   [
    "ORDER BY id LIMIT 1",
    "`ORDER BY id`: 오래된(id 가 작은) 작업부터, `LIMIT 1`: 한 건만 고릅니다."
   ],
   [
    "FOR UPDATE SKIP LOCKED)",
    "`FOR UPDATE`: 고른 행을 잠급니다. `SKIP LOCKED`: 다른 워커가 이미 잠근 행은 기다리지 않고 건너뜁니다. 닫는 괄호로 서브쿼리가 끝납니다."
   ],
   [
    "RETURNING *",
    "`RETURNING *`: PostgreSQL 기능으로, 수정된 행의 모든 컬럼을 바로 결과로 돌려줍니다."
   ]
  ],
  "order": "서브쿼리 안은 WHERE → ORDER BY → LIMIT → FOR UPDATE SKIP LOCKED 순서이며, 잠금 절은 맨 끝에 옵니다. 바깥 UPDATE 는 UPDATE → SET → WHERE → RETURNING 순서입니다."
 },
 "sql-094": {
  "parts": [
   [
    "amount -",
    "현재 행의 `amount` 에서 뒤에 오는 값(직전 주문 금액)을 뺍니다."
   ],
   [
    "LAG(amount)",
    "`LAG(컬럼)`: 같은 파티션 안에서 정렬상 바로 이전 행의 값을 가져오는 윈도우 함수입니다. 이전 행이 없으면(첫 주문) NULL 이 됩니다."
   ],
   [
    "OVER (",
    "`OVER (...)`: 앞의 함수를 윈도우 함수로 계산하라는 표시이며, 괄호 안에 창(window)을 정의합니다."
   ],
   [
    "PARTITION BY user_id",
    "`PARTITION BY`: 사용자별로 구간을 나눕니다. 다른 사용자의 주문은 이전 행으로 보지 않습니다."
   ],
   [
    "ORDER BY created_at)",
    "`ORDER BY`: 파티션 안에서 주문 시각 오름차순으로 정렬해 무엇이 직전인지 정합니다."
   ]
  ],
  "order": "`OVER` 괄호 안에서는 `PARTITION BY` 가 `ORDER BY` 보다 먼저 와야 합니다."
 },
 "sql-096": {
  "parts": [
   [
    "SELECT n_dead_tup, last_autovacuum",
    "`SELECT`: `n_dead_tup`(dead tuple, 정리되지 않은 옛 행 수)과 `last_autovacuum`(autovacuum 이 마지막으로 돈 시각)을 조회합니다."
   ],
   [
    "FROM pg_stat_user_tables",
    "`FROM`: 사용자 테이블별 통계를 보여주는 PostgreSQL 시스템 뷰입니다."
   ],
   [
    "WHERE relname = 'orders'",
    "`WHERE`: `relname`(relation name, 테이블 이름)이 'orders' 인 행만 봅니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT."
 },
 "sql-098": {
  "parts": [
   [
    "SHOW INDEX",
    "`SHOW INDEX`: MySQL 에서 인덱스 정보를 보여주는 명령입니다."
   ],
   [
    "FROM orders",
    "`FROM 테이블`: 인덱스를 볼 대상 테이블, 여기서는 `orders` 입니다."
   ]
  ]
 },
 "sql-100": {
  "parts": [
   [
    "SELECT pg_cancel_backend(pid)",
    "`pg_cancel_backend(pid)`: 해당 프로세스(pid)가 실행 중인 쿼리만 취소합니다(연결은 유지). 조건에 맞는 행마다 호출됩니다."
   ],
   [
    "FROM pg_stat_activity",
    "`FROM`: 현재 세션과 실행 중인 쿼리를 보여주는 시스템 뷰입니다."
   ],
   [
    "WHERE state = 'active'",
    "`WHERE`: 지금 쿼리를 실행 중(`active`)인 세션만 대상으로 합니다."
   ],
   [
    "AND now() - query_start > interval '5 minutes'",
    "`AND`: 두 번째 조건입니다. 현재 시각에서 쿼리 시작 시각(`query_start`)을 뺀 실행 시간이 5분(`interval '5 minutes'`)을 넘는 것만 고릅니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. `AND` 로 이은 두 조건끼리는 순서를 바꿔도 결과가 같습니다."
 },
 "sql-103": {
  "parts": [
   [
    "SELECT",
    "`SELECT`: 함수 결과 값을 조회합니다(FROM 없이 사용 가능)."
   ],
   [
    "pg_size_pretty(",
    "`pg_size_pretty`: 바이트 수를 `12 MB` 처럼 사람이 읽기 쉬운 단위로 바꿉니다."
   ],
   [
    "pg_total_relation_size('orders'))",
    "`pg_total_relation_size`: 테이블 본체 + 모든 인덱스 + TOAST 를 합친 바이트 크기입니다. 대상은 `orders` 입니다."
   ]
  ],
  "order": "안쪽 함수(`pg_total_relation_size`)가 먼저 계산되고 그 결과를 바깥 `pg_size_pretty` 가 변환합니다. 중첩 순서를 바꾸면 안 됩니다."
 },
 "sql-105": {
  "parts": [
   [
    "SELECT query, total_exec_time",
    "`SELECT`: 정규화된 쿼리 문장(`query`)과 누적 총 실행 시간(`total_exec_time`, 밀리초)을 출력합니다."
   ],
   [
    "FROM pg_stat_statements",
    "`FROM`: `pg_stat_statements` 확장 모듈이 제공하는 뷰입니다. 쿼리 패턴별 통계가 쌓입니다."
   ],
   [
    "ORDER BY total_exec_time DESC",
    "`ORDER BY ... DESC`(descending): 총 실행 시간이 큰 순서로 정렬합니다."
   ],
   [
    "LIMIT 5",
    "`LIMIT 5`: 상위 5개만 출력합니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. ORDER BY 가 LIMIT 보다 먼저 와야 상위 5개가 올바르게 잘립니다."
 },
 "sql-116": {
  "parts": [
   [
    "EXPLAIN",
    "`EXPLAIN`: 쿼리의 실행 계획을 보여줍니다."
   ],
   [
    "ANALYZE",
    "`ANALYZE`: 쿼리를 실제로 실행해 각 단계의 실제 시간(`actual time`)과 실제 행 수(`actual rows`)까지 표시합니다."
   ],
   [
    "SELECT * FROM orders WHERE user_id = 5",
    "분석할 대상 쿼리입니다. `orders` 에서 `user_id` 가 5 인 행을 조회합니다."
   ]
  ],
  "order": "`EXPLAIN ANALYZE` 가 맨 앞, 분석할 쿼리가 뒤에 옵니다. 옵션을 괄호로 쓸 때는 `EXPLAIN (ANALYZE, BUFFERS)` 처럼 괄호 안 순서는 자유입니다."
 },
 "sql-117": {
  "parts": [
   [
    "SELECT pid, state, query",
    "`SELECT`: 세션의 프로세스 id(`pid`), 상태(`state`), 실행 중인 쿼리 문장(`query`)을 출력합니다."
   ],
   [
    "FROM pg_stat_activity",
    "`FROM`: 현재 접속한 세션과 쿼리를 보여주는 PostgreSQL 시스템 뷰입니다."
   ],
   [
    "WHERE state = 'active'",
    "`WHERE`: 지금 쿼리를 실행 중인 활성 세션만 남깁니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT."
 },
 "sql-118": {
  "parts": [
   [
    "SELECT",
    "`SELECT`: 함수를 호출해 결과(true/false)를 받습니다."
   ],
   [
    "pg_cancel_backend(1234)",
    "`pg_cancel_backend(pid)`: pid 1234 세션의 현재 쿼리만 취소하고 연결은 유지합니다. 성공하면 true 를 돌려줍니다."
   ]
  ]
 },
 "sql-119": {
  "parts": [
   [
    "SET GLOBAL",
    "`SET GLOBAL`: 서버 전역 시스템 변수를 바꿉니다. 이후 새로 연결되는 세션에 적용되며, 재시작하면 원래 값으로 돌아갑니다."
   ],
   [
    "long_query_time = 2",
    "`long_query_time`: 이 시간(초)을 넘는 쿼리를 슬로우 쿼리로 기록합니다. 여기서는 2초입니다."
   ]
  ],
  "order": "`SET GLOBAL` 다음에 `변수 = 값` 이 옵니다."
 },
 "sql-120": {
  "parts": [
   [
    "VACUUM",
    "`VACUUM`: dead tuple(갱신·삭제로 남은 옛 행)이 차지한 공간을 재사용 가능하게 정리합니다."
   ],
   [
    "(VERBOSE, ANALYZE)",
    "괄호 옵션 목록입니다. `VERBOSE`: 진행 상황을 자세히 출력, `ANALYZE`: 정리 후 옵티마이저 통계도 갱신합니다."
   ],
   [
    "orders",
    "대상 테이블입니다."
   ]
  ],
  "order": "괄호 안 옵션 순서는 자유입니다(`(ANALYZE, VERBOSE)` 도 같음). 괄호 없는 옛 문법은 `VACUUM VERBOSE ANALYZE orders` 처럼 VERBOSE 가 ANALYZE 앞에 와야 합니다."
 },
 "sql-121": {
  "parts": [
   [
    "SELECT indexrelname, idx_scan",
    "`SELECT`: 인덱스 이름(`indexrelname`)과 인덱스가 스캔에 쓰인 횟수(`idx_scan`)를 출력합니다."
   ],
   [
    "FROM pg_stat_user_indexes",
    "`FROM`: 사용자 인덱스별 사용 통계를 보여주는 PostgreSQL 시스템 뷰입니다."
   ],
   [
    "WHERE relname = 'orders'",
    "`WHERE`: 인덱스가 속한 테이블 이름(`relname`)이 'orders' 인 것만 봅니다."
   ],
   [
    "AND idx_scan = 0",
    "`AND`: 스캔 횟수가 0, 즉 통계 수집 이후 한 번도 쓰이지 않은 인덱스만 남깁니다."
   ]
  ],
  "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. `AND` 로 이은 두 조건끼리는 순서를 바꿔도 같습니다."
 },
 "sql-122": {
  "parts": [
   [
    "pg_dump",
    "PostgreSQL 데이터베이스 하나를 백업 파일로 내보내는(덤프) 명령입니다."
   ],
   [
    "-Fc",
    "`-F`(format) 옵션에 값 `c`(custom)를 붙여 쓴 것입니다. 압축되고 `pg_restore` 로 선택·병렬 복원이 가능한 커스텀 포맷으로 저장합니다."
   ],
   [
    "shop",
    "백업할 데이터베이스 이름입니다."
   ],
   [
    "-f shop.dump",
    "`-f`(file): 출력 파일 이름입니다. 여기서는 `shop.dump` 에 씁니다."
   ]
  ],
  "order": "옵션 순서는 자유입니다. `pg_dump -Fc -f shop.dump shop` 처럼 DB 이름을 맨 뒤에 두는 것이 가장 일반적입니다. 단 `-f` 바로 뒤에는 파일 이름이 와야 합니다."
 },
 "sql-123": {
  "parts": [
   [
    "mysqldump",
    "MySQL 데이터베이스를 SQL 문(CREATE/INSERT) 형태로 내보내는 명령입니다."
   ],
   [
    "--single-transaction",
    "덤프 시작 시 트랜잭션을 열어 InnoDB 스냅샷(REPEATABLE READ)으로 읽습니다. 테이블 락 없이 일관된 백업이 됩니다."
   ],
   [
    "shop",
    "덤프할 데이터베이스 이름입니다."
   ],
   [
    "> shop.sql",
    "셸 리다이렉션입니다. 표준 출력으로 나오는 덤프 내용을 `shop.sql` 파일에 저장(덮어쓰기)합니다."
   ]
  ],
  "order": "옵션(`--single-transaction`)은 DB 이름 앞에 두는 것이 일반적이고, `> shop.sql` 리다이렉션은 명령 맨 끝에 둡니다."
 },
 "sql-124": {
  "parts": [
   [
    "ALTER TABLE orders",
    "`ALTER TABLE`: 기존 테이블 `orders` 의 구조를 바꿉니다."
   ],
   [
    "ADD COLUMN status",
    "`ADD COLUMN`: 새 컬럼 `status` 를 추가합니다."
   ],
   [
    "VARCHAR(20)",
    "컬럼 타입입니다. 최대 20글자의 가변 길이 문자열입니다."
   ],
   [
    "NOT NULL",
    "`NOT NULL`: NULL 을 허용하지 않습니다."
   ],
   [
    "DEFAULT 'pending'",
    "`DEFAULT`: 기본값입니다. 새 행에서 값을 생략하거나 기존 행을 채울 때 'pending' 이 들어갑니다."
   ]
  ],
  "order": "컬럼 이름 → 타입 → 제약 순서입니다. `NOT NULL` 과 `DEFAULT 'pending'` 끼리는 순서를 바꿔도 같습니다."
 },
 "sql-125": {
  "parts": [
   [
    "BEGIN",
    "`BEGIN`: 트랜잭션을 시작합니다."
   ],
   [
    "ISOLATION LEVEL SERIALIZABLE",
    "`ISOLATION LEVEL`: 이 트랜잭션의 격리 수준을 지정합니다. `SERIALIZABLE` 은 가장 엄격한 수준으로, 충돌 시 한쪽이 실패하므로 재시도가 필요합니다."
   ]
  ],
  "order": "`BEGIN` 뒤에 격리 수준 옵션이 옵니다."
 },
 "sql-126": {
  "parts": [
   [
    "ROW_NUMBER()",
    "`ROW_NUMBER()`: 파티션 안에서 정렬 순서대로 1, 2, 3... 순번을 매기는 윈도우 함수입니다. 동점이어도 번호가 겹치지 않습니다."
   ],
   [
    "OVER (",
    "`OVER (...)`: 윈도우(창)를 정의하는 절의 시작입니다."
   ],
   [
    "PARTITION BY user_id",
    "`PARTITION BY`: 사용자별로 번호를 따로 매깁니다."
   ],
   [
    "ORDER BY created_at DESC)",
    "`ORDER BY ... DESC`(descending): 최신 주문이 1번이 되도록 주문 시각 내림차순으로 정렬합니다."
   ]
  ],
  "order": "`OVER` 괄호 안에서는 `PARTITION BY` 가 `ORDER BY` 보다 먼저 와야 합니다."
 },
 "sql-127": {
  "parts": [
   [
    "DELETE FROM logs",
    "`DELETE FROM`: `logs` 테이블에서 행을 삭제합니다."
   ],
   [
    "WHERE created_at < NOW() - INTERVAL 30 DAY",
    "`WHERE`: 작성 시각이 지금으로부터 30일 전보다 이전인 행만 대상입니다. `INTERVAL 30 DAY` 는 MySQL 의 기간 표기입니다."
   ],
   [
    "LIMIT 10000",
    "`LIMIT`: 한 번에 최대 1만 건만 삭제합니다(MySQL 에서 DELETE 에 쓸 수 있음). 남은 행이 없을 때까지 반복 실행합니다."
   ]
  ],
  "order": "`DELETE FROM` → `WHERE` → `LIMIT` 순서입니다. LIMIT 은 맨 끝에 와야 합니다."
 },
 "sql-108": {
  "steps": [
   {
    "parts": [
     [
      "select count(*)",
      "`select count(*)`: 행 개수를 셉니다."
     ],
     [
      "from orders",
      "`from`: 대상 테이블 `orders` 입니다. WHERE 가 없으므로 전체 행 수가 나옵니다."
     ]
    ],
    "order": "SELECT → FROM 순서입니다."
   },
   {
    "parts": [
     [
      "select sum(amount)",
      "`sum(amount)`: 조건에 맞는 행의 `amount` 합계를 구합니다."
     ],
     [
      "from orders",
      "`from`: 대상 테이블 `orders` 입니다."
     ],
     [
      "where status = paid",
      "`where`: `status` 가 paid 인 행만 합산합니다. 실제 SQL 에서는 문자열이므로 `'paid'` 처럼 작은따옴표로 감싸야 합니다(채점에서는 따옴표를 무시)."
     ]
    ],
    "order": "SELECT → FROM → WHERE 순서입니다."
   },
   {
    "parts": [
     [
      "select status, count(*), sum(amount)",
      "`select`: 상태값, 상태별 건수(`count(*)`), 상태별 금액 합계(`sum(amount)`)를 출력합니다."
     ],
     [
      "from orders",
      "`from`: 대상 테이블 `orders` 입니다."
     ],
     [
      "group by status",
      "`group by`: 같은 `status` 끼리 묶어 집계합니다. SELECT 의 비집계 컬럼(`status`)은 GROUP BY 에 있어야 합니다."
     ]
    ],
    "order": "SELECT → FROM → GROUP BY 순서입니다."
   }
  ]
 },
 "sql-109": {
  "steps": [
   {
    "parts": [
     [
      "select c.name, o.amount",
      "`select`: 고객 이름과 주문 금액을 출력합니다."
     ],
     [
      "from customers c",
      "`from`: 기준 테이블 `customers`, 별칭 `c` 입니다."
     ],
     [
      "join orders o",
      "`join`(= INNER JOIN): `orders`(별칭 `o`)를 결합합니다. 양쪽에 짝이 있는 행, 즉 주문이 있는 고객만 남습니다."
     ],
     [
      "on c.id = o.customer_id",
      "`on`: 고객 id 와 주문의 `customer_id` 가 같은 행끼리 연결합니다."
     ]
    ],
    "order": "FROM → JOIN → ON 순서입니다. `on` 의 좌우는 바꿔도 같습니다."
   },
   {
    "parts": [
     [
      "select c.name, o.amount",
      "`select`: 고객 이름과 주문 금액을 출력합니다."
     ],
     [
      "from customers c",
      "`from`: 왼쪽(기준) 테이블 `customers` 입니다."
     ],
     [
      "left join orders o",
      "`left join`(LEFT OUTER JOIN): 왼쪽 테이블의 모든 행을 남기고, 짝이 없으면 오른쪽 컬럼(`o.amount`)은 NULL 로 채웁니다."
     ],
     [
      "on c.id = o.customer_id",
      "`on`: 고객 id 와 주문의 `customer_id` 로 연결합니다."
     ]
    ],
    "order": "FROM → LEFT JOIN → ON 순서입니다. LEFT JOIN 에서는 테이블의 좌우를 바꾸면 결과가 달라지지만, `on` 조건의 좌우는 바꿔도 같습니다."
   },
   {
    "parts": [
     [
      "select c.name, count(*)",
      "`select`: 고객 이름과 주문 건수를 출력합니다."
     ],
     [
      "from customers c",
      "`from`: 기준 테이블 `customers` 입니다."
     ],
     [
      "join orders o",
      "`join`: 주문 테이블과 내부 조인합니다."
     ],
     [
      "on c.id = o.customer_id",
      "`on`: 고객과 그 고객의 주문을 연결합니다."
     ],
     [
      "group by c.id, c.name",
      "`group by`: 고객별로 묶습니다. 동명이인을 구분하려고 id 도 함께 묶습니다."
     ],
     [
      "having count(*) >= 3",
      "`having`: 묶은 뒤의 조건입니다. 주문 건수가 3 이상인 고객만 남깁니다."
     ]
    ],
    "order": "SELECT → FROM → JOIN ... ON → GROUP BY → HAVING 순서입니다. HAVING 은 GROUP BY 뒤에 옵니다."
   }
  ]
 },
 "sql-110": {
  "steps": [
   {
    "parts": [
     [
      "explain",
      "`explain`: 뒤의 쿼리를 실행하지 않고 옵티마이저가 세운 실행 계획만 보여줍니다."
     ],
     [
      "select * from orders where customer_id = 42",
      "분석할 쿼리입니다. `customer_id` 가 42 인 주문을 조회합니다."
     ]
    ],
    "order": "`explain` 이 맨 앞, 분석할 쿼리가 뒤에 옵니다."
   },
   {
    "parts": [
     [
      "create index",
      "`create index`: 인덱스를 만드는 DDL 입니다."
     ],
     [
      "idx_orders_customer",
      "새 인덱스의 이름입니다."
     ],
     [
      "on orders (customer_id)",
      "`on 테이블 (컬럼)`: `orders` 테이블의 `customer_id` 컬럼에 인덱스를 만듭니다."
     ]
    ],
    "order": "`create index 이름 on 테이블 (컬럼)` 순서가 고정입니다."
   },
   {
    "parts": [
     [
      "show index",
      "`show index`: MySQL 에서 인덱스 목록과 정보를 보여주는 명령입니다(PostgreSQL 은 `\\d orders` 나 `pg_indexes` 뷰)."
     ],
     [
      "from orders",
      "대상 테이블 `orders` 입니다."
     ]
    ]
   }
  ]
 },
 "sql-111": {
  "steps": [
   {
    "parts": [
     [
      "begin",
      "`begin`: 트랜잭션을 시작합니다. 이후 변경은 `commit` 전까지 확정되지 않고 `rollback` 으로 되돌릴 수 있습니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "select * from orders",
      "`select * from orders`: `orders` 의 모든 컬럼을 조회합니다."
     ],
     [
      "where status = pending",
      "`where`: 변경할 대상과 같은 조건입니다. 실제 SQL 에서는 `'pending'` 처럼 작은따옴표로 감쌉니다(채점에서는 따옴표를 무시)."
     ]
    ],
    "order": "SELECT → FROM → WHERE 순서입니다."
   },
   {
    "parts": [
     [
      "update orders",
      "`update`: `orders` 테이블의 행을 수정합니다."
     ],
     [
      "set status = cancelled",
      "`set`: `status` 를 cancelled 로 바꿉니다(실제로는 `'cancelled'`)."
     ],
     [
      "where status = pending",
      "`where`: 바로 앞에서 확인한 것과 같은 조건으로, pending 인 행만 바꿉니다."
     ]
    ],
    "order": "UPDATE → SET → WHERE 순서입니다. WHERE 를 빠뜨리면 전체 행이 바뀝니다."
   },
   {
    "parts": [
     [
      "commit",
      "`commit`: 트랜잭션 안의 변경을 확정해 다른 세션에서도 보이게 합니다."
     ]
    ]
   }
  ]
 },
 "sql-128": {
  "steps": [
   {
    "parts": [
     [
      "SELECT pid, wait_event_type, query",
      "`SELECT`: 프로세스 id, 무엇을 기다리는지(`wait_event_type`), 실행 중인 쿼리를 출력합니다."
     ],
     [
      "FROM pg_stat_activity",
      "`FROM`: 현재 세션 정보를 보여주는 시스템 뷰입니다."
     ],
     [
      "WHERE wait_event_type = 'Lock'",
      "`WHERE`: 락을 기다리고 있는 세션만 남깁니다."
     ]
    ],
    "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT."
   },
   {
    "parts": [
     [
      "SELECT",
      "`SELECT`: 함수 결과를 조회합니다."
     ],
     [
      "pg_blocking_pids(5678)",
      "`pg_blocking_pids(pid)`: 해당 pid(5678)를 막고 있는 세션들의 pid 를 배열로 돌려줍니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "SELECT state, xact_start, query",
      "`SELECT`: 세션 상태(`state`), 트랜잭션 시작 시각(`xact_start`, transaction start), 쿼리를 출력합니다."
     ],
     [
      "FROM pg_stat_activity",
      "`FROM`: 세션 정보 시스템 뷰입니다."
     ],
     [
      "WHERE pid = 1234",
      "`WHERE`: 막고 있는 세션 pid 1234 만 봅니다."
     ]
    ],
    "order": "SQL 절은 문법 순서가 정해져 있습니다: SELECT → FROM → (JOIN ... ON) → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT."
   },
   {
    "parts": [
     [
      "SELECT",
      "`SELECT`: 함수를 호출합니다."
     ],
     [
      "pg_terminate_backend(1234)",
      "`pg_terminate_backend(pid)`: pid 1234 세션 자체를 강제로 끊습니다. 열린 트랜잭션은 롤백되고 쥐고 있던 락이 풀립니다."
     ]
    ]
   }
  ]
 }
});
