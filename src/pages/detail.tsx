import { ExampleState } from '../example_state';
import { AGGREGATED_PAGE_IMAGES } from './aggregated_page_images';
import { useCallback, useMemo, useState } from 'preact/hooks';

interface DetailProps {
    state: ExampleState
    firstPage?: boolean
}

export function Detail(props: DetailProps) {
    let [image, setImage] = useState<string | null>(null);

    console.log("Detail page useMemo with link index " + props.state.linkIndex)

    useMemo(() => {
        props.state.listenToActivation((state) => {
            if (state.linkIndex == undefined) {
                setImage(null);
                return;
            }
            setImage(AGGREGATED_PAGE_IMAGES[state.linkIndex % AGGREGATED_PAGE_IMAGES.length])
        })
    }, []);

    const onClick = useCallback(() => {
        if (props.firstPage) {
            props.state.activate()
        } else {
            props.state.reset();
        }
    }, [])

    return (
        <>
            <div class="page" style={{ height: "100%" }} onClick={onClick}>
                <img src={image ? image : ""} style={{ width: "100%", height: "100%" }} />
            </div>
        </>
    )
}
