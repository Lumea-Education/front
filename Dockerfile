# 1. Node.js 환경에서 빌드
FROM node:18 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 2. 의존성 파일을 복사하고 pnpm을 설치
COPY package.json pnpm-lock.yaml ./

# pnpm 설치 (corepack을 통해)
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. 의존성 설치
RUN pnpm install --frozen-lockfile

# 4. 애플리케이션 코드 복사 후 빌드
COPY . .
RUN pnpm run build

# 5. Nginx 이미지 사용하여 빌드된 파일을 서빙
FROM nginx:alpine

# 빌드된 정적 파일을 Nginx의 HTML 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
