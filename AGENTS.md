# Healthcare AI Toolkit — Agent Doctrine

## What this repo is
AI toolkit for healthcare adjacent use cases: clinical note summarization, symptom triage (NOT diagnosis), appointment scheduling, and PHI-safe patterns.
By Cherry Shanaley (Chan), AI Solutions Engineer.

## ⚠️ Critical compliance rules
- This is a SHOWCASE / DEMO — not a medical device, not HIPAA certified
- Every output must include disclaimer: "This is not medical advice. Consult a healthcare professional."
- No real patient data — all examples use synthetic data only
- PHI simulation stripped before any LLM call — `lib/phi/stripper.ts`

## Tech stack
- TypeScript strict, Next.js 15, Anthropic Claude (preferred for medical language), Supabase

## Coding rules
- Medical disclaimer injected by `lib/disclaimer.ts` — never skip it
- PHI stripper runs on ALL inputs before LLM — no exceptions
- Synthetic patient data in `fixtures/` — never real data
- Temperature = 0 for all clinical summarization — deterministic output required

## Commands
```bash
npm install && npm run dev
npm run test
```

## Do not
- Use real patient data of any kind
- Skip the medical disclaimer
- Skip PHI stripping
- Market this as a HIPAA-compliant product
