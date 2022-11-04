import { createYield } from "typescript";

describe("testing map", () => {
  it("can search for location", () => {
    cy.visit("http://localhost:3000/");
    cy.findByPlaceholderText(/search location/i).type("mersin\n");
  });

  it("can add marker to map", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#root > div > div:nth-child(1)").click();
  });
  it("can create a path on map", () => {
    cy.visit("http://localhost:3000/");
    const map = cy.get("#root > div > div:nth-child(1)");
    map.click();
    cy.findByRole("button", { name: /set as start/i }).click();
    map.click({ position: "top" });
    cy.findByRole("button", { name: /set as end/i }).click();
  });
  it("elevation chart and slope are displayed", () => {
    cy.visit("http://localhost:3000/");
    const map = cy.get("#root > div > div:nth-child(1)");
    map.click();
    cy.findByRole("button", { name: /set as start/i }).click();
    map.click({ position: "top" });
    cy.findByRole("button", { name: /set as end/i }).click();
    const chart = cy.get(".elevation-chart");
    chart.should("be.visible");
    const slope = cy.findByText(/average inclination:/i);
    slope.should("be.visible");
    chart
      .trigger("mousedown", { which: 1, x: 250, y: 20 })
      .trigger("mousemove", { x: 500, y: 20 })
      .trigger("mouseup", { force: true });

    cy.log(chart);
  });
});
