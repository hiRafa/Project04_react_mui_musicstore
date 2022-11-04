import { render, screen, fireEvent } from "@testing-library/react";
import CardsList from "./CardsList";

describe("testing general ui elements", () => {
  test("testing cards list if there are li items (which means the data is being fetched), eithe for products, news or favorites", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({ json: async () => [{}] });
    render(<CardsList />);

    const listOfProducts = await screen.findAllByRole("listitem");
    expect(listOfProducts).not.toHaveLength(0);
  });
});
