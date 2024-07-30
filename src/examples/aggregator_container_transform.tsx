import { Example } from "../example";
import { ExampleState } from "../example_state";
import { IFramer } from "../iframer";
import { Aggregator } from "../pages/aggregator";
import { Detail } from "../pages/detail";

interface AggregatorImageToWholePageProps {
    sourceSelector: string,
    destinationSelector: string
}

export function AggregatorContainerTransform(props: AggregatorImageToWholePageProps) {
    const example1State = new ExampleState();

    return <>
        <IFramer style={{ height: "650px", width: "340px" }} state={example1State}>
            <Example
                startPageSelectorToVTNameMap={{
                    [props.sourceSelector]: "header_whole_expand"
                }}
                endPageSelectorToVTNameMap={{
                    [props.destinationSelector]: "header_whole_expand"
                }}
                state={example1State}
                startPage={
                    <Aggregator firstPage state={example1State}></Aggregator>
                }
                endPage={
                    <Detail state={example1State}></Detail>
                }>
            </Example >
        </IFramer >
    </>
}
