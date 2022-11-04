import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mapcontainer from "./mapcontainer.component";

test("render a map", () => {
  render(<Mapcontainer />);
  screen.getByRole("link", { name: /openstreetmap/i });
  screen.queryAllByRole("button", { name: /set as */i });
  const mapImages = screen.queryAllByRole("img");
  expect(mapImages[0].getAttribute("src")).toMatch("a.tile.openstreetmap.org");
});
