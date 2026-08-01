# KB 속마음

> 제8회 FUTURE FINANCE A.I. CHALLENGE를 위한 웹 프로토타입

KB 속마음은 영업점 업무 과정에서 축적되는 행원의 경험과 노하우를 대화형으로 기록하고, 검토 가능한 지식으로 전환하는 서비스입니다. 이 저장소는 행원 화면과 관리자 거버넌스 화면의 시연을 위한 프론트엔드 구현체입니다.

## 데모

- 배포 주소: https://kbmaeum.vercel.app
- 기본 화면: 행원 지식 기록

화면에 입력 포커스가 없을 때 아래 숫자 키로 시연 화면을 빠르게 전환할 수 있습니다.

| 키 | 화면 |
| --- | --- |
| `1` | 행원 지식 기록 및 업무일지 확정 |
| `2` | 관리자 거버넌스 콘솔 |
| `3` | 창구 업무 및 속마음 도우미 |
| `Esc` | 기본 지식 기록 화면으로 복귀 |

## 주요 기능

- 행원과의 대화형 인터뷰를 통한 암묵지 기록
- 업무 종료 후 업무일지 초안 확인 및 수정
- 기록에서 지식 후보를 추출하고 승인 요청
- 창구 업무 중 질의응답과 상황별 서류 안내
- 지식 상태, 지식베이스, 규정 충돌을 확인하는 관리자 콘솔
- 한국 표준시 기반 시각 표시와 시연용 화면 전환

## 기술 스택

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- Motion
- pnpm

## 로컬 실행

Node.js와 pnpm이 설치되어 있어야 합니다.

```bash
cd web
pnpm install
pnpm dev
```

개발 서버가 시작되면 터미널에 표시되는 로컬 주소로 접속합니다.

## 품질 확인

```bash
cd web
pnpm lint
pnpm build
```

## 프로젝트 구조

```text
web/src/
├─ app/       # 앱 진입점과 전역 스타일
├─ entities/  # 상품 등 비즈니스 도메인과 API
├─ pages/     # 화면 단위 UI
├─ widgets/   # 독립적인 복합 UI
├─ features/  # 사용자 상호작용과 업무 기능
└─ shared/    # 공용 모델, 유틸리티, UI
```

## 프로토타입 범위

현재 버전은 공모전 시연 영상을 위한 프론트엔드 프로토타입입니다. 백엔드 API, 실제 인증, 금융 거래 처리 및 영업점 시스템 연동은 포함하지 않습니다.

## 상품 API 연동

기본 설정은 백엔드 없이도 시연할 수 있는 `mock` 모드입니다. 백엔드 서버가 준비되면 `web/.env`를 만들고 아래처럼 변경합니다.

```dotenv
VITE_API_MODE=remote
VITE_API_BASE_URL=http://localhost:8080
VITE_PRODUCTS_PATH=/api/v1/products
```

상품 조회 요청은 `GET /api/v1/products`이며, 고객군 필터가 있으면 `customerSegment=YOUTH` 또는 `customerSegment=SENIOR` 쿼리를 전달합니다.

```json
{
  "data": [
    {
      "id": "kb-youth-future-savings",
      "name": "KB청년미래적금",
      "customerSegment": "YOUTH",
      "productType": "SAVINGS",
      "description": "청년 고객을 위한 미래 준비 적금 상품",
      "tags": ["청년", "적금"]
    }
  ]
}
```

프론트엔드의 기본 상품 데이터에는 다음 두 상품이 포함되어 있습니다.

- 청년: `KB청년미래적금`
- 시니어: `KB골든라이프연금우대예금`

화면에서는 `useProducts()` 또는 `getProducts()`를 사용하면 됩니다. 모든 원격 요청은 공용 `axiosInstance`를 거치며, 기본 URL·JSON 헤더·10초 timeout·공통 오류 변환이 한곳에서 관리됩니다. 원격 응답은 UI에 전달되기 전에 필수 필드와 enum 값을 검사합니다.
