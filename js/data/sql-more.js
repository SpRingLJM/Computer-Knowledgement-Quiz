/* SQL — 추가 타이핑형 (운영 · 성능 · 트랜잭션 · 백업) */
window.QUIZ_BANK = window.QUIZ_BANK || {};
window.QUIZ_BANK.sql = window.QUIZ_BANK.sql || [];
window.QUIZ_BANK.sql.push(
  /* ---------------- 단답형 ---------------- */
  { diff: 'normal', type: 'short', q: 'PostgreSQL 에서 실행 계획을 **실제로 실행해** 각 단계의 실제 소요 시간과 행 수까지 보여주는 명령어는? (쿼리: `SELECT * FROM orders WHERE user_id = 5`)', answer: 'EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 5', accept: ['explain analyze select * from orders where user_id = 5', 'EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE user_id = 5', 'explain (analyze) select * from orders where user_id = 5'],
    explain: '`EXPLAIN` 만으로는 추정치(rows=1000)만 보이고, `ANALYZE` 를 붙이면 실제 실행 후 `actual time` 과 `actual rows` 가 나옵니다. 추정과 실제가 크게 다르면 통계가 낡은 것이라 `ANALYZE orders` 로 갱신합니다. 쿼리가 실제로 실행되므로 UPDATE/DELETE 는 트랜잭션 안에서 ROLLBACK 과 함께 씁니다.',
    example: '`Seq Scan on orders (actual rows=1)` 처럼 한 건 찾으려 전체를 훑고 있으면 인덱스가 없거나 쓰이지 않는 것입니다. `BUFFERS` 옵션으로 디스크 읽기량까지 봅니다.' },

  { diff: 'normal', type: 'short', q: 'PostgreSQL 에서 현재 실행 중인 쿼리와 상태를 보여주는 시스템 뷰를 조회하는 SQL 은? (활성 세션만)', answer: "SELECT pid, state, query FROM pg_stat_activity WHERE state = 'active'", accept: ["select * from pg_stat_activity where state = 'active'", 'select pid, state, query from pg_stat_activity where state = active', 'select * from pg_stat_activity where state = active', "SELECT pid, now() - query_start AS duration, query FROM pg_stat_activity WHERE state = 'active'"],
    explain: '`pg_stat_activity` 는 MySQL 의 `SHOW PROCESSLIST` 에 해당합니다. `state` 가 `idle in transaction` 인 세션이 오래 남아 있으면 락을 잡고 있거나 VACUUM 을 막고 있는 것이라 특히 주의합니다.',
    example: '`SELECT pg_cancel_backend(pid)` 로 쿼리만 취소하고, 안 되면 `pg_terminate_backend(pid)` 로 세션을 끊습니다.' },

  { diff: 'hard', type: 'short', q: 'PostgreSQL 에서 PID 1234 세션이 실행 중인 쿼리를 취소(세션은 유지)하는 SQL 은?', answer: 'SELECT pg_cancel_backend(1234)', accept: ['select pg_cancel_backend(1234)', 'SELECT pg_terminate_backend(1234)', 'select pg_terminate_backend(1234)'],
    explain: '`pg_cancel_backend` 는 SIGINT 로 현재 쿼리만 취소하고 연결은 남깁니다. `pg_terminate_backend` 는 세션 자체를 끊으며 `idle in transaction` 처럼 쿼리가 없는 세션에는 이쪽만 통합니다.',
    example: '배치 쿼리가 운영 DB 를 잠그고 있을 때 먼저 cancel 을 시도하고, 몇 초 안에 안 풀리면 terminate 합니다. 애플리케이션 풀이 연결을 다시 만드니 서비스 영향은 보통 미미합니다.' },

  { diff: 'normal', type: 'short', q: 'MySQL 에서 실행 시간이 2초를 넘는 쿼리를 슬로우 로그에 기록하도록 **현재 세션 없이 서버 전역**으로 임계값을 설정하는 SQL 은?', answer: 'SET GLOBAL long_query_time = 2', accept: ['set global long_query_time = 2', 'SET GLOBAL long_query_time=2', 'set global long_query_time=2;'],
    explain: '`slow_query_log = ON` 과 함께 써야 하며, `SET GLOBAL` 은 재시작하면 사라지므로 `my.cnf` 에도 적어 둡니다. 기록된 로그는 `mysqldumpslow` 나 `pt-query-digest` 로 집계합니다.',
    example: '운영 중 갑자기 느려졌을 때 임계값을 1초로 낮춰 잠시 수집한 뒤, 상위 쿼리에 인덱스를 추가하고 원래 값으로 되돌리는 방식으로 씁니다.' },

  { diff: 'hard', type: 'short', q: 'PostgreSQL 에서 `orders` 테이블의 데드 튜플을 정리하고 통계까지 갱신하며, 진행 상황을 출력하는 명령어는?', answer: 'VACUUM (VERBOSE, ANALYZE) orders', accept: ['vacuum verbose analyze orders', 'VACUUM VERBOSE ANALYZE orders', 'vacuum (analyze, verbose) orders', 'VACUUM ANALYZE orders', 'vacuum analyze orders'],
    explain: 'MVCC 때문에 UPDATE/DELETE 된 옛 행(데드 튜플)은 VACUUM 이 회수하기 전까지 공간을 차지합니다. autovacuum 이 있지만 대량 삭제 후엔 수동 실행이 빠릅니다. `VACUUM FULL` 은 테이블을 통째로 재작성하며 배타 락을 잡으므로 운영 중엔 피합니다.',
    example: '`SELECT relname, n_dead_tup FROM pg_stat_user_tables ORDER BY n_dead_tup DESC` 로 데드 튜플이 많은 테이블을 찾아 우선 처리합니다.' },

  { diff: 'hard', type: 'short', q: 'PostgreSQL 에서 `orders` 테이블의 **한 번도 사용되지 않은 인덱스**를 찾는 SQL 은?', answer: "SELECT indexrelname, idx_scan FROM pg_stat_user_indexes WHERE relname = 'orders' AND idx_scan = 0", accept: ['select indexrelname, idx_scan from pg_stat_user_indexes where relname = orders and idx_scan = 0', "select * from pg_stat_user_indexes where relname = 'orders' and idx_scan = 0", 'select * from pg_stat_user_indexes where relname = orders and idx_scan = 0', "SELECT indexrelname FROM pg_stat_user_indexes WHERE relname = 'orders' AND idx_scan = 0"],
    explain: '`pg_stat_user_indexes.idx_scan` 은 인덱스가 스캔에 쓰인 횟수입니다. 0 인 인덱스는 쓰기 비용만 발생시키므로 삭제 후보입니다. 단, 통계 초기화 이후 기간과 유니크 제약용 인덱스인지는 확인해야 합니다.',
    example: '쓰기 지연이 큰 테이블에서 미사용 인덱스 서너 개를 지우는 것만으로 INSERT 처리량이 눈에 띄게 개선되는 경우가 있습니다.' },

  { diff: 'normal', type: 'short', q: 'PostgreSQL 데이터베이스 `shop` 을 커스텀 포맷(압축, 선택 복원 가능)으로 `shop.dump` 파일에 백업하는 셸 명령어는?', answer: 'pg_dump -Fc shop -f shop.dump', accept: ['pg_dump -Fc -f shop.dump shop', 'pg_dump --format=custom shop -f shop.dump', 'pg_dump -Fc shop > shop.dump', 'pg_dump -U postgres -Fc shop -f shop.dump', 'pg_dump -Fc -d shop -f shop.dump'],
    explain: '`-Fc`(custom) 는 압축되고 `pg_restore` 로 테이블 단위 선택 복원·병렬 복원(`-j`)이 가능합니다. 평문 SQL(`-Fp`) 은 `psql` 로 넣지만 병렬·선택 복원이 안 됩니다.',
    example: '복원: `pg_restore -d shop_new -j 4 shop.dump`. 운영 DB 스냅샷을 개발 환경에 부을 때 특정 대용량 로그 테이블만 `-L` 목록으로 제외할 수 있습니다.' },

  { diff: 'normal', type: 'short', q: 'MySQL 데이터베이스 `shop` 을 **트랜잭션 일관성을 유지하며(테이블 락 없이)** `shop.sql` 로 덤프하는 셸 명령어는?', answer: 'mysqldump --single-transaction shop > shop.sql', accept: ['mysqldump -u root -p --single-transaction shop > shop.sql', 'mysqldump --single-transaction -u root -p shop > shop.sql', 'mysqldump --single-transaction --databases shop > shop.sql', 'mysqldump --single-transaction --routines --triggers shop > shop.sql'],
    explain: '`--single-transaction` 은 InnoDB 에서 REPEATABLE READ 스냅샷으로 덤프해 운영 중에도 락 없이 일관된 백업을 만듭니다. 이 옵션이 없으면 기본으로 테이블을 잠가 서비스가 멈출 수 있습니다. MyISAM 테이블에는 효과가 없습니다.',
    example: '대용량이면 `mysqldump` 대신 물리 백업 도구(Percona XtraBackup)나 관리형 DB 의 스냅샷을 쓰는 편이 복원 시간이 훨씬 짧습니다.' },

  { diff: 'hard', type: 'short', q: '`orders` 테이블에 `status` 컬럼을 추가하되 기본값 `pending` 을 주고 NULL 을 허용하지 않는 DDL 은?', answer: "ALTER TABLE orders ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending'", accept: ['alter table orders add column status varchar(20) not null default pending', "ALTER TABLE orders ADD status VARCHAR(20) NOT NULL DEFAULT 'pending'", 'alter table orders add status varchar(20) not null default pending', "alter table orders add column status varchar(20) default 'pending' not null", 'alter table orders add column status varchar(20) default pending not null'],
    explain: '`NOT NULL` 컬럼을 추가하려면 기존 행을 채울 `DEFAULT` 가 필요합니다. PostgreSQL 11+ 와 MySQL 8 은 상수 기본값이면 테이블을 재작성하지 않고 메타데이터만 바꿔 대용량 테이블에서도 즉시 끝납니다.',
    example: '기본값이 `now()` 같은 비상수면 테이블 전체를 다시 쓰므로, 운영 중엔 NULL 허용으로 추가 → 배치로 채움 → `SET NOT NULL` 3단계로 나눠 락 시간을 줄입니다.' },

  { diff: 'hard', type: 'short', q: 'PostgreSQL 에서 세션의 트랜잭션 격리 수준을 `SERIALIZABLE` 로 시작하는 SQL 은?', answer: 'BEGIN ISOLATION LEVEL SERIALIZABLE', accept: ['begin isolation level serializable', 'START TRANSACTION ISOLATION LEVEL SERIALIZABLE', 'start transaction isolation level serializable', 'BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE', 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE'],
    explain: 'PostgreSQL 기본은 READ COMMITTED 입니다. SERIALIZABLE 은 동시 트랜잭션이 순차 실행과 같은 결과를 보장하되, 충돌 시 `could not serialize access` 오류로 한쪽이 실패하므로 애플리케이션이 재시도해야 합니다.',
    example: '재고 차감·잔액 이체처럼 "읽고 계산해서 쓰는" 로직에서 두 요청이 동시에 같은 잔액을 읽는 문제(lost update)를 막을 때 씁니다. 대안으로 `SELECT ... FOR UPDATE` 행 잠금이 있습니다.' },

  { diff: 'normal', type: 'short', q: '`orders` 테이블에서 `user_id` 별로 **가장 최근 주문 1건씩만** 남기고 나머지 행 번호를 매기는 윈도우 함수 식은? (컬럼: created_at)', answer: 'ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)', accept: ['row_number() over (partition by user_id order by created_at desc)', 'ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC)', 'row_number() over(partition by user_id order by created_at desc)'],
    explain: '`ROW_NUMBER` 는 파티션 안에서 1부터 순번을 매깁니다. 이를 서브쿼리/CTE 로 감싸 `WHERE rn = 1` 로 거르면 "그룹별 최신 1건" 이 됩니다. `RANK` 는 동점에 같은 번호를 주므로 정확히 1건만 필요하면 `ROW_NUMBER` 를 씁니다.',
    example: '`WITH t AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) rn FROM orders) SELECT * FROM t WHERE rn = 1` — PostgreSQL 은 `DISTINCT ON` 으로 더 짧게 쓸 수 있습니다.' },

  { diff: 'hard', type: 'short', q: '대량 삭제 시 락과 로그 부담을 줄이기 위해 `logs` 테이블에서 30일 지난 행을 **1만 건씩 나눠** 삭제하는 MySQL 문은?', answer: 'DELETE FROM logs WHERE created_at < NOW() - INTERVAL 30 DAY LIMIT 10000', accept: ['delete from logs where created_at < now() - interval 30 day limit 10000', 'DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY) LIMIT 10000', 'delete from logs where created_at < date_sub(now(), interval 30 day) limit 10000'],
    explain: '한 번에 수천만 건을 지우면 언두 로그가 폭증하고 복제 지연·락 대기가 생깁니다. `LIMIT` 으로 잘라 반복 실행(사이 `sleep`)하면 영향이 분산됩니다. PostgreSQL 은 `DELETE ... LIMIT` 이 없어 `WHERE ctid IN (SELECT ctid ... LIMIT 10000)` 패턴을 씁니다.',
    example: '더 나은 방법은 처음부터 날짜로 파티셔닝해 `ALTER TABLE logs DROP PARTITION p202405` 로 순식간에 지우는 것입니다.' },

  /* ---------------- 과제형 ---------------- */
  { diff: 'hard', type: 'task', q: 'PostgreSQL 이 갑자기 느려졌습니다. 락 대기 중인 세션을 찾아 원인을 정리하세요.',
    scene: '# 상황: 애플리케이션 요청이 타임아웃되고, DB CPU 는 낮습니다.',
    steps: [
      { hint: '# 1. 락을 기다리고 있는(wait_event_type = Lock) 세션의 pid 와 쿼리 조회', answer: "SELECT pid, wait_event_type, query FROM pg_stat_activity WHERE wait_event_type = 'Lock'", accept: ['select pid, wait_event_type, query from pg_stat_activity where wait_event_type = lock', "select * from pg_stat_activity where wait_event_type = 'Lock'", 'select * from pg_stat_activity where wait_event_type = lock', "SELECT pid, query FROM pg_stat_activity WHERE wait_event_type = 'Lock'"] },
      { hint: '# 2. 대기 중인 pid 5678 을 막고 있는 세션의 pid 조회', answer: 'SELECT pg_blocking_pids(5678)', accept: ['select pg_blocking_pids(5678)'] },
      { hint: '# 3. 막고 있는 pid 1234 의 상태와 쿼리, 트랜잭션 시작 시각 확인', answer: 'SELECT state, xact_start, query FROM pg_stat_activity WHERE pid = 1234', accept: ['select * from pg_stat_activity where pid = 1234', 'select state, xact_start, query from pg_stat_activity where pid = 1234', 'SELECT state, query FROM pg_stat_activity WHERE pid = 1234'] },
      { hint: '# 4. 그 세션이 idle in transaction 으로 방치된 것이라면 세션 강제 종료', answer: 'SELECT pg_terminate_backend(1234)', accept: ['select pg_terminate_backend(1234)'] },
    ],
    explain: '"CPU 는 낮은데 느리다" 는 락 대기의 전형입니다. 대개 애플리케이션이 트랜잭션을 열고 커밋하지 않은 채(`idle in transaction`) 방치해 그 뒤 모든 UPDATE 가 줄을 섭니다. `idle_in_transaction_session_timeout` 을 설정해 재발을 막습니다.',
    example: 'ORM 에서 예외 발생 시 롤백을 빠뜨린 코드가 흔한 원인입니다. 종료 후 `pg_stat_activity` 의 `xact_start` 가 오래된 세션이 다시 생기는지 모니터링합니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'hard', type: 'essay', q: '인덱스가 있는데도 쿼리가 인덱스를 타지 않고 전체 스캔(Seq Scan / Full Table Scan)을 합니다. 가능한 원인과 확인 방법을 설명하세요.',
    keywords: [['통계', 'ANALYZE', '낡은'], ['선택도', '많은 행', '비율', '대부분'], ['함수', '연산', '컬럼 가공', 'WHERE lower('], ['타입', '형 변환', '암시적', 'varchar', 'int'], ['복합 인덱스', '선두 컬럼', '순서', 'leftmost'], ['LIKE', '와일드카드', '%로 시작'], ['EXPLAIN', '실행 계획'], ['작은 테이블', '옵티마이저', '비용']],
    minKeywords: 4,
    model: '먼저 `EXPLAIN ANALYZE` 로 추정 행 수와 실제 행 수를 비교합니다. 크게 다르면 통계가 낡은 것이니 `ANALYZE` 로 갱신합니다. 조건이 테이블의 상당 비율(수십 % 이상)을 반환하면 옵티마이저가 인덱스보다 순차 스캔이 싸다고 판단하는 것이 정상입니다. `WHERE lower(email) = ...` 처럼 컬럼에 함수를 씌우거나, `WHERE varchar_col = 123` 처럼 타입이 달라 암시적 형 변환이 일어나면 인덱스를 쓸 수 없으므로 식 인덱스를 만들거나 타입을 맞춥니다. 복합 인덱스 `(a, b)` 는 `WHERE b = ?` 만으로는 쓰이지 않으니 선두 컬럼 조건이 있는지 확인하고, `LIKE \'%abc\'` 처럼 와일드카드로 시작하는 패턴도 B-tree 인덱스를 못 탑니다. 테이블이 아주 작으면 인덱스보다 스캔이 빠른 것이 맞습니다.',
    explain: '"인덱스가 있으면 무조건 쓴다" 가 아니라 옵티마이저가 비용을 비교합니다. 인덱스를 못 쓰는 경우(함수·형 변환·선두 컬럼 누락)와 안 쓰는 게 나은 경우(선택도 낮음·작은 테이블)를 구분하는 것이 핵심입니다.',
    example: '`WHERE phone = 01012345678` (숫자) 로 `phone VARCHAR` 컬럼을 조회해 MySQL 이 전체 스캔을 하던 사례가 전형적입니다. 따옴표 하나로 1초가 1ms 가 됩니다.' },
);
