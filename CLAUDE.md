# Skuber+ Client

> AI 기반 Kubernetes 통합 관리 데스크톱 IDE

## Overview

Electron + React 기반 데스크톱 앱. Open Lens 포크에 AI SRE 진단 기능 추가.

## Project Structure

| Path | Type | Purpose |
|------|------|---------|
| `packages/core/` | Dir | 핵심 로직, UI, K8s API |
| `packages/technical-features/` | Dir | 메시징, 애플리케이션 코어 |
| `packages/ui-components/` | Dir | 공유 UI 컴포넌트 |
| `packages/infrastructure/` | Dir | 빌드 설정 (webpack, jest, ts) |
| `skuberplus/` | Dir | Electron 메인 앱 |
| `scripts/` | Dir | 빌드/유틸 스크립트 |

## Quick Reference

### Commands

```bash
pnpm install           # 의존성 설치
pnpm dev               # 개발 서버 (Hot Reload)
pnpm build             # 프로덕션 빌드
pnpm test:unit         # 유닛 테스트 (turbo)
pnpm lint              # 린트 검사
```

### Tech Stack

- **Runtime**: Electron 35.7.5 + Node 22
- **UI**: React 18.3 + MobX 6.13 + Tailwind 4.1
- **Language**: TypeScript 5.9
- **Build**: pnpm 10.17 + Webpack 5.101 + Turborepo
- **Test**: Jest 29.7 (maxWorkers: 2)
- **AI**: @langchain/core 1.1.39 + @langchain/anthropic 1.3.26

## Entry Points

- **Main Process**: `packages/core/src/main/`
- **Renderer Process**: `packages/core/src/renderer/`
- **AI Features**: `packages/core/src/features/ai-assistant/`

---

*Context7 또는 docs/ 디렉토리 참조하여 상세 정보 확인*
