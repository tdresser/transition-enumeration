import { useCallback, useMemo, useState } from 'preact/hooks';
import { HEADER_IMAGES } from './header_images';
import { ExampleState } from '../example_state';

interface AggregatorProps {
    state: ExampleState
    firstPage?: boolean
}

export function Aggregator(props: AggregatorProps) {
    // This is a bit redundant with the state prop, but we need this to trigger rerenders.
    let [linkIndex, setLinkIndex] = useState(props.state.linkIndex);

    // Just doubling the length.
    const images = useMemo(() => HEADER_IMAGES.concat(HEADER_IMAGES), []);

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

    const imageElements = images.map((imageSrc, index) => {
        return <>
            <div class="aggregatorRow" onClick={onClick(index)} style={{ borderTop: "1px solid #999" }}>
                <img class={`preview ${index == linkIndex ? "active" : ""}`}
                    src={imageSrc}>
                </img>
                <p>Details</p>
            </div>
        </>
    })

    return (
        <>
            <div class="page" data-theme="light">
                <h3 style={{ paddingTop: "0.5em" }}>Bug Stuff Aggregator</h3>
                {imageElements}
            </div>
        </>
    )
}
