# Architecture

## ⚠️ Disclaimer
This is a showcase/demo. Not a medical device. Not HIPAA certified. For educational and portfolio purposes only.

## Modules

| Module | Path | Purpose |
|---|---|---|
| PHI Stripper | `lib/phi/stripper.ts` | Removes simulated PHI before LLM |
| Disclaimer | `lib/disclaimer.ts` | Appends required medical disclaimer |
| Summarizer | `lib/clinical/summarizer.ts` | Structured clinical note summarization |
| Triage | `lib/clinical/triage.ts` | Symptom urgency scoring (NOT diagnosis) |
| Scheduler | `lib/scheduling/` | NLP appointment intent extraction |

## Data flow
User input → PHI strip → LLM (temp=0, claude-sonnet) → output + disclaimer injection → response.

## Synthetic fixtures
All example data in `fixtures/` is entirely synthetic and generated. Zero real patient data.
