# AXLE//WIM — Client Presentation Guide

**Duration:** 15–20 minutes walkthrough + 10 minutes Q&A  
**Format:** Single-page deck — scroll top to bottom, or jump via nav  
**Audience:** Highway authorities, enforcement agencies, asset managers, procurement

---

## 1. Opening hook (30 seconds)

> *"Every day, overloaded trucks pass through your corridor at full highway speed — and the road pays the price. One 40-tonne truck does the pavement damage of roughly 10,000 cars. We don't stop traffic to find them. We weigh every axle at 120 km/h, flag offenders in real time, and issue a signed e-ticket before the vehicle clears the bridge."*

**One-liner:** High-Speed Weigh-In-Motion — weigh, classify, enforce, and protect roads without a single lane closure.

---

## 2. Presentation flow (follow the deck order)

### Slide 1 — Hero (`#top`)

**What to show:** Animated background (trucks, sensor pulse, data uplink) + Live Spec Sheet card

**Key points:**

- Weigh every axle at **120 km/h** — no stopping, no diversion for compliant traffic
- System 04 reference: quartz-piezo, 4-lane, **±7% Class B+** accuracy
- Speed range **15–130 km/h**, **10 kHz** sampling, **99.4%** uptime
- Legally defensible data — not just measurement, but a signed evidence chain

**Client line:** *"This is enforcement-grade instrumentation, not a traffic counter."*

---

### Slide 2 — Ticker bar (credibility strip)

**Memorize these proof points:**

- **4th-power law** — pavement damage scales with axle load to the 4th power
- **COST-323** accuracy classes (A through D+)
- **OIML R134** — international standard for automatic road weighing
- **Pre-selection hit rate:** random static checks ~15% → WIM-targeted **60–80%**

---

### Slide 3 — Principles (§ 01)

**Three ideas that sell the technology:**

| # | Principle | Client message |
|---|-----------|----------------|
| 01 | **Dynamic force → static answer** | A wheel pass lasts 3–8 ms. We reconstruct the true static axle load from that burst of force. |
| 02 | **Fusion beats any single sensor** | Multiple sensors + loops + axle detectors fused per vehicle — redundancy kills noise. |
| 03 | **Calibration is a process** | Initial calibration + 24h rolling auto-calibration — accuracy is maintained, not assumed. |

**Client line:** *"Accuracy isn't a spec-sheet promise — it's a maintained state."*

---

### Slide 4 — Live System (`#live`) — DEMO MOMENT

**What to show:** Animated trucks crossing WIM → data packets → control room console

**Walk through the live readout:**

- Lane, vehicle class, speed, axle count, GVW
- Status: **PASS / CHECK / OVER**
- Signal bars = real-time axle-force spectrum

**Gallery images:** In-road sensor strip + control room

**Client line:** *"Every truck that passes writes a record. Within 400 ms it's in your control room."*

---

### Slide 5 — Technology (`#technology`)

**Four sensor families — help client choose, don't overwhelm:**

| Sensor | Best for | Accuracy |
|--------|----------|----------|
| **Quartz piezo (QP)** | New HS-WIM installs | B+ (±7%) |
| **Bending plate (BP)** | North American legacy | B (±10%) |
| **Load cell (LC)** | Enforcement-grade low-speed | A/B+ (±5–7%) |
| **Fiber-optic (FO)** | Tunnels, bridges, EMI-sensitive | B (emerging) |

**Client line:** *"Sensor choice follows your accuracy requirement, pavement condition, and 10-year budget — not marketing."*

---

### Slide 6 — Data Pipeline (§ 02)

**Six stages in 400 ms:**

1. **Sensing** — pavement-embedded sensor array
2. **Conditioning** — amplification, temperature comp, 10 kHz ADC
3. **Detection** — per-axle peak extraction
4. **Classification** — EU R1 / FHWA vehicle class
5. **Estimation** — GVW + per-axle load, speed-corrected
6. **Reporting** — signed record, ANPR match, enforcement queue

**Client line:** *"Six QA gates. Every record traceable end-to-end."*

---

### Slide 7 — Capabilities (`#capabilities`) — TIERED SELLING

**Deploy what you need today; switch on the rest later.**

**Basic** — counting & classification

- Axle detection & counting
- Speed & gap measurement
- Vehicle classification (EU R1 / FHWA)

**Standard** — enforcement-ready

- GVW estimation
- Overload pre-selection
- ANPR & vehicle registry fusion

**Advanced** — analytics & integration

- Rolling auto-calibration
- Load spectra for pavement/bridge models
- Open APIs & chain-of-evidence export

**Client line:** *"One instrument stack — three capability tiers. Start with pre-selection, grow into national analytics."*

---

### Slide 8 — Enforcement (`#enforcement`) — WOW MOMENT

**What to show:** Stats band → 5-step pipeline → axle profile → e-ticket → live logstream

**The story in 5 steps:**

1. **DETECT** — WIM flags overweight axle
2. **CAPTURE** — ANPR reads plate
3. **VERIFY** — matched to vehicle registry
4. **TICKET** — e-ticket auto-generated with evidence
5. **DISPATCH** — sent to owner + law enforcement

**Headline numbers:**

- **1,284** overweight flags today
- **8,432** e-tickets issued MTD
- **78.4%** fine recovery rate
- **812 ms** detect → ticket

**Client line:** *"An overweight axle becomes a signed ticket before the truck clears the bridge — under one second, fully automated."*

---

### Slide 9 — Performance (`#performance`)

**Accuracy classes (COST-323):**

| Class | Tolerance | Use case |
|-------|-----------|----------|
| **A** | ±5% | Legal metrology / direct enforcement |
| **B+** | ±7% | Pre-selection, bridge loading ← **our sweet spot** |
| **B** | ±10% | Infrastructure research |
| **C/D** | ±15–25% | Analytics only |

**Field KPIs (System 04, 24-month window):**

- Detection rate ≥ **99.5%**
- Classification ≥ **97%**
- Availability **99.4%** / year
- Drift correction window **> 90 days** between visits

---

### Slide 10 — Applications (§ 03)

**Four operating modes from one instrument:**

1. **Enforcement** — pre-select overweight → static scale hit rate 15% → **78%**
2. **Asset management** — load spectra → pavement remaining-life models
3. **Analytics** — corridor freight intelligence, OD profiles
4. **Bridge-WIM** — instrument the structure, not the pavement

---

### Slide 11 — Impact (`#impact`) — ROI MOMENT

**Headline:** *"Lighter roads, longer life, lower emissions."*

**Four impact stats:**

| Metric | Value |
|--------|-------|
| CO₂ avoided per corridor / yr | **11.2 kt** |
| Pavement life extension | **+5.4 years** |
| Maintenance spend reduced | **−38%** |
| Overloaded HGVs after 12 mo | **4.1%** (from 18.4%) |

**Charts to point at:**

- Overload trend: **18.4% → 4.1%** in 12 months
- 4th-power law: 14 t axle = **~30×** damage vs 6 t axle
- Before/after: resurfacing +5 yr, CO₂ −11.2 kt, road wear −53%

**Traffic flow & congestion:**

- **+12%** peak-hour throughput (free-flow vs static stops)
- Congestion hours: **4.2 → 1.6 hrs/day**
- Queue length: **280 m → 45 m**
- Avg delay: **−18 min**

**Client line:** *"This isn't just enforcement revenue — it's asset preservation, emissions reduction, and traffic that keeps moving."*

---

### Slide 12 — Deployment (`#deployment`)

**Site requirements checklist:**

- Pavement, geometry, environment
- Power & backhaul (4G/5G, fiber, GNSS time-sync)
- Maintenance cadence
- Privacy / GDPR-aware ANPR pipeline

**Client line:** *"Site selection is 70% of long-run performance. We characterize the road before we choose a sensor."*

---

## 3. Suggested talk track by audience

| Audience | Lead with | Spend most time on |
|----------|-----------|-------------------|
| **Enforcement / LEA** | E-ticket pipeline, ANPR fusion | § Enforcement, Performance Class B+ |
| **Road authority / asset mgr** | 4th-power law, pavement life | § Impact, Applications (asset mgmt) |
| **Procurement / finance** | ROI stats, tiered capabilities | § Capabilities, Impact, Deployment |
| **Technical / engineering** | Sensor stack, pipeline, calibration | § Technology, Pipeline, Performance |

---

## 4. Closing statement (30 seconds)

> *"AXLE//WIM gives you one corridor instrument that does four jobs: counts traffic, weighs every axle at highway speed, auto-issues signed e-tickets for offenders, and feeds your pavement and bridge models with ground-truth load data. You deploy the tier you need today. The rest switches on when you're ready. No lane closures. No random stops. Every record signed, traceable, and court-ready."*

---

## 5. Anticipated client questions

| Question | Answer |
|----------|--------|
| *Is the weight legally admissible?* | Class B+ (±7%) is standard for pre-selection; Class A for direct prosecution varies by jurisdiction. We ship signed records + metrology traceability. |
| *What happens to compliant trucks?* | Nothing — they pass at full speed. Only flagged vehicles are diverted or ticketed. |
| *How often does it need calibration?* | Continuous auto-calibration on steering-axle populations; annual manual validation recommended. |
| *Can it integrate with our back office?* | Yes — open APIs, per-vehicle records, aggregates, chain-of-evidence logs. |
| *What's the civil footprint?* | Quartz-piezo: thin slot in wearing course. Minimal disruption vs load-cell frames. |
| *What about privacy / ANPR?* | Configurable retention windows, purpose limitation, pseudonymization by default. |

---

## 6. Timing cheat sheet

| Section | Time |
|---------|------|
| Hero + hook | 2 min |
| Principles | 2 min |
| Live demo | 3 min |
| Technology + Pipeline | 3 min |
| Capabilities | 2 min |
| Enforcement demo | 4 min |
| Performance + Applications | 2 min |
| Impact + Traffic | 3 min |
| Deployment + close | 2 min |
| **Total** | **~20 min** |

---

## 7. Deck navigation quick reference

| Nav link | Section ID | Scroll to |
|----------|------------|-----------|
| System | `#live` | Live WIM scene + gallery |
| Technology | `#technology` | Sensor stack |
| Capabilities | `#capabilities` | Feature tiers |
| Enforcement | `#enforcement` | E-ticket pipeline |
| Performance | `#performance` | Accuracy classes + KPIs |
| Impact | `#impact` | Roads, environment, traffic |
| Deployment | `#deployment` | Site requirements |
