```markdown
# GigShield — AI-Powered Parametric Income Insurance for Food Delivery Partners

> **Guidewire DEVTrails 2026 | Team: Shadow Legion** > Protecting the backbone of India's food economy — one week at a time.

**🎥 Watch our Demo Video:** [https://youtu.be/6-Gck3_cRkI](https://youtu.be/6-Gck3_cRkI)

---

## Team — Shadow Legion

| Name                    | Role                          |
|-------------------------|-------------------------------|
| Hema Krishna B V        | Team Lead / AI & Backend      |
| John Christo Rosario    | Full Stack Developer          |
| Aneeza Zainab F         | ML & Data Engineering         |
| Mahanandh Thilakar V S  | Frontend / UX                 |

---

## Problem Statement

India's food delivery partners (Zomato and Swiggy) earn an estimated ₹15,000–₹25,000 per month. This income drops by 20–30% during external disruptions. Chennai records more than 45 heavy-rain days annually, Delhi experiences AQI levels above 300 for extended periods, and unplanned strikes can eliminate an entire day's earnings overnight.

These workers have no income safety net: no employer support, no sick pay, and no disruption coverage. When a cyclone halts deliveries in Chennai, a typical partner permanently loses ₹600–₹900.

GigShield is an AI-enabled parametric insurance platform that automatically pays food delivery partners when measurable external triggers — heavy rain, extreme heat, severe AQI, cyclones, or curfews — cross predefined thresholds. No claim filing. No waiting period. No possibility of denial.

---

## User Persona: Food Delivery Partner (Zomato / Swiggy)

### Profile
- Name: Ravi (representative persona)  
- Location: Chennai, Tamil Nadu  
- Platform: Zomato / Swiggy (dual-registered)  
- Working hours: 8–12 hours/day, 6 days/week  
- Weekly earnings: ₹3,500 – ₹6,000  
- Device: Android smartphone (primary); no laptop  
- Payment: Weekly UPI credit from platform  

### Pain Points
- Daily earnings fall from ₹500–₹800 to ₹0–₹200 on rainy days.  
- Disruptions cannot be predicted in advance.  
- Monthly insurance premiums are unaffordable due to irregular income.  
- Traditional claims require paperwork and proof that workers rarely possess.  
- Low trust in claim-based insurance due to frequent rejections.  

### Key Insight
Ravi does not need to file a claim. He needs to receive payment automatically when disruption occurs — exactly the way his weekly Zomato/Swiggy payout arrives in his UPI account. GigShield is designed to mirror that seamless experience.

---

## Application Workflow

```text
┌─────────────────────────────────────────────────────────────────┐
│ GIGSHIELD WORKFLOW                                              │
│                                                                 │
│ [Onboarding] → [Risk Profiling] → [Policy Selection]            │
│          ↓                                                      │
│ [Weekly Premium Auto-deducted via UPI]                          │
│          ↓                                                      │
│ [Real-time Disruption Monitoring — Weather/AQI/Social APIs]     │
│          ↓                                                      │
│ [Parametric Trigger Detected]                                   │
│          ↓                     ↓                                │
│ [Fraud Validation]          [No Fraud]                          │
│          ↓                     ↓                                │
│ [Flag & Review]         [Auto Payout via UPI]                   │
│                                ↓                                │
│                       [Worker Notification (SMS + App)]         │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Journey

1. Onboarding (under 5 minutes)  
- Registration using mobile number and Zomato/Swiggy partner ID.  
- Aadhaar verification via DigiLocker API.  
- Selection of primary delivery zone (pin code).  
- UPI ID linkage for instant payouts.  
- AI automatically generates initial risk profile from zone data.

2. Risk Profiling (AI-Driven)  
- Machine-learning model assigns a risk score (0–100) per pin code using:  
  - Historical weather severity (IMD data, last 3 years)  
  - AQI frequency  
  - Flood/waterlogging records  
  - Local strike/curfew patterns  
- The risk score directly determines the applicable premium bracket.

3. Policy Activation  
- Worker selects one of three weekly tiers (₹49 / ₹89 / ₹149).  
- Coverage runs Monday 00:00 to Sunday 23:59 and auto-renews.  
- Pause or cancel anytime before the next cycle.

4. Real-Time Monitoring  
- System polls authoritative APIs every 15 minutes.  
- Trigger thresholds are evaluated against the worker’s active zone.  
- Delivery activity is cross-validated with platform data.

5. Automatic Payout  
- Confirmed trigger triggers background fraud validation (< 60 seconds).  
- Approved payout is credited instantly to the linked UPI ID.  
- SMS and in-app notification delivered with amount and reason.

---

## Weekly Premium Model

### Rationale for Weekly Pricing
Zomato and Swiggy pay partners on a weekly cycle. GigShield aligns perfectly:  
- No large upfront commitment.  
- Premium can be auto-deducted from platform earnings (future partnership opportunity).  
- Workers can pause coverage during planned leaves without financial loss.

### Pricing Tiers

| Plan            | Weekly Premium | Maximum Weekly Payout | Best Suited For                  |
|-----------------|----------------|-----------------------|----------------------------------|
| Starter Shield  | ₹49            | ₹500                  | New partners, low-risk zones     |
| Active Shield   | ₹89            | ₹1,200                | Regular workers, moderate risk   |
| Full Shield     | ₹149           | ₹2,500                | High-frequency, high-risk zones  |

### Dynamic Pricing Formula (AI-Adjusted)
```text
Final Weekly Premium = Base Tier Premium × Zone Risk Multiplier × Seasonal Factor × Loyalty Discount

Zone Risk Multiplier   = 0.8 – 1.4 (ML-derived per pin code)  
Seasonal Factor        = 1.0 – 1.3 (monsoon: June–September)  
Loyalty Discount       = 0.95 after 4 weeks; 0.90 after 12 weeks
```

Example: Ravi in Velachery (flood-prone Chennai zone) during August monsoon:  
`₹89 × 1.3 (zone risk) × 1.3 (season) × 1.0 = ₹150` → capped at ₹149 (Full Shield).

The multipliers are produced by an XGBoost regression model trained on IMD rainfall archives, CPCB AQI records, and income-loss surveys, and are updated quarterly.

---

## Parametric Triggers

Scope: Loss of income only. No coverage for vehicle damage, health, or accidents.  
All triggers are objective, verifiable, and zone-specific.

### Trigger Matrix

| Trigger                | Threshold                              | Data Source                  | Payout (% of Daily Average) |
|------------------------|----------------------------------------|------------------------------|-----------------------------|
| Heavy Rainfall         | ≥ 35 mm in any 3-hour window           | IMD / Tomorrow.io            | 70%                         |
| Extreme Heat           | ≥ 43 °C for ≥ 4 consecutive hours      | OpenWeatherMap               | 50%                         |
| Severe AQI             | AQI ≥ 300                              | CPCB / IQAir                 | 40%                         |
| Cyclone / Flood Alert  | IMD Red Alert for worker’s district    | IMD Warning API              | 100%                        |
| Local Curfew / Strike  | Section 144 or verified hartaal        | Government notifications     | 80%                         |

### Payout Calculation
```text
Daily Average Income = Worker’s actual 4-week average (platform data)
Triggered Payout     = Daily Average × Payout % × Duration Factor
Weekly Cap           = Plan maximum (₹500 / ₹1,200 / ₹2,500)
```

Example: Ravi’s 4-week average = ₹700/day. Chennai records 47 mm rain on Tuesday → payout = ₹700 × 70% = ₹490 credited the same evening.

---

## AI / ML Integration

1. Dynamic Premium Calculation  
- Model: XGBoost regressor  
- Features: pin code, historical rain days, AQI days, flood incidents, season, worker tenure  
- Output: precise zone risk multiplier (0.8–1.4)  
- Retrained quarterly on 5-year IMD + CPCB datasets.

2. Predictive Risk Forecasting  
- Model: XGBoost + Prophet time-series  
- Predicts disruption probability for the coming week  
- Powers in-app “High Risk Week” alerts and coverage recommendations.

3. Fraud Detection Engine  
- Isolation Forest (unsupervised) + rule-based engine  
- Detects GPS spoofing, collusion patterns, and anomalous claim velocity  
- Runs in < 60 seconds per trigger.

4. Income Baseline Estimator  
- Ridge regression model for new or irregular workers  
- Features: zone, shift hours, day-of-week, platform, city tier.

All models are served via BentoML for low-latency inference and versioned through MLflow.

---

## Technology Stack

GigShield is built as a cloud-native microservices architecture with independent scalability and observability for each domain.

### Frontend
- Web dashboard (admin/insurer): Next.js 14 (App Router) + TypeScript + shadcn/ui + Recharts + Mapbox GL JS  
- Worker mobile app: React Native + Expo SDK 51 + NativeWind + Victory Native + TanStack Query + Zustand  

### Backend Microservices
- API Gateway: Kong  
- Policy Service: NestJS + TypeScript  
- Trigger Service: FastAPI + APScheduler (polls APIs every 5 minutes)  
- ML Service: FastAPI + BentoML  
- Payout Service: NestJS + Razorpay integration  

### Data Layer
- PostgreSQL 16 + TimescaleDB (time-series)  
- Redis (caching & sessions)  
- Apache Kafka (event streaming)  
- AWS S3 (encrypted documents & model artefacts)  
- Elasticsearch (fraud analytics)

### Infrastructure & DevOps
- Containerisation: Docker  
- Orchestration: AWS ECS Fargate  
- IaC: Terraform  
- CI/CD: GitHub Actions + ArgoCD (GitOps)  
- Monitoring: Prometheus + Grafana + Sentry + ELK Stack  
- Edge: Cloudflare (DDoS protection, CDN, managed TLS)

---

## Platform Strategy

Mobile App (Primary for Workers)  
Designed for Android-first users with offline-first capabilities, low-bandwidth support, and push notifications for triggers and payouts.

Web Dashboard (Admin / Insurer)  
Provides loss-ratio analytics, disruption heatmaps, predictive risk views, and fraud-review tools. Not exposed to delivery partners.

---

## 6-Week Development Roadmap

Phase 1: Foundation  
- Persona research, parametric model design, pricing architecture, tech-stack finalisation, repository setup, and wireframes.

Phase 2: Core Automation  
- Onboarding flow, policy engine, real-time trigger monitoring, basic payout pipeline, and rule-based fraud detection.

Phase 3: Scale & Polish  
- Advanced ML fraud models, Razorpay integration, worker and admin dashboards, predictive alerts, final demo video, and pitch deck.

---

## Repository Structure

```text
gigshield/
├── services/
│   ├── policy-service/          # NestJS — onboarding, KYC, policy management
│   │   ├── src/
│   │   │   ├── auth/            # Auth0 + JWT guards
│   │   │   ├── policy/          # Policy CRUD, weekly renewal
│   │   │   ├── premium/         # Premium calculation + ML service client
│   │   │   └── worker/          # Worker profile + risk score
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── trigger-service/         # FastAPI — parametric event monitoring
│   │   ├── src/
│   │   │   ├── monitors/        # Weather, AQI, social alert pollers
│   │   │   ├── evaluators/      # Threshold logic per trigger type
│   │   │   └── kafka/           # Kafka producer (trigger events)
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   ├── ml-service/              # FastAPI + BentoML — model serving
│   │   ├── models/
│   │   │   ├── risk_scorer/     # XGBoost zone risk model
│   │   │   ├── fraud_detector/  # Isolation Forest + LightGBM
│   │   │   ├── income_estimator/# Ridge regression baseline
│   │   │   └── forecaster/      # Prophet + LSTM weekly risk forecast
│   │   ├── feature_store/       # Feast feature definitions
│   │   ├── training/            # MLflow experiment scripts
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── payout-service/          # NestJS — Razorpay, UPI, notifications
│       ├── src/
│       │   ├── razorpay/        # Razorpay test mode integration
│       │   ├── ledger/          # Payout ledger + audit trail
│       │   ├── kafka/           # Kafka consumer (payout events)
│       │   └── notifications/   # FCM push + Twilio SMS
│       ├── Dockerfile
│       └── package.json
│
├── frontend-web/                # Next.js 14 — insurer/admin dashboard
│   ├── app/                     # App Router pages
│   ├── components/              # shadcn/ui + Recharts + Mapbox
│   └── package.json
│
├── frontend-mobile/             # React Native + Expo — worker app
│   ├── app/                     # Expo Router screens
│   ├── components/              # NativeWind + Victory Native
│   └── package.json
│
├── infrastructure/
│   ├── terraform/               # AWS ECS, RDS, S3, VPC, ElastiCache
│   ├── k8s/                     # Kubernetes manifests (staging)
│   └── kong/                    # Kong gateway config (routes, plugins)
│
├── data/
│   ├── mock-apis/               # OpenAPI spec for mock Zomato/Swiggy API
│   ├── seeds/                   # Sample worker + zone datasets
│   └── imd-archive/             # Historical weather data (2019–2024)
│
├── docs/
│   ├── architecture.md          # System design diagrams
│   ├── api-spec.yaml            # OpenAPI 3.0 spec
│   ├── trigger-matrix.md        # Detailed trigger thresholds
│   └── ml-model-cards/         # Model documentation per ML component
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # Lint + test + build on PR
│       └── deploy.yml           # Build → ECR → ArgoCD sync on merge
│
├── docker-compose.yml           # Local full-stack dev environment
└── README.md
```

---

## Compliance & Scope

- Covered: Income loss due to weather, AQI, flood, cyclone, or verified local curfew/strike.  
- Excluded: Health, life, vehicle repair, or accident coverage.  
- Pricing: Weekly model only.  
- Target users: Zomato and Swiggy delivery partners exclusively.

---

## Innovation Highlights

1. Fully automated, zero-touch claims — detection, validation, and payment occur without worker intervention.  
2. Hyper-local risk pricing at pin-code level using machine learning.  
3. Weekly subscription aligned with platform payout cycles, with built-in loyalty discounts.  
4. Predictive disruption alerts that help workers optimise coverage before high-risk periods.  
5. Payouts calibrated to each worker’s actual recent earnings rather than fixed flat amounts.

---

**Developed by Shadow Legion for Guidewire DEVTrails 2026**
```
