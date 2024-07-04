import { ExampleState } from '../example_state';
import { HEADER_IMAGES } from './header_images';
import { useCallback, useMemo } from 'preact/hooks';

interface DetailProps {
    state: ExampleState
    firstPage?: boolean
}

export function Detail(props: DetailProps) {
    const image = useMemo(() => {
        const index = props.state.linkIndex;
        if (index == null) {
            return;
        }
        return HEADER_IMAGES[index % HEADER_IMAGES.length]
    }, [props.state.linkIndex])

    const onClick = useCallback(() => {
        if (props.firstPage) {
            props.state.activate()
        } else {
            props.state.reset();
        }
    }, [])

    return (
        <>
            <div class="page" data-theme="dark" style={{ backgroundColor: "#333344", "height": "100%" }} onClick={onClick}>
                <img class="header" src={image} />
                <div class="content">
                    <h1>BUG FACTS</h1>
                    <p> Some facts about bugs.</p>
                </div>
            </div>
        </>
    )
}
