/* container — 정답 명령어 풀이 (문제 ID → 조각별 설명, 순서 규칙)
 * 결과 화면의 "명령어 풀이" 칸에 표시된다. 조각은 정답 문자열의 부분 문자열이며 tools/validate.js 가 검증한다. */
window.QUIZ_PARTS = window.QUIZ_PARTS || {};
Object.assign(window.QUIZ_PARTS, {
 "container-001": {
  "parts": [
   [
    "docker",
    "Docker CLI(클라이언트) 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "ps",
    "`ps`(process status, 리눅스 `ps` 명령에서 따온 이름): 컨테이너 목록을 보여 줍니다. 옵션이 없으면 실행 중인 컨테이너만 나옵니다."
   ]
  ]
 },
 "container-002": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "ps",
    "컨테이너 목록을 보여 주는 서브커맨드입니다(`docker container ls` 와 같습니다)."
   ],
   [
    "-a",
    "`-a`(all): 실행 중인 것뿐 아니라 종료(Exited)되거나 생성만 된(Created) 컨테이너까지 모두 표시합니다."
   ]
  ],
  "order": "`-a` 는 서브커맨드 `ps` 뒤에 와야 합니다. `docker -a ps` 처럼 `ps` 앞에 쓰면 오류가 납니다."
 },
 "container-003": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "run",
    "이미지로 새 컨테이너를 만들고 바로 시작합니다. 로컬에 이미지가 없으면 먼저 pull 합니다."
   ],
   [
    "-d",
    "`-d`(detach): 컨테이너를 백그라운드에서 실행하고, 터미널에는 컨테이너 ID 만 출력한 뒤 바로 돌려줍니다."
   ],
   [
    "-p 8080:80",
    "`-p`(publish): `호스트포트:컨테이너포트` 형식의 포트 매핑입니다. 여기서는 호스트 8080 으로 들어온 요청을 컨테이너의 80 포트로 전달합니다."
   ],
   [
    "nginx",
    "실행할 이미지 이름입니다. 태그를 생략했으므로 `nginx:latest` 가 사용됩니다."
   ]
  ],
  "order": "`-d` 와 `-p` 끼리의 순서는 자유(`docker run -p 8080:80 -d nginx` 도 같음)지만, 옵션은 반드시 이미지 이름 앞에 와야 합니다. 이미지 이름 뒤에 쓴 것은 컨테이너 안에서 실행할 명령·인수로 넘어가며, `8080:80` 은 호스트가 앞, 컨테이너가 뒤입니다."
 },
 "container-004": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "logs",
    "컨테이너가 표준출력(stdout)과 표준에러(stderr)로 낸 로그를 보여 줍니다."
   ],
   [
    "-f",
    "`-f`(follow): 기존 로그를 출력한 뒤 종료하지 않고 새로 쌓이는 로그를 계속 따라가며 보여 줍니다. Ctrl+C 로 빠져나옵니다."
   ],
   [
    "web",
    "로그를 볼 대상 컨테이너 이름입니다."
   ]
  ],
  "order": "옵션 `-f` 는 컨테이너 이름 앞뒤 어디에 와도 됩니다. `docker logs web -f` 도 같은 동작입니다."
 },
 "container-005": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "exec",
    "이미 실행 중인 컨테이너 안에서 새 프로세스(명령)를 추가로 실행합니다."
   ],
   [
    "-it",
    "i(interactive: 표준입력을 열어 두어 키보드 입력을 전달) · t(tty: 가상 터미널을 할당해 프롬프트가 정상 표시되게 함). 대화형 셸에는 둘 다 필요합니다."
   ],
   [
    "web",
    "명령을 실행할 대상 컨테이너 이름입니다."
   ],
   [
    "bash",
    "컨테이너 안에서 실행할 명령입니다. 이미지에 bash 가 설치되어 있어야 하며, alpine 처럼 없으면 `sh` 를 씁니다."
   ]
  ],
  "order": "`docker exec [옵션] 컨테이너 명령` 순서입니다. 옵션은 컨테이너 이름 앞에 와야 하고, 컨테이너 이름 뒤의 내용은 모두 실행할 명령으로 취급됩니다. `-it` 와 `-ti` 는 같습니다."
 },
 "container-007": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "build",
    "Dockerfile 을 읽어 이미지를 빌드합니다."
   ],
   [
    "-t myapp:1.0",
    "`-t`(tag): 만들어질 이미지에 `이름:태그` 를 붙입니다. 여기서는 이름 myapp, 태그 1.0 입니다."
   ],
   [
    ".",
    "빌드 컨텍스트 경로입니다. 현재 디렉터리의 파일들이 빌더로 전달되고, 기본적으로 이 경로의 `Dockerfile` 이 사용됩니다."
   ]
  ],
  "order": "`-t` 와 컨텍스트 `.` 의 위치는 바꿔도 됩니다(`docker build . -t myapp:1.0`). 단, `-t` 바로 뒤에는 이름:태그가 와야 합니다."
 },
 "container-008": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "rm",
    "`rm`(remove): 컨테이너를 삭제합니다. 이미지 삭제는 `rmi` 입니다."
   ],
   [
    "web",
    "삭제할 컨테이너 이름입니다. 이미 중지된 상태라 `-f` 없이 삭제됩니다."
   ]
  ]
 },
 "container-009": {
  "parts": [
   [
    "kubectl",
    "Kubernetes API 서버에 요청을 보내는 CLI 도구입니다."
   ],
   [
    "get",
    "리소스 목록을 표 형태로 조회합니다."
   ],
   [
    "pods",
    "조회할 리소스 종류(Pod)입니다. `pod`, `po` 로 써도 같습니다."
   ],
   [
    "-A",
    "`-A`: `--all-namespaces` 의 짧은 형태로, 현재 네임스페이스뿐 아니라 모든 네임스페이스의 Pod 를 보여 줍니다(NAMESPACE 열이 추가됨)."
   ]
  ],
  "order": "`-A` 위치는 자유입니다. `kubectl get -A pods` 도 동작하지만 보통 리소스 종류 뒤에 씁니다."
 },
 "container-011": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "logs",
    "Pod 안 컨테이너의 stdout/stderr 로그를 출력합니다."
   ],
   [
    "-f",
    "`-f`(follow): 새로 찍히는 로그를 계속 따라가며 실시간으로 보여 줍니다. 긴 형태는 `--follow` 입니다."
   ],
   [
    "api-7d9f",
    "로그를 볼 Pod 이름입니다. 컨테이너가 여러 개면 `-c` 로 지정해야 합니다."
   ]
  ],
  "order": "옵션 `-f` 는 Pod 이름 앞뒤 어디에 와도 됩니다. `kubectl logs api-7d9f -f` 도 같습니다."
 },
 "container-012": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "apply",
    "매니페스트에 적힌 상태를 선언적으로 적용합니다. 리소스가 없으면 만들고, 있으면 달라진 부분만 갱신합니다."
   ],
   [
    "-f deploy.yaml",
    "`-f`(filename): 적용할 매니페스트 파일입니다. 여기서는 deploy.yaml 이며, 디렉터리나 URL 도 지정할 수 있습니다."
   ]
  ],
  "order": "`-f` 바로 뒤에는 파일 경로가 와야 합니다."
 },
 "container-013": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "scale",
    "Deployment·ReplicaSet·StatefulSet 등의 replica(복제본) 수를 즉시 변경합니다."
   ],
   [
    "deployment",
    "대상 리소스 종류입니다. `deploy` 로 줄여 쓸 수 있습니다."
   ],
   [
    "api",
    "대상 Deployment 이름입니다. `deployment/api` 처럼 종류/이름으로 붙여 써도 같습니다."
   ],
   [
    "--replicas=5",
    "`--replicas`: 원하는 replica 수입니다. 여기서는 Pod 5개로 맞춥니다."
   ]
  ],
  "order": "`--replicas=5` 는 리소스 앞에 와도 됩니다(`kubectl scale --replicas=5 deployment api`). `deployment api` 는 종류가 먼저, 이름이 뒤입니다."
 },
 "container-015": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "compose",
    "Docker Compose v2 플러그인입니다. compose.yaml(또는 docker-compose.yml)에 정의된 여러 서비스를 한꺼번에 다룹니다."
   ],
   [
    "up",
    "정의된 네트워크·볼륨·컨테이너를 만들고 서비스들을 시작합니다."
   ],
   [
    "-d",
    "`-d`(detach): 로그를 터미널에 붙잡지 않고 백그라운드에서 실행합니다. 긴 형태는 `--detach` 입니다."
   ]
  ],
  "order": "`-d` 는 `up` 뒤에 와야 합니다. 특정 서비스만 띄울 때는 `docker compose up -d db` 처럼 서비스 이름을 뒤에 붙입니다."
 },
 "container-016": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "system",
    "Docker 전체(시스템) 단위 관리 명령 그룹입니다."
   ],
   [
    "prune",
    "`prune`(가지치기): 중지된 컨테이너, 어떤 컨테이너도 쓰지 않는 네트워크, dangling 이미지(태그 없는 이미지), 미사용 빌드 캐시를 확인 후 한 번에 삭제합니다. 태그가 있어도 사용하지 않는 이미지까지 모두 지우려면 `-a` 를 붙이며, 볼륨은 `--volumes` 를 줄 때만 삭제됩니다."
   ]
  ]
 },
 "container-017": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "images",
    "로컬에 저장된 이미지 목록을 보여 줍니다. `docker image ls` 와 같습니다."
   ]
  ]
 },
 "container-019": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "run",
    "이미지로 새 컨테이너를 만들고 시작합니다."
   ],
   [
    "-d",
    "`-d`(detach): 백그라운드에서 실행합니다."
   ],
   [
    "-v ./data:/var/lib/postgresql/data",
    "`-v`(volume): `호스트경로:컨테이너경로` 로 마운트합니다. 호스트 경로가 `./` 로 시작하므로 이름 있는 볼륨이 아니라 호스트의 ./data 디렉터리를 bind mount 합니다(상대경로는 Docker 23 이상에서 지원)."
   ],
   [
    "postgres",
    "실행할 이미지 이름입니다(태그 생략 시 latest)."
   ]
  ],
  "order": "`-d` 와 `-v` 의 순서는 자유지만 둘 다 이미지 이름 앞에 와야 합니다. `-v` 값은 호스트 경로가 앞, 컨테이너 경로가 뒤입니다."
 },
 "container-021": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "describe",
    "리소스의 상세 정보와 최근 Events 를 사람이 읽기 쉬운 형태로 보여 줍니다."
   ],
   [
    "pod",
    "대상 리소스 종류(Pod)입니다. `po`, `pods` 도 같습니다."
   ],
   [
    "api-7d9f",
    "상세 정보를 볼 Pod 이름입니다."
   ]
  ],
  "order": "리소스 종류가 먼저, 이름이 뒤에 옵니다. `pod/api-7d9f` 처럼 붙여 써도 됩니다."
 },
 "container-023": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "set image",
    "`set` 명령 그룹의 `image`: 리소스 안 컨테이너의 이미지를 바꿉니다. Deployment 는 이 변경으로 롤링 업데이트가 시작됩니다."
   ],
   [
    "deployment/api",
    "대상 리소스를 `종류/이름` 형식으로 지정합니다. 여기서는 Deployment api 입니다."
   ],
   [
    "app=myapp:2.0",
    "`컨테이너이름=새이미지` 형식입니다. 컨테이너 app 의 이미지를 myapp:2.0 으로 바꿉니다."
   ]
  ],
  "order": "공식 형식대로 리소스(`deployment/api`)를 먼저, `컨테이너=이미지` 를 뒤에 씁니다. `deployment api` 처럼 종류와 이름을 띄어 써도 됩니다."
 },
 "container-024": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "rollout",
    "Deployment 등의 배포(롤아웃)를 관리하는 명령 그룹입니다."
   ],
   [
    "undo",
    "직전 리비전(이전 ReplicaSet 의 Pod 템플릿)으로 되돌립니다. `--to-revision=N` 으로 특정 리비전 지정도 가능합니다."
   ],
   [
    "deployment/api",
    "롤백할 대상 Deployment(api)를 `종류/이름` 형식으로 지정합니다."
   ]
  ],
  "order": "`rollout undo` 다음에 대상 리소스가 옵니다. `deployment api` 처럼 띄어 써도 같습니다."
 },
 "container-027": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "port-forward",
    "로컬 포트를 클러스터 안 Pod 의 포트로 터널링합니다. 명령이 실행 중인 동안만 유지됩니다."
   ],
   [
    "pg-0",
    "대상 Pod 이름입니다. 종류를 생략하면 Pod 로 간주하며 `pod/pg-0` 과 같습니다."
   ],
   [
    "5432:5432",
    "`로컬포트:Pod포트` 입니다. 로컬 5432 로 접속하면 Pod 의 5432 로 전달됩니다. 두 값이 같으면 `5432` 하나만 써도 됩니다."
   ]
  ],
  "order": "대상(Pod)이 먼저, 포트가 뒤에 옵니다. 포트 쌍은 로컬이 앞, 원격(Pod)이 뒤이므로 `15432:5432` 는 로컬 15432 → Pod 5432 입니다."
 },
 "container-029": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "get",
    "리소스 목록을 조회합니다."
   ],
   [
    "pods",
    "조회할 리소스 종류(Pod)입니다."
   ],
   [
    "-l app=api",
    "`-l`(label selector, 긴 형태 `--selector`): 레이블 조건으로 거릅니다. 여기서는 레이블 `app` 의 값이 `api` 인 Pod 만 표시합니다."
   ]
  ],
  "order": "`-l` 위치는 자유이며 `-l` 바로 뒤에 조건이 와야 합니다. 여러 조건은 쉼표로 이어 `-l app=api,tier=backend` 처럼 씁니다."
 },
 "container-031": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "config",
    "kubeconfig 파일(기본 `~/.kube/config`)을 조회·수정하는 명령 그룹입니다."
   ],
   [
    "current-context",
    "지금 kubectl 이 사용 중인 컨텍스트 이름 하나만 출력합니다."
   ]
  ]
 },
 "container-033": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "inspect",
    "컨테이너·이미지 등 객체의 전체 메타데이터(네트워크 IP, 마운트, 환경변수 등)를 JSON 으로 출력합니다."
   ],
   [
    "web",
    "정보를 볼 대상 컨테이너 이름입니다."
   ]
  ]
 },
 "container-035": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "exec",
    "Pod 안의 컨테이너에서 명령을 실행합니다."
   ],
   [
    "-it",
    "i(stdin: 표준입력을 컨테이너로 전달) · t(tty: 터미널 할당). 대화형 셸에는 둘 다 필요합니다."
   ],
   [
    "api-7d9f",
    "명령을 실행할 Pod 이름입니다. 컨테이너가 여러 개면 `-c` 로 지정합니다."
   ],
   [
    "--",
    "kubectl 자신의 옵션이 여기서 끝난다는 구분자입니다. 이 뒤의 내용은 모두 컨테이너에서 실행할 명령으로 전달됩니다."
   ],
   [
    "sh",
    "컨테이너 안에서 실행할 셸입니다."
   ]
  ],
  "order": "옵션과 Pod 이름을 먼저 쓰고, `--` 다음에 실행할 명령을 씁니다. `--` 를 빼면 최신 kubectl 에서는 오류가 납니다. `-it` 와 `-ti` 는 같습니다."
 },
 "container-037": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "rollout",
    "배포(롤아웃) 관리 명령 그룹입니다."
   ],
   [
    "status",
    "롤아웃이 끝날 때까지 진행 상황을 출력하며 기다립니다. 성공하면 종료 코드 0, 실패(데드라인 초과 등)하면 0 이 아닌 값을 반환합니다."
   ],
   [
    "deployment/api",
    "지켜볼 대상 Deployment(api)입니다."
   ]
  ],
  "order": "`rollout status` 다음에 대상 리소스가 옵니다. `deployment api` 처럼 띄어 써도 같습니다."
 },
 "container-039": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "run",
    "이미지로 새 컨테이너를 만들고 시작합니다."
   ],
   [
    "-d",
    "`-d`(detach): 백그라운드에서 실행합니다."
   ],
   [
    "--name web",
    "`--name`: 컨테이너 이름을 web 으로 지정합니다. 이후 `docker stop web` 처럼 이름으로 다룰 수 있습니다."
   ],
   [
    "--memory=512m",
    "`--memory`(짧은 형태 `-m`): 메모리 사용 상한입니다. `512m` 은 512 메가바이트(엄밀히는 MiB)이며, 넘으면 컨테이너 프로세스가 OOM kill 됩니다."
   ],
   [
    "--cpus=1.5",
    "`--cpus`: 사용할 수 있는 CPU 양을 1.5 코어로 제한합니다."
   ],
   [
    "nginx",
    "실행할 이미지입니다."
   ]
  ],
  "order": "옵션끼리의 순서는 자유지만 모두 이미지 이름(`nginx`) 앞에 와야 합니다. `=` 대신 공백(`--memory 512m`)을 써도 됩니다."
 },
 "container-041": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "drain",
    "노드를 cordon(새 Pod 스케줄 금지)한 뒤, 그 노드의 Pod 를 퇴거(evict)시켜 다른 노드로 옮기게 합니다."
   ],
   [
    "worker-2",
    "비울 대상 노드 이름입니다."
   ],
   [
    "--ignore-daemonsets",
    "DaemonSet 이 관리하는 Pod 는 퇴거하지 않고 넘어갑니다. 이 옵션이 없으면 DaemonSet Pod 때문에 drain 이 중단됩니다."
   ]
  ],
  "order": "옵션 위치는 자유이며, 추가 옵션(`--delete-emptydir-data` 등)끼리의 순서도 상관없습니다."
 },
 "container-043": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "top",
    "metrics-server 가 수집한 CPU/메모리 현재 사용량을 보여 줍니다."
   ],
   [
    "pods",
    "Pod 단위로 봅니다(`top nodes` 는 노드 단위)."
   ],
   [
    "-n prod",
    "`-n`(namespace): prod 네임스페이스의 Pod 만 대상으로 합니다."
   ]
  ],
  "order": "`-n prod` 는 위치가 자유로워 `kubectl -n prod top pods` 도 같습니다."
 },
 "container-045": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "get",
    "리소스를 조회합니다."
   ],
   [
    "secret",
    "조회할 리소스 종류(Secret)입니다."
   ],
   [
    "db-cred",
    "조회할 Secret 이름입니다."
   ],
   [
    "-o jsonpath=\"{.data.password}\"",
    "`-o`(output): 출력 형식을 jsonpath 로 지정해 `.data.password` 필드 값(base64 인코딩된 문자열)만 뽑습니다."
   ],
   [
    "|",
    "파이프: 앞 명령의 출력을 뒤 명령의 입력으로 넘깁니다."
   ],
   [
    "base64",
    "base64 인코딩/디코딩 도구입니다."
   ],
   [
    "-d",
    "`-d`(decode): 인코딩을 풀어 원래 비밀번호 문자열을 출력합니다. 긴 형태는 `--decode` 입니다."
   ]
  ],
  "order": "kubectl 이 뽑은 값을 base64 가 받아야 하므로 파이프 앞뒤 순서는 바꿀 수 없습니다. kubectl 부분 안에서 `-o` 옵션 위치는 자유입니다."
 },
 "container-047": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "history",
    "이미지의 각 레이어를 만든 명령과 크기를 최신 레이어부터 보여 줍니다."
   ],
   [
    "myapp:1.0",
    "히스토리를 볼 이미지(이름:태그)입니다."
   ]
  ]
 },
 "container-049": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "get",
    "리소스 목록을 조회합니다."
   ],
   [
    "all",
    "주요 워크로드 리소스(Pod, Service, Deployment, ReplicaSet, StatefulSet, Job 등)를 묶은 카테고리입니다. ConfigMap, Secret, Ingress 등은 포함되지 않습니다."
   ],
   [
    "-n prod",
    "`-n`(namespace): prod 네임스페이스를 대상으로 합니다."
   ]
  ],
  "order": "`-n prod` 위치는 자유이며 `kubectl -n prod get all` 도 같습니다."
 },
 "container-052": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "debug",
    "디버깅용 명령입니다. Pod 이름을 주면 그 Pod 에 임시(ephemeral) 컨테이너를 추가합니다."
   ],
   [
    "-it",
    "i(stdin: 입력 전달) · t(tty: 터미널 할당). 추가된 컨테이너의 셸에 바로 붙기 위해 필요합니다."
   ],
   [
    "api-7d9f",
    "임시 컨테이너를 붙일 대상 Pod 이름입니다."
   ],
   [
    "--image=busybox",
    "`--image`: 임시 컨테이너에 쓸 이미지입니다. busybox 는 기본 명령이 `sh` 라 명령을 따로 주지 않아도 셸이 열립니다."
   ]
  ],
  "order": "옵션 위치는 자유로워 `kubectl debug api-7d9f -it --image=busybox` 도 같습니다. 실행할 명령을 따로 줄 때는 맨 뒤에 `-- sh` 처럼 씁니다."
 },
 "container-054": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "auth",
    "인증·인가 관련 명령 그룹입니다."
   ],
   [
    "can-i",
    "현재 사용자가 특정 동작을 할 수 있는지 RBAC 로 평가해 yes/no 로 답합니다."
   ],
   [
    "delete",
    "확인할 동작(동사)입니다. 여기서는 삭제입니다."
   ],
   [
    "pods",
    "동작 대상 리소스 종류(Pod)입니다."
   ],
   [
    "-n prod",
    "`-n`(namespace): prod 네임스페이스 기준으로 권한을 확인합니다."
   ]
  ],
  "order": "`can-i` 뒤에는 동사(`delete`) 다음 리소스(`pods`) 순서로 와야 합니다. `-n prod` 위치는 자유입니다."
 },
 "container-057": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "stop",
    "컨테이너에 SIGTERM 을 보내 정상 종료를 요청하고, 기본 10초 안에 끝나지 않으면 SIGKILL 로 강제 종료합니다."
   ],
   [
    "web",
    "중지할 컨테이너 이름입니다."
   ]
  ]
 },
 "container-058": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "pull",
    "레지스트리(기본 Docker Hub)에서 이미지를 내려받습니다."
   ],
   [
    "redis:7",
    "받을 이미지 `이름:태그` 입니다. redis 이미지의 7 태그입니다."
   ]
  ]
 },
 "container-059": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "tag",
    "기존 이미지에 새 이름(태그)을 추가합니다. 이미지가 복사되지 않고 같은 이미지 ID 를 가리킵니다."
   ],
   [
    "myapp:1.0",
    "원본 이미지입니다."
   ],
   [
    "registry.example.com/team/myapp:1.0",
    "새로 붙일 이름입니다. 앞부분 `registry.example.com` 이 push 할 레지스트리 주소가 됩니다."
   ]
  ],
  "order": "원본 이미지가 앞, 새 이름이 뒤입니다. 바꿔 쓰면 원본이 없다는 오류가 나거나 엉뚱한 이미지에 태그가 붙습니다."
 },
 "container-060": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "push",
    "로컬 이미지를 레지스트리로 업로드합니다. 인증이 필요한 레지스트리라면 먼저 `docker login registry.example.com` 으로 로그인해 두어야 합니다."
   ],
   [
    "registry.example.com/team/myapp:1.0",
    "업로드할 이미지입니다. 이름의 앞부분(registry.example.com)이 업로드될 레지스트리를 결정합니다."
   ]
  ]
 },
 "container-062": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "get",
    "리소스 목록을 조회합니다."
   ],
   [
    "nodes",
    "조회할 리소스 종류(Node)입니다. `node`, `no` 로 써도 같습니다."
   ]
  ]
 },
 "container-063": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "get",
    "리소스 목록을 조회합니다."
   ],
   [
    "svc",
    "Service 의 짧은 이름입니다. `services`, `service` 와 같습니다."
   ]
  ]
 },
 "container-064": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "delete",
    "리소스를 삭제합니다. Pod 는 기본 유예 시간(보통 30초) 동안 정상 종료를 기다립니다."
   ],
   [
    "pod",
    "삭제할 리소스 종류(Pod)입니다."
   ],
   [
    "api-7d9f",
    "삭제할 Pod 이름입니다."
   ]
  ],
  "order": "리소스 종류가 먼저, 이름이 뒤에 옵니다. `pod/api-7d9f` 처럼 붙여 써도 됩니다."
 },
 "container-067": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다."
   ],
   [
    "volume",
    "볼륨 관리 명령 그룹입니다."
   ],
   [
    "ls",
    "`ls`(list): 볼륨 목록을 보여 줍니다."
   ]
  ]
 },
 "container-069": {
  "parts": [
   [
    "kubectl",
    "Kubernetes CLI 도구입니다."
   ],
   [
    "create",
    "리소스를 명령형으로 생성합니다. 이미 있으면 오류가 납니다."
   ],
   [
    "namespace",
    "생성할 리소스 종류(Namespace)입니다. `ns` 로 줄여 쓸 수 있습니다."
   ],
   [
    "dev",
    "새 네임스페이스 이름입니다."
   ]
  ]
 },
 "container-071": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "stats",
    "`stats`(statistics): 컨테이너별 CPU %, 메모리 사용량/제한, 네트워크·블록 I/O 를 실시간으로 갱신해 보여 줍니다. 이름을 지정하지 않으면 실행 중인 모든 컨테이너가 표시됩니다."
   ]
  ]
 },
 "container-072": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "cp",
    "`cp`(copy): 컨테이너와 호스트 사이에 파일·디렉터리를 복사합니다."
   ],
   [
    "web:/etc/nginx/nginx.conf",
    "원본입니다. `컨테이너이름:컨테이너 안의 경로` 형식으로, `web` 컨테이너의 `/etc/nginx/nginx.conf` 를 뜻합니다."
   ],
   [
    ".",
    "대상입니다. 호스트의 현재 디렉터리이며, 같은 이름(`nginx.conf`)으로 저장됩니다."
   ]
  ],
  "order": "원본이 먼저, 대상이 뒤에 옵니다. 순서를 바꾸면 호스트에서 컨테이너로 복사하는 반대 방향 명령이 됩니다."
 },
 "container-073": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "network",
    "Docker 네트워크를 관리하는 명령 그룹입니다."
   ],
   [
    "ls",
    "`ls`(list): 네트워크 목록(ID, 이름, 드라이버, 범위)을 출력합니다."
   ]
  ]
 },
 "container-076": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "config",
    "kubeconfig 파일(기본 `~/.kube/config`)의 설정을 보고 바꾸는 명령 그룹입니다."
   ],
   [
    "use-context",
    "현재 컨텍스트(current-context)를 바꿉니다. 이후 kubectl 명령은 이 컨텍스트의 클러스터·사용자·네임스페이스로 실행됩니다."
   ],
   [
    "prod-cluster",
    "전환할 컨텍스트 이름입니다."
   ]
  ],
  "order": "`config` → `use-context` → 컨텍스트 이름 순서는 고정입니다."
 },
 "container-077": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "get",
    "리소스 목록이나 특정 리소스를 조회합니다."
   ],
   [
    "pods",
    "조회할 리소스 종류(Pod)입니다."
   ],
   [
    "-o wide",
    "`-o`(output): 출력 형식을 지정합니다. `wide` 는 기본 컬럼에 NODE, IP 등 추가 컬럼을 붙여 줍니다."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl get -o wide pods` 도 같은 결과입니다."
 },
 "container-078": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "explain",
    "리소스의 API 스키마 문서(필드 설명·타입)를 보여 줍니다."
   ],
   [
    "deployment.spec.strategy",
    "`리소스.필드경로` 형식입니다. Deployment 의 `spec.strategy` 필드(RollingUpdate/Recreate 배포 전략) 문서를 봅니다."
   ]
  ]
 },
 "container-079": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "get",
    "리소스를 조회합니다."
   ],
   [
    "events",
    "조회할 리소스 종류(Event)입니다. `-n` 이 없으면 현재 네임스페이스의 이벤트입니다."
   ],
   [
    "--sort-by=.metadata.creationTimestamp",
    "`--sort-by`: 지정한 JSONPath 필드 값으로 정렬합니다. 여기서는 이벤트 생성 시각 기준 오름차순이라 최신 이벤트가 맨 아래에 옵니다."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl get --sort-by=.metadata.creationTimestamp events` 처럼 리소스 종류 앞에 써도 동작합니다."
 },
 "container-080": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "compose",
    "Docker Compose(v2, docker 플러그인)의 명령입니다."
   ],
   [
    "logs",
    "서비스 컨테이너들의 로그를 출력합니다."
   ],
   [
    "-f",
    "`-f`(follow): 새 로그가 쌓이는 대로 계속 따라가며 출력합니다. Ctrl+C 로 멈춥니다."
   ],
   [
    "api",
    "로그를 볼 서비스 이름입니다. 생략하면 모든 서비스 로그가 섞여 나옵니다."
   ]
  ],
  "order": "옵션(`-f`, `--tail` 등)끼리는 순서를 바꿔도 되며, 보통 서비스 이름 앞에 씁니다."
 },
 "container-081": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "rollout",
    "Deployment 등 워크로드의 롤아웃(배포)을 관리하는 명령 그룹입니다."
   ],
   [
    "restart",
    "Pod 템플릿에 재시작 시각 어노테이션을 넣어 롤링 방식으로 Pod 를 모두 새로 띄웁니다."
   ],
   [
    "deployment/api",
    "`종류/이름` 형식의 대상입니다. Deployment `api` 를 뜻합니다(`deployment api` 처럼 띄어 써도 됩니다)."
   ]
  ]
 },
 "container-083": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "login",
    "레지스트리에 인증하고 자격 증명을 저장합니다. 사용자 이름·비밀번호는 대화형으로 묻습니다."
   ],
   [
    "registry.example.com",
    "로그인할 레지스트리 주소입니다. 생략하면 Docker Hub 에 로그인합니다."
   ]
  ]
 },
 "container-085": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "delete",
    "리소스를 삭제합니다."
   ],
   [
    "-f app.yaml",
    "`-f`(filename): 이 파일에 정의된 리소스들을 대상으로 합니다. 여기서는 `app.yaml`."
   ]
  ]
 },
 "container-087": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "commit",
    "컨테이너의 현재 파일시스템 변경(쓰기 레이어)을 새 이미지로 저장합니다."
   ],
   [
    "web",
    "원본 컨테이너 이름입니다."
   ],
   [
    "web-debug:1",
    "만들 이미지의 `이름:태그` 입니다."
   ]
  ],
  "order": "컨테이너가 먼저, 새 이미지 이름이 뒤에 옵니다."
 },
 "container-088": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "run",
    "이미지로 새 컨테이너를 만들고 시작합니다."
   ],
   [
    "-d",
    "`-d`(detach): 백그라운드에서 실행하고 터미널을 바로 돌려줍니다."
   ],
   [
    "--network host",
    "`--network`: 연결할 네트워크입니다. `host` 는 별도 네트워크 네임스페이스 없이 호스트의 네트워크 스택을 그대로 씁니다(`-p` 포트 매핑 불필요)."
   ],
   [
    "nginx",
    "실행할 이미지 이름입니다."
   ]
  ],
  "order": "옵션끼리는 순서가 자유지만 모두 이미지 이름(`nginx`) 앞에 와야 합니다. 이미지 뒤에 쓴 것은 컨테이너 안에서 실행할 명령의 인자로 해석됩니다."
 },
 "container-089": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "exec",
    "실행 중인 컨테이너 안에서 새 프로세스를 실행합니다."
   ],
   [
    "-it",
    "i(interactive: 표준입력을 열어 둠) · t(tty: 가상 터미널 할당). 셸을 대화형으로 쓰려면 둘 다 필요합니다."
   ],
   [
    "-u root",
    "`-u`(user): 이 프로세스를 실행할 사용자입니다. 여기서는 이미지의 `USER` 설정을 무시하고 root 로 실행합니다."
   ],
   [
    "app",
    "대상 컨테이너 이름입니다."
   ],
   [
    "sh",
    "컨테이너 안에서 실행할 명령(셸)입니다."
   ]
  ],
  "order": "`-it`, `-u root` 같은 옵션은 서로 순서를 바꿔도 되지만 컨테이너 이름 앞에 와야 합니다. 컨테이너 이름 뒤는 실행할 명령입니다."
 },
 "container-090": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "get",
    "리소스를 조회합니다."
   ],
   [
    "pod",
    "리소스 종류(Pod)입니다."
   ],
   [
    "api-7d9f",
    "조회할 Pod 이름입니다."
   ],
   [
    "-o yaml",
    "`-o`(output): 출력 형식입니다. `yaml` 은 spec 과 status 를 포함한 객체 전체를 YAML 로 출력합니다."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl get -o yaml pod api-7d9f` 도 같습니다."
 },
 "container-091": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "label",
    "리소스의 레이블을 추가·변경·삭제합니다."
   ],
   [
    "pod",
    "리소스 종류(Pod)입니다."
   ],
   [
    "api-7d9f",
    "대상 Pod 이름입니다."
   ],
   [
    "tier=backend",
    "추가할 레이블 `키=값` 입니다. 키가 이미 다른 값으로 있으면 `--overwrite` 가 필요합니다."
   ]
  ],
  "order": "리소스 종류 → 이름 → 레이블 순서로 씁니다."
 },
 "container-092": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "taint",
    "노드에 taint 를 추가·삭제합니다."
   ],
   [
    "nodes",
    "리소스 종류(Node)입니다."
   ],
   [
    "worker-2",
    "대상 노드 이름입니다."
   ],
   [
    "dedicated=gpu:NoSchedule",
    "`키=값:효과` 형식의 taint 입니다. 키 `dedicated`, 값 `gpu`, 효과 `NoSchedule`(toleration 없는 새 Pod 는 스케줄 안 됨)."
   ]
  ],
  "order": "노드 종류 → 노드 이름 → taint 순서로 씁니다."
 },
 "container-093": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "autoscale",
    "대상 워크로드에 HorizontalPodAutoscaler(HPA)를 만듭니다."
   ],
   [
    "deployment api",
    "대상입니다. Deployment `api` (`deployment/api` 로 써도 됩니다)."
   ],
   [
    "--min=2",
    "최소 replica 수 2."
   ],
   [
    "--max=10",
    "최대 replica 수 10."
   ],
   [
    "--cpu-percent=70",
    "목표 평균 CPU 사용률(CPU requests 대비 %)을 70 으로 둡니다. kubectl 1.34 부터는 deprecated 이며 `--cpu=70%` 가 새 형식입니다."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `--min`, `--max`, `--cpu-percent` 는 어떤 순서로 써도 됩니다."
 },
 "container-096": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "create",
    "리소스를 새로 만듭니다."
   ],
   [
    "secret",
    "만들 리소스가 Secret 임을 뜻합니다."
   ],
   [
    "generic",
    "Secret 하위 종류입니다. 임의의 키-값(Opaque 타입)을 담습니다(그 외 `docker-registry`, `tls`)."
   ],
   [
    "db-cred",
    "만들 Secret 이름입니다."
   ],
   [
    "--from-literal=password=s3cret",
    "`--from-literal=키=값`: 명령줄에서 키-값을 직접 넣습니다. 키 `password`, 값 `s3cret`."
   ]
  ],
  "order": "`create secret generic 이름` 순서는 고정이고, `--from-literal` 은 그 뒤에 여러 번 쓸 수 있습니다."
 },
 "container-097": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "get",
    "리소스를 조회합니다."
   ],
   [
    "pods",
    "리소스 종류(Pod)입니다."
   ],
   [
    "-A",
    "`-A`(`--all-namespaces`): 모든 네임스페이스를 대상으로 합니다."
   ],
   [
    "--field-selector status.phase=Failed",
    "`--field-selector`: 레이블이 아닌 리소스 필드 값으로 거릅니다. 여기서는 `status.phase` 가 `Failed` 인 Pod 만."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `-A` 와 `--field-selector` 의 순서를 바꿔도 같습니다."
 },
 "container-099": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "buildx",
    "BuildKit 기반 확장 빌드 플러그인입니다."
   ],
   [
    "build",
    "이미지를 빌드합니다."
   ],
   [
    "--platform linux/amd64,linux/arm64",
    "`--platform`: 빌드할 대상 플랫폼 목록(쉼표 구분)입니다. 여기서는 amd64 와 arm64 두 가지."
   ],
   [
    "-t myapp:1.0",
    "`-t`(tag): 결과 이미지 이름:태그입니다."
   ],
   [
    "--push",
    "빌드 결과(멀티 플랫폼 이미지 인덱스)를 바로 레지스트리에 push 합니다."
   ],
   [
    ".",
    "빌드 컨텍스트(Dockerfile 과 COPY 대상 파일이 있는 디렉터리)입니다. 여기서는 현재 디렉터리."
   ]
  ],
  "order": "옵션끼리 순서는 자유이며, 빌드 컨텍스트 `.` 도 옵션 앞뒤 어디에 두어도 동작합니다."
 },
 "container-101": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "logs",
    "Pod 컨테이너의 로그를 출력합니다."
   ],
   [
    "-l app=api",
    "`-l`(label selector, `--selector`): 레이블 `app=api` 인 Pod 들을 대상으로 합니다. 이때 Pod 당 기본 최근 10줄만 나옵니다."
   ],
   [
    "--all-containers",
    "Pod 안의 모든 컨테이너(사이드카 등 포함) 로그를 출력합니다."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl logs --all-containers -l app=api` 도 같습니다."
 },
 "container-102": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "save",
    "이미지(레이어+메타데이터)를 tar 아카이브로 내보냅니다."
   ],
   [
    "-o myapp.tar",
    "`-o`(output): 표준출력 대신 이 파일로 씁니다. 여기서는 `myapp.tar`."
   ],
   [
    "myapp:1.0",
    "저장할 이미지 `이름:태그` 입니다."
   ]
  ],
  "order": "`-o myapp.tar` 는 이미지 이름 뒤에 와도 됩니다. 다만 `-o` 바로 뒤에는 파일 이름이 와야 합니다."
 },
 "container-106": {
  "parts": [
   [
    "crictl",
    "CRI(Container Runtime Interface) 호환 런타임(containerd, CRI-O)을 직접 조회하는 CLI 입니다."
   ],
   [
    "ps",
    "런타임에서 실행 중인 컨테이너 목록을 보여 줍니다(`-a` 를 붙이면 종료된 것까지)."
   ]
  ]
 },
 "container-110": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "top",
    "metrics-server 기반의 CPU·메모리 사용량을 보여 줍니다."
   ],
   [
    "pods",
    "Pod 단위로 조회합니다."
   ],
   [
    "-n prod",
    "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
   ],
   [
    "--containers",
    "Pod 안의 컨테이너별로 나누어 사용량을 표시합니다."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod` 와 `--containers` 의 순서를 바꾸거나 `-n prod` 를 `kubectl` 바로 뒤에 써도 됩니다."
 },
 "container-112": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "get",
    "리소스를 조회합니다."
   ],
   [
    "pods",
    "리소스 종류(Pod)입니다."
   ],
   [
    "-A",
    "`-A`(`--all-namespaces`): 모든 네임스페이스."
   ],
   [
    "-o custom-columns=",
    "`-o`(output) 형식 중 `custom-columns`: `헤더:JSONPath` 쌍을 쉼표로 나열해 원하는 컬럼만 표로 출력합니다."
   ],
   [
    "NS:.metadata.namespace",
    "첫 컬럼: 헤더 `NS`, 값은 `.metadata.namespace`(네임스페이스)."
   ],
   [
    ",NAME:.metadata.name",
    "둘째 컬럼: 헤더 `NAME`, 값은 Pod 이름."
   ],
   [
    ",NODE:.spec.nodeName",
    "셋째 컬럼: 헤더 `NODE`, 값은 Pod 가 배치된 노드 이름."
   ]
  ],
  "order": "컬럼은 적은 순서대로 출력되므로 컬럼 정의 순서는 의미가 있습니다. `-A` 와 `-o` 옵션끼리는 순서가 자유이며, 컬럼 목록 안에는 공백이 없어야 합니다."
 },
 "container-121": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "system",
    "Docker 전체(시스템) 수준 관리 명령 그룹입니다."
   ],
   [
    "prune",
    "`prune`(가지치기): 중지된 컨테이너, 미사용 네트워크, dangling 이미지(태그 없는 이미지), 미사용 빌드 캐시를 확인 후 한꺼번에 삭제합니다. 태그가 있어도 사용하지 않는 이미지까지 모두 지우려면 `-a`(`--all`)를 붙이며, 볼륨은 `--volumes` 를 줄 때만 삭제됩니다."
   ]
  ]
 },
 "container-122": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "inspect",
    "컨테이너·이미지 등의 상세 정보를 JSON 으로 출력합니다."
   ],
   [
    "-f",
    "`-f`(`--format`): 출력을 Go 템플릿으로 가공합니다."
   ],
   [
    "\"{{range .NetworkSettings.Networks}}",
    "템플릿 시작입니다. 컨테이너가 연결된 네트워크 목록을 하나씩 순회합니다."
   ],
   [
    "{{.IPAddress}}",
    "순회 중인 네트워크에서 이 컨테이너의 IP 주소를 출력합니다."
   ],
   [
    "{{end}}\"",
    "`range` 반복의 끝입니다."
   ],
   [
    "web",
    "대상 컨테이너 이름입니다."
   ]
  ],
  "order": "템플릿은 `-f` 바로 뒤에 와야 하며, 공백이 있으므로 따옴표로 감쌉니다. `-f 템플릿` 과 컨테이너 이름의 순서는 바꿔도 됩니다."
 },
 "container-123": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "logs",
    "컨테이너 로그(stdout/stderr)를 출력합니다."
   ],
   [
    "--tail 100",
    "`--tail`(`-n`): 로그 끝에서부터 100줄만 출력합니다."
   ],
   [
    "-t",
    "`-t`(timestamps): 각 줄 앞에 타임스탬프를 붙입니다."
   ],
   [
    "api",
    "대상 컨테이너 이름입니다."
   ]
  ],
  "order": "옵션끼리는 순서가 자유입니다(`docker logs -t --tail 100 api` 도 같음)."
 },
 "container-124": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "compose",
    "Docker Compose(v2) 명령입니다."
   ],
   [
    "up",
    "서비스를 생성·시작하며, 설정이 바뀐 컨테이너는 재생성합니다."
   ],
   [
    "-d",
    "`-d`(detach): 백그라운드에서 실행합니다."
   ],
   [
    "--build",
    "컨테이너를 시작하기 전에 이미지를 다시 빌드합니다."
   ],
   [
    "api",
    "대상 서비스 이름입니다(의존 서비스는 필요 시 함께 시작)."
   ]
  ],
  "order": "`-d` 와 `--build` 의 순서는 자유입니다."
 },
 "container-125": {
  "parts": [
   [
    "USER",
    "Dockerfile 명령(instruction)으로, 이후 `RUN`·`CMD`·`ENTRYPOINT` 와 컨테이너 실행 사용자를 지정합니다."
   ],
   [
    "app",
    "사용할 사용자 이름입니다(`app:app` 처럼 그룹, 또는 UID 숫자로도 지정 가능)."
   ]
  ]
 },
 "container-126": {
  "parts": [
   [
    "docker",
    "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
   ],
   [
    "diff",
    "컨테이너 파일시스템에서 이미지 대비 추가(A)·변경(C)·삭제(D)된 경로를 보여 줍니다."
   ],
   [
    "app",
    "대상 컨테이너 이름입니다."
   ]
  ]
 },
 "container-127": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "logs",
    "Pod 컨테이너의 로그를 출력합니다."
   ],
   [
    "api-7d9f",
    "대상 파드 이름입니다."
   ],
   [
    "-n prod",
    "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
   ],
   [
    "--previous",
    "`--previous`(`-p`): 현재가 아닌 직전에 종료된(크래시한) 컨테이너 인스턴스의 로그를 보여 줍니다."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod`, `--previous` 를 Pod 이름 앞뒤 어디에 써도 같습니다."
 },
 "container-128": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "cordon",
    "노드를 스케줄 불가(SchedulingDisabled)로 표시합니다. 실행 중인 Pod 는 그대로 둡니다."
   ],
   [
    "worker-2",
    "대상 노드 이름입니다."
   ]
  ]
 },
 "container-129": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "describe",
    "리소스의 상세 정보와 관련 이벤트(Events)를 사람이 읽기 좋게 출력합니다."
   ],
   [
    "pod",
    "리소스 종류(Pod)입니다."
   ],
   [
    "api-7d9f",
    "대상 파드 이름입니다."
   ]
  ]
 },
 "container-130": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "rollout",
    "워크로드의 롤아웃(배포)을 관리하는 명령 그룹입니다."
   ],
   [
    "history",
    "리비전 목록과 CHANGE-CAUSE 를 보여 줍니다."
   ],
   [
    "deployment/api",
    "`종류/이름` 형식의 대상입니다. Deployment `api`."
   ]
  ]
 },
 "container-131": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "create",
    "리소스를 새로 만듭니다."
   ],
   [
    "configmap",
    "만들 리소스 종류(ConfigMap, 약칭 `cm`)입니다."
   ],
   [
    "app-config",
    "ConfigMap 이름입니다."
   ],
   [
    "--from-file=config.yaml",
    "`--from-file`: 파일 내용으로 데이터를 채웁니다. 키는 파일 이름 `config.yaml`, 값은 파일 내용입니다."
   ]
  ],
  "order": "`create configmap 이름` 순서는 고정이고 `--from-file` 은 그 뒤에 씁니다."
 },
 "container-132": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "exec",
    "Pod 의 컨테이너 안에서 명령을 실행합니다."
   ],
   [
    "-it",
    "i(stdin: 표준입력 연결) · t(tty: 터미널 할당). 대화형 셸에 필요합니다."
   ],
   [
    "api-7d9f",
    "대상 파드 이름입니다."
   ],
   [
    "-c app",
    "`-c`(container): 여러 컨테이너 중 접속할 컨테이너 `app` 을 지정합니다."
   ],
   [
    "--",
    "kubectl 옵션의 끝을 표시합니다. 이 뒤는 컨테이너 안에서 실행할 명령입니다."
   ],
   [
    "sh",
    "컨테이너 안에서 실행할 셸입니다."
   ]
  ],
  "order": "`-it`, `-c app` 은 Pod 이름 앞뒤 어디에 써도 되지만 반드시 `--` 앞에 있어야 합니다. `--` 뒤에 쓰면 컨테이너 안 명령의 인자가 됩니다."
 },
 "container-133": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "taint",
    "노드의 taint 를 추가·삭제합니다."
   ],
   [
    "nodes",
    "리소스 종류(Node)입니다."
   ],
   [
    "worker-2",
    "대상 노드 이름입니다."
   ],
   [
    "dedicated=gpu:NoSchedule-",
    "제거할 taint `키=값:효과` 끝에 `-` 를 붙이면 삭제를 뜻합니다."
   ]
  ],
  "order": "노드 종류 → 이름 → taint 순서이며, `-` 는 taint 문자열 끝에 공백 없이 붙여야 합니다."
 },
 "container-134": {
  "parts": [
   [
    "kubectl",
    "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
   ],
   [
    "describe",
    "리소스 상세 정보를 출력합니다. ResourceQuota 는 항목별 Used/Hard 를 표로 보여 줍니다."
   ],
   [
    "resourcequota",
    "리소스 종류(ResourceQuota, 약칭 `quota`)입니다. 이름을 생략하면 네임스페이스의 모든 quota 를 보여 줍니다."
   ],
   [
    "-n prod",
    "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
   ]
  ],
  "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl -n prod describe resourcequota` 도 같습니다."
 },
 "container-113": {
  "steps": [
   {
    "parts": [
     [
      "docker",
      "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
     ],
     [
      "run",
      "이미지로 새 컨테이너를 만들고 시작합니다."
     ],
     [
      "-d",
      "`-d`(detach): 백그라운드에서 실행합니다."
     ],
     [
      "--name web",
      "`--name`: 컨테이너 이름을 `web` 으로 지정합니다."
     ],
     [
      "-p 8080:80",
      "`-p`(publish): `호스트포트:컨테이너포트` 입니다. 호스트 8080 → 컨테이너 80."
     ],
     [
      "nginx:alpine",
      "실행할 이미지(nginx, alpine 기반 태그)입니다."
     ]
    ],
    "order": "옵션끼리는 순서가 자유지만 모두 이미지 이름 앞에 와야 합니다. `-p` 값은 반드시 호스트 포트가 먼저입니다."
   },
   {
    "parts": [
     [
      "docker",
      "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
     ],
     [
      "ps",
      "`ps`(process status): 실행 중인 컨테이너 목록을 보여 줍니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "docker",
      "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
     ],
     [
      "logs",
      "컨테이너 로그를 출력합니다."
     ],
     [
      "-f",
      "`-f`(follow): 새 로그를 계속 따라가며 출력합니다."
     ],
     [
      "web",
      "대상 컨테이너 이름입니다."
     ]
    ]
   }
  ]
 },
 "container-114": {
  "steps": [
   {
    "parts": [
     [
      "docker",
      "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
     ],
     [
      "exec",
      "실행 중인 컨테이너 안에서 새 프로세스를 실행합니다."
     ],
     [
      "-it",
      "i(interactive: 표준입력 연결) · t(tty: 터미널 할당)."
     ],
     [
      "api",
      "대상 컨테이너 이름입니다."
     ],
     [
      "/bin/sh",
      "컨테이너 안에서 실행할 셸입니다."
     ]
    ],
    "order": "옵션(`-it`)은 컨테이너 이름 앞에, 실행할 명령은 컨테이너 이름 뒤에 와야 합니다."
   },
   {
    "parts": [
     [
      "docker",
      "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
     ],
     [
      "stop",
      "SIGTERM 을 보내 정상 종료를 요청하고, 유예 시간(기본 10초) 뒤에도 살아 있으면 SIGKILL 로 종료합니다."
     ],
     [
      "api",
      "대상 컨테이너 이름입니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "docker",
      "Docker CLI 명령입니다. 뒤에 오는 서브커맨드를 Docker 데몬에 요청합니다."
     ],
     [
      "rm",
      "`rm`(remove): 종료된 컨테이너를 삭제합니다."
     ],
     [
      "api",
      "대상 컨테이너 이름입니다."
     ]
    ]
   }
  ]
 },
 "container-115": {
  "steps": [
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "get",
      "리소스를 조회합니다."
     ],
     [
      "pods",
      "리소스 종류(Pod)입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl -n prod get pods` 도 같습니다."
   },
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "describe",
      "리소스 상세 정보와 이벤트를 출력합니다."
     ],
     [
      "pod",
      "리소스 종류(Pod)입니다."
     ],
     [
      "api-7d9f",
      "대상 파드 이름입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod` 를 맨 앞에 써도 됩니다."
   },
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "logs",
      "Pod 컨테이너의 로그를 출력합니다."
     ],
     [
      "api-7d9f",
      "대상 파드 이름입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ],
     [
      "--previous",
      "`--previous`(`-p`): 직전에 종료된 컨테이너 인스턴스의 로그를 보여 줍니다."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod`, `--previous` 순서를 바꿔도 같습니다."
   }
  ]
 },
 "container-116": {
  "steps": [
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "set image",
      "워크로드의 컨테이너 이미지를 바꿉니다. Pod 템플릿이 바뀌므로 롤링 업데이트가 시작됩니다."
     ],
     [
      "deployment/api",
      "대상 Deployment `api` 입니다."
     ],
     [
      "api=myapp:v2",
      "`컨테이너이름=새이미지` 형식입니다. 컨테이너 `api` 의 이미지를 `myapp:v2` 로."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. 다만 `deployment/api` 가 먼저, `컨테이너=이미지` 가 뒤에 와야 합니다."
   },
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "rollout status",
      "롤아웃이 끝날 때까지 진행 상황을 보여 주며 기다립니다. 실패(진행 기한 초과) 시 0 이 아닌 코드로 종료합니다."
     ],
     [
      "deployment/api",
      "대상 Deployment `api` 입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl -n prod rollout status deployment/api` 도 같습니다."
   },
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "rollout undo",
      "직전 리비전으로 되돌립니다(`--to-revision=N` 으로 특정 리비전 지정 가능)."
     ],
     [
      "deployment/api",
      "대상 Deployment `api` 입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod` 를 맨 앞에 써도 됩니다."
   }
  ]
 },
 "container-135": {
  "steps": [
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "describe",
      "상태, 재시작 횟수, Last State(종료 사유), 이벤트를 보여 줍니다."
     ],
     [
      "pod",
      "리소스 종류(Pod)입니다."
     ],
     [
      "api-7d9f",
      "대상 파드 이름입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod` 를 맨 앞에 써도 됩니다."
   },
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "logs",
      "Pod 컨테이너의 로그를 출력합니다."
     ],
     [
      "api-7d9f",
      "대상 파드 이름입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ],
     [
      "--previous",
      "`--previous`(`-p`): 직전에 크래시한 컨테이너 인스턴스의 로그를 보여 줍니다."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod`, `--previous` 순서를 바꿔도 같습니다."
   },
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "get",
      "리소스를 조회합니다."
     ],
     [
      "pod",
      "리소스 종류(Pod)입니다."
     ],
     [
      "api-7d9f",
      "대상 파드 이름입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ],
     [
      "-o yaml",
      "`-o`(output): 객체 전체(spec·status)를 YAML 로 출력합니다. env, envFrom, volumes 에서 참조하는 ConfigMap·Secret 이름을 확인할 수 있습니다."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `-n prod` 와 `-o yaml` 의 순서를 바꿔도 같습니다."
   },
   {
    "parts": [
     [
      "kubectl",
      "Kubernetes 클러스터(API 서버)에 요청을 보내는 CLI 입니다."
     ],
     [
      "rollout restart",
      "Pod 템플릿에 재시작 시각 어노테이션을 넣어 Pod 를 롤링 방식으로 순차 재기동합니다."
     ],
     [
      "deployment/api",
      "대상 Deployment `api` 입니다."
     ],
     [
      "-n prod",
      "`-n`(namespace): 대상 네임스페이스를 지정합니다. 여기서는 `prod`."
     ]
    ],
    "order": "kubectl 은 플래그 위치가 자유롭습니다. `kubectl -n prod rollout restart deployment/api` 도 같습니다."
   }
  ]
 }
});
