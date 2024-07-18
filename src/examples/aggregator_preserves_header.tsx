import { Example } from "../example";
import { ExampleState } from "../example_state";
import { IFramer } from "../iframer";
import { Aggregator } from "../pages/aggregator";
import { Detail } from "../pages/detail";

export function AggregatorPreservesHeader() {
    const example1State = new ExampleState();
    return <>
        <IFramer state={example1State}>
            <Example
                startPageSelectorToVTNameMap={{
                    "img.preview.active": "header_image_expand"
                }}
                endPageSelectorToVTNameMap={{
                    "img": "header_image_expand"
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
