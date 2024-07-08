import { Example } from "../example";
import { ExampleState } from "../example_state";
import { Aggregator } from "../pages/aggregator";
import { Detail } from "../pages/detail";

export function AggregatorImageToWholePage() {
    const example1State = new ExampleState();
    return <>
        <Example title="Aggregator Image Expands to Whole Page"
            startPageSelectorToVTNameMap={{
                "img.preview.active": "header_whole_expand"
            }}
            endPageSelectorToVTNameMap={{
                ".page": "header_whole_expand"
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
