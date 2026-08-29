# Copilot Instructions — Healthcare AI Toolkit

## Always
- Run all inputs through `lib/phi/stripper.ts` before LLM calls
- Inject medical disclaimer via `lib/disclaimer.ts` on all outputs
- Use temperature=0 for clinical summarization
- Use only synthetic data from `fixtures/`

## Never
- Use real patient data
- Skip PHI stripping
- Omit the medical disclaimer
- Claim HIPAA compliance
