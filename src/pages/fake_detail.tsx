import { ExampleState } from '../example_state';
import { FAKE_HEADER_IMAGES } from './fake_header_images';
import { useCallback, useMemo } from 'preact/hooks';

interface FakeDetailProps {
    state: ExampleState
    firstPage?: boolean
}

export function FakeDetail(props: FakeDetailProps) {
    const image = useMemo(() => {
        const index = props.state.linkIndex;
        if (index == null) {
            return;
        }
        return FAKE_HEADER_IMAGES[index % FAKE_HEADER_IMAGES.length]
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
            <div class="page" onClick={onClick}>
                <img class="header" src={image} />
            </div >
        </>
    )
}
