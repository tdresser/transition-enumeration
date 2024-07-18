import { Example } from "../example";
import { ExampleState } from "../example_state";
import { IFramer } from "../iframer";
import { FakeAggregator } from "../pages/fake_aggregator";
import { FakeDetail } from "../pages/fake_detail";

export function FakeAggregatorPreservesHeader() {
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
                    <FakeAggregator firstPage state={example1State}></FakeAggregator>
                }
                endPage={
                    <FakeDetail state={example1State}></FakeDetail>
                }>
            </Example >
        </IFramer>
    </>
}
