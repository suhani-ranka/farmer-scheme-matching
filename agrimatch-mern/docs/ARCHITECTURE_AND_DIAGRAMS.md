# Architecture and Diagrams

## System architecture

```mermaid
flowchart LR
  F[Farmer / User] --> UI[React + Vite Frontend]
  UI -->|REST API + JSON| API[Node.js + Express API]
  API --> AUTH[JWT Authentication]
  API --> MATCH[Rule-based Matcher]
  API --> DB[(MongoDB Atlas)]
  MATCH --> DB
  UI -->|Open source link| GOV[Official Government Portals]
```

## Use-case diagram

```mermaid
flowchart LR
  Farmer((Farmer))
  subgraph AgriMatch
    UC1[Register / Login]
    UC2[Create or Update Profile]
    UC3[Browse Scheme Catalogue]
    UC4[Filter by State / Level / Category]
    UC5[View Scheme Details]
    UC6[View Suggested Schemes]
    UC7[Open Official Source]
  end
  Farmer --> UC1
  Farmer --> UC2
  Farmer --> UC3
  Farmer --> UC4
  Farmer --> UC5
  Farmer --> UC6
  Farmer --> UC7
```

## Data flow diagram — Level 0

```mermaid
flowchart LR
  Farmer[Farmer] -->|Profile and search inputs| System((AgriMatch System))
  System -->|Scheme catalogue and suggestions| Farmer
  System <-->|User, profile and scheme records| DB[(MongoDB)]
  System -->|Official source links| Portals[Government Portals]
```

## Data flow diagram — Level 1

```mermaid
flowchart TB
  U[Farmer] --> P1[1.0 Authentication]
  P1 <--> D1[(Users)]
  U --> P2[2.0 Manage Farmer Profile]
  P2 <--> D2[(Farmer Profiles)]
  U --> P3[3.0 Search / Filter Schemes]
  P3 <--> D3[(Scheme Catalogue)]
  D2 --> P4[4.0 Match Profile to Schemes]
  D3 --> P4
  P4 --> P5[5.0 Explain Suggestions]
  P5 --> U
```

## ER diagram

```mermaid
erDiagram
  USER ||--o| FARMER_PROFILE : owns
  USER {
    ObjectId _id PK
    string name
    string email UK
    string passwordHash
  }
  FARMER_PROFILE {
    ObjectId _id PK
    ObjectId user FK
    string state
    string district
    number landSizeAcres
    string farmerType
    string irrigation
    string[] crops
    string[] interests
  }
  SCHEME {
    ObjectId _id PK
    string schemeCode UK
    string name
    string governmentLevel
    string[] applicableStates
    string category
    string officialUrl
    date lastVerifiedAt
    string verificationStatus
  }
```

## Recommendation flow

```mermaid
flowchart TD
  A[User logs in] --> B[Load farmer profile]
  B --> C[Load active scheme records]
  C --> D{State applicable?}
  D -->|No| E[Show state mismatch and source link]
  D -->|Yes| F[Compare crop / interest / topic tags]
  F --> G[Create readable reasons and caveats]
  E --> H[Display suggestions with disclaimer]
  G --> H
  H --> I[User verifies details on official portal]
```

## Database design notes
- `User` stores account details and a password hash, never a plain-text password.
- `FarmerProfile` has one profile per user (`user` is unique).
- `Scheme.schemeCode` is a stable unique identifier used by the seed script for upserts.
- `applicableStates` stores `All India` for nationwide records or state names for state-specific records.
- `lastVerifiedAt`, `sourceUrl` and `verificationStatus` make provenance visible.
