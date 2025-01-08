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

| Method                                             | Route                                | Description                                                         | Query Parameters                                                                           |
| :------------------------------------------------- | :----------------------------------- | :------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| GET                                                | `/donations`                         | Fetch all donations.                                                | `sortBy`: Field to sort by (e.g., `createdAt`, `amount`).<br>`sortOrder`: `asc` or `desc`. |
| GET                                                | `/donations/:donationId`             | Get a specific donation by its ID.                                  | None                                                                                       |
| GET                                                | `/donations/history/:donorId`        | Get the donation history for a specific donor.                      | None                                                                                       |
| GET                                                | `/donations/total-amount/:donorId`   | Get the total donation amount for a specific donor.                 | None                                                                                       |
| GET                                                | `/donations/total-projects/:donorId` | Get the total number of unique projects a donor has contributed to. | None                                                                                       |
| GET                                                | `/donations/leaderboard`             | Get the leaderboard of top donors based on total donation amounts.  | `timePeriod`: `month` or `year` (optional, defaults to all-time from 2010).<br>`sortBy`:   |
| Field to sort by.<br>`sortOrder`: `asc` or `desc`. |

**Note:** All routes are relative to your API's base URL (e.g., `http://localhost:4000/api`).

## Example Usage

Here are some examples of how to use the donation module's API routes:

**1. Fetch all donations (no sorting):**
