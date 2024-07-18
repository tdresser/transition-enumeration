import { Example } from "../example";
import { ExampleState } from "../example_state";
import { IFramer } from "../iframer";
import { Aggregator } from "../pages/aggregator";
import { Detail } from "../pages/detail";

export function AggregatorImageToWholePage() {
    const example1State = new ExampleState();
    return <>
        <IFramer state={example1State}>
            <Example
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
        </IFramer>
    </>
}
