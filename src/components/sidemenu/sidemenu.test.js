import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidemenu from "./sidemenu.component";

test("side menu should have a search bar", () => {
  render(<Sidemenu />);
  // I used screent.getByRole('') to view all available elements. then picked the textbox
  screen.getByRole("textbox");
});
test("side menu should have a search button", () => {
  render(<Sidemenu />);
  const submitButton = screen.getByRole("button");
  expect(submitButton.getAttribute("type")).toEqual("submit");
});
test("can type into search bar", async () => {
  render(<Sidemenu />);
  const searchBar = screen.getByPlaceholderText(/search location/i);
  await userEvent.type(searchBar, "mersin");
  expect(searchBar).toHaveValue("mersin");
});
