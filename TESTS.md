# Automated Tests Documentation

SpendPilot uses **Vitest** for unit testing the core business logic. Our tests ensure that the audit engine remains "defensible" and logically consistent.

## Test List

| Filename | Coverage | Command |
| :--- | :--- | :--- |
| `engine.test.ts` | Core Audit Engine Logic | `npm test` |
| `engine.test.ts` | Tool Redundancy Rules | `npm test` |
| `engine.test.ts` | Rightsizing & Downgrade Logic | `npm test` |
| `engine.test.ts` | High-Spend Trigger (Credex) | `npm test` |
| `engine.test.ts` | Edge Cases (Empty/Optimal) | `npm test` |

## How to Run Tests

### 1. Locally
Ensure you have the dependencies installed, then run:
```bash
npm test
```

### 2. CI/CD
Tests are automatically executed on every push to the `main` branch via GitHub Actions. You can check the status in the **Actions** tab of the repository.

---

## Audit Engine Coverage Details

1. **Redundancy:** Verifies that if both Cursor and Copilot are active, the engine recommends cancelling Copilot.
2. **Rightsizing:** Verifies that a Claude Team plan with <5 users is correctly flagged for a downgrade to Pro individual licenses.
3. **Lead Generation:** Ensures that API spend >$500 triggers the specific Credex recommendation logic.
4. **Accuracy:** Confirms that a correctly configured stack results in $0 savings and a "Keep" recommendation.
5. **Robustness:** Ensures the engine doesn't crash on empty or invalid input states.
