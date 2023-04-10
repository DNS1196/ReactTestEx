import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

let img1 = TEST_IMAGES[0];


it("renders without crashing", function () {
    render(<Card
        caption={img1.caption}
        src={img1.src}
        currNum={1}
        totalNum={3} />)
});


it("matches snapshot", function () {
    const { asFragment } = render(
        <Card
            caption={img1.caption}
            src={img1.src}
            currNum={1}
            totalNum={3} />);
    expect(asFragment()).toMatchSnapshot();
});

