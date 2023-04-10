import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the arrows", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  //TESTS LEFT ARROW BUG
  const leftArrow = container.querySelector('.bi-arrow-left-circle');
  fireEvent.click(leftArrow);

  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing" />);
  expect(asFragment()).toMatchSnapshot();
});

it("hides the left arrow when on the first image and the right arrow when on the last image", function () {
  const { container, rerender } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // expect the left arrow to be hidden
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();

  // expect the right arrow to be visible
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).toBeInTheDocument();

  // move to the last image
  rerender(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the left arrow to be visible
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).toBeInTheDocument();

  // expect the right arrow to be hidden
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();
});