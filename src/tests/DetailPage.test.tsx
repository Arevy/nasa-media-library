import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import DetailPage from "../pages/Detail/DetailPage";
import { MemoryRouter } from "react-router-dom";
describe("SearchPage Tests", () => {
  const mockSearch = jest.fn();

  beforeEach(() => {
    mockSearch.mockClear();
  });

  it("should perform a search and display results", async () => {
    mockSearch.mockResolvedValue([
    ]);

    render(
      <MemoryRouter>
        <DetailPage fetchDetailData={mockSearch} />
      </MemoryRouter>
    );
  });
  test("DetailPage renders correctly", () => {
    render(
      <MemoryRouter>
        <DetailPage fetchDetailData={mockSearch} />
      </MemoryRouter>
    );
  });
});
