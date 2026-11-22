# Test Cases

Run these tests locally and fill the Actual Result column with your observations. Use fictional test data only.

| ID | Module | Test input/action | Expected result | Actual result |
|---|---|---|---|---|
| TC-01 | Health | Open `/api/health` | JSON status is `ok` | [Fill] |
| TC-02 | Registration | Register with valid name, email and 8+ character password | Account created and token returned | [Fill] |
| TC-03 | Registration | Register again with same email | Duplicate-account message | [Fill] |
| TC-04 | Login | Login with correct credentials | User logged in | [Fill] |
| TC-05 | Login | Login with wrong password | Safe error message | [Fill] |
| TC-06 | Profile | Save a valid profile | Profile saved to MongoDB | [Fill] |
| TC-07 | Profile | Save negative land area | Validation error | [Fill] |
| TC-08 | Directory | Open scheme directory | Active scheme records appear | [Fill] |
| TC-09 | Filter | Select State = Madhya Pradesh | Central all-India and MP records appear; other state-only records would be excluded | [Fill] |
| TC-10 | Filter | Select level = State | Only State records appear | [Fill] |
| TC-11 | Search | Search “irrigation” | Relevant scheme records appear | [Fill] |
| TC-12 | Matching | Profile state = Madhya Pradesh | MP schemes and all-India schemes can be shown as potentially relevant | [Fill] |
| TC-13 | Matching | Profile state differs from a state-only scheme | State mismatch caveat appears | [Fill] |
| TC-14 | Source | Click official source link | Government source opens in new tab | [Fill] |
| TC-15 | Auth guard | Request `/api/matches` without token | HTTP 401 response | [Fill] |

## Manual test procedure
1. Start MongoDB and the backend.
2. Run the seed command.
3. Start the frontend.
4. Execute the tests above.
5. Record actual output, date and screenshots.
