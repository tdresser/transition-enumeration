import { VNode } from "preact";
import { ExampleState } from "./example_state";
import { useMemo, useRef, useState } from "preact/hooks";
import { Query, fail, generateScopedQuery } from "./util";

interface ExampleProps {
    title: string,
    state: ExampleState;
    startPage: VNode<any>;
    endPage: VNode<any>;
    setupOutgoingVT?: (query: Query) => void;
    setupIncomingVT?: (query: Query) => void;
    vtStyle?: string;
}

export function Example(props: ExampleProps) {
    const container = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(props.startPage);

    useMemo(() => {
        props.state.listenToActivation((state) => {
            if (!state.activated) {
                setCurrentPage(props.startPage);
            } else {
                const query = generateScopedQuery(container.current ?? fail());
                // setTimeouts are a hack because we can't synchronously flush all DOM modifications.
                setTimeout(() => {
                    props.setupIncomingVT && props?.setupIncomingVT(query);
                    (container.current ?? fail()).style.viewTransitionName = "active-container";
                    const styleSheet = document.getElementById("vtstyle") ?? fail();
                    styleSheet.innerText = props.vtStyle ?? "";
                    // @ts-ignore
                    document.startViewTransition(() => {
                        setCurrentPage(props.endPage);
                        return new Promise<void>((resolve, _) => {
                            window.setTimeout(() => {
                                console.log("Is this the outgoing page? ");
                                console.log(container.current);
                                props.setupOutgoingVT && props.setupOutgoingVT(query);
                                resolve();
                                (container.current ?? fail()).style.viewTransitionName = "";
                            }, 0);
                        });
                    })
                }, 0)
            }
        })
    }, [])

    return (
        <>
            <h1>{props.title}</h1>
            <div ref={container} class="container">
                {currentPage}
            </div>
        </>
    )
}
