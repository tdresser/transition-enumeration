import { JSX } from 'preact/jsx-runtime';
import { ExampleState } from '../example_state';
import { useCallback } from 'preact/hooks';

interface PassThroughProps {
    state: ExampleState
    firstPage?: boolean
    children: JSX.Element | JSX.Element[]
}

export function PassThrough(props: PassThroughProps) {
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
                {props.children}
            </div>
        </>
    )
}
