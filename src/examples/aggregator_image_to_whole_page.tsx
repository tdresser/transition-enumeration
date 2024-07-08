import { Example } from "../example";
import { ExampleState } from "../example_state";
import { Aggregator } from "../pages/aggregator";
import { Detail } from "../pages/detail";
import { Query } from "../util";

export function AggregatorImageToWholePage() {
    const example1State = new ExampleState();
    const example2State = new ExampleState(3);
    return <>
        <Example title="Aggregator Image Expands to Whole Page"
            setupStartPageForVT={(q: Query) => {
                q("img.preview.active").style.viewTransitionName = "header_whole_expand";
            }}
            setupEndPageForVT={(q: Query) => {
                q(".page").style.viewTransitionName = "header_whole_expand";
            }}
            state={example1State}
            startPage={
                <Aggregator firstPage state={example1State}></Aggregator>
            }
            endPage={
                <Detail state={example1State}></Detail>
            }>
        </Example >

        <Example title="Whole Page Shrinks to Aggregator Image"
            setupEndPageForVT={(q: Query) => {
                q(".page").style.viewTransitionName = "header_whole_shrink";
            }}
            setupStartPageForVT={(q: Query) => {
                q("img.preview.active").style.viewTransitionName = "header_whole_shrink";
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
