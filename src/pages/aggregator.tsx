import { useCallback, useState } from 'preact/hooks';
import { ExampleState } from '../example_state';
import { AGGREGATOR_IMAGES, DISPLAY_RATIO } from './aggregated_page_images';

interface AggregatorProps {
    state: ExampleState
    firstPage?: boolean
}

export function Aggregator(props: AggregatorProps) {
    // This is a bit redundant with the state prop, but we need this to trigger rerenders.
    let [linkIndex, setLinkIndex] = useState(props.state.linkIndex);

    const onClick = useCallback((index: number) => {
        return () => {
            if (props.firstPage) {
                props.state.activate(index);
                setLinkIndex(index);
            } else {
                props.state.reset();
            }
        }
    }, [])

    const getHeaderImage = useCallback((index: number) => {
        let imageData = AGGREGATOR_IMAGES[index];
        return <>
            <div style={{
                left: imageData.sourceHeaderPosition.x * DISPLAY_RATIO + "px",
                top: (imageData.sourceHeaderPosition.y - imageData.sourceRowPosition.y) * DISPLAY_RATIO + "px",
                width: imageData.sourceHeaderPosition.width * DISPLAY_RATIO + "px",
                height: imageData.sourceHeaderPosition.height * DISPLAY_RATIO + "px",
                position: "absolute",
            }}>
                <div class="empty_target" style={{ inset: "0", position: "absolute" }} ></div>
                <div class="header_coverer" style={{ inset: "0", position: "absolute", backgroundColor: "#0f1113" }} ></div>
                <img class="link_overlay_inner" style={{ inset: "0", position: "absolute" }}
                    src={imageData.sourceHeaderImage}></img >
            </div >
        </>
    }, []);

    const getRow = useCallback((index: number) => {
        let imageData = AGGREGATOR_IMAGES[index];
        return <>
            <div style={{
                top: imageData.sourceRowPosition.y * DISPLAY_RATIO,
                height: imageData.sourceRowPosition.height * DISPLAY_RATIO
            }}
                class={"link_overlay " + (linkIndex == index ? "active" : "")}
                onClick={onClick(index)}>
                {getHeaderImage(index)}
            </div>
        </>
    }, [linkIndex]);

    return (
        <>
            <div class="page" style={{ height: "100%" }}>
                <img src="images/real/aggregator_no_omnibox.png" style={{ height: "100%", aspectRatio: "auto" }}></img>
                {getRow(0)}
                {getRow(1)}
                {getRow(2)}
            </div>
        </>
    )
}
