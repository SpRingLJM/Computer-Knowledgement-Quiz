window.QUIZ_BANK.aws.push(
  /* ---------------- 과제형 ---------------- */
  { diff: 'normal', type: 'task', q: '새 EC2 인스턴스에 접속하기 전, CLI 로 기본 정보를 확인하세요.',
    scene: '# 상황: 방금 생성한 인스턴스의 상태와 접속 주소를 확인해야 합니다.',
    steps: [
      { hint: '# 1. 현재 CLI 자격 증명이 어떤 계정·사용자인지 확인', answer: 'aws sts get-caller-identity', accept: ['aws sts get-caller-identity --output json'] },
      { hint: '# 2. 실행 중인 EC2 인스턴스 목록 조회', answer: 'aws ec2 describe-instances', accept: ['aws ec2 describe-instances --filters Name=instance-state-name,Values=running'] },
      { hint: '# 3. 인스턴스 i-0abc123 의 상태만 조회', answer: 'aws ec2 describe-instance-status --instance-ids i-0abc123', accept: ['aws ec2 describe-instance-status --instance-id i-0abc123'] },
    ],
    explain: '작업 전 `get-caller-identity` 로 어느 계정에 붙어 있는지 확인하는 습관이 중요합니다. 프로파일을 착각해 운영 계정에 명령을 날리는 사고가 잦습니다.',
    example: '`--profile prod` 를 빠뜨려 개발 계정에 배포했다고 착각하는 상황이 대표적입니다. 프롬프트에 현재 프로파일을 표시해 두면 예방됩니다.' },

  { diff: 'normal', type: 'task', q: 'S3 버킷을 만들고 파일을 올린 뒤 확인하세요.',
    scene: '# 상황: 정적 파일 보관용 버킷 my-assets 를 새로 준비합니다.',
    steps: [
      { hint: '# 1. 내 계정의 S3 버킷 목록 확인', answer: 'aws s3 ls', accept: ['aws s3api list-buckets'] },
      { hint: '# 2. 로컬 build 디렉터리 전체를 s3://my-assets 로 동기화', answer: 'aws s3 sync build/ s3://my-assets', accept: ['aws s3 sync ./build s3://my-assets', 'aws s3 sync build s3://my-assets'] },
      { hint: '# 3. s3://my-assets 에 올라간 객체 목록을 사람이 읽기 좋은 크기 단위로 확인', answer: 'aws s3 ls s3://my-assets --human-readable', accept: ['aws s3 ls s3://my-assets --human-readable --summarize', 'aws s3 ls s3://my-assets --recursive --human-readable'] },
    ],
    explain: '`sync` 는 변경된 파일만 전송하므로 `cp --recursive` 보다 배포에 적합합니다. `--delete` 를 붙이면 원본에 없는 객체를 지워 완전히 일치시킵니다.',
    example: '`--delete` 를 잘못 쓰면 버킷의 다른 파일까지 사라집니다. 먼저 `--dryrun` 으로 무엇이 지워질지 확인하는 것이 안전합니다.' },

  { diff: 'hard', type: 'task', q: 'IAM 역할을 임시로 위임받아 다른 계정의 리소스를 조회하세요.',
    scene: '# 상황: 운영 계정의 ReadOnly 역할을 맡아 리소스를 확인해야 합니다.',
    steps: [
      { hint: '# 1. arn:aws:iam::123456789012:role/ReadOnly 역할을 audit 세션 이름으로 위임받기', answer: 'aws sts assume-role --role-arn arn:aws:iam::123456789012:role/ReadOnly --role-session-name audit', accept: ['aws sts assume-role --role-session-name audit --role-arn arn:aws:iam::123456789012:role/ReadOnly'] },
      { hint: '# 2. 현재 자격 증명이 바뀌었는지 확인', answer: 'aws sts get-caller-identity', accept: ['aws sts get-caller-identity --output text'] },
      { hint: '# 3. CloudWatch 로그 그룹 목록 조회', answer: 'aws logs describe-log-groups', accept: ['aws logs describe-log-groups --output table'] },
    ],
    explain: 'assume-role 은 만료 시간이 있는 임시 자격 증명을 발급합니다. 장기 액세스 키를 여러 계정에 뿌리는 대신 역할 위임을 쓰는 것이 권장 구조입니다.',
    example: '반환된 AccessKeyId·SecretAccessKey·SessionToken 세 개를 모두 환경변수로 내보내야 합니다. SessionToken 을 빠뜨려 인증 실패하는 경우가 흔합니다.' },

  { diff: 'hard', type: 'task', q: '비용이 갑자기 늘어 원인을 찾아야 합니다.',
    scene: '# 상황: 이번 달 청구 금액이 예상의 두 배입니다.',
    steps: [
      { hint: '# 1. 서비스별 미사용 상태로 남아 있는 탄력적 IP 확인', answer: 'aws ec2 describe-addresses', accept: ['aws ec2 describe-addresses --output table'] },
      { hint: '# 2. 연결되지 않은 채 남아 있는 EBS 볼륨 조회', answer: 'aws ec2 describe-volumes --filters Name=status,Values=available', accept: ['aws ec2 describe-volumes --filters Name=status,Values=available --output table', 'aws ec2 describe-volumes'] },
      { hint: '# 3. 오래된 스냅샷 확인 (내 계정 소유분)', answer: 'aws ec2 describe-snapshots --owner-ids self', accept: ['aws ec2 describe-snapshots --owner-ids self --output table', 'aws ec2 describe-snapshots --owner-ids self --query Snapshots[*].[SnapshotId,StartTime]'] },
    ],
    explain: '인스턴스를 종료해도 EBS 볼륨, 스냅샷, 연결 해제된 탄력적 IP 는 남아 계속 과금됩니다. 눈에 안 보이는 잔여 리소스가 비용 누수의 주범입니다.',
    example: '연결되지 않은 탄력적 IP 는 오히려 사용 중일 때보다 비싸게 과금되도록 설계되어 있습니다. 회수를 유도하기 위한 정책입니다.' },

  /* ---------------- 서술형 ---------------- */
  { diff: 'normal', type: 'essay', q: 'EC2 인스턴스에서 애플리케이션이 S3 에 접근해야 합니다. 어떤 방식이 권장되며 그 이유는 무엇인지 설명하세요.',
    keywords: [['IAM 역할', 'role', '인스턴스 프로파일'], ['액세스 키', '하드코딩', '평문'], ['임시 자격 증명', '자동 갱신', '로테이션'], ['최소 권한', '정책'], ['유출', '노출', '깃']],
    minKeywords: 3,
    model: 'EC2 인스턴스에 IAM 역할(인스턴스 프로파일)을 붙이고 애플리케이션은 SDK 기본 자격 증명 체인을 통해 임시 자격 증명을 자동으로 받아 쓰게 합니다. 액세스 키를 코드나 설정 파일에 넣으면 저장소에 커밋되어 유출되기 쉽고, 만료가 없어 탈취 시 피해가 지속됩니다. 역할이 발급하는 자격 증명은 짧은 수명으로 자동 갱신되므로 키 관리와 로테이션 부담이 사라집니다. 역할에는 필요한 버킷과 동작만 허용하는 최소 권한 정책을 붙입니다.',
    explain: '깃허브에 커밋된 AWS 키는 봇이 수 분 안에 찾아내 암호화폐 채굴에 쓰는 사례가 반복됩니다. 키를 아예 만들지 않는 구조가 가장 확실한 대책입니다.',
    example: 'EKS 에서는 같은 원리를 파드 단위로 적용한 IRSA 를 써서 노드가 아닌 파드별로 권한을 분리합니다.' },

  { diff: 'hard', type: 'essay', q: '퍼블릭 서브넷과 프라이빗 서브넷의 차이를 설명하고, 일반적인 3계층 웹 서비스를 어떻게 배치할지 서술하세요.',
    keywords: [['라우팅 테이블', '경로'], ['인터넷 게이트웨이', 'IGW'], ['NAT', '아웃바운드'], ['로드밸런서', 'ALB', 'ELB'], ['DB', '데이터베이스', '프라이빗'], ['보안 그룹', '방화벽']],
    minKeywords: 4,
    model: '두 서브넷의 차이는 라우팅 테이블입니다. 퍼블릭 서브넷은 인터넷 게이트웨이로 향하는 기본 경로를 갖고, 프라이빗 서브넷은 갖지 않습니다. 3계층 구성에서는 로드밸런서만 퍼블릭 서브넷에 두고, 애플리케이션 서버와 데이터베이스는 프라이빗 서브넷에 배치합니다. 프라이빗 서브넷의 서버가 패키지 설치 등으로 외부에 나가야 하면 NAT 게이트웨이를 통해 아웃바운드만 허용합니다. 보안 그룹은 애플리케이션이 로드밸런서에서 오는 트래픽만, 데이터베이스가 애플리케이션 보안 그룹에서 오는 트래픽만 받도록 계층별로 좁힙니다.',
    explain: '"퍼블릭 IP 가 붙었는가" 가 아니라 "인터넷 게이트웨이로 가는 경로가 있는가" 가 퍼블릭 여부를 가릅니다. 퍼블릭 IP 가 있어도 라우팅이 없으면 통신되지 않습니다.',
    example: '데이터베이스를 퍼블릭 서브넷에 두고 보안 그룹으로만 막는 구성은 설정 실수 한 번에 그대로 노출됩니다. 네트워크 계층에서 먼저 막는 것이 원칙입니다.' },

  { diff: 'extreme', type: 'essay', q: 'AWS 에서 비용을 통제하기 위해 어떤 조치를 취할 수 있는지 설명하세요.',
    keywords: [['태그', 'tagging', '비용 할당'], ['예산', 'Budgets', '알람', '알림'], ['Cost Explorer', '분석'], ['미사용', '잔여 리소스', 'EBS', '탄력적 IP', '스냅샷'], ['인스턴스 타입', '라이트사이징', '오토스케일링'], ['예약', 'Savings Plans', '스팟'], ['수명주기', 'S3', '스토리지 클래스']],
    minKeywords: 4,
    model: '먼저 모든 리소스에 프로젝트·환경 태그를 강제해 비용을 귀속시킬 수 있게 만듭니다. AWS Budgets 로 예산과 임계치 알림을 설정하고 Cost Explorer 로 증가 추세를 서비스별로 분석합니다. 연결 해제된 탄력적 IP, 미사용 EBS 볼륨, 오래된 스냅샷 같은 잔여 리소스를 정기적으로 정리합니다. 실제 사용률을 보고 인스턴스 크기를 조정하고, 변동 부하는 오토스케일링으로, 상시 부하는 Savings Plans 나 예약 인스턴스로, 중단 가능한 작업은 스팟으로 처리합니다. S3 는 수명주기 정책으로 오래된 객체를 저렴한 스토리지 클래스로 옮기거나 만료시킵니다.',
    explain: '클라우드 비용 관리의 출발점은 태깅입니다. 누가 무엇을 쓰는지 귀속되지 않으면 어떤 절감 조치도 근거를 갖기 어렵습니다.',
    example: '개발 환경 인스턴스를 업무 시간 외에 자동 중지하는 스케줄만으로도 해당 비용이 절반 이하로 줄어드는 경우가 많습니다.' },

  { diff: 'extreme', type: 'essay', q: 'S3 버킷에 저장된 데이터를 안전하게 지키기 위한 설정들을 설명하세요.',
    keywords: [['퍼블릭 액세스 차단', 'Block Public Access', '공개'], ['버킷 정책', 'IAM', '권한'], ['암호화', 'SSE', 'KMS'], ['버전 관리', 'versioning'], ['수명주기', '백업', '복제'], ['액세스 로그', 'CloudTrail', '감사'], ['MFA Delete', '삭제 방지']],
    minKeywords: 4,
    model: '계정 수준에서 퍼블릭 액세스 차단을 켜 실수로 공개되는 것을 원천 봉쇄하고, 접근은 버킷 정책과 IAM 으로 최소 권한만 부여합니다. 저장 데이터는 기본 암호화를 켜고 민감한 데이터는 KMS 키로 관리해 키 사용 권한을 별도로 통제합니다. 버전 관리를 활성화하면 덮어쓰기나 삭제로부터 복구할 수 있고, 중요 버킷에는 MFA Delete 나 객체 잠금을 적용합니다. 다른 리전으로 복제해 재해에 대비하고, 액세스 로그와 CloudTrail 로 누가 언제 접근했는지 감사 기록을 남깁니다.',
    explain: 'S3 유출 사고의 대부분은 침입이 아니라 공개 설정 실수입니다. 계정 수준 차단은 개별 버킷 설정 실수를 덮어 주는 안전망 역할을 합니다.',
    example: '랜섬웨어가 S3 객체를 암호화해 덮어쓰더라도 버전 관리가 켜져 있으면 이전 버전으로 복구할 수 있습니다.' },
);
