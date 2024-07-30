import { CSSProperties } from 'preact/compat';
import { ExampleState } from '../example_state';
import { AGGREGATOR_IMAGES, AggregatorImageData, DISPLAY_RATIO } from './aggregated_page_images';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { fail } from '../util';

interface DetailProps {
    state: ExampleState
    firstPage?: boolean
}

export function Detail(props: DetailProps) {
    let [imageData, setImageData] = useState<AggregatorImageData | null>(null);

    console.log("Detail page useMemo with link index " + props.state.linkIndex)

    useMemo(() => {
        props.state.listenToActivation((state) => {
            if (state.linkIndex == undefined) {
                setImageData(null);
                return;
            }
            setImageData(AGGREGATOR_IMAGES[state.linkIndex]);
        })
    }, []);

    const onClick = useCallback(() => {
        if (props.firstPage) {
            props.state.activate()
        } else {
            props.state.reset();
        }
    }, [])

    const positionStyle = useMemo(() => {
        if (!imageData) {
            return null;
        }
        return {
            left: imageData.destinationHeaderPosition.x * DISPLAY_RATIO + "px",
            top: imageData.destinationHeaderPosition.y * DISPLAY_RATIO + "px",
            width: imageData.destinationHeaderPosition.width * DISPLAY_RATIO + "px",
            height: imageData.destinationHeaderPosition.height * DISPLAY_RATIO + "px",
            position: "absolute"
        } as CSSProperties
    }, [imageData]);

    return (
        <>
            <div class="page" style={{ height: "100%" }} onClick={onClick}>
                {imageData ? <>
                    <div class="header_coverer" style={
                        {
                            backgroundColor: "white", ...(positionStyle ?? fail())
                        }
                    }></div>
                    <img class="detail_header" src={imageData.destinationHeaderImage} style={positionStyle ?? fail()} />
                    <div class="empty_target" style={positionStyle ?? fail()} />

                    <img src={imageData.pageImage} style={{ width: "100%", height: "100%" }} />
                </> : <></>}
            </div >
        </>
    )
}
