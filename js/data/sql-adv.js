window.QUIZ_BANK.sql.push(
  /* ---------------- 과제형 ---------------- */
  { diff: 'easy', type: 'task', q: '주문 데이터를 조회해 매출을 확인하세요.',
    scene: '# 상황: orders 테이블(컬럼: id, customer_id, amount, status, created_at)에서 매출을 확인합니다.',
    steps: [
      { hint: '# 1. orders 테이블의 전체 행 개수 조회', answer: 'select count(*) from orders', accept: ['select count(1) from orders', 'select count(*) as cnt from orders'] },
      { hint: '# 2. status 가 paid 인 주문의 amount 합계 조회', answer: 'select sum(amount) from orders where status = paid', accept: ['select sum(amount) from orders where status=paid', 'select sum(amount) as total from orders where status = paid'] },
      { hint: '# 3. status 별로 묶어 건수와 합계를 함께 조회', answer: 'select status, count(*), sum(amount) from orders group by status', accept: ['select status, count(*), sum(amount) from orders group by status order by status', 'select status, count(1), sum(amount) from orders group by status'] },
    ],
    explain: '`COUNT(*)` 는 행 수를, `COUNT(컬럼)` 은 그 컬럼이 NULL 이 아닌 행 수를 셉니다. 집계 대상에 NULL 이 섞이면 결과가 달라집니다.',
    example: 'GROUP BY 없이 집계 함수와 일반 컬럼을 함께 선택하면 대부분의 DB 가 오류를 냅니다. MySQL 의 옛 기본 설정만 예외적으로 허용해 혼란을 일으켰습니다.' },

  { diff: 'normal', type: 'task', q: '고객별 주문 현황을 집계하세요.',
    scene: '# 상황: customers(id, name)와 orders(id, customer_id, amount)를 함께 조회합니다.',
    steps: [
      { hint: '# 1. 주문이 있는 고객만 이름과 주문 금액을 함께 조회 (내부 조인)', answer: 'select c.name, o.amount from customers c join orders o on c.id = o.customer_id', accept: ['select c.name, o.amount from customers c inner join orders o on c.id = o.customer_id', 'select c.name, o.amount from customers c, orders o where c.id = o.customer_id', 'select c.name, o.amount from customers c join orders o on o.customer_id = c.id'] },
      { hint: '# 2. 주문이 없는 고객까지 포함해 조회 (왼쪽 외부 조인)', answer: 'select c.name, o.amount from customers c left join orders o on c.id = o.customer_id', accept: ['select c.name, o.amount from customers c left outer join orders o on c.id = o.customer_id', 'select c.name, o.amount from customers c left join orders o on o.customer_id = c.id'] },
      { hint: '# 3. 고객별 주문 건수를 세어 3건 이상인 고객만 조회', answer: 'select c.name, count(*) from customers c join orders o on c.id = o.customer_id group by c.id, c.name having count(*) >= 3', accept: ['select c.name, count(*) from customers c join orders o on c.id = o.customer_id group by c.id, c.name having count(*) > 2', 'select c.name, count(o.id) from customers c join orders o on c.id = o.customer_id group by c.id, c.name having count(o.id) >= 3', 'select c.name, count(*) from customers c join orders o on o.customer_id = c.id group by c.id, c.name having count(*) >= 3'] },
    ],
    explain: 'WHERE 는 그룹으로 묶기 전 행을 거르고, HAVING 은 묶은 뒤 그룹을 거릅니다. 집계 결과로 필터링하려면 반드시 HAVING 이어야 합니다.',
    example: 'LEFT JOIN 후 WHERE 로 오른쪽 테이블 컬럼에 조건을 걸면 NULL 행이 걸러져 사실상 INNER JOIN 이 됩니다. 조건은 ON 절에 넣어야 합니다.' },

  { diff: 'hard', type: 'task', q: '느린 쿼리의 원인을 찾아 인덱스를 추가하세요.',
    scene: '# 상황: orders 테이블의 customer_id 조회가 느립니다.',
    steps: [
      { hint: '# 1. 해당 쿼리의 실행 계획 확인', answer: 'explain select * from orders where customer_id = 42', accept: ['explain analyze select * from orders where customer_id = 42', 'explain (analyze) select * from orders where customer_id = 42'] },
      { hint: '# 2. customer_id 컬럼에 인덱스 생성 (이름: idx_orders_customer)', answer: 'create index idx_orders_customer on orders (customer_id)', accept: ['create index idx_orders_customer on orders(customer_id)', 'create index concurrently idx_orders_customer on orders (customer_id)'] },
      { hint: '# 3. orders 테이블에 정의된 인덱스 목록 확인', answer: 'show index from orders', accept: ['show indexes from orders', 'select * from pg_indexes where tablename = orders', '\\d orders'] },
    ],
    explain: '실행 계획에서 Seq Scan(또는 full table scan)이 보이면 인덱스를 타지 않는 것입니다. 인덱스를 만들어도 컬럼에 함수를 씌우거나 타입이 다르면 여전히 타지 않습니다.',
    example: '운영 중인 대형 테이블에 그냥 CREATE INDEX 를 걸면 쓰기가 잠깁니다. PostgreSQL 은 `CONCURRENTLY` 로 잠금 없이 생성할 수 있습니다.' },

  { diff: 'hard', type: 'task', q: '데이터를 안전하게 수정하세요.',
    scene: '# 상황: 특정 주문의 상태를 일괄 변경해야 합니다. 실수하면 복구가 어렵습니다.',
    steps: [
      { hint: '# 1. 트랜잭션 시작', answer: 'begin', accept: ['start transaction', 'begin transaction', 'begin work'] },
      { hint: '# 2. 변경 대상이 맞는지 먼저 SELECT 로 확인 (status 가 pending 인 행)', answer: 'select * from orders where status = pending', accept: ['select count(*) from orders where status = pending', 'select id from orders where status = pending'] },
      { hint: '# 3. 해당 행들의 status 를 cancelled 로 변경', answer: 'update orders set status = cancelled where status = pending', accept: ['update orders set status=cancelled where status=pending'] },
      { hint: '# 4. 결과가 의도한 대로면 확정', answer: 'commit', accept: ['commit work', 'commit transaction'] },
    ],
    explain: 'UPDATE·DELETE 전에 같은 WHERE 로 SELECT 해 대상 건수를 확인하는 것이 기본입니다. 트랜잭션으로 감싸면 결과가 이상할 때 `ROLLBACK` 으로 되돌릴 수 있습니다.',
    example: 'WHERE 절을 빠뜨린 UPDATE 로 전체 행이 바뀌는 사고는 지금도 반복됩니다. 자동 커밋을 끄고 작업하는 습관이 최후의 방어선입니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'normal', type: 'essay', q: '인덱스가 조회를 빠르게 만드는 원리와, 그럼에도 인덱스를 무턱대고 많이 만들면 안 되는 이유를 설명하세요.',
    keywords: [['B-tree', '트리', '정렬'], ['전체 스캔', 'full scan', '탐색 범위'], ['쓰기', 'INSERT', 'UPDATE', '갱신 비용'], ['저장 공간', '용량'], ['카디널리티', '선택도', '분포'], ['복합 인덱스', '순서']],
    minKeywords: 4,
    model: '인덱스는 정렬된 자료구조(대개 B-tree)를 따로 두어, 전체 테이블을 훑는 대신 탐색 범위를 단계적으로 좁혀 원하는 행에 도달하게 합니다. 그래서 조회 속도가 크게 개선됩니다. 그러나 인덱스는 데이터가 바뀔 때마다 함께 갱신되어야 하므로 INSERT·UPDATE·DELETE 가 느려지고, 저장 공간도 추가로 차지합니다. 또 성별처럼 값의 종류가 적은 컬럼은 선택도가 낮아 인덱스를 타도 이득이 없습니다. 복합 인덱스는 컬럼 순서가 중요해서, 선행 컬럼이 조건에 없으면 활용되지 못합니다.',
    explain: '인덱스 설계는 읽기와 쓰기의 교환입니다. 쓰기가 많은 테이블에 인덱스를 남발하면 조회는 빨라져도 전체 처리량은 떨어집니다.',
    example: '로그 적재 테이블처럼 쓰기가 압도적인 곳에 인덱스를 여러 개 걸어 적재가 밀리는 사고가 흔합니다.' },

  { diff: 'hard', type: 'essay', q: '트랜잭션의 ACID 를 설명하고, 실무에서 격리 수준을 낮출 때 생길 수 있는 문제를 서술하세요.',
    keywords: [['원자성', 'atomicity', '전부 아니면'], ['일관성', 'consistency'], ['격리성', 'isolation'], ['지속성', 'durability'], ['더티 리드', 'dirty read'], ['반복 불가능', 'non-repeatable', '팬텀', 'phantom'], ['락', '성능', '동시성']],
    minKeywords: 4,
    model: '원자성은 트랜잭션 안의 작업이 전부 반영되거나 전부 취소되는 성질, 일관성은 트랜잭션 전후로 제약 조건이 유지되는 성질, 격리성은 동시에 실행되는 트랜잭션이 서로의 중간 상태를 보지 않는 성질, 지속성은 커밋된 결과가 장애 후에도 남는 성질입니다. 격리 수준을 낮추면 동시성과 성능은 좋아지지만, READ UNCOMMITTED 에서는 커밋되지 않은 값을 읽는 더티 리드가, READ COMMITTED 에서는 같은 조회를 두 번 했을 때 값이 달라지는 반복 불가능 읽기가, REPEATABLE READ 에서도 조건에 맞는 행이 새로 생기는 팬텀 리드가 나타날 수 있습니다.',
    explain: '격리 수준은 정확성과 동시성 사이의 선택입니다. 무조건 높이면 락 경합으로 처리량이 떨어지므로, 업무 요구사항에 맞춰 결정해야 합니다.',
    example: '잔액 확인 후 차감처럼 읽고 쓰는 흐름은 격리 수준이 낮으면 이중 차감이 생깁니다. 이럴 때는 조회 시점에 잠금을 걸거나 원자적 갱신으로 처리합니다.' },

  { diff: 'extreme', type: 'essay', q: '특정 쿼리가 갑자기 느려졌습니다. 원인을 어떻게 진단하고 개선하겠습니까?',
    keywords: [['실행 계획', 'EXPLAIN', 'plan'], ['인덱스', '스캔', 'seq scan', 'full scan'], ['통계', 'ANALYZE', '옵티마이저'], ['데이터 증가', '행 수', '카디널리티'], ['락', '대기', '블로킹'], ['슬로우 쿼리 로그', '모니터링'], ['N+1', '쿼리 수']],
    minKeywords: 4,
    model: '먼저 슬로우 쿼리 로그에서 언제부터 느려졌는지와 실제 실행 시간을 확인합니다. `EXPLAIN ANALYZE` 로 실행 계획을 보고 인덱스를 타는지, 예상 행 수와 실제 행 수가 크게 어긋나지 않는지 봅니다. 차이가 크면 통계가 낡은 것이므로 ANALYZE 로 갱신합니다. 데이터가 늘면서 옵티마이저가 계획을 바꾼 경우도 있습니다. 실행 계획이 멀쩡한데 느리다면 락 대기나 블로킹을 의심해 대기 중인 세션을 확인합니다. 애플리케이션 쪽에서는 반복 호출로 쿼리 수가 폭증하는 N+1 문제인지도 함께 봅니다. 개선은 인덱스 추가·조건 정리·불필요한 컬럼 제거·페이징 순으로 검토합니다.',
    explain: '"쿼리가 느리다" 는 쿼리 자체 문제일 수도, 데이터 증가로 계획이 바뀐 문제일 수도, 동시성 문제일 수도 있습니다. 실행 계획과 대기 상태를 함께 봐야 구분됩니다.',
    example: '데이터 100만 건까지는 인덱스를 잘 타다가 어느 시점부터 옵티마이저가 전체 스캔이 낫다고 판단해 급격히 느려지는 일이 실제로 일어납니다.' },

  { diff: 'extreme', type: 'essay', q: '운영 중인 데이터베이스에서 스키마를 변경해야 합니다. 어떤 점을 고려하고 어떤 순서로 진행하겠습니까?',
    keywords: [['락', '잠금', '다운타임'], ['백업', '복구', '롤백 계획'], ['단계적', '무중단', '호환성'], ['NULL 허용', '기본값', '컬럼 추가'], ['테스트', '스테이징', '검증'], ['배포 순서', '코드', '마이그레이션']],
    minKeywords: 4,
    model: '먼저 변경이 테이블 전체를 잠그는 작업인지 확인합니다. 대형 테이블의 컬럼 타입 변경이나 인덱스 생성은 긴 잠금을 유발할 수 있습니다. 반드시 백업을 확보하고 되돌릴 방법을 미리 정합니다. 무중단을 위해서는 단계적으로 진행합니다. 컬럼을 추가할 때는 NULL 허용으로 먼저 추가하고, 코드가 새 컬럼을 채우도록 배포한 뒤, 값을 백필하고, 마지막에 제약 조건을 겁니다. 코드와 스키마는 양쪽 버전이 공존할 수 있도록 호환되게 만들어야 롤백이 가능합니다. 실제 데이터 규모와 비슷한 스테이징에서 소요 시간을 측정한 뒤 트래픽이 적은 시간대에 수행합니다.',
    explain: '스키마 변경의 핵심은 "코드와 DB 가 동시에 바뀔 수 없다" 는 전제입니다. 어느 한쪽만 배포된 중간 상태에서도 서비스가 동작해야 안전한 배포가 됩니다.',
    example: '컬럼 이름을 한 번에 바꾸면 배포 중간에 예전 코드가 없는 컬럼을 찾아 장애가 납니다. 새 컬럼 추가 후 이전 컬럼을 나중에 제거하는 방식이 표준입니다.' },
);
