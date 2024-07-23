import { useCallback, useState } from 'preact/hooks';
import { ExampleState } from '../example_state';

interface AggregatorProps {
    state: ExampleState
    firstPage?: boolean
}

export function Aggregator(props: AggregatorProps) {
    // This is a bit redundant with the state prop, but we need this to trigger rerenders.
    let [linkIndex, setLinkIndex] = useState(props.state.linkIndex);

    const onClick = useCallback((index: number) => {
        return () => {
            console.log("Clicked " + index)
            if (props.firstPage) {
                props.state.activate(index);
                setLinkIndex(index);
            } else {
                props.state.reset();
            }
        }
    }, [])

    return (
        <>
            <div class="page" style={{ height: "100%" }}>
                <img src="images/real/aggregator_no_omnibox.png" style={{ height: "100%", aspectRatio: "auto" }}></img>
                <div style={{ top: "340px", height: "109px" }}
                    class={"link_overlay " + (linkIndex == 1 ? "active" : "")}
                    onClick={onClick(1)}>
                    <div class="link_overlay_inner"></div>
                </div>
                <div style={{ top: "449px", height: "109px" }}
                    class={"link_overlay " + (linkIndex == 2 ? "active" : "")}
                    onClick={onClick(2)}>
                    <div class="link_overlay_inner"></div>
                </div>
                <div style={{ top: "558px", height: "135px" }}
                    class={"link_overlay " + (linkIndex == 3 ? "active" : "")}
                    onClick={onClick(3)}>
                    <div class="link_overlay_inner"></div>
                </div>
            </div>
        </>
    )
}
