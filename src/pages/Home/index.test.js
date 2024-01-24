import { fireEvent, render, screen } from "@testing-library/react";
import EventCard from "../../components/EventCard";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    screen.getByTestId("listOfEvents");
  });
  it("a list of people is displayed", () => {
    render(<Home />);
    screen.getByTestId("listOfPeople");
  });
  it("a footer is displayed", async () => {
    render(<Home />);
    await screen.findByText("Notre derniére prestation");
    await screen.findByText("contact@724events.com");
    await screen.findByText("Une agence événementielle propose des prestations de service spécialisées dans la conception et l'organisation de divers événements tels que des événements festifs, des manifestations sportives et culturelles, des événements professionnels");
  });
  it("an event card, with the last event, is displayed", () => {
    render(
      <EventCard
        imageSrc="/images/stem-list-EVgsAbL51Rk-unsplash.png"
        title="Conférence #productCON"
        date={new Date("2022-04-29T20:28:45.744Z")}        
        label="soirée entreprise"
      />
    );
    const imageElement = screen.getByTestId("card-image-testid");    
    const titleElement = screen.getByText(/Conférence #productCON/);
    const monthElement = screen.getByText(/avril/);
    const labelElement = screen.getByText(/soirée entreprise/);
    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(monthElement).toBeInTheDocument();
  });
});
