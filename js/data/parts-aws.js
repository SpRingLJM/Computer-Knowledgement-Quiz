/* aws — 정답 명령어 풀이 (문제 ID → 조각별 설명, 순서 규칙)
 * 결과 화면의 "명령어 풀이" 칸에 표시된다. 조각은 정답 문자열의 부분 문자열이며 tools/validate.js 가 검증한다. */
window.QUIZ_PARTS = window.QUIZ_PARTS || {};
Object.assign(window.QUIZ_PARTS, {
 "aws-001": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "sts",
    "STS(Security Token Service): 자격 증명과 임시 토큰을 다루는 서비스입니다."
   ],
   [
    "get-caller-identity",
    "지금 이 CLI 를 호출하는 주체(계정 ID, UserId, ARN)를 알려 주는 명령입니다. 별도 권한 없이도 실행됩니다."
   ]
  ]
 },
 "aws-002": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3",
    "S3 를 다루는 고수준(high-level) 명령 묶음입니다."
   ],
   [
    "ls",
    "list: 인자 없이 쓰면 내 계정의 버킷 목록을, `s3://버킷/접두사` 를 주면 그 안의 객체를 나열합니다."
   ]
  ],
  "order": "`aws s3 ls` 순서는 고정입니다(실행 파일 → 서비스 → 명령)."
 },
 "aws-003": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3",
    "S3 고수준 명령 묶음입니다."
   ],
   [
    "cp",
    "copy: 로컬과 S3 사이(또는 S3 끼리) 파일을 복사합니다. 원본이 로컬이고 대상이 `s3://` 이면 업로드입니다."
   ],
   [
    "app.zip",
    "원본(source): 업로드할 로컬 파일입니다."
   ],
   [
    "s3://my-bucket/releases/",
    "대상(destination): my-bucket 버킷의 releases/ 경로입니다. `/` 로 끝나므로 파일명 app.zip 이 그대로 유지됩니다."
   ]
  ],
  "order": "`cp` 는 항상 원본이 먼저, 대상이 뒤입니다. 순서를 바꾸면 S3 에서 로컬로 다운로드하려는 뜻이 되어 실패합니다."
 },
 "aws-006": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ec2",
    "EC2(가상 서버) 서비스 명령 묶음입니다."
   ],
   [
    "describe-instances",
    "인스턴스 정보를 조회합니다. 필터가 없으면 실행 중뿐 아니라 중지된 인스턴스 등도 함께 나오므로, 실행 중만 보려면 `--filters Name=instance-state-name,Values=running` 을 붙입니다."
   ]
  ]
 },
 "aws-009": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "configure",
    "액세스 키, 시크릿 키, 기본 리전, 출력 형식을 차례로 묻고 `~/.aws/credentials`, `~/.aws/config` 에 저장하는 대화형 설정 명령입니다."
   ]
  ]
 },
 "aws-011": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3",
    "S3 고수준 명령 묶음입니다."
   ],
   [
    "cp",
    "copy: 원본에 `s3://` 가 있으므로 S3 에서 로컬로 다운로드합니다."
   ],
   [
    "s3://my-bucket/logs/app.log",
    "원본(source): my-bucket 버킷의 logs/app.log 객체입니다."
   ],
   [
    ".",
    "대상(destination): 현재 디렉터리입니다. 파일명 app.log 가 그대로 유지됩니다."
   ]
  ],
  "order": "원본(S3 경로)이 먼저, 대상(`.`)이 뒤에 와야 합니다."
 },
 "aws-014": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "logs",
    "CloudWatch Logs 서비스 명령 묶음입니다."
   ],
   [
    "tail",
    "로그 그룹의 이벤트를 출력하는 CLI v2 전용 명령입니다(기본은 최근 10분)."
   ],
   [
    "/aws/lambda/my-fn",
    "대상 로그 그룹 이름(위치 인자)입니다. Lambda 함수 my-fn 의 로그 그룹입니다."
   ],
   [
    "--follow",
    "새 로그가 들어오는 대로 계속 이어서 출력합니다(Ctrl+C 로 종료). `tail -f` 와 같은 동작입니다."
   ]
  ],
  "order": "`--follow` 는 로그 그룹 이름 앞뒤 어디에 와도 됩니다. `aws logs tail --follow /aws/lambda/my-fn` 도 같습니다."
 },
 "aws-017": {
  "parts": [
   [
    "--query",
    "모든 AWS CLI 명령에 쓸 수 있는 전역 옵션으로, 응답 JSON 에 JMESPath 식을 적용해 필요한 필드만 클라이언트 쪽에서 골라냅니다."
   ]
  ]
 },
 "aws-019": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3",
    "S3 고수준 명령 묶음입니다."
   ],
   [
    "sync",
    "원본과 대상을 비교해 새로 생기거나 바뀐 파일만 전송합니다."
   ],
   [
    "./dist",
    "원본: 로컬 디렉터리 dist 입니다."
   ],
   [
    "s3://my-site",
    "대상: my-site 버킷(루트)입니다."
   ],
   [
    "--delete",
    "원본(로컬)에 없는 파일을 대상(S3)에서 삭제해 완전히 같게 맞춥니다."
   ]
  ],
  "order": "원본(`./dist`)이 먼저, 대상(`s3://my-site`)이 뒤여야 합니다. `--delete` 위치는 자유입니다."
 },
 "aws-021": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "iam",
    "IAM 서비스 명령 묶음입니다."
   ],
   [
    "list-attached-user-policies",
    "사용자에게 직접 연결된 관리형 정책 목록을 조회합니다(인라인 정책·그룹 경유 정책은 포함되지 않음)."
   ],
   [
    "--user-name deploy-bot",
    "`--user-name`: 조회할 IAM 사용자 이름입니다. 여기서는 deploy-bot."
   ]
  ]
 },
 "aws-023": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3",
    "S3 고수준 명령 묶음입니다."
   ],
   [
    "presign",
    "지정한 객체에 대한 presigned URL(서명된 임시 다운로드 링크)을 만들어 출력합니다."
   ],
   [
    "s3://my-bucket/report.pdf",
    "링크를 만들 대상 객체입니다."
   ],
   [
    "--expires-in 3600",
    "`--expires-in`: 유효 시간(초)입니다. 3600초 = 1시간(기본값도 3600)."
   ]
  ],
  "order": "옵션 위치는 자유입니다. `aws s3 presign --expires-in 3600 s3://my-bucket/report.pdf` 도 같습니다."
 },
 "aws-025": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ec2",
    "EC2 서비스 명령 묶음입니다."
   ],
   [
    "stop-instances",
    "인스턴스를 중지합니다(EBS 데이터는 유지, 컴퓨팅 과금 중단)."
   ],
   [
    "--instance-ids i-0abc123",
    "`--instance-ids`: 대상 인스턴스 ID 목록입니다(공백으로 여러 개 지정 가능). 여기서는 i-0abc123."
   ]
  ]
 },
 "aws-027": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ssm",
    "Systems Manager 서비스 명령 묶음입니다."
   ],
   [
    "start-session",
    "Session Manager 세션을 시작합니다. 로컬에 session-manager-plugin 이 설치되어 있어야 셸이 열립니다."
   ],
   [
    "--target i-0abc123",
    "`--target`: 접속할 관리 대상(인스턴스 ID)입니다. 여기서는 i-0abc123."
   ]
  ]
 },
 "aws-029": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "lambda",
    "Lambda 서비스 명령 묶음입니다."
   ],
   [
    "invoke",
    "함수를 호출합니다. 기본 호출 유형은 RequestResponse(동기)라 결과를 기다립니다."
   ],
   [
    "--function-name my-fn",
    "`--function-name`: 호출할 함수 이름(또는 ARN)입니다. 여기서는 my-fn."
   ],
   [
    "out.json",
    "필수 위치 인자(outfile): 함수의 응답 본문을 저장할 로컬 파일입니다. 화면에는 StatusCode 등 메타 정보만 출력됩니다."
   ]
  ],
  "order": "옵션과 출력 파일 위치는 자유입니다. `aws lambda invoke out.json --function-name my-fn` 도 동작합니다."
 },
 "aws-031": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "secretsmanager",
    "Secrets Manager 서비스 명령 묶음입니다."
   ],
   [
    "get-secret-value",
    "시크릿의 현재 값(SecretString 또는 SecretBinary)을 가져옵니다."
   ],
   [
    "--secret-id prod/db",
    "`--secret-id`: 시크릿 이름 또는 ARN 입니다. 여기서는 prod/db."
   ]
  ]
 },
 "aws-033": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ecs",
    "ECS(Elastic Container Service) 명령 묶음입니다."
   ],
   [
    "update-service",
    "서비스 설정을 변경하거나 재배포합니다."
   ],
   [
    "--cluster prod",
    "`--cluster`: 서비스가 속한 클러스터입니다. 여기서는 prod(생략하면 default 클러스터)."
   ],
   [
    "--service api",
    "`--service`: 대상 서비스 이름입니다. 여기서는 api."
   ],
   [
    "--force-new-deployment",
    "태스크 정의를 바꾸지 않고도 새 배포를 시작해 태스크를 모두 새로 띄웁니다."
   ]
  ],
  "order": "옵션 순서는 자유입니다. `--service api --cluster prod` 처럼 바꿔 써도 같습니다."
 },
 "aws-036": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "cloudformation",
    "CloudFormation 서비스 명령 묶음입니다."
   ],
   [
    "deploy",
    "change set 을 만들고 실행까지 한 번에 하는 고수준 명령입니다. 스택이 없으면 생성, 있으면 업데이트합니다."
   ],
   [
    "--stack-name my-stack",
    "`--stack-name`: 대상 스택 이름입니다. 여기서는 my-stack."
   ],
   [
    "--template-file template.yaml",
    "`--template-file`: 로컬 템플릿 파일 경로입니다. 여기서는 template.yaml."
   ]
  ],
  "order": "옵션 순서는 자유입니다. `--template-file` 을 먼저 써도 같습니다."
 },
 "aws-037": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "sts",
    "STS 서비스 명령 묶음입니다."
   ],
   [
    "assume-role",
    "역할을 맡아(assume) AccessKeyId, SecretAccessKey, SessionToken 으로 된 임시 자격 증명을 받습니다."
   ],
   [
    "--role-arn arn:aws:iam::123456789012:role/Admin",
    "`--role-arn`: 맡을 역할의 ARN 입니다. 계정 123456789012 의 Admin 역할."
   ],
   [
    "--role-session-name cli",
    "`--role-session-name`: 이 세션의 이름입니다. CloudTrail 과 assumed-role ARN 에 표시되어 누가 쓴 세션인지 구분합니다. 여기서는 cli."
   ]
  ],
  "order": "옵션 순서는 자유입니다. 두 옵션 모두 필수입니다."
 },
 "aws-039": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ec2",
    "EC2 서비스 명령 묶음입니다."
   ],
   [
    "describe-instances",
    "인스턴스 정보를 조회합니다."
   ],
   [
    "--filters Name=tag:Env,Values=prod",
    "`--filters`: 서버 쪽 필터입니다. `Name=tag:Env` 는 태그 키 Env, `Values=prod` 는 값이 prod 인 것만 고른다는 뜻입니다."
   ],
   [
    "--query \"Reservations[].Instances[].InstanceId\"",
    "`--query`: JMESPath 로 결과를 가공합니다. `[]` 는 목록을 평탄화해 모든 예약 안 모든 인스턴스의 InstanceId 만 뽑습니다. 셸의 글롭 해석을 막으려고 따옴표로 감쌉니다."
   ],
   [
    "--output text",
    "`--output`: 출력 형식입니다. text 는 JSON 기호 없이 값만 탭 구분으로 출력해 셸 변수·루프에 바로 쓸 수 있습니다."
   ]
  ],
  "order": "옵션 순서는 자유입니다. `--output text` 를 `--query` 앞에 써도 같습니다."
 },
 "aws-041": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3api",
    "S3 API 와 1:1 로 대응하는 저수준 명령 묶음입니다."
   ],
   [
    "put-bucket-versioning",
    "버킷의 버전 관리 설정을 변경합니다."
   ],
   [
    "--bucket my-bucket",
    "`--bucket`: 대상 버킷 이름입니다. 여기서는 my-bucket."
   ],
   [
    "--versioning-configuration Status=Enabled",
    "`--versioning-configuration`: 버전 관리 설정입니다. 단축 문법 `Status=Enabled` 로 활성화합니다(중지는 Suspended)."
   ]
  ],
  "order": "옵션 순서는 자유입니다. `--versioning-configuration` 을 먼저 써도 같습니다."
 },
 "aws-044": {
  "parts": [
   [
    "fields @timestamp, @message",
    "`fields`: 결과에 표시할 필드입니다. @timestamp(이벤트 시각)와 @message(원본 로그 메시지)."
   ],
   [
    "|",
    "파이프: 앞 단계 결과를 다음 명령으로 넘깁니다."
   ],
   [
    "filter @message like /ERROR/",
    "`filter ... like /정규식/`: @message 에 ERROR 가 포함된 이벤트만 남깁니다."
   ],
   [
    "|",
    "파이프: 다음 단계로 넘깁니다."
   ],
   [
    "sort @timestamp desc",
    "`sort ... desc`: 시각 기준 내림차순, 즉 최신 로그가 먼저 오게 정렬합니다."
   ],
   [
    "|",
    "파이프: 다음 단계로 넘깁니다."
   ],
   [
    "limit 20",
    "`limit`: 결과를 20건으로 제한합니다."
   ]
  ],
  "order": "명령은 파이프 순서대로 실행됩니다. `sort` 뒤에 `limit` 이 와야 최신 20건이 나옵니다. `limit` 을 먼저 두면 임의의 20건을 정렬하게 됩니다."
 },
 "aws-046": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ecr",
    "ECR(Elastic Container Registry) 명령 묶음입니다."
   ],
   [
    "get-login-password",
    "ECR 인증 토큰(12시간 유효)을 표준 출력으로 내보냅니다."
   ],
   [
    "--region ap-northeast-2",
    "`--region`: 전역 옵션으로 요청을 보낼 리전입니다. 레지스트리와 같은 서울 리전(ap-northeast-2)이어야 합니다."
   ],
   [
    "|",
    "파이프: 토큰을 다음 명령의 표준 입력으로 넘깁니다."
   ],
   [
    "docker login",
    "Docker 로 레지스트리에 로그인합니다."
   ],
   [
    "--username AWS",
    "`--username`: ECR 은 사용자명이 항상 AWS 입니다."
   ],
   [
    "--password-stdin",
    "비밀번호를 명령줄 대신 표준 입력에서 읽습니다. 셸 기록이나 프로세스 목록에 토큰이 남지 않습니다."
   ],
   [
    "123456789012.dkr.ecr.ap-northeast-2.amazonaws.com",
    "로그인할 레지스트리 주소입니다. `계정ID.dkr.ecr.리전.amazonaws.com` 형식입니다."
   ]
  ],
  "order": "파이프 앞(`aws ...`)과 뒤(`docker login ...`)의 순서는 바꿀 수 없습니다. `docker login` 의 옵션 순서는 자유지만 레지스트리 주소는 마지막에 두는 것이 관례입니다."
 },
 "aws-049": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "cloudformation",
    "CloudFormation 서비스 명령 묶음입니다."
   ],
   [
    "continue-update-rollback",
    "UPDATE_ROLLBACK_FAILED 상태인 스택의 롤백을 다시 시도해 UPDATE_ROLLBACK_COMPLETE 로 돌려 놓습니다."
   ],
   [
    "--stack-name my-stack",
    "`--stack-name`: 대상 스택 이름 또는 ID 입니다. 여기서는 my-stack."
   ]
  ]
 },
 "aws-052": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "cloudtrail",
    "CloudTrail 서비스 명령 묶음입니다."
   ],
   [
    "lookup-events",
    "현재 리전의 최근 90일 관리 이벤트(이벤트 기록)를 조회합니다."
   ],
   [
    "--lookup-attributes AttributeKey=Username,AttributeValue=deploy-bot",
    "`--lookup-attributes`: 조회 조건입니다. `AttributeKey=Username` 은 사용자 이름 기준, `AttributeValue=deploy-bot` 은 그 값입니다(조건은 한 번에 하나만 지정 가능)."
   ]
  ]
 },
 "aws-054": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "iam",
    "IAM 서비스 명령 묶음입니다."
   ],
   [
    "simulate-principal-policy",
    "지정한 주체(사용자·그룹·역할)에 연결된 정책으로 특정 작업이 허용되는지 시뮬레이션합니다. 실제 호출은 하지 않습니다."
   ],
   [
    "--policy-source-arn",
    "`--policy-source-arn`: 정책을 평가할 주체의 ARN 을 지정하는 옵션입니다."
   ],
   [
    "arn:aws:iam::123456789012:role/App",
    "평가 대상 역할 App 의 ARN 입니다."
   ],
   [
    "--action-names s3:GetObject",
    "`--action-names`: 시뮬레이션할 API 작업 목록입니다. 여기서는 s3:GetObject."
   ],
   [
    "--resource-arns",
    "`--resource-arns`: 작업 대상 리소스 ARN 목록을 지정하는 옵션입니다."
   ],
   [
    "arn:aws:s3:::my-bucket/*",
    "my-bucket 안의 모든 객체를 뜻하는 ARN 입니다. `*` 가 셸 글롭으로 해석되지 않도록(특히 zsh) 따옴표로 감싸는 것이 안전합니다."
   ]
  ],
  "order": "옵션 순서는 자유입니다. 각 옵션 바로 뒤에는 그 옵션의 값이 와야 합니다."
 },
 "aws-057": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3",
    "S3 고수준 명령 묶음입니다."
   ],
   [
    "ls",
    "버킷 목록을 나열합니다."
   ],
   [
    "--profile prod",
    "`--profile`: 전역 옵션으로, `~/.aws/config`·`~/.aws/credentials` 에 저장된 prod 프로파일의 자격 증명과 설정을 사용합니다."
   ]
  ],
  "order": "`--profile` 은 전역 옵션이라 `aws --profile prod s3 ls` 처럼 앞에 써도 같습니다."
 },
 "aws-058": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "s3",
    "S3 고수준 명령 묶음입니다."
   ],
   [
    "rm",
    "remove: S3 객체를 삭제합니다."
   ],
   [
    "s3://my-bucket/tmp/old.log",
    "삭제할 객체의 S3 경로입니다. my-bucket 버킷의 tmp/old.log."
   ]
  ]
 },
 "aws-061": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ec2",
    "EC2 서비스 명령 묶음입니다."
   ],
   [
    "start-instances",
    "중지된 인스턴스를 시작합니다."
   ],
   [
    "--instance-ids i-0abc123",
    "`--instance-ids`: 대상 인스턴스 ID 목록입니다. 여기서는 i-0abc123."
   ]
  ]
 },
 "aws-063": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "ec2",
    "VPC 관련 API 도 EC2 서비스 명령 묶음에 들어 있습니다."
   ],
   [
    "describe-vpcs",
    "현재(기본 또는 `--region` 지정) 리전의 VPC 목록과 CIDR, 기본 VPC 여부 등을 조회합니다."
   ]
  ]
 },
 "aws-066": {
  "parts": [
   [
    "aws",
    "aws: AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 명령(오퍼레이션)이 옵니다."
   ],
   [
    "logs",
    "CloudWatch Logs 서비스 명령 묶음입니다."
   ],
   [
    "describe-log-groups",
    "로그 그룹 목록(이름, 보존 기간, 저장 용량 등)을 조회합니다."
   ]
  ]
 },
 "aws-068": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "rds",
    "Amazon RDS(관계형 데이터베이스 서비스)를 다루는 서비스 명령입니다."
   ],
   [
    "describe-db-instances",
    "DB 인스턴스 목록과 각 인스턴스의 상태(`DBInstanceStatus`), 엔드포인트, 엔진 버전 등을 조회하는 작업입니다. 옵션이 없으면 현재 리전의 모든 인스턴스를 보여 줍니다."
   ]
  ]
 },
 "aws-071": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "Amazon EC2 서비스 명령입니다. 태그 작업도 EC2 네임스페이스에 있습니다."
   ],
   [
    "create-tags",
    "지정한 리소스에 태그를 추가(이미 있는 키면 값을 덮어씀)하는 작업입니다."
   ],
   [
    "--resources i-0abc123",
    "`--resources`: 태그를 붙일 리소스 ID 목록입니다. 공백으로 여러 개를 줄 수 있고, 여기서는 인스턴스 `i-0abc123` 하나입니다."
   ],
   [
    "--tags Key=Env,Value=prod",
    "`--tags`: 추가할 태그를 `Key=키,Value=값` 형식(단축 구문)으로 적습니다. 여기서는 키 `Env`, 값 `prod` 입니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ec2 create-tags --tags Key=Env,Value=prod --resources i-0abc123` 도 같습니다."
 },
 "aws-072": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "보안 그룹은 EC2 서비스에 속하므로 `ec2` 명령을 씁니다."
   ],
   [
    "authorize-security-group-ingress",
    "보안 그룹에 인바운드(들어오는) 허용 규칙을 추가하는 작업입니다. 반대로 제거는 `revoke-security-group-ingress` 입니다."
   ],
   [
    "--group-id sg-0abc123",
    "`--group-id`: 규칙을 추가할 보안 그룹 ID 입니다. 여기서는 `sg-0abc123`."
   ],
   [
    "--protocol tcp",
    "`--protocol`: 허용할 프로토콜입니다. SSH 는 TCP 이므로 `tcp`."
   ],
   [
    "--port 22",
    "`--port`: 허용할 포트(또는 `1000-2000` 같은 범위)입니다. 여기서는 SSH 포트 22."
   ],
   [
    "--cidr 203.0.113.5/32",
    "`--cidr`: 트래픽을 허용할 출발지 IP 범위입니다. `/32` 는 IP 한 개만 뜻하므로 사무실 IP `203.0.113.5` 하나만 허용합니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
 },
 "aws-074": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ecs",
    "Amazon ECS(Elastic Container Service) 서비스 명령입니다."
   ],
   [
    "update-service",
    "기존 ECS 서비스의 설정(원하는 태스크 수, 태스크 정의 등)을 변경하는 작업입니다."
   ],
   [
    "--cluster prod",
    "`--cluster`: 서비스가 속한 클러스터 이름입니다. 여기서는 `prod`. 생략하면 `default` 클러스터를 대상으로 합니다."
   ],
   [
    "--service api",
    "`--service`: 변경할 서비스 이름입니다. 여기서는 `api`."
   ],
   [
    "--desired-count 4",
    "`--desired-count`: 서비스가 유지할 태스크 개수입니다. 여기서는 4개로 맞춥니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ecs update-service --service api --cluster prod --desired-count 4` 도 같습니다."
 },
 "aws-076": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "lambda",
    "AWS Lambda 서비스 명령입니다."
   ],
   [
    "update-function-code",
    "이미 존재하는 Lambda 함수의 코드(배포 패키지)만 교체하는 작업입니다. 메모리·환경변수 같은 설정은 `update-function-configuration` 으로 바꿉니다."
   ],
   [
    "--function-name my-fn",
    "`--function-name`: 코드를 바꿀 함수 이름(또는 ARN)입니다. 여기서는 `my-fn`."
   ],
   [
    "--zip-file fileb://fn.zip",
    "`--zip-file`: 업로드할 zip 배포 패키지입니다. `fileb://` 는 로컬 파일을 바이너리(b=binary) 그대로 읽으라는 접두사이며, 여기서는 현재 디렉터리의 `fn.zip` 입니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws lambda update-function-code --zip-file fileb://fn.zip --function-name my-fn` 도 같습니다."
 },
 "aws-078": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ssm",
    "AWS Systems Manager(SSM) 서비스 명령입니다. Parameter Store 가 여기에 속합니다."
   ],
   [
    "get-parameter",
    "파라미터 하나의 값을 조회하는 작업입니다."
   ],
   [
    "--name /prod/db/password",
    "`--name`: 조회할 파라미터 이름(계층 경로)입니다. 여기서는 `/prod/db/password`."
   ],
   [
    "--with-decryption",
    "`--with-decryption`: SecureString 값을 KMS 로 복호화해 평문으로 받습니다. 없으면 암호문이 반환됩니다."
   ],
   [
    "--query Parameter.Value",
    "`--query`: 응답 JSON 에서 원하는 부분만 JMESPath 식으로 골라냅니다. 여기서는 `Parameter` 객체의 `Value`(실제 값)만 뽑습니다."
   ],
   [
    "--output text",
    "`--output`: 출력 형식을 정합니다. `text` 는 JSON 괄호·따옴표 없이 값만 탭으로 구분해 출력하므로 스크립트나 사람이 읽기 좋습니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ssm get-parameter --name /prod/db/password --with-decryption --output text --query Parameter.Value` 도 같습니다."
 },
 "aws-080": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "cloudfront",
    "Amazon CloudFront(CDN) 서비스 명령입니다."
   ],
   [
    "create-invalidation",
    "엣지 캐시에 저장된 객체를 무효화(삭제)해 다음 요청 때 오리진에서 새로 가져오게 하는 작업입니다."
   ],
   [
    "--distribution-id E1ABC",
    "`--distribution-id`: 무효화할 CloudFront 배포 ID 입니다. 여기서는 `E1ABC`."
   ],
   [
    "--paths \"/*\"",
    "`--paths`: 무효화할 경로 목록입니다. `/*` 는 모든 경로를 뜻하며, 셸이 `/*` 를 루트 디렉터리 파일 목록으로 확장하지 않도록 따옴표로 감쌉니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws cloudfront create-invalidation --paths \"/*\" --distribution-id E1ABC` 도 같습니다."
 },
 "aws-082": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "dynamodb",
    "Amazon DynamoDB 서비스 명령입니다."
   ],
   [
    "get-item",
    "기본 키로 항목 하나를 조회하는 작업입니다."
   ],
   [
    "--table-name Users",
    "`--table-name`: 조회할 테이블 이름입니다. 여기서는 `Users`."
   ],
   [
    "--key '{\"userId\":{\"S\":\"u123\"}}'",
    "`--key`: 찾을 항목의 기본 키를 DynamoDB JSON 으로 적습니다. `\"S\"` 는 문자열(String) 타입 표기이고, 값은 `u123` 입니다. JSON 안의 큰따옴표가 셸에서 깨지지 않도록 전체를 작은따옴표로 감쌉니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws dynamodb get-item --key '{\"userId\":{\"S\":\"u123\"}}' --table-name Users` 도 같습니다."
 },
 "aws-084": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "iam",
    "AWS IAM(Identity and Access Management) 서비스 명령입니다."
   ],
   [
    "generate-credential-report",
    "계정의 자격 증명 보고서(CSV) 생성을 요청하는 작업입니다. 생성이 끝나면 `get-credential-report` 로 내려받습니다."
   ]
  ]
 },
 "aws-085": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "eks",
    "Amazon EKS(Elastic Kubernetes Service) 서비스 명령입니다."
   ],
   [
    "update-kubeconfig",
    "EKS 클러스터 접속 정보(엔드포인트, CA, 인증 방식)를 kubeconfig 파일(기본 `~/.kube/config`)에 추가·갱신하는 작업입니다."
   ],
   [
    "--name my-cluster",
    "`--name`: 대상 EKS 클러스터 이름입니다. 여기서는 `my-cluster`."
   ],
   [
    "--region ap-northeast-2",
    "`--region`: 클러스터가 있는 리전입니다. 여기서는 서울 리전 `ap-northeast-2`. 생략하면 설정 파일의 기본 리전을 씁니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws eks update-kubeconfig --region ap-northeast-2 --name my-cluster` 도 같습니다."
 },
 "aws-086": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "Amazon EC2 서비스 명령입니다."
   ],
   [
    "get-console-output",
    "인스턴스의 직렬 콘솔 출력(부팅 메시지, 커널 로그 등)을 가져오는 작업입니다. CLI 가 base64 디코딩까지 해 줍니다."
   ],
   [
    "--instance-id i-0abc123",
    "`--instance-id`: 콘솔 출력을 볼 인스턴스 ID 입니다. 여기서는 `i-0abc123`."
   ]
  ]
 },
 "aws-088": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "s3api",
    "S3 의 저수준 API 를 그대로 호출하는 명령 그룹입니다. 버킷 설정 작업은 `s3` 가 아니라 `s3api` 에 있습니다."
   ],
   [
    "put-bucket-lifecycle-configuration",
    "버킷의 수명 주기(Lifecycle) 규칙을 설정하는 작업입니다. 기존 규칙 전체를 새 내용으로 교체합니다."
   ],
   [
    "--bucket my-bucket",
    "`--bucket`: 규칙을 적용할 버킷 이름입니다. 여기서는 `my-bucket`."
   ],
   [
    "--lifecycle-configuration file://lc.json",
    "`--lifecycle-configuration`: 수명 주기 규칙 JSON 입니다. `file://` 접두사는 값을 로컬 파일 `lc.json` 의 내용으로 읽으라는 뜻입니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws s3api put-bucket-lifecycle-configuration --lifecycle-configuration file://lc.json --bucket my-bucket` 도 같습니다."
 },
 "aws-090": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "Amazon EC2 서비스 명령입니다."
   ],
   [
    "modify-instance-metadata-options",
    "인스턴스 메타데이터 서비스(IMDS) 설정을 변경하는 작업입니다. 인스턴스 실행 중에도 적용됩니다."
   ],
   [
    "--instance-id i-0abc123",
    "`--instance-id`: 설정을 바꿀 인스턴스 ID 입니다. 여기서는 `i-0abc123`."
   ],
   [
    "--http-tokens required",
    "`--http-tokens`: 메타데이터 요청에 세션 토큰을 요구할지 정합니다. `required` 는 토큰 필수, 즉 IMDSv2 만 허용하고 IMDSv1 을 막습니다(`optional` 이면 v1 도 허용)."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ec2 modify-instance-metadata-options --http-tokens required --instance-id i-0abc123` 도 같습니다."
 },
 "aws-092": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ecs",
    "Amazon ECS 서비스 명령입니다."
   ],
   [
    "describe-services",
    "ECS 서비스의 상세 정보(최근 이벤트 `events`, 배포 상태 `deployments`, 실행/대기 태스크 수 등)를 조회하는 작업입니다."
   ],
   [
    "--cluster prod",
    "`--cluster`: 서비스가 속한 클러스터 이름입니다. 여기서는 `prod`."
   ],
   [
    "--services api",
    "`--services`: 조회할 서비스 이름 목록입니다(복수형 옵션이라 여러 개를 공백으로 나열 가능). 여기서는 `api` 하나."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ecs describe-services --services api --cluster prod` 도 같습니다."
 },
 "aws-094": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "autoscaling",
    "EC2 Auto Scaling 서비스 명령입니다."
   ],
   [
    "set-desired-capacity",
    "Auto Scaling 그룹의 원하는 용량(유지할 인스턴스 수)만 즉시 바꾸는 작업입니다. 값은 그룹의 min~max 범위 안이어야 합니다."
   ],
   [
    "--auto-scaling-group-name web-asg",
    "`--auto-scaling-group-name`: 대상 Auto Scaling 그룹 이름입니다. 여기서는 `web-asg`."
   ],
   [
    "--desired-capacity 6",
    "`--desired-capacity`: 새로 지정할 원하는 인스턴스 수입니다. 여기서는 6대."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws autoscaling set-desired-capacity --desired-capacity 6 --auto-scaling-group-name web-asg` 도 같습니다."
 },
 "aws-096": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "EBS 볼륨은 EC2 서비스에서 관리하므로 `ec2` 명령을 씁니다."
   ],
   [
    "describe-volumes",
    "EBS 볼륨 목록과 상세 정보를 조회하는 작업입니다."
   ],
   [
    "--filters Name=status,Values=available",
    "`--filters`: 서버 측 필터입니다. `status` 가 `available`(어떤 인스턴스에도 연결되지 않은 상태)인 볼륨만 가져옵니다."
   ],
   [
    "--query \"Volumes[].VolumeId\"",
    "`--query`: JMESPath 식으로 결과를 가공합니다. `Volumes[]` 배열의 각 항목에서 `VolumeId` 만 뽑아 ID 목록만 남깁니다. 셸이 대괄호를 해석하지 않도록 따옴표로 감쌉니다."
   ],
   [
    "--output text",
    "`--output`: `text` 형식으로 출력해 ID 들이 따옴표·괄호 없이 탭으로 구분되어 나옵니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ec2 describe-volumes --filters Name=status,Values=available --output text --query \"Volumes[].VolumeId\"` 도 같습니다."
 },
 "aws-098": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "route53",
    "Amazon Route 53(DNS) 서비스 명령입니다."
   ],
   [
    "list-resource-record-sets",
    "호스팅 존에 있는 DNS 레코드(A, CNAME, MX 등) 목록을 조회하는 작업입니다."
   ],
   [
    "--hosted-zone-id Z123",
    "`--hosted-zone-id`: 레코드를 조회할 호스팅 존 ID 입니다. 여기서는 `Z123`."
   ]
  ]
 },
 "aws-100": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "cloudtrail",
    "AWS CloudTrail(API 호출 기록) 서비스 명령입니다."
   ],
   [
    "lookup-events",
    "최근 90일의 관리 이벤트(API 호출 기록)를 검색하는 작업입니다."
   ],
   [
    "--lookup-attributes AttributeKey=EventName,AttributeValue=DeleteBucket",
    "`--lookup-attributes`: 검색 조건입니다. `AttributeKey=EventName` 은 API 이름으로 찾겠다는 뜻이고, `AttributeValue=DeleteBucket` 은 버킷 삭제 호출만 고르라는 뜻입니다."
   ]
  ]
 },
 "aws-102": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "s3api",
    "S3 저수준 API 명령 그룹입니다. 버킷 정책 같은 버킷 설정은 `s3api` 로 다룹니다."
   ],
   [
    "get-bucket-policy",
    "버킷에 연결된 버킷 정책(JSON 문자열)을 조회하는 작업입니다. 정책이 없으면 `NoSuchBucketPolicy` 오류가 납니다."
   ],
   [
    "--bucket my-bucket",
    "`--bucket`: 정책을 조회할 버킷 이름입니다. 여기서는 `my-bucket`."
   ]
  ]
 },
 "aws-104": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "Reachability Analyzer 는 EC2(VPC) 네임스페이스에 속하므로 `ec2` 명령을 씁니다."
   ],
   [
    "create-network-insights-path",
    "Reachability Analyzer 가 분석할 경로(출발지·목적지·프로토콜·포트)를 정의해 생성하는 작업입니다. 실제 분석은 이후 `start-network-insights-analysis` 로 시작합니다."
   ],
   [
    "--source i-0src",
    "`--source`: 경로의 출발지 리소스 ID 입니다. 여기서는 인스턴스 `i-0src`."
   ],
   [
    "--destination eni-0abc",
    "`--destination`: 경로의 목적지 리소스 ID 입니다. 여기서는 네트워크 인터페이스(ENI) `eni-0abc`."
   ],
   [
    "--protocol tcp",
    "`--protocol`: 분석할 프로토콜입니다(`tcp` 또는 `udp`). 여기서는 `tcp`."
   ],
   [
    "--destination-port 5432",
    "`--destination-port`: 목적지 포트입니다. 여기서는 PostgreSQL 기본 포트 5432."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
 },
 "aws-106": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "s3api",
    "S3 저수준 API 명령 그룹입니다. 버전 목록 조회는 `s3` 가 아니라 `s3api` 에 있습니다."
   ],
   [
    "list-object-versions",
    "버킷의 모든 객체 버전(`Versions`)과 삭제 마커(`DeleteMarkers`)를 함께 조회하는 작업입니다."
   ],
   [
    "--bucket my-bucket",
    "`--bucket`: 조회할 버킷 이름입니다. 여기서는 `my-bucket`."
   ]
  ]
 },
 "aws-117": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "EBS 스냅샷은 EC2 서비스에서 관리하므로 `ec2` 명령을 씁니다."
   ],
   [
    "create-snapshot",
    "지정한 EBS 볼륨의 특정 시점 스냅샷(증분 백업)을 만드는 작업입니다."
   ],
   [
    "--volume-id vol-0def456",
    "`--volume-id`: 스냅샷을 뜰 볼륨 ID 입니다. 인스턴스 ID 가 아니라 볼륨 ID `vol-0def456` 을 줍니다."
   ]
  ]
 },
 "aws-118": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "EBS 볼륨은 EC2 서비스에서 관리하므로 `ec2` 명령을 씁니다."
   ],
   [
    "modify-volume",
    "EBS 볼륨의 크기·타입·IOPS·처리량을 온라인으로 변경하는 작업입니다(Elastic Volumes)."
   ],
   [
    "--volume-id vol-0def456",
    "`--volume-id`: 변경할 볼륨 ID 입니다. 여기서는 `vol-0def456`."
   ],
   [
    "--size 200",
    "`--size`: 새 볼륨 크기로, 단위는 GiB 입니다. 여기서는 200GiB. 기존보다 크게만 바꿀 수 있습니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
 },
 "aws-119": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "Amazon EC2 서비스 명령입니다."
   ],
   [
    "describe-instance-status",
    "인스턴스의 상태 검사 결과(`SystemStatus`, `InstanceStatus`)와 예정된 이벤트를 조회하는 작업입니다. 기본적으로 running 상태 인스턴스만 나옵니다."
   ],
   [
    "--instance-ids i-0abc123",
    "`--instance-ids`: 조회할 인스턴스 ID 목록입니다(복수형이라 여러 개 가능). 여기서는 `i-0abc123`."
   ]
  ]
 },
 "aws-120": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "Amazon EC2 서비스 명령입니다."
   ],
   [
    "get-console-output",
    "인스턴스의 직렬 콘솔 출력(부팅 로그)을 가져오는 작업입니다. API 응답의 base64 는 CLI 가 자동으로 디코딩합니다."
   ],
   [
    "--instance-id i-0abc123",
    "`--instance-id`: 콘솔 출력을 볼 인스턴스 ID 입니다. 여기서는 `i-0abc123`."
   ],
   [
    "--output text",
    "`--output`: `text` 형식으로 출력하면 로그의 줄바꿈이 `\\n` 이스케이프 없이 실제 줄바꿈으로 보여 읽기 쉽습니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ec2 get-console-output --output text --instance-id i-0abc123` 도 같습니다."
 },
 "aws-121": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "s3",
    "S3 의 고수준(파일 시스템처럼 쓰는) 명령 그룹입니다."
   ],
   [
    "ls",
    "버킷 또는 prefix(폴더처럼 보이는 경로) 아래의 객체 목록을 보여 줍니다."
   ],
   [
    "s3://my-bucket/logs/",
    "조회 대상 경로입니다. 버킷 `my-bucket` 의 `logs/` prefix 아래를 봅니다."
   ],
   [
    "--recursive",
    "`--recursive`: 한 단계만이 아니라 하위 prefix 전체의 객체를 모두 나열합니다."
   ],
   [
    "--human-readable",
    "`--human-readable`: 크기를 바이트 대신 KiB, MiB, GiB 같은 단위로 보여 줍니다."
   ]
  ],
  "order": "`aws s3 ls` 뒤의 경로와 옵션은 순서가 자유입니다. 예: `aws s3 ls --recursive --human-readable s3://my-bucket/logs/` 도 같습니다."
 },
 "aws-122": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "s3api",
    "S3 저수준 API 명령 그룹입니다. 버킷 설정 변경은 `s3api` 로 합니다."
   ],
   [
    "put-public-access-block",
    "버킷 단위의 퍼블릭 액세스 차단(Block Public Access) 설정을 적용하는 작업입니다."
   ],
   [
    "--bucket my-bucket",
    "`--bucket`: 설정할 버킷 이름입니다. 여기서는 `my-bucket`."
   ],
   [
    "--public-access-block-configuration",
    "`--public-access-block-configuration`: 네 가지 차단 설정을 `키=값` 쉼표 목록(단축 구문)으로 받습니다. 아래 네 값을 모두 true 로 줍니다."
   ],
   [
    "BlockPublicAcls=true,",
    "`BlockPublicAcls`: 퍼블릭 ACL 을 새로 붙이는 요청을 거부합니다."
   ],
   [
    "IgnorePublicAcls=true,",
    "`IgnorePublicAcls`: 이미 붙어 있는 퍼블릭 ACL 을 무시(효력 없음)합니다."
   ],
   [
    "BlockPublicPolicy=true,",
    "`BlockPublicPolicy`: 퍼블릭 접근을 허용하는 버킷 정책을 설정하지 못하게 거부합니다."
   ],
   [
    "RestrictPublicBuckets=true",
    "`RestrictPublicBuckets`: 퍼블릭 정책이 있는 버킷이라도 AWS 서비스 주체와 버킷 소유 계정 사용자 외의 접근을 막습니다."
   ]
  ],
  "order": "옵션(`--bucket`, `--public-access-block-configuration`) 순서는 자유입니다. 네 `키=값` 쌍의 순서도 바꿔도 되지만, 쌍 사이는 공백 없이 쉼표(`,`)로만 이어야 합니다(각 조각 끝의 쉼표가 구분자입니다)."
 },
 "aws-123": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "s3api",
    "S3 저수준 API 명령 그룹입니다."
   ],
   [
    "list-object-versions",
    "객체의 모든 버전과 삭제 마커를 버전 ID 와 함께 조회하는 작업입니다."
   ],
   [
    "--bucket my-bucket",
    "`--bucket`: 조회할 버킷 이름입니다. 여기서는 `my-bucket`."
   ],
   [
    "--prefix report.pdf",
    "`--prefix`: 이 문자열로 시작하는 키만 조회합니다. 여기서는 `report.pdf` 의 버전과 삭제 마커만 좁혀 봅니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws s3api list-object-versions --prefix report.pdf --bucket my-bucket` 도 같습니다."
 },
 "aws-124": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "iam",
    "AWS IAM 서비스 명령입니다."
   ],
   [
    "attach-role-policy",
    "관리형 정책(AWS 관리형 또는 고객 관리형)을 IAM 역할에 연결하는 작업입니다."
   ],
   [
    "--role-name AppRole",
    "`--role-name`: 정책을 연결할 역할 이름입니다. 여기서는 `AppRole`."
   ],
   [
    "--policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
    "`--policy-arn`: 연결할 정책의 ARN 입니다. 계정 ID 자리에 `aws` 가 들어간 것이 AWS 관리형 정책이라는 표시이며, 정책 이름은 `AmazonS3ReadOnlyAccess`."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
 },
 "aws-125": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "iam",
    "AWS IAM 서비스 명령입니다."
   ],
   [
    "list-access-keys",
    "IAM 사용자의 액세스 키 목록(키 ID, 상태 Active/Inactive, 생성일 `CreateDate`)을 조회하는 작업입니다."
   ],
   [
    "--user-name deploy-bot",
    "`--user-name`: 키를 조회할 IAM 사용자 이름입니다. 여기서는 `deploy-bot`. 생략하면 호출한 사용자 자신의 키를 봅니다."
   ]
  ]
 },
 "aws-126": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "보안 그룹은 EC2 서비스에 속하므로 `ec2` 명령을 씁니다."
   ],
   [
    "revoke-security-group-ingress",
    "보안 그룹에서 인바운드 규칙을 제거하는 작업입니다. 추가할 때(`authorize-...`)와 같은 인자를 줍니다."
   ],
   [
    "--group-id sg-0abc123",
    "`--group-id`: 규칙을 제거할 보안 그룹 ID 입니다. 여기서는 `sg-0abc123`."
   ],
   [
    "--protocol tcp",
    "`--protocol`: 제거할 규칙의 프로토콜입니다. SSH 이므로 `tcp`."
   ],
   [
    "--port 22",
    "`--port`: 제거할 규칙의 포트입니다. 여기서는 22."
   ],
   [
    "--cidr 0.0.0.0/0",
    "`--cidr`: 제거할 규칙의 출발지 범위입니다. `0.0.0.0/0` 은 모든 IPv4 주소(전 세계)를 뜻합니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
 },
 "aws-127": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "라우트 테이블은 VPC 기능이며 EC2 네임스페이스에 속하므로 `ec2` 명령을 씁니다."
   ],
   [
    "describe-route-tables",
    "라우트 테이블 목록과 각 테이블의 라우트, 서브넷 연결 정보를 조회하는 작업입니다."
   ],
   [
    "--filters Name=vpc-id,Values=vpc-0abc123",
    "`--filters`: 서버 측 필터입니다. `vpc-id` 가 `vpc-0abc123` 인 라우트 테이블만 가져옵니다."
   ]
  ]
 },
 "aws-128": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "ec2",
    "VPC 흐름 로그는 EC2 네임스페이스에 속하므로 `ec2` 명령을 씁니다."
   ],
   [
    "create-flow-logs",
    "VPC·서브넷·ENI 에 흐름 로그를 생성하는 작업입니다."
   ],
   [
    "--resource-type VPC",
    "`--resource-type`: 흐름 로그를 붙일 리소스 종류입니다. 여기서는 `VPC` 전체."
   ],
   [
    "--resource-ids vpc-0abc123",
    "`--resource-ids`: 대상 리소스 ID 입니다. 여기서는 `vpc-0abc123`."
   ],
   [
    "--traffic-type ALL",
    "`--traffic-type`: 기록할 트래픽 종류입니다(`ACCEPT`, `REJECT`, `ALL`). 여기서는 허용·거부 모두 기록합니다."
   ],
   [
    "--log-group-name vpc-flow",
    "`--log-group-name`: 로그를 보낼 CloudWatch Logs 로그 그룹 이름입니다. 여기서는 `vpc-flow`."
   ],
   [
    "--deliver-logs-permission-arn arn:aws:iam::123456789012:role/FlowLogRole",
    "`--deliver-logs-permission-arn`: 흐름 로그 서비스가 CloudWatch Logs 에 쓸 때 맡을 IAM 역할 ARN 입니다. 여기서는 `FlowLogRole`."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
 },
 "aws-129": {
  "parts": [
   [
    "aws",
    "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
   ],
   [
    "cloudwatch",
    "Amazon CloudWatch(지표·알람) 서비스 명령입니다."
   ],
   [
    "get-metric-statistics",
    "한 지표의 통계값(평균, 최대 등)을 기간 단위로 집계해 조회하는 작업입니다."
   ],
   [
    "--namespace AWS/EC2",
    "`--namespace`: 지표가 속한 네임스페이스입니다. EC2 기본 지표는 `AWS/EC2`."
   ],
   [
    "--metric-name CPUUtilization",
    "`--metric-name`: 조회할 지표 이름입니다. CPU 사용률은 `CPUUtilization`."
   ],
   [
    "--dimensions Name=InstanceId,Value=i-0abc123",
    "`--dimensions`: 지표를 구분하는 차원입니다. `InstanceId` 가 `i-0abc123` 인 인스턴스의 지표만 봅니다."
   ],
   [
    "--statistics Average",
    "`--statistics`: 계산할 통계 종류입니다. 여기서는 평균(`Average`)."
   ],
   [
    "--period 300",
    "`--period`: 집계 단위(초)입니다. 300초 = 5분 단위."
   ],
   [
    "--start-time 2024-06-01T09:00:00Z",
    "`--start-time`: 조회 시작 시각(ISO 8601, `Z` 는 UTC)입니다."
   ],
   [
    "--end-time 2024-06-01T10:00:00Z",
    "`--end-time`: 조회 종료 시각입니다. 시작과 합쳐 1시간 구간이 됩니다."
   ]
  ],
  "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
 },
 "aws-130": {
  "parts": [
   [
    "export",
    "셸 변수를 환경변수로 내보내 이후 실행하는 `aws` 같은 하위 프로세스가 볼 수 있게 하는 bash/zsh 내장 명령입니다."
   ],
   [
    "AWS_PROFILE=prod",
    "`AWS_PROFILE`: AWS CLI·SDK 가 사용할 기본 프로파일 이름을 지정하는 환경변수입니다. 여기서는 `prod`. `=` 양옆에 공백이 없어야 합니다."
   ]
  ]
 },
 "aws-109": {
  "steps": [
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "sts",
      "AWS STS(Security Token Service) 서비스 명령입니다."
     ],
     [
      "get-caller-identity",
      "지금 사용 중인 자격 증명의 계정 ID, 사용자/역할 ARN, UserId 를 보여 주는 작업입니다. 별도 권한 없이 항상 호출할 수 있습니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "ec2",
      "Amazon EC2 서비스 명령입니다."
     ],
     [
      "describe-instances",
      "EC2 인스턴스 목록과 상세 정보(상태, IP, 타입 등)를 조회하는 작업입니다. 필터가 없으면 모든 상태의 인스턴스가 나옵니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "ec2",
      "Amazon EC2 서비스 명령입니다."
     ],
     [
      "describe-instance-status",
      "인스턴스 상태(`InstanceState`)와 상태 검사 결과를 조회하는 작업입니다."
     ],
     [
      "--instance-ids i-0abc123",
      "`--instance-ids`: 조회할 인스턴스 ID 목록입니다. 여기서는 `i-0abc123`."
     ]
    ]
   }
  ]
 },
 "aws-110": {
  "steps": [
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "s3",
      "S3 고수준 명령 그룹입니다."
     ],
     [
      "ls",
      "경로 인자 없이 쓰면 내 계정의 버킷 목록(생성일, 이름)을 보여 줍니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "s3",
      "S3 고수준 명령 그룹입니다."
     ],
     [
      "sync",
      "원본과 대상을 비교해 새로 생겼거나 바뀐 파일만 복사하는 작업입니다."
     ],
     [
      "build/",
      "원본(source) 경로입니다. 로컬의 `build` 디렉터리 내용을 올립니다."
     ],
     [
      "s3://my-assets",
      "대상(destination) 경로입니다. 버킷 `my-assets` 의 최상위로 올립니다."
     ]
    ],
    "order": "`sync` 는 원본이 먼저, 대상이 뒤에 옵니다. 순서를 바꾸면 버킷에서 로컬로 내려받는 반대 방향 동기화가 됩니다."
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "s3",
      "S3 고수준 명령 그룹입니다."
     ],
     [
      "ls",
      "지정한 버킷(또는 prefix)의 객체 목록을 보여 줍니다."
     ],
     [
      "s3://my-assets",
      "조회할 버킷 경로입니다. 여기서는 `my-assets`."
     ],
     [
      "--human-readable",
      "`--human-readable`: 크기를 KiB, MiB 같은 사람이 읽기 좋은 단위로 표시합니다."
     ]
    ],
    "order": "경로와 옵션의 순서는 자유입니다. `aws s3 ls --human-readable s3://my-assets` 도 같습니다."
   }
  ]
 },
 "aws-111": {
  "steps": [
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "sts",
      "AWS STS 서비스 명령입니다."
     ],
     [
      "assume-role",
      "역할을 맡아(위임받아) 만료 시간이 있는 임시 자격 증명(AccessKeyId, SecretAccessKey, SessionToken)을 발급받는 작업입니다. 결과를 출력만 할 뿐 현재 셸의 자격 증명을 바꾸지는 않습니다."
     ],
     [
      "--role-arn arn:aws:iam::123456789012:role/ReadOnly",
      "`--role-arn`: 맡을 역할의 ARN 입니다. 계정 `123456789012` 의 `ReadOnly` 역할."
     ],
     [
      "--role-session-name audit",
      "`--role-session-name`: 이 세션을 식별하는 이름입니다. CloudTrail 기록과 assumed-role ARN 에 `audit` 로 남습니다."
     ]
    ],
    "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다."
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "sts",
      "AWS STS 서비스 명령입니다."
     ],
     [
      "get-caller-identity",
      "현재 적용된 자격 증명이 어떤 계정·주체인지 보여 줍니다. 역할로 바뀌었다면 ARN 이 `assumed-role/ReadOnly/audit` 형태로 나옵니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "logs",
      "Amazon CloudWatch Logs 서비스 명령입니다."
     ],
     [
      "describe-log-groups",
      "로그 그룹 목록(이름, 보존 기간, 저장 용량 등)을 조회하는 작업입니다."
     ]
    ]
   }
  ]
 },
 "aws-112": {
  "steps": [
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "ec2",
      "탄력적 IP 는 EC2 서비스에서 관리하므로 `ec2` 명령을 씁니다."
     ],
     [
      "describe-addresses",
      "탄력적 IP 목록을 조회하는 작업입니다. `AssociationId`/`InstanceId` 가 없는 항목이 어디에도 연결되지 않은 IP 입니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "ec2",
      "EBS 볼륨은 EC2 서비스에서 관리합니다."
     ],
     [
      "describe-volumes",
      "EBS 볼륨 목록을 조회하는 작업입니다."
     ],
     [
      "--filters Name=status,Values=available",
      "`--filters`: `status` 가 `available`(미연결)인 볼륨만 가져오는 서버 측 필터입니다."
     ]
    ]
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "ec2",
      "EBS 스냅샷은 EC2 서비스에서 관리합니다."
     ],
     [
      "describe-snapshots",
      "EBS 스냅샷 목록(생성 시각 `StartTime`, 원본 볼륨 등)을 조회하는 작업입니다."
     ],
     [
      "--owner-ids self",
      "`--owner-ids`: 스냅샷 소유자 계정입니다. `self` 는 내 계정을 뜻하며, 없으면 공유·퍼블릭 스냅샷까지 대량으로 섞여 나옵니다."
     ]
    ]
   }
  ]
 },
 "aws-131": {
  "steps": [
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "ec2",
      "EBS 볼륨은 EC2 서비스에서 관리합니다."
     ],
     [
      "modify-volume",
      "EBS 볼륨의 크기 등을 온라인으로 변경하는 작업입니다."
     ],
     [
      "--volume-id vol-0def456",
      "`--volume-id`: 변경할 볼륨 ID 입니다. 여기서는 루트 볼륨 `vol-0def456`."
     ],
     [
      "--size 50",
      "`--size`: 새 볼륨 크기로, 단위는 GiB 입니다. 여기서는 50GiB 로 늘립니다. 기존 크기보다 크게만 바꿀 수 있습니다."
     ]
    ],
    "order": "`aws <서비스> <작업>` 순서는 고정이고, 그 뒤의 옵션(`--...`)은 순서가 자유입니다. 각 옵션의 값은 그 옵션 바로 뒤에 붙어 있어야 합니다. 예: `aws ec2 modify-volume --size 50 --volume-id vol-0def456` 도 같습니다."
   },
   {
    "parts": [
     [
      "aws",
      "AWS CLI 실행 파일입니다. 뒤에 서비스 이름과 작업(서브커맨드)을 차례로 적습니다."
     ],
     [
      "ec2",
      "EBS 볼륨은 EC2 서비스에서 관리합니다."
     ],
     [
      "describe-volumes-modifications",
      "볼륨 수정 작업의 진행 상태(`ModificationState`: modifying → optimizing → completed)와 진행률을 조회하는 작업입니다."
     ],
     [
      "--volume-ids vol-0def456",
      "`--volume-ids`: 상태를 볼 볼륨 ID 목록입니다. 여기서는 `vol-0def456`."
     ]
    ]
   },
   {
    "parts": [
     [
      "growpart",
      "파티션을 디스크의 남은 공간 끝까지 늘려 주는 도구(cloud-utils)입니다. 파일시스템은 건드리지 않습니다."
     ],
     [
      "/dev/nvme0n1",
      "파티션이 들어 있는 디스크 장치입니다(파티션 `p1` 이 아니라 디스크 자체)."
     ],
     [
      "1",
      "늘릴 파티션 번호입니다. 1번 파티션(`/dev/nvme0n1p1`)."
     ]
    ],
    "order": "디스크 장치가 먼저, 파티션 번호가 뒤에 오며 둘 사이는 공백으로 띄웁니다. `/dev/nvme0n1p1` 처럼 붙여 쓰면 안 됩니다."
   },
   {
    "parts": [
     [
      "resize2fs",
      "ext2/3/4 파일시스템 크기를 조정하는 명령입니다. 크기를 생략하면 파티션 크기만큼 늘리며, 마운트된 상태에서도 확장할 수 있습니다."
     ],
     [
      "/dev/nvme0n1p1",
      "확장할 파일시스템이 있는 파티션 장치입니다(디스크가 아니라 파티션)."
     ]
    ]
   }
  ]
 }
});
