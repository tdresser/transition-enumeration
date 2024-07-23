import { ExampleState } from '../example_state';
import { REAL_PAGES } from './header_images';
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
        return REAL_PAGES[index % REAL_PAGES.length]
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
            <div class="page" style={{ height: "100%" }} onClick={onClick}>
                <img src={image} style={{ width: "100%", height: "100%" }} />
            </div>
        </>
    )
}
