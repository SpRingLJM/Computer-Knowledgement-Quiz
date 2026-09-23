/* network — 정답 명령어 풀이 (문제 ID → 조각별 설명, 순서 규칙)
 * 결과 화면의 "명령어 풀이" 칸에 표시된다. 조각은 정답 문자열의 부분 문자열이며 tools/validate.js 가 검증한다. */
window.QUIZ_PARTS = window.QUIZ_PARTS || {};
Object.assign(window.QUIZ_PARTS, {
 "network-001": {
  "parts": [
   [
    "ping",
    "ICMP Echo Request 를 보내고 응답(Echo Reply)이 오는지, 왕복 시간(RTT)이 얼마인지 보여 주는 명령입니다. 리눅스에서는 `Ctrl+C` 로 멈출 때까지 계속 보냅니다."
   ],
   [
    "example.com",
    "요청을 보낼 대상 호스트입니다. 도메인을 주면 먼저 DNS 로 IP 를 찾은 뒤 그 IP 로 보냅니다."
   ]
  ]
 },
 "network-003": {
  "parts": [
   [
    "dig",
    "DNS 서버에 질의해 응답을 자세히 보여 주는 조회 도구입니다."
   ],
   [
    "example.com",
    "조회할 도메인 이름입니다. 레코드 타입을 적지 않으면 기본값인 A 레코드(IPv4 주소)를 조회합니다."
   ]
  ]
 },
 "network-006": {
  "parts": [
   [
    "ip",
    "iproute2 패키지의 네트워크 설정·조회 명령입니다. `ifconfig`, `route`, `arp` 를 대체합니다."
   ],
   [
    "addr",
    "다룰 객체로 address(인터페이스 주소)를 지정합니다. 동작을 생략하면 `show` 가 기본이라 모든 인터페이스의 IP 주소를 보여 줍니다."
   ]
  ],
  "order": "`ip` 바로 뒤에 객체(`addr`)가 오고, 그 뒤에 동작(`show` 등)이 옵니다. 객체 이름은 `a`, `address` 처럼 줄이거나 늘여 써도 됩니다."
 },
 "network-008": {
  "parts": [
   [
    "curl",
    "URL 로 HTTP 등 요청을 보내고 응답을 출력하는 명령입니다."
   ],
   [
    "-I",
    "`-I`(--head): GET 대신 HEAD 요청을 보내 본문 없이 응답 헤더(상태 줄 포함)만 출력합니다."
   ],
   [
    "https://api.example.com/health",
    "요청을 보낼 대상 URL(헬스 체크 엔드포인트)입니다."
   ]
  ],
  "order": "옵션과 URL 의 순서는 자유입니다. `curl https://api.example.com/health -I` 도 같습니다."
 },
 "network-011": {
  "parts": [
   [
    "traceroute",
    "TTL 을 1부터 하나씩 늘린 패킷을 보내, 각 홉(라우터)이 돌려주는 응답으로 목적지까지의 경로와 홉별 지연을 보여 주는 명령입니다."
   ],
   [
    "example.com",
    "경로를 추적할 목적지 호스트입니다."
   ]
  ]
 },
 "network-014": {
  "parts": [
   [
    "ssh",
    "암호화된 원격 셸 접속 클라이언트입니다."
   ],
   [
    "-p 2222",
    "`-p`(port): 접속할 원격 SSH 포트를 지정합니다. 여기서는 기본 22 대신 2222."
   ],
   [
    "ubuntu@10.0.1.5",
    "`사용자@호스트` 형식의 접속 대상입니다. 사용자 `ubuntu` 로 호스트 `10.0.1.5` 에 로그인합니다."
   ]
  ],
  "order": "옵션은 대상 앞뒤 어디에 와도 됩니다(`ssh ubuntu@10.0.1.5 -p 2222`). 단 대상 뒤에 원격 실행 명령을 붙이는 경우에는 그 뒤의 인자가 명령으로 취급되므로 옵션을 앞에 두는 것이 안전합니다."
 },
 "network-016": {
  "parts": [
   [
    "nslookup",
    "DNS 를 조회해 사용한 DNS 서버(Server/Address)와 응답 결과를 보여 주는 간단한 도구입니다."
   ],
   [
    "example.com",
    "조회할 도메인 이름입니다. 뒤에 서버 IP 를 더 적으면 그 서버에 질의합니다."
   ]
  ]
 },
 "network-019": {
  "parts": [
   [
    "ss",
    "소켓 상태를 보여 주는 명령(socket statistics)으로, `netstat` 의 후속 도구입니다."
   ],
   [
    "-tulnp",
    "t(tcp: TCP 소켓) · u(udp: UDP 소켓) · l(listening: 대기 중인 소켓만) · n(numeric: 포트·주소를 이름 대신 숫자로) · p(processes: 소켓을 쓰는 프로세스 표시). 다른 사용자의 프로세스까지 보려면 root 권한이 필요합니다."
   ]
  ],
  "order": "묶은 옵션 글자의 순서는 자유입니다. `ss -tlnup`, `ss -lntup` 모두 같은 결과입니다."
 },
 "network-021": {
  "parts": [
   [
    "curl",
    "URL 로 HTTP 요청을 보내는 명령입니다."
   ],
   [
    "-X POST",
    "`-X`(--request): 요청 메서드를 지정합니다. 여기서는 POST. `-d` 가 있으면 자동으로 POST 가 되므로 생략해도 됩니다."
   ],
   [
    "https://api.example.com/users",
    "요청을 보낼 대상 URL 입니다."
   ],
   [
    "-H \"Content-Type: application/json\"",
    "`-H`(--header): 요청 헤더를 추가합니다. 본문이 JSON 임을 서버에 알립니다(생략하면 curl 은 `application/x-www-form-urlencoded` 로 보냅니다)."
   ],
   [
    "-d '{\"name\":\"kim\"}'",
    "`-d`(--data): 요청 본문 데이터입니다. 셸이 큰따옴표를 건드리지 않도록 JSON 전체를 작은따옴표로 감쌌습니다."
   ]
  ],
  "order": "옵션과 URL 의 순서는 자유입니다. `-H`, `-d` 를 URL 앞에 두어도 같습니다. 다만 각 옵션의 값은 그 옵션 바로 뒤에 와야 합니다."
 },
 "network-023": {
  "parts": [
   [
    "nc",
    "netcat. TCP/UDP 연결을 직접 열어 데이터를 주고받는 범용 도구입니다."
   ],
   [
    "-zv",
    "z(zero-I/O mode: 데이터를 보내지 않고 연결 가능 여부만 확인) · v(verbose: 성공/실패 결과를 출력)."
   ],
   [
    "db.internal",
    "연결을 시도할 대상 호스트입니다."
   ],
   [
    "5432",
    "확인할 포트 번호입니다(PostgreSQL 기본 포트)."
   ]
  ],
  "order": "호스트가 먼저, 포트가 뒤에 옵니다. 묶은 옵션 글자 순서(`-zv`/`-vz`)는 자유입니다."
 },
 "network-025": {
  "parts": [
   [
    "ip",
    "iproute2 의 네트워크 설정·조회 명령입니다."
   ],
   [
    "route",
    "다룰 객체로 라우팅 테이블을 지정합니다. 동작을 생략하면 `show`(=`list`)가 기본이라 전체 경로를 출력하며, `default via ...` 줄이 기본 게이트웨이입니다."
   ]
  ]
 },
 "network-027": {
  "parts": [
   [
    "curl",
    "URL 로 HTTP 요청을 보내는 명령입니다."
   ],
   [
    "-s",
    "`-s`(--silent): 진행률 표시와 오류 메시지를 숨겨 출력에 상태 코드만 남게 합니다."
   ],
   [
    "-o /dev/null",
    "`-o`(--output): 응답 본문을 저장할 파일입니다. `/dev/null` 로 보내 본문을 버립니다."
   ],
   [
    "-w \"%{http_code}\"",
    "`-w`(--write-out): 전송이 끝난 뒤 지정한 형식을 출력합니다. `%{http_code}` 는 응답 상태 코드(예: 200) 변수입니다."
   ],
   [
    "https://example.com",
    "요청할 대상 URL 입니다."
   ]
  ],
  "order": "옵션 순서는 자유입니다(`curl -o /dev/null -s -w ...`). 단 `-o` 바로 뒤에는 파일 이름이, `-w` 바로 뒤에는 형식 문자열이 와야 합니다."
 },
 "network-029": {
  "parts": [
   [
    "openssl",
    "OpenSSL 명령줄 도구입니다."
   ],
   [
    "s_client",
    "TLS 클라이언트로 서버에 접속해 핸드셰이크를 하고 서버 인증서를 출력하는 하위 명령입니다."
   ],
   [
    "-connect example.com:443",
    "`-connect`: 접속할 `호스트:포트` 입니다. 여기서는 example.com 의 443(HTTPS)."
   ],
   [
    "-servername example.com",
    "`-servername`: TLS SNI 로 보낼 호스트 이름입니다. 한 IP 에 여러 도메인이 있는 서버에서 올바른 인증서를 받으려면 필요합니다."
   ],
   [
    "</dev/null",
    "표준 입력을 `/dev/null` 로 연결해 s_client 가 입력을 기다리지 않고 바로 종료되게 합니다."
   ],
   [
    "2>/dev/null",
    "표준 에러(stderr, 접속 과정 메시지)를 버려 출력을 깔끔하게 합니다."
   ],
   [
    "|",
    "파이프: 앞 명령의 표준 출력(인증서 PEM 이 포함된 출력)을 뒤 명령의 입력으로 넘깁니다."
   ],
   [
    "openssl",
    "두 번째 OpenSSL 호출로, 넘겨받은 인증서를 해석합니다."
   ],
   [
    "x509",
    "X.509 인증서를 읽고 표시·변환하는 하위 명령입니다. 입력에서 첫 번째 인증서(서버 인증서)를 읽습니다."
   ],
   [
    "-noout",
    "인증서 자체(PEM 인코딩)는 출력하지 않습니다."
   ],
   [
    "-dates",
    "유효 기간인 notBefore(시작일)와 notAfter(만료일)를 출력합니다."
   ]
  ],
  "order": "`s_client` 쪽 옵션(`-connect`, `-servername`)끼리, `x509` 쪽 옵션(`-noout`, `-dates`)끼리는 순서가 자유입니다. 하지만 인증서를 가져오는 `s_client` 가 파이프 앞, 해석하는 `x509` 가 파이프 뒤에 있어야 합니다."
 },
 "network-031": {
  "parts": [
   [
    "tcpdump",
    "네트워크 인터페이스의 패킷을 캡처해 보여 주는 도구입니다(보통 root 권한 필요)."
   ],
   [
    "-i eth0",
    "`-i`(interface): 캡처할 인터페이스를 지정합니다. 여기서는 eth0."
   ],
   [
    "tcp",
    "BPF 필터 식의 프로토콜 한정자입니다. TCP 패킷만 대상으로 합니다."
   ],
   [
    "port 80",
    "출발지나 목적지 포트가 80 인 패킷만 캡처합니다. 앞의 `tcp` 와 합쳐 TCP 80 트래픽만 봅니다."
   ]
  ],
  "order": "옵션(`-i eth0`)을 먼저 쓰고 필터 식(`tcp port 80`)을 맨 뒤에 두는 것이 표준 형태입니다. 필터 식 안에서는 `tcp port 80` 처럼 프로토콜 한정자가 `port` 앞에 옵니다."
 },
 "network-033": {
  "parts": [
   [
    "ssh",
    "SSH 클라이언트입니다."
   ],
   [
    "-L 8080:db.internal:5432",
    "`-L`(local port forwarding): `로컬포트:대상호스트:대상포트`. 내 PC 의 8080 으로 들어온 연결을 bastion 을 거쳐 `db.internal:5432` 로 전달합니다. `db.internal` 은 bastion 에서 해석됩니다."
   ],
   [
    "bastion",
    "SSH 로 접속해 터널의 중계 지점이 될 서버입니다."
   ]
  ],
  "order": "옵션은 호스트 앞에 두는 것이 일반적이며 `-N`, `-f` 등과의 순서는 자유입니다. `-L` 값 안의 순서(로컬포트:대상호스트:대상포트)는 바꾸면 안 됩니다."
 },
 "network-036": {
  "parts": [
   [
    "dig",
    "DNS 조회 도구입니다."
   ],
   [
    "@8.8.8.8",
    "`@서버`: 시스템 기본 리졸버 대신 질의할 DNS 서버를 지정합니다. 여기서는 Google Public DNS."
   ],
   [
    "example.com",
    "조회할 도메인 이름입니다."
   ],
   [
    "MX",
    "조회할 레코드 타입입니다. MX(Mail eXchanger)는 그 도메인의 메일을 받는 서버를 가리킵니다."
   ]
  ],
  "order": "`dig` 는 `@서버`, 이름, 타입의 순서를 유연하게 받아들입니다. `dig MX example.com @8.8.8.8` 도 같습니다."
 },
 "network-038": {
  "parts": [
   [
    "sysctl",
    "커널 파라미터(`/proc/sys` 아래 값)를 조회·변경하는 명령입니다."
   ],
   [
    "net.ipv4.ip_local_port_range",
    "조회할 파라미터 이름으로, 나가는 연결에 쓰는 ephemeral 포트의 최소값과 최대값입니다. `/proc/sys/net/ipv4/ip_local_port_range` 파일과 같습니다."
   ]
  ]
 },
 "network-040": {
  "parts": [
   [
    "ping",
    "ICMP Echo 를 보내는 명령입니다."
   ],
   [
    "-M do",
    "`-M`: Path MTU Discovery 방식을 지정합니다. `do` 는 단편화를 금지(DF 비트 설정)해, 경로 MTU 보다 크면 쪼개지지 않고 실패하게 합니다."
   ],
   [
    "-s 1472",
    "`-s`(size): ICMP 데이터(페이로드) 바이트 수입니다. 1472 + ICMP 헤더 8 + IP 헤더 20 = 1500."
   ],
   [
    "10.0.0.1",
    "테스트할 대상 호스트입니다."
   ]
  ],
  "order": "옵션 순서는 자유입니다(`ping -s 1472 -M do 10.0.0.1`). 단 `-M` 뒤에는 `do`, `-s` 뒤에는 크기가 바로 와야 합니다."
 },
 "network-042": {
  "parts": [
   [
    "curl",
    "URL 로 HTTP 요청을 보내는 명령입니다."
   ],
   [
    "-sI",
    "s(--silent: 진행률 표시 숨김) · I(--head: HEAD 요청으로 응답 헤더만 출력)."
   ],
   [
    "https://example.com",
    "요청할 대상 URL 입니다."
   ],
   [
    "|",
    "파이프: 헤더 출력을 다음 명령(grep)의 입력으로 넘깁니다."
   ],
   [
    "grep",
    "입력에서 패턴과 일치하는 줄만 출력합니다."
   ],
   [
    "-i",
    "`-i`(ignore-case): 대소문자를 구분하지 않습니다. HTTP 헤더 이름은 대소문자 구분이 없어 HTTP/2 에서는 소문자로 오기 때문에 필요합니다."
   ],
   [
    "strict-transport-security",
    "찾을 헤더 이름(HSTS)입니다. 이 줄에 max-age 등 값이 함께 출력됩니다."
   ]
  ],
  "order": "`curl` 옵션 순서(`-sI`/`-Is`)는 자유지만, 헤더를 만드는 `curl` 이 파이프 앞, 거르는 `grep` 이 파이프 뒤에 있어야 합니다."
 },
 "network-045": {
  "parts": [
   [
    "tcpdump",
    "패킷 캡처·분석 도구입니다."
   ],
   [
    "-r dump.pcap",
    "`-r`(read): 인터페이스에서 캡처하지 않고 저장된 캡처 파일 `dump.pcap` 을 읽습니다."
   ],
   [
    "-A",
    "`-A`(ASCII): 각 패킷(링크 계층 헤더 제외)을 ASCII 로 출력합니다. IP/TCP 헤더 바이트가 앞에 점 등으로 붙어 나오고, 그 뒤에 HTTP 요청 줄이 이어집니다."
   ],
   [
    "|",
    "파이프: tcpdump 출력을 grep 의 입력으로 넘깁니다."
   ],
   [
    "grep",
    "패턴과 일치하는 줄만 출력합니다."
   ],
   [
    "-E",
    "`-E`(extended regexp): 확장 정규식을 사용해 `|`(또는)를 백슬래시 없이 쓸 수 있게 합니다."
   ],
   [
    "\"GET|POST|PUT|DELETE\"",
    "GET, POST, PUT, DELETE 중 하나가 들어 있는 줄을 찾습니다. 요청 줄 앞에 헤더 바이트가 붙어 출력되므로 `^` 로 줄 맨 앞에 고정하지 않습니다."
   ]
  ],
  "order": "`-r dump.pcap` 과 `-A` 의 순서는 자유입니다(`tcpdump -A -r dump.pcap`). 단 `-r` 바로 뒤에는 파일 이름이 와야 합니다."
 },
 "network-047": {
  "parts": [
   [
    "iptables",
    "리눅스 netfilter 방화벽 규칙을 관리하는 명령입니다(root 권한 필요)."
   ],
   [
    "-A INPUT",
    "`-A`(append): 규칙을 체인의 맨 끝에 추가합니다. 여기서는 들어오는 패킷을 처리하는 INPUT 체인."
   ],
   [
    "-p tcp",
    "`-p`(protocol): TCP 패킷에만 적용합니다. 이 옵션이 있어야 `--dport` 를 쓸 수 있습니다."
   ],
   [
    "--dport 22",
    "`--dport`(destination port): 목적지 포트가 22(SSH)인 패킷만 매치합니다."
   ],
   [
    "-s 203.0.113.0/24",
    "`-s`(source): 출발지 주소가 203.0.113.0/24 대역인 패킷만 매치합니다."
   ],
   [
    "-j ACCEPT",
    "`-j`(jump): 매치된 패킷을 보낼 타겟입니다. ACCEPT 는 허용."
   ]
  ],
  "order": "매치 옵션의 순서는 대부분 자유라 `-s` 를 앞에 둬도 됩니다. 단 `--dport` 는 `-p tcp` 보다 뒤에 와야 하며(앞에 쓰면 오류), 체인 지정(`-A INPUT`)은 맨 앞에 두는 것이 관례입니다."
 },
 "network-050": {
  "parts": [
   [
    "X-Forwarded-For",
    "프록시가 원래 클라이언트 IP 를 upstream 에 알려 주는 HTTP 요청 헤더입니다. nginx 에서는 `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` 로 기존 값 뒤에 클라이언트 IP 를 덧붙여 전달합니다."
   ]
  ]
 },
 "network-052": {
  "parts": [
   [
    "netstat",
    "네트워크 연결·통계를 보여 주는 명령(net-tools)입니다."
   ],
   [
    "-s",
    "`-s`(--statistics): 프로토콜별 누적 통계를 출력합니다. 0 인 항목 일부는 표시하지 않습니다."
   ],
   [
    "|",
    "파이프: 통계 출력을 grep 으로 넘깁니다."
   ],
   [
    "grep",
    "패턴과 일치하는 줄만 출력합니다."
   ],
   [
    "-i",
    "`-i`(ignore-case): 대소문자를 구분하지 않습니다(`LISTEN` 과 `listen` 모두 매치)."
   ],
   [
    "\"listen\"",
    "찾을 문자열입니다. \"times the listen queue of a socket overflowed\", \"SYNs to LISTEN sockets dropped\" 줄이 걸립니다."
   ]
  ],
  "order": "`netstat -s` 가 파이프 앞, `grep` 이 뒤에 있어야 합니다."
 },
 "network-054": {
  "parts": [
   [
    "sysctl",
    "커널 파라미터를 조회·변경하는 명령입니다."
   ],
   [
    "net.netfilter.nf_conntrack_count",
    "현재 conntrack 테이블에 있는 연결 추적 항목 수입니다(읽기 전용). 최대치는 `net.netfilter.nf_conntrack_max` 로 봅니다."
   ]
  ]
 },
 "network-058": {
  "parts": [
   [
    "curl",
    "URL 로 요청을 보내 응답을 받는 명령입니다."
   ],
   [
    "-o page.html",
    "`-o`(--output): 응답 본문을 화면 대신 `page.html` 파일에 저장합니다."
   ],
   [
    "https://example.com",
    "내려받을 대상 URL 입니다."
   ]
  ],
  "order": "옵션과 URL 의 순서는 자유입니다(`curl https://example.com -o page.html`). 단 `-o` 바로 뒤에는 파일 이름이 와야 합니다."
 },
 "network-060": {
  "parts": [
   [
    "dig",
    "DNS 조회 도구입니다."
   ],
   [
    "example.com",
    "조회할 도메인 이름입니다."
   ],
   [
    "NS",
    "조회할 레코드 타입입니다. NS(Name Server)는 이 도메인에 권위 있게 응답하는 네임서버입니다."
   ]
  ],
  "order": "이름과 타입의 순서는 자유입니다. `dig NS example.com` 도 같습니다."
 },
 "network-062": {
  "parts": [
   [
    "/etc/resolv.conf",
    "glibc 리졸버가 읽는 DNS 설정 파일의 절대 경로입니다. `nameserver`, `search`, `options` 줄이 들어 있습니다."
   ]
  ]
 },
 "network-064": {
  "parts": [
   [
    "ip",
    "iproute2 의 네트워크 설정·조회 명령입니다."
   ],
   [
    "route",
    "라우팅 테이블 객체를 다룹니다."
   ],
   [
    "get",
    "라우팅 테이블 전체가 아니라, 주어진 목적지로 실제로 선택되는 경로 하나(게이트웨이 `via`, 인터페이스 `dev`, 출발지 IP `src`)를 보여 주는 동작입니다."
   ],
   [
    "8.8.8.8",
    "경로를 확인할 목적지 IP 입니다."
   ]
  ],
  "order": "`ip` → 객체(`route`) → 동작(`get`) → 목적지 순서여야 합니다."
 },
 "network-066": {
  "parts": [
   [
    "ip",
    "iproute2 의 네트워크 설정·조회 명령입니다."
   ],
   [
    "neigh",
    "neighbour(이웃) 테이블 객체입니다. IPv4 의 ARP 캐시와 IPv6 의 NDP 캐시를 IP ↔ MAC 매핑과 상태(REACHABLE, STALE 등)로 보여 줍니다."
   ]
  ]
 },
 "network-069": {
  "parts": [
   [
    "curl",
    "URL 로 HTTP 요청을 보내고 응답을 출력하는 명령줄 클라이언트입니다."
   ],
   [
    "-H \"Authorization: Bearer TOKEN\"",
    "`-H`(header): 요청에 임의의 헤더를 한 줄 추가합니다. 여기서는 토큰 인증 헤더 `Authorization: Bearer TOKEN` 이며, 공백이 들어 있어 따옴표로 묶었습니다."
   ],
   [
    "https://api.example.com/me",
    "요청을 보낼 대상 URL 입니다."
   ]
  ],
  "order": "옵션과 URL 의 순서는 자유입니다. `curl https://api.example.com/me -H \"Authorization: Bearer TOKEN\"` 도 같습니다."
 },
 "network-071": {
  "parts": [
   [
    "curl",
    "HTTP 요청을 보내는 명령줄 클라이언트입니다."
   ],
   [
    "--resolve api.example.com:443:10.0.1.5",
    "`--resolve`: `호스트:포트:IP` 형식으로 DNS 조회 결과를 대신 지정합니다. 여기서는 api.example.com 의 443 포트 연결을 10.0.1.5 로 보내며, Host 헤더와 SNI 는 원래 이름 그대로 유지됩니다."
   ],
   [
    "https://api.example.com",
    "요청 대상 URL 입니다. https 이므로 포트는 443 이고, 이 값이 `--resolve` 의 포트와 일치해야 적용됩니다."
   ]
  ],
  "order": "옵션과 URL 순서는 자유입니다. 다만 `--resolve` 값 안의 `호스트:포트:IP` 순서는 고정이며, 포트가 URL 의 포트와 달라지면 무시됩니다."
 },
 "network-073": {
  "parts": [
   [
    "dig",
    "DNS 서버에 질의해 응답을 자세히 보여 주는 조회 도구입니다."
   ],
   [
    "example.com",
    "조회할 도메인 이름입니다."
   ],
   [
    "TXT",
    "조회할 레코드 타입입니다. 생략하면 A 레코드를 조회하므로 TXT 를 명시합니다."
   ]
  ],
  "order": "도메인과 레코드 타입의 순서는 자유입니다. `dig TXT example.com` 도 같습니다."
 },
 "network-075": {
  "parts": [
   [
    "curl",
    "HTTP 요청을 보내는 명령줄 클라이언트입니다."
   ],
   [
    "-vL",
    "v(verbose: 요청 헤더 `>`, 응답 헤더 `<`, 연결·TLS 과정을 출력) · L(location: 3xx 응답의 Location 헤더를 따라 최종 URL 까지 이동)."
   ],
   [
    "http://example.com",
    "처음 요청할 URL 입니다."
   ]
  ],
  "order": "옵션 순서는 자유입니다. `-Lv`, `-v -L`, `-L -v` 모두 같습니다."
 },
 "network-077": {
  "parts": [
   [
    "tcpdump",
    "네트워크 인터페이스를 지나는 패킷을 캡처해 보여 주는 도구입니다(보통 root 권한 필요)."
   ],
   [
    "-i any",
    "`-i`(interface): 캡처할 인터페이스. `any` 는 모든 인터페이스를 한꺼번에 캡처합니다."
   ],
   [
    "host 10.0.0.5",
    "캡처 필터 표현식입니다. 출발지 또는 목적지가 10.0.0.5 인 패킷만 잡습니다."
   ]
  ],
  "order": "옵션(`-i any`)을 먼저 쓰고 필터 표현식(`host 10.0.0.5`)을 맨 뒤에 두는 것이 정석입니다."
 },
 "network-079": {
  "parts": [
   [
    "ssh",
    "원격 호스트에 암호화된 연결을 여는 SSH 클라이언트입니다."
   ],
   [
    "-D 9090",
    "`-D`: 동적 포트 포워딩입니다. 로컬 9090 포트에 SOCKS 프록시를 열고, 그리로 들어온 연결을 원격 호스트를 거쳐 목적지로 보냅니다."
   ],
   [
    "bastion",
    "접속할 원격 호스트(점프 서버) 이름입니다."
   ]
  ],
  "order": "관례적으로 옵션을 호스트 이름 앞에 둡니다. `-N`(원격 명령 실행 안 함)이나 `-f`(백그라운드)를 함께 붙여도 됩니다."
 },
 "network-081": {
  "parts": [
   [
    "dig",
    "DNS 조회 도구입니다."
   ],
   [
    "-x 203.0.113.10",
    "`-x`: 역방향 조회입니다. IP 를 `10.113.0.203.in-addr.arpa` 형태로 바꿔 PTR 레코드를 물어봅니다."
   ]
  ],
  "order": "`-x` 바로 뒤에 IP 주소가 와야 합니다."
 },
 "network-083": {
  "parts": [
   [
    "ss",
    "소켓(연결) 상태를 보여 주는 도구로, netstat 의 후속입니다."
   ],
   [
    "-s",
    "`-s`(summary): 전체 소켓 수와 프로토콜별(TCP·UDP 등) 개수 요약만 출력합니다. TCP 는 estab(연결됨), closed, orphaned(프로세스와 분리된 소켓), timewait 등으로 나누어 개수를 보여 줍니다."
   ]
  ]
 },
 "network-085": {
  "parts": [
   [
    "ss",
    "소켓(연결) 상태를 보여 주는 도구입니다."
   ],
   [
    "-tan",
    "t(tcp: TCP 소켓만) · a(all: 모든 상태의 소켓) · n(numeric: 포트·주소를 이름 대신 숫자로)."
   ],
   [
    "state established",
    "상태 필터입니다. ESTABLISHED(연결 수립) 상태의 소켓만 남깁니다."
   ],
   [
    "'( dport = :443 )'",
    "주소/포트 필터입니다. 목적지 포트(dport)가 443 인 연결만 남깁니다. 괄호를 셸이 해석하지 않도록 따옴표로 감쌌습니다."
   ]
  ],
  "order": "옵션 → 상태 필터(`state ...`) → 주소/포트 필터 순으로 씁니다. `-tan` 안의 글자 순서는 자유라 `-ant` 도 같습니다."
 },
 "network-087": {
  "parts": [
   [
    "nginx",
    "nginx 웹 서버 실행 파일입니다."
   ],
   [
    "-t",
    "`-t`(test): 설정 파일 문법과 참조 파일을 검사만 하고 종료합니다. 실행 중인 서버에는 적용하지 않습니다."
   ]
  ]
 },
 "network-088": {
  "parts": [
   [
    "curl",
    "HTTP 요청을 보내는 명령줄 클라이언트입니다."
   ],
   [
    "-sI",
    "s(silent: 진행률·오류 메시지 숨김) · I(head: HEAD 요청을 보내 헤더만 받음)."
   ],
   [
    "--http2",
    "HTTP/2 사용을 요청합니다. 서버가 ALPN 으로 수락하지 않으면 HTTP/1.1 로 폴백합니다."
   ],
   [
    "https://example.com",
    "요청 대상 URL 입니다."
   ],
   [
    "-w \"%{http_version}\\n\"",
    "`-w`(write-out): 전송이 끝난 뒤 지정한 형식으로 정보를 출력합니다. `%{http_version}` 은 실제 사용된 HTTP 버전(예: 2), `\\n` 은 줄바꿈입니다."
   ],
   [
    "-o /dev/null",
    "`-o`(output): 응답 출력을 /dev/null 로 버려 `-w` 결과만 화면에 남깁니다."
   ]
  ],
  "order": "옵션과 URL 순서는 자유입니다. `curl -sI --http2 -o /dev/null -w \"%{http_version}\\n\" https://example.com` 도 같습니다. `-o` 바로 뒤에는 파일 이름이 와야 합니다."
 },
 "network-090": {
  "parts": [
   [
    "ip",
    "iproute2 의 네트워크 설정 명령입니다."
   ],
   [
    "link",
    "대상 오브젝트로 네트워크 링크(인터페이스)를 고릅니다."
   ],
   [
    "set",
    "링크의 속성을 변경하는 동작입니다."
   ],
   [
    "dev eth0",
    "변경할 장치(device)로 eth0 을 지정합니다."
   ],
   [
    "mtu 1400",
    "MTU(한 번에 보낼 수 있는 최대 패킷 크기)를 1400 바이트로 설정합니다."
   ]
  ],
  "order": "`ip link set` 순서는 고정입니다. 그 뒤의 `dev eth0` 과 `mtu 1400` 은 키워드-값 쌍이라 서로 순서를 바꿔도 됩니다."
 },
 "network-092": {
  "parts": [
   [
    "nft",
    "nftables 방화벽을 관리하는 명령입니다."
   ],
   [
    "list",
    "내용을 출력하는 동작입니다."
   ],
   [
    "ruleset",
    "대상으로 전체 규칙 집합(모든 테이블·체인·규칙)을 지정합니다."
   ]
  ],
  "order": "`nft list ruleset` 의 단어 순서는 고정입니다. `-a` 같은 옵션은 `nft` 바로 뒤에 씁니다."
 },
 "network-094": {
  "parts": [
   [
    "openssl",
    "TLS·인증서 관련 작업을 하는 OpenSSL 도구입니다."
   ],
   [
    "s_client",
    "TLS 클라이언트로 서버에 접속해 핸드셰이크 결과를 보여 주는 서브커맨드입니다."
   ],
   [
    "-connect example.com:443",
    "`-connect`: 접속할 `호스트:포트` 입니다. 여기서는 example.com 의 443 포트."
   ],
   [
    "-tls1_3",
    "TLS 1.3 으로만 접속을 시도합니다. 서버가 지원하지 않으면 핸드셰이크가 실패합니다."
   ]
  ],
  "order": "`openssl s_client` 뒤의 옵션 순서는 자유입니다. `openssl s_client -tls1_3 -connect example.com:443` 도 같습니다."
 },
 "network-096": {
  "parts": [
   [
    "sysctl",
    "커널 파라미터를 조회하거나 변경하는 명령입니다."
   ],
   [
    "net.ipv4.tcp_congestion_control",
    "현재 TCP 혼잡 제어 알고리즘을 담은 커널 파라미터 이름입니다. 값만 주면 조회합니다."
   ]
  ]
 },
 "network-098": {
  "parts": [
   [
    "dig",
    "DNS 조회 도구입니다."
   ],
   [
    "+trace",
    "루트 서버부터 TLD, 권위 서버까지 위임을 차례로 따라가며 각 단계 응답을 출력합니다."
   ],
   [
    "example.com",
    "조회할 도메인입니다. 타입을 생략했으므로 A 레코드를 조회합니다."
   ]
  ],
  "order": "`+trace` 와 도메인의 순서는 자유입니다. `dig example.com +trace` 도 같습니다."
 },
 "network-100": {
  "parts": [
   [
    "ip",
    "iproute2 의 네트워크 설정 명령입니다."
   ],
   [
    "addr",
    "대상 오브젝트로 IP 주소(address)를 고릅니다."
   ],
   [
    "add",
    "주소를 추가하는 동작입니다. 기존 주소는 그대로 두고 보조 주소로 붙습니다."
   ],
   [
    "10.0.1.20/24",
    "추가할 IP 와 프리픽스 길이입니다."
   ],
   [
    "dev eth0",
    "주소를 붙일 장치(device)입니다."
   ]
  ],
  "order": "`ip addr add` 순서는 고정이고, 그 뒤에 주소와 `dev eth0` 을 씁니다."
 },
 "network-103": {
  "parts": [
   [
    "ethtool",
    "NIC 드라이버·링크 설정을 조회하거나 바꾸는 도구입니다."
   ],
   [
    "eth0",
    "조회할 인터페이스입니다. 옵션 없이 쓰면 속도·듀플렉스·자동 협상·링크 감지 상태를 보여 줍니다."
   ]
  ]
 },
 "network-105": {
  "parts": [
   [
    "dropwatch",
    "커널이 패킷(skb)을 버리는 위치를 함수 단위로 보여 주는 드롭 모니터링 도구입니다."
   ]
  ]
 },
 "network-107": {
  "parts": [
   [
    "ip route add",
    "라우팅 테이블에 경로를 추가합니다."
   ],
   [
    "default",
    "목적지가 기본 경로(0.0.0.0/0)임을 뜻합니다."
   ],
   [
    "via 10.0.2.1",
    "다음 홉 게이트웨이로 10.0.2.1 을 지정합니다."
   ],
   [
    "dev eth1",
    "이 경로로 나갈 인터페이스입니다."
   ],
   [
    "table 100",
    "메인 테이블이 아닌 별도의 라우팅 테이블 100 에 경로를 넣습니다."
   ],
   [
    "&&",
    "앞 명령이 성공했을 때만 뒤 명령을 실행합니다."
   ],
   [
    "ip rule add",
    "정책 라우팅 규칙을 추가합니다."
   ],
   [
    "from 10.0.2.10",
    "출발지 IP 가 10.0.2.10 인 패킷에 규칙을 적용합니다."
   ],
   [
    "table 100",
    "해당 패킷은 라우팅 테이블 100 을 참조하게 합니다(`lookup 100` 과 같음)."
   ]
  ],
  "order": "두 명령은 서로 독립이라 어느 쪽을 먼저 실행해도 결과가 같습니다. 각 명령 안에서는 `ip route add` / `ip rule add` 뒤에 선택자와 속성을 씁니다."
 },
 "network-118": {
  "parts": [
   [
    "mtr",
    "traceroute 와 ping 을 합친 도구로, 경로의 홉별 손실률과 지연을 계속 갱신하며 보여 줍니다."
   ],
   [
    "example.com",
    "진단할 목적지입니다."
   ]
  ]
 },
 "network-119": {
  "parts": [
   [
    "ip",
    "iproute2 의 네트워크 설정 명령입니다."
   ],
   [
    "-s",
    "`-s`(statistics): 수신(RX)·송신(TX) 바이트·패킷·에러·드롭 카운터를 함께 출력합니다."
   ],
   [
    "link",
    "대상 오브젝트로 네트워크 링크(인터페이스)를 고릅니다."
   ],
   [
    "show",
    "정보를 보여 주는 동작입니다."
   ],
   [
    "eth0",
    "대상 인터페이스입니다."
   ]
  ],
  "order": "`-s` 같은 ip 전역 옵션은 `link` 앞에 와야 합니다. `ip link show -s eth0` 은 오류가 납니다."
 },
 "network-120": {
  "parts": [
   [
    "ethtool",
    "NIC 설정을 조회·변경하는 도구입니다."
   ],
   [
    "-G",
    "`-G`(`--set-ring`): 링 버퍼 크기를 설정합니다. 소문자 `-g` 는 현재값·최대값 조회입니다."
   ],
   [
    "eth0",
    "대상 인터페이스입니다."
   ],
   [
    "rx 4096",
    "수신(RX) 링 버퍼를 4096 개 항목으로 설정합니다."
   ]
  ],
  "order": "`-G` 바로 뒤에 인터페이스 이름이 오고, 그 뒤에 `rx 값` 쌍을 씁니다."
 },
 "network-121": {
  "parts": [
   [
    "dig",
    "DNS 조회 도구입니다."
   ],
   [
    "@ns1.example.com",
    "`@서버`: 기본 리졸버 대신 질의를 보낼 DNS 서버입니다. 여기서는 권한 네임서버 ns1.example.com."
   ],
   [
    "api.example.com",
    "조회할 이름입니다."
   ],
   [
    "A",
    "조회할 레코드 타입(IPv4 주소)입니다."
   ]
  ],
  "order": "`@서버`, 이름, 타입의 순서는 자유입니다. `dig api.example.com A @ns1.example.com` 도 같습니다."
 },
 "network-122": {
  "parts": [
   [
    "openssl",
    "TLS·인증서 관련 작업을 하는 OpenSSL 도구입니다."
   ],
   [
    "s_client",
    "TLS 클라이언트로 서버에 접속하는 서브커맨드입니다."
   ],
   [
    "-connect api.example.com:443",
    "`-connect`: 접속할 `호스트:포트` 입니다."
   ],
   [
    "-servername api.example.com",
    "`-servername`: ClientHello 에 넣을 SNI 호스트명을 명시합니다."
   ],
   [
    "-showcerts",
    "서버가 보낸 인증서 체인 전체(중간 인증서 포함)를 PEM 으로 출력합니다."
   ]
  ],
  "order": "`openssl s_client` 뒤의 옵션 순서는 자유입니다."
 },
 "network-123": {
  "parts": [
   [
    "openssl",
    "OpenSSL 도구입니다."
   ],
   [
    "x509",
    "X.509 인증서를 읽고 출력하는 서브커맨드입니다."
   ],
   [
    "-in server.crt",
    "`-in`(input): 읽을 인증서 파일입니다."
   ],
   [
    "-noout",
    "인코딩된 인증서 본문(PEM)을 다시 출력하지 않습니다."
   ],
   [
    "-text",
    "인증서 내용을 사람이 읽는 형식으로 출력합니다. 유효 기간, Subject, SAN 이 모두 들어 있습니다."
   ]
  ],
  "order": "`openssl x509` 뒤의 옵션 순서는 자유입니다. `-in` 바로 뒤에는 파일 이름이 와야 합니다."
 },
 "network-124": {
  "parts": [
   [
    "firewall-cmd",
    "firewalld 방화벽을 설정하는 명령입니다."
   ],
   [
    "--permanent",
    "런타임이 아니라 영구 설정에 규칙을 기록합니다."
   ],
   [
    "--add-port=443/tcp",
    "443 번 TCP 포트를 허용 목록에 추가합니다."
   ],
   [
    "&&",
    "앞 명령이 성공했을 때만 뒤 명령을 실행합니다."
   ],
   [
    "firewall-cmd --reload",
    "영구 설정을 다시 읽어 런타임에 반영합니다."
   ]
  ],
  "order": "영구 규칙 추가 후에 `--reload` 해야 반영되므로 두 명령의 순서가 중요합니다. 첫 명령 안의 `--permanent` 와 `--add-port` 순서는 자유입니다."
 },
 "network-125": {
  "parts": [
   [
    "iptables",
    "iptables 방화벽 규칙을 다루는 명령입니다."
   ],
   [
    "-L INPUT",
    "`-L`(list): 규칙을 나열합니다. 여기서는 INPUT 체인만."
   ],
   [
    "-n",
    "`-n`(numeric): IP·포트를 DNS/서비스 이름으로 바꾸지 않고 숫자로 출력해 빠릅니다."
   ],
   [
    "-v",
    "`-v`(verbose): 규칙별 pkts/bytes 카운터와 인터페이스 정보를 함께 출력합니다."
   ],
   [
    "--line-numbers",
    "각 규칙 앞에 번호를 붙입니다. `iptables -D INPUT 번호` 로 삭제할 때 씁니다."
   ]
  ],
  "order": "옵션 순서는 자유이지만 체인 이름 `INPUT` 은 `-L` 바로 뒤에 와야 합니다."
 },
 "network-126": {
  "parts": [
   [
    "curl",
    "HTTP 요청을 보내는 명령줄 클라이언트입니다."
   ],
   [
    "-o /dev/null",
    "`-o`(output): 응답 본문을 /dev/null 로 버립니다."
   ],
   [
    "-s",
    "`-s`(silent): 진행률 표시를 숨깁니다."
   ],
   [
    "-w",
    "`-w`(write-out): 전송 후 뒤따르는 따옴표 안 형식대로 정보를 출력합니다."
   ],
   [
    "dns:%{time_namelookup}",
    "DNS 이름 해석이 끝난 시각(요청 시작 기준 초)입니다."
   ],
   [
    "connect:%{time_connect}",
    "TCP 연결이 완료된 시각입니다."
   ],
   [
    "tls:%{time_appconnect}",
    "TLS 핸드셰이크가 완료된 시각입니다."
   ],
   [
    "ttfb:%{time_starttransfer}",
    "첫 응답 바이트를 받기 시작한 시각(TTFB)입니다."
   ],
   [
    "total:%{time_total}\\n",
    "전체 소요 시간과 줄바꿈(`\\n`)입니다. 모든 값은 요청 시작부터의 누적 시간입니다."
   ],
   [
    "https://api.example.com/health",
    "요청 대상 URL 입니다."
   ]
  ],
  "order": "옵션과 URL 순서는 자유입니다. `-w` 바로 뒤에는 형식 문자열이, `-o` 바로 뒤에는 파일 이름이 와야 합니다."
 },
 "network-127": {
  "parts": [
   [
    "tcpdump",
    "패킷을 캡처해 보여 주는 도구입니다."
   ],
   [
    "-i eth0",
    "`-i`(interface): eth0 에서만 캡처합니다."
   ],
   [
    "tcp[tcpflags] & tcp-syn != 0",
    "필터 앞부분입니다. TCP 플래그 바이트에서 SYN 비트가 켜진 패킷을 고릅니다. 필터 전체를 따옴표로 감싸 셸이 `[ ]` `&` 등을 해석하지 않게 합니다."
   ],
   [
    "and",
    "두 조건을 모두 만족해야 함을 뜻합니다."
   ],
   [
    "tcp[tcpflags] & tcp-ack == 0",
    "ACK 비트가 꺼진 패킷만 고릅니다. 그래서 SYN+ACK 응답은 빠지고 새 연결 시도인 SYN 만 남습니다."
   ]
  ],
  "order": "옵션(`-i eth0`)을 먼저, 필터 표현식을 맨 뒤에 둡니다."
 },
 "network-128": {
  "parts": [
   [
    "resolvectl",
    "systemd-resolved 를 조회·제어하는 명령입니다."
   ],
   [
    "status",
    "전역 및 인터페이스별로 실제 사용 중인 DNS 서버와 검색 도메인을 보여 줍니다."
   ]
  ]
 },
 "network-129": {
  "parts": [
   [
    "ip",
    "iproute2 의 네트워크 설정 명령입니다."
   ],
   [
    "route",
    "대상 오브젝트로 라우팅 테이블을 고릅니다."
   ],
   [
    "add",
    "경로를 추가하는 동작입니다."
   ],
   [
    "10.0.0.0/8",
    "목적지 대역입니다."
   ],
   [
    "via 192.168.1.254",
    "다음 홉 게이트웨이입니다."
   ],
   [
    "dev eth1",
    "이 경로로 나갈 인터페이스입니다."
   ]
  ],
  "order": "`ip route add` 뒤에 목적지 대역을 먼저 쓰고, 그 뒤에 `via` 와 `dev` 를 붙이는 형식입니다."
 },
 "network-130": {
  "parts": [
   [
    "ss",
    "소켓 상태를 보여 주는 도구입니다."
   ],
   [
    "-tan",
    "t(tcp: TCP 소켓만) · a(all: 모든 상태) · n(numeric: 숫자로 출력)."
   ],
   [
    "state time-wait",
    "상태 필터입니다. TIME-WAIT 상태의 소켓만 남깁니다."
   ],
   [
    "|",
    "파이프: 앞 명령의 출력을 뒤 명령의 입력으로 넘깁니다."
   ],
   [
    "wc -l",
    "`wc`(word count) 의 `-l`(lines): 줄 수를 셉니다. ss 의 헤더 한 줄도 함께 세어집니다."
   ]
  ],
  "order": "파이프 앞뒤 순서는 고정입니다. `-tan` 안의 글자 순서는 자유라 `-ant` 도 같습니다."
 },
 "network-110": {
  "steps": [
   {
    "parts": [
     [
      "dig",
      "DNS 조회 도구입니다."
     ],
     [
      "api.example.com",
      "조회할 도메인입니다. 타입을 생략하면 A 레코드를 조회해 어떤 IP 로 풀리는지 보여 줍니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "ping",
      "ICMP Echo 요청을 보내 대상까지 도달하는지와 왕복 시간을 확인합니다."
     ],
     [
      "-c 4",
      "`-c`(count): 4번만 보내고 종료합니다. 없으면 리눅스에서는 Ctrl+C 까지 계속 보냅니다."
     ],
     [
      "api.example.com",
      "대상 호스트입니다."
     ]
    ],
    "order": "관례적으로 옵션을 호스트 앞에 둡니다. `-c4` 처럼 붙여 써도 됩니다."
   },
   {
    "parts": [
     [
      "nc",
      "netcat: TCP/UDP 연결을 직접 열어 보는 도구입니다."
     ],
     [
      "-zv",
      "z(zero-I/O: 데이터를 보내지 않고 연결 가능 여부만 확인) · v(verbose: 성공/실패 메시지 출력)."
     ],
     [
      "api.example.com",
      "대상 호스트입니다."
     ],
     [
      "443",
      "확인할 포트입니다."
     ]
    ],
    "order": "옵션 글자 순서는 자유(`-vz` 도 같음)이고, 호스트 다음에 포트를 씁니다."
   }
  ]
 },
 "network-111": {
  "steps": [
   {
    "parts": [
     [
      "ss",
      "소켓 상태를 보여 주는 도구입니다."
     ],
     [
      "-lntp",
      "l(listening: 대기 중 소켓만) · n(numeric: 이름 대신 숫자로) · t(tcp) · p(processes: 소켓을 쓰는 프로세스 표시, 다른 사용자 것은 root 권한 필요)."
     ]
    ],
    "order": "옵션 글자 순서는 자유입니다. `-tlnp`, `-ltnp` 도 같습니다."
   },
   {
    "parts": [
     [
      "ss",
      "소켓 상태를 보여 주는 도구입니다."
     ],
     [
      "-s",
      "`-s`(summary): 소켓 종류별·TCP 상태별 개수 요약을 출력합니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "ip",
      "iproute2 의 네트워크 설정 명령입니다."
     ],
     [
      "route",
      "라우팅 테이블을 대상으로 합니다. 동작을 생략하면 `show` 로 처리되어 경로 목록을 출력합니다."
     ]
    ]
   }
  ]
 },
 "network-112": {
  "steps": [
   {
    "parts": [
     [
      "curl",
      "HTTP 요청을 보내는 명령줄 클라이언트입니다."
     ],
     [
      "-I",
      "`-I`(head): HEAD 요청을 보내 응답 헤더만 출력합니다."
     ],
     [
      "https://api.example.com/health",
      "요청 대상 URL 입니다."
     ]
    ],
    "order": "옵션과 URL 순서는 자유입니다."
   },
   {
    "parts": [
     [
      "curl",
      "HTTP 요청을 보내는 명령줄 클라이언트입니다."
     ],
     [
      "-v",
      "`-v`(verbose): 연결, TLS 핸드셰이크, 서버 인증서 정보, 요청·응답 헤더를 모두 출력합니다."
     ],
     [
      "https://api.example.com/health",
      "요청 대상 URL 입니다."
     ]
    ],
    "order": "옵션과 URL 순서는 자유입니다."
   },
   {
    "parts": [
     [
      "openssl",
      "TLS·인증서 관련 작업을 하는 OpenSSL 도구입니다."
     ],
     [
      "s_client",
      "TLS 클라이언트로 서버에 접속해 핸드셰이크와 인증서 정보를 보여 주는 서브커맨드입니다."
     ],
     [
      "-connect api.example.com:443",
      "`-connect`: 접속할 `호스트:포트` 입니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "curl",
      "HTTP 요청을 보내는 명령줄 클라이언트입니다."
     ],
     [
      "-o /dev/null",
      "`-o`(output): 응답 본문을 /dev/null 로 버립니다."
     ],
     [
      "-s",
      "`-s`(silent): 진행률 표시를 숨깁니다."
     ],
     [
      "-w %{time_total}",
      "`-w`(write-out): 전송 후 정보를 출력합니다. `%{time_total}` 은 요청 전체에 걸린 시간(초)입니다."
     ],
     [
      "https://api.example.com/health",
      "요청 대상 URL 입니다."
     ]
    ],
    "order": "옵션과 URL 순서는 자유입니다. `-o` 뒤에는 파일 이름, `-w` 뒤에는 형식 문자열이 바로 와야 합니다."
   }
  ]
 },
 "network-113": {
  "steps": [
   {
    "parts": [
     [
      "ufw",
      "Ubuntu 의 방화벽 관리 도구(Uncomplicated Firewall)입니다."
     ],
     [
      "status",
      "방화벽 활성 여부와 규칙 목록을 출력합니다."
     ],
     [
      "numbered",
      "각 규칙 앞에 번호를 붙여 출력합니다. `ufw delete 번호` 로 삭제할 때 씁니다."
     ]
    ],
    "order": "`ufw status numbered` 의 단어 순서는 고정입니다."
   },
   {
    "parts": [
     [
      "ufw",
      "방화벽 관리 도구입니다."
     ],
     [
      "allow",
      "허용 규칙을 추가합니다."
     ],
     [
      "443/tcp",
      "`포트/프로토콜`: 443 번 포트를 TCP 로만 허용합니다. `/tcp` 를 빼면 TCP 와 UDP 가 모두 열립니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "ufw",
      "방화벽 관리 도구입니다."
     ],
     [
      "allow",
      "허용 규칙을 추가합니다."
     ],
     [
      "from 10.0.0.0/8",
      "출발지를 10.0.0.0/8 대역으로 제한합니다."
     ],
     [
      "to any",
      "목적지 주소는 이 서버의 모든 주소입니다."
     ],
     [
      "port 22",
      "목적지 포트 22(SSH)만 허용합니다. `proto tcp` 를 붙이지 않았으므로 TCP 와 UDP 22 번이 모두 허용됩니다."
     ]
    ],
    "order": "`from ... to ... port ...` 순서의 문법을 지켜야 합니다."
   }
  ]
 },
 "network-131": {
  "steps": [
   {
    "parts": [
     [
      "openssl s_client",
      "TLS 클라이언트로 서버에 접속해 서버가 보낸 인증서를 받습니다."
     ],
     [
      "-connect www.example.com:443",
      "`-connect`: 접속할 `호스트:포트` 입니다."
     ],
     [
      "-servername www.example.com",
      "`-servername`: SNI 로 보낼 호스트명을 명시해 이 도메인용 인증서를 받게 합니다."
     ],
     [
      "</dev/null",
      "표준 입력을 /dev/null 로 연결해, 접속 후 입력을 기다리지 않고 바로 종료하게 합니다."
     ],
     [
      "2>/dev/null",
      "표준 에러(검증 오류 등 진단 메시지)를 버려 출력을 깔끔하게 합니다."
     ],
     [
      "|",
      "파이프: s_client 출력(인증서 PEM 포함)을 다음 명령으로 넘깁니다."
     ],
     [
      "openssl x509",
      "입력에서 첫 번째 인증서(서버 인증서)를 읽습니다."
     ],
     [
      "-noout",
      "인증서 PEM 본문을 다시 출력하지 않습니다."
     ],
     [
      "-dates",
      "notBefore(시작일)와 notAfter(만료일)를 출력합니다."
     ]
    ],
    "order": "파이프 앞의 s_client 와 뒤의 x509 순서는 고정입니다. 각 명령 안의 옵션과 리다이렉션 순서는 자유입니다."
   },
   {
    "parts": [
     [
      "openssl",
      "OpenSSL 도구입니다."
     ],
     [
      "x509",
      "X.509 인증서를 다루는 서브커맨드입니다."
     ],
     [
      "-in /etc/nginx/ssl/new.crt",
      "`-in`(input): 읽을 인증서 파일입니다."
     ],
     [
      "-noout",
      "인증서 PEM 본문을 출력하지 않습니다."
     ],
     [
      "-enddate",
      "notAfter(만료일) 한 줄만 출력합니다."
     ]
    ],
    "order": "`openssl x509` 뒤의 옵션 순서는 자유입니다."
   },
   {
    "parts": [
     [
      "nginx",
      "nginx 실행 파일입니다."
     ],
     [
      "-t",
      "`-t`(test): 설정 문법만 검사하고 종료합니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "nginx",
      "nginx 실행 파일입니다."
     ],
     [
      "-s reload",
      "`-s`(signal): 실행 중인 마스터 프로세스에 신호를 보냅니다. `reload` 는 연결을 끊지 않고 설정을 다시 읽게 합니다."
     ]
    ]
   }
  ]
 }
});
