import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SearchPage from "../pages/Search/SearchPage";
import { MemoryRouter } from "react-router-dom";
describe("SearchPage Tests", () => {
  const mockSearch = jest.fn();

  beforeEach(() => {
    mockSearch.mockClear();
  });

  it("should perform a search and display results", async () => {
    mockSearch.mockResolvedValue([
      // Mock search results
    ]);

    render(
      <MemoryRouter>
        <SearchPage search={mockSearch} />
      </MemoryRouter>
    );
  });

  test("SearchPage renders correctly", () => {
    render(
      <MemoryRouter>
        <SearchPage search={mockSearch} />
      </MemoryRouter>
    );
  });
});
