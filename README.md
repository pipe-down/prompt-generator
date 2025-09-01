# Prompt Generator

프롬프트 생성 도움 도구 | AI Coding Assistant Prompt Generator

## 소개 (Introduction)

Prompt Generator는 코드 에이전트용 프롬프트를 쉽게 생성할 수 있도록 도와주는 웹 애플리케이션입니다. 이 도구를 사용하면 AI 모델에 적합한 구조화된 프롬프트를 빠르게 만들 수 있으며, 특히 Claude, Codex 또는 Qwen Coder와 같은 AI 코딩 어시스턴트용 프롬프트 생성에 최적화되어 있습니다.

Prompt Generator helps you quickly create structured prompts for AI coding assistants. It's optimized for models like Claude, Codex, or Qwen Coder, making it easy to generate effective prompts for code-related tasks.

## 주요 기능 (Features)

- 🤖 **로컬 프롬프트 생성**: AI API 키 없이도 프롬프트를 생성할 수 있습니다
- 🌐 **AI 기반 생성**: Google Gemini API를 사용하여 고급 프롬프트를 생성할 수 있습니다
- 💬 **채팅 인터페이스**: 대화형 방식으로 프롬프트를 생성하고 관리할 수 있습니다
- 📁 **대화 기록 관리**: 여러 프롬프트 생성 세션을 저장하고 관리할 수 있습니다
- 🏷️ **플래그 시스템**: `--deep`, `--brief`, `--verify` 등의 플래그로 프롬프트 스타일을 조정할 수 있습니다
- 👤 **페르소나 설정**: 다양한 역할(컨설턴트, 리서처, PM, 시니어 백엔드 등)로 프롬프트를 생성할 수 있습니다
- 🌙 **다크 모드**: 시각적 편의를 위한 다크 모드 지원
- 📱 **반응형 디자인**: 데스크톱과 모바일 모두에서 사용 가능

## 기술 스택 (Tech Stack)

- **프레임워크**: Next.js 14
- **언어**: React, TypeScript
- **스타일링**: Tailwind CSS
- **아이콘**: Heroicons
- **로컬 스토리지**: 브라우저 localStorage
- **AI API**: Google Gemini (옵션)

## 설치 및 실행 (Installation & Setup)

### 필수 조건 (Prerequisites)

- Node.js 18 이상
- npm 또는 yarn

### 설치 방법 (Installation)

```bash
# 저장소 클론
git clone <repository-url>
cd prompt-generator

# 의존성 설치
npm install
```

### 개발 서버 실행 (Development Server)

```bash
# 개발 서버 시작 (포트 3030)
npm run dev
```

웹 브라우저에서 [http://localhost:3030](http://localhost:3030)으로 접속하세요.

### 배포 (Deployment)

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

## 사용 방법 (Usage)

### 1. 기본 프롬프트 생성

1. 좌측 사이드바에서 "새 대화" 버튼을 클릭하여 새로운 세션 시작
2. 하단 입력창에 코드 관련 요청을 입력
3. "엔터" 키 또는 전송 버튼을 클릭하여 프롬프트 생성

### 2. AI 기반 프롬프트 생성

1. 우측 상단의 설정 아이콘 클릭
2. Google Gemini API 키 입력
3. 프롬프트 생성 시 AI 기반 고급 프롬프트 생성 가능

### 3. 플래그 사용

- `--deep`: 더 자세하고 깊이 있는 프롬프트 생성
- `--brief`: 간결한 프롬프트 생성
- `--verify`: 코드 검증이 포함된 프롬프트 생성

### 4. 페르소나 설정

헤더의 페르소나 드롭다운에서 역할을 선택하여 해당 전문가의 시각에서 프롬프트를 생성할 수 있습니다:
- 컨설턴트
- 리서처
- PM (프로젝트 매니저)
- 시니어 백엔드 개발자
- 프론트엔드 개발자
- 교사
- 테크니컬 라이터

## 프로젝트 구조 (Project Structure)

```
prompt-generator/
├── components/        # React 컴포넌트
├── constants/         # 상수 및 설정값
├── pages/             # Next.js 페이지
├── public/            # 정적 파일
├── services/          # API 및 서비스 로직
├── styles/            # 전역 스타일
├── utils/             # 유틸리티 함수
└── README.md
```

## 라이선스 (License)

MIT License

## 기여 (Contributing)

1. 저장소를 포크합니다
2. 새 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 연락처 (Contact)

프로젝트 링크: [https://github.com/pipe-down/prompt-generator](https://github.com/pipe-down/prompt-generator)
