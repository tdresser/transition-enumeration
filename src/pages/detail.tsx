import { ExampleState } from '../example_state';
import { REAL_PAGES } from './header_images';
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
            setImage(REAL_PAGES[state.linkIndex % REAL_PAGES.length])
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
                <img src={image} style={{ width: "100%", height: "100%" }} />
            </div>
        </>
    )
}
