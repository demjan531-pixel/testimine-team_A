# Traceability matrix – MiniShop

Results below are **expected** from the supplied defect-seeded code, not measured CI results. Run tests and replace the status cells before submitting. The handout does not provide official IDs for most UI requirements; confirm labels against the original UI specification.

| REQ | Test cases | Automated tests | Layer | Last result | Defect |
|---|---|---|---|---|---|
| REQ-L-01 | TC-L-01,02 | UT-01…04 | unit | expected PASS | — |
| REQ-L-02 | TC-L-03,04 | UT-05…08 | unit | expected UT-07 FAIL | D-L-01 |
| REQ-L-03 | TC-L-05 | UT-09 | unit | expected PASS | — |
| REQ-L-04 | TC-L-06,07 | UT-11…15 | unit | expected UT-13 FAIL | D-L-02 |
| REQ-L-05 | TC-L-08,09 | UT-16,17 | unit | expected UT-17 FAIL | D-L-03 |
| REQ-L-06 | TC-L-10 | UT-18…20 | unit | expected PASS | — |
| REQ-L-07 | TC-L-11,12 | UT-21…25 | unit | expected UT-24 FAIL | D-L-04 |
| REQ-API-01 | TC-01 | TC-01 | api | not run yet | — |
| REQ-API-02 | TC-02,03 | TC-02,03 | api | not run yet | D-A-01 (expected) |
| REQ-API-03 | TC-04,05,06 | TC-04,05,06 | api | not run yet | D-A-02 (expected) |
| REQ-API-04 | TC-07 | TC-07 | api | not run yet | — |
| REQ-API-05 | TC-08 | TC-08 | api | not run yet | — |
| REQ-API-06 | TC-09,10 | TC-09,10 | api | not run yet | D-A-03 (expected) |
| REQ-API-07 | TC-09 | TC-09 | api | not run yet | — |
| REQ-API-08 | — | — | api | NOT TESTED | — |
| UI search (REQ-UI ID to confirm) | UI-01…03 | UI-01…03 | ui/mobile | not verified | — |
| UI sorting (REQ-UI ID to confirm) | UI-11,12 | UI-11,12 | ui/mobile | not verified | D-L-01 |
| UI cart (REQ-UI ID to confirm) | UI-04…07, UI-13 | same | ui/mobile | not verified | — |
| UI quantity (REQ-UI ID to confirm) | UI-14 | UI-14 | ui/mobile | not verified | D-L-03 |
| REQ-UI-10 (basket discount, per handout) | UI-15,16 | UI-15,16 | ui/mobile | not verified | D-L-02 |
| UI checkout (REQ-UI ID to confirm) | UI-08…10, UI-18 | same | ui/mobile | not verified | D-L-04 |
