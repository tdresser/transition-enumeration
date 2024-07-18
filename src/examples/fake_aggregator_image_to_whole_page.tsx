import { Example } from "../example";
import { ExampleState } from "../example_state";
import { IFramer } from "../iframer";
import { FakeAggregator } from "../pages/fake_aggregator";
import { FakeDetail } from "../pages/fake_detail";

export function FakeAggregatorImageToWholePage() {
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
                    <FakeAggregator firstPage state={example1State}></FakeAggregator>
                }
                endPage={
                    <FakeDetail state={example1State}></FakeDetail>
                }>
            </Example >
        </IFramer>
    </>
}
