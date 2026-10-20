# Test Case Specification – MiniShop

## A. Business logic (shop-logic.js) – Jest unit tests

| TC | REQ | Prio | Input | Expected | Automated as |
|---|---|---|---|---|---|
| TC-L-01 | REQ-L-01 | K | query '' | all products | UT-01 |
| TC-L-02 | REQ-L-01 | K | query 'mouse' | Wireless Mouse | UT-02 |
| TC-L-03 | REQ-L-02 | K | sort name | names A-Z | UT-05 |
| TC-L-04 | REQ-L-02 | K | sort price-desc (249, 89) | 249 first | UT-07 |
| TC-L-05 | REQ-L-03 | K | 0.1 x 3 | 0.30 | UT-09 |
| TC-L-06 | REQ-L-04 | K | 39 + 24.5, rate 0.1 | subtotal 63.5; discount 6.35; total 57.15 | UT-13 |
| TC-L-07 | REQ-L-04 | K | empty cart | 0 for all fields | UT-14 |
| TC-L-08 | REQ-L-05 | K | qty 0, -5, '', null | 1 | UT-17 |
| TC-L-09 | REQ-L-05 | K | qty 2.7 | 2 | UT-16 |
| TC-L-10 | REQ-L-06 | V | ' save20 ' | 0.20 | UT-19 |
| TC-L-11 | REQ-L-07 | K | email 'mari@example' | email validation error | UT-24 |
| TC-L-12 | REQ-L-07 | K | valid checkout | {} | UT-21 |

## B. Inventory API (server.js) – Playwright API tests

Precondition for all: server running, POST /reset done (2 items: id 1 'A-1' qty 5, id 2 'B-2' qty 0).

| ID | REQ | Prio | Request (method, path, body) | Expected status | Expected body | Type |
|---|---|---|---|---|---|---|
| TC-01 | REQ-API-01 | K | GET /items | 200 | array of 2 items: [{id:1, sku:'A-1', qty:5}, {id:2, sku:'B-2', qty:0}] | positive |
| TC-02 | REQ-API-02 | K | GET /items/1 | 200 | { id: 1, sku: 'A-1', qty: 5 } | positive |
| TC-03 | REQ-API-02 | K | GET /items/999 | 404 | { error: 'not found' } | negative |
| TC-04 | REQ-API-03 | K | POST /items {"sku": "C-3", "qty": 7} | 201 | { id: 3, sku: 'C-3', qty: 7 } | positive |
| TC-05 | REQ-API-03 | V | POST /items {"sku": "C-3", "qty": 0} | 201 | { id: 3, sku: 'C-3', qty: 0 } | boundary |
| TC-06 | REQ-API-03 | K | POST /items {"sku": "C-3", "qty": -1} | 400 | { error: 'invalid qty' } | boundary |
| TC-07 | REQ-API-04 | K | POST /items {"sku": "bad sku!", "qty": 5} | 400 | { error: 'invalid sku' } | negative |
| TC-08 | REQ-API-05 | K | PUT /items/1 {"sku": "A-1-UPDATED", "qty": 10} | 200 | { id: 1, sku: 'A-1-UPDATED', qty: 10 } | positive |
| TC-09 | REQ-API-06, REQ-API-07 | K | DELETE /items/1 | 204 | (empty) | positive |
| TC-10 | REQ-API-06 | K | DELETE /items/999 | 404 | { error: 'not found' } | negative |

Note: REQ-API-08 Content-Type assertions and POST qty=2.5 are not yet automated; recorded as coverage gaps.
