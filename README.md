# GnNationHub

Application Next.js pour explorer et piloter le référentiel territorial de Guinée.

## Espaces

- Front office: `/`, `/regions`, `/prefectures`, `/communes`, `/quartiers`, `/secteurs`
- Authentication: `/auth/login`, `/auth/register`, `/auth/recover`
- Backoffice: `/backoffice`, `/backoffice/zones`, `/backoffice/security`

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- MySQL via `mysql2`

## Configuration

Copier `.env.example` vers `.env` puis renseigner la base MySQL.

```bash
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gnnationhub
DB_USERNAME=root
DB_PASSWORD=
```

## Commandes

```bash
npm install
npm run dev
npm run typecheck
npm run build
```
