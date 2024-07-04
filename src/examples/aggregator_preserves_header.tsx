import { Example } from "../example";
import { ExampleState } from "../example_state";
import { Aggregator } from "../pages/aggregator";
import { Detail } from "../pages/detail";
import { Query } from "../util";

export function AggregatorPreservesHeader() {
    const example1State = new ExampleState();
    const example2State = new ExampleState(3);
    return <>
        <Example title="Aggregator Image Expands to Header"
            setupIncomingVT={(q: Query) => {
                q("img.preview.active").style.viewTransitionName = "header_image_expand";
            }}
            setupOutgoingVT={(q: Query) => {
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

        <Example title="Header Shrinks to Aggregator Image"
            setupIncomingVT={(q: Query) => {
                q("img").style.viewTransitionName = "header_image_shrink";
            }}
            setupOutgoingVT={(q: Query) => {
                q("img.preview.active").style.viewTransitionName = "header_image_shrink";
            }}
            state={example2State}
            startPage={
                <Detail firstPage state={example2State}></Detail>
            }
            endPage={
                <Aggregator state={example2State}></Aggregator>
            }>
        </Example></>
}
