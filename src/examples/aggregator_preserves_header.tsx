import { Example } from "../example";
import { ExampleState } from "../example_state";
import { Aggregator } from "../pages/aggregator";
import { Detail } from "../pages/detail";
import { Query } from "../util";

export function AggregatorPreservesHeader() {
    const example1State = new ExampleState();
    return <>
        <Example title="Aggregator Image Expands to Header"
            setupStartPageForVT={(q: Query) => {
                console.log("setup start");
                q("img.preview.active").style.viewTransitionName = "header_image_expand";
            }}
            setupEndPageForVT={(q: Query) => {
                console.log("setup end");
                q("img").style.viewTransitionName = "header_image_expand";
            }}
            state={example1State}
            startPage={
                <Aggregator firstPage state={example1State}></Aggregator>
            }
            endPage={
                <Detail state={example1State}></Detail>
            }>
        </Example >
    </>
}
