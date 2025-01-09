# Donation Module

This module handles donation-related operations for the Charitan platform. It allows you to:

- Retrieve donation history for specific donors.
- Get the total donation amount for a donor.
- Find the total number of projects a donor has contributed to.
- Generate a leaderboard of top donors based on total donation amounts.
- Fetch all donations (with optional sorting).
- Get a donation by its ID.

## Code Structure

The donation module is organized into the following files:

- **`donationController.js`:** Handles HTTP request/response logic and interacts with the `donationService`.
- **`donationModel.js`:** Defines the Mongoose schema for the `Donation` model, specifying the structure and data types of donation records.
- **`donationRepository.js`:** Contains functions for direct database interactions (CRUD operations) using the `Donation` model.
- **`donationRoutes.js`:** Defines the API routes for the donation module, mapping HTTP requests to controller functions.
- **`donationService.js`:** Contains the business logic for donation operations, acting as a layer between the controller and the repository.

## API Routes

The following API routes are available for the donation module:

| Method | Route                                | Description                                                         | Query Parameters |
| :----- | :----------------------------------- | :------------------------------------------------------------------ | :--------------- |
| GET    | `/donations/:donationId`             | Get a specific donation by its ID.                                  | None             |
| GET    | `/donations/history/:donorId`        | Get the donation history for a specific donor.                      | None             |
| GET    | `/donations/total-amount/:donorId`   | Get the total donation amount for a specific donor.                 | None             |
| GET    | `/donations/total-projects/:donorId` | Get the total number of unique projects a donor has contributed to. | None             |
| GET    | `/donations/leaderboard`             | Get the leaderboard of top donors based on total donation amounts.  | None             |

## `getAllDonations` Endpoint

Retrieves a list of all donations, with optional filtering by time period and sorting.

**Method:** `GET`

**Query Parameters:**

| Parameter    | Type   | Required | Description                                                                                                                                                                                         |
| :----------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timePeriod` | string | No       | Specifies the time-based filtering. Possible values: `year`, `month`, `custom`. If not provided or invalid, no time-based filtering is applied (all-time).                                          |
| `year`       | number | No       | The year to filter by (e.g., `2023`). Required if `timePeriod` is `year` or `month`.                                                                                                                |
| `month`      | number | No       | The month to filter by (1-12). Required if `timePeriod` is `month`.                                                                                                                                 |
| `startDate`  | string | No       | The start date of the custom range (e.g., `2023-06-01`). Required if `timePeriod` is `custom`. Format: `YYYY-MM-DD`.                                                                                |
| `endDate`    | string | No       | The end date of the custom range (e.g., `2023-06-15`). Required if `timePeriod` is `custom`. Format: `YYYY-MM-DD`. The end date will include the whole day.                                         |
| `sortBy`     | string | No       | The field to sort by. Allowed values: `createdAt`, `amount`, `donor_id`. If not provided, defaults to `createdAt` in descending order (newest first).                                               |
| `sortOrder`  | string | No       | The sorting order. Possible values: `asc` (ascending), `desc` (descending). If not provided, defaults to `desc` if `sortBy` is provided, otherwise defaults to `asc` based on the default `sortBy`. |

**Filtering Logic:**

- **`timePeriod=year`:** Returns donations created in the specified `year`.
- **`timePeriod=month`:** Returns donations created in the specified `month` and `year`.
- **`timePeriod=custom`:** Returns donations created between `startDate` and `endDate` (inclusive).
- **No `timePeriod` or invalid value:** Returns all donations (no time-based filtering).

**Sorting Logic:**

- The `sortBy` parameter determines the field used for sorting.
- The `sortOrder` parameter determines the sorting direction.
- If `sortBy` is not provided, the results are sorted by `createdAt` in descending order (newest first) by default.

**Note:** All routes are relative to your API's base URL (e.g., `http://localhost:4000/api`).

## Example Usage

Here are some examples of how to use the donation module's API routes:
Get All Project:

---

Get all donations (no filtering or sorting):
GET /api/donations

---

Get donations in the year 2025:
GET /api/donations?timePeriod=year&year=2025

---

Get donations in Jan 2025:
GET /api/donations?timePeriod=month&year=2025&month=1

---

Get donations from 2024-06-01 to 2025-06-30:
GET /api/donations?timePeriod=custom&startDate=2024-06-01&endDate=2025-06-30

---

Get all donations, sorted by amount in descending order
GET /api/donations?sortBy=amount&sortOrder=desc

---

Get donations in June 2024, sorted by creation date in ascending order:
GET /api/donations?timePeriod=month&year=2024&month=6&sortBy=createdAt&sortOrder=asc
