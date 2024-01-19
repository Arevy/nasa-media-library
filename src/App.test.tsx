import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app component correctly", () => {
  render(<App />);
  // const headingElement = screen.getByText(/Your Heading Text/i);
  // expect(headingElement).toBeInTheDocument();
});
