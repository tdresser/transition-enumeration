import { VNode } from "preact";
import { ExampleState } from "./example_state";
import { StateUpdater, useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Query, fail, generateScopedQuery } from "./util";

interface ExampleProps {
    title: string,
    state: ExampleState;
    startPage: VNode<any>;
    endPage: VNode<any>;
    // This is required for `pnpm build`, but not `pnpm run dev`. Not sure why.
    children?: never[];
    setupStartPageForVT?: (query: Query) => void;
    setupEndPageForVT?: (query: Query) => void;
    vtStyle?: string;
    vtReverseStyle?: string;
}

interface doVTParams {
    container: HTMLElement,
    setupOutgoingVT?: (query: Query) => void,
    setupIncomingVT?: (query: Query) => void;
    vtStyle?: string;
    destination: VNode<any>;
    setCurrentPage: (value: StateUpdater<VNode<any>>) => void
}

function doVT(params: doVTParams) {
    const query = generateScopedQuery(params.container);
    // setTimeouts are a hack because we can't synchronously flush all DOM modifications.
    setTimeout(() => {
        console.log("Setup outgoing")
        console.log(params.container.innerHTML);
        params.setupOutgoingVT && params?.setupOutgoingVT(query);
        params.container.style.viewTransitionName = "active-container";
        const styleSheet = document.getElementById("vtstyle") ?? fail();
        styleSheet.innerText = params.vtStyle ?? "";
        // @ts-ignore
        document.startViewTransition(() => {
            params.setCurrentPage(params.destination);
            return new Promise<void>((resolve, _) => {
                window.setTimeout(() => {
                    console.log("Setup incoming")
                    console.log(params.container.innerHTML);
                    params.setupIncomingVT && params.setupIncomingVT(query);
                    resolve();
                    params.container.style.viewTransitionName = "";
                }, 0);
            });
        })
    }, 0)
}

export function Example(props: ExampleProps) {
    const container = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(props.startPage);

    useEffect(() => {
        console.log("Current page changed to " + (currentPage == props.startPage ? "start" : "end"))
    }, [currentPage])

    useMemo(() => {
        props.state.listenToActivation((state) => {
            if (state.activated) {
                console.log("Forwards");
                doVT({
                    container: container.current ?? fail(),
                    setupOutgoingVT: props.setupStartPageForVT,
                    setupIncomingVT: props.setupEndPageForVT,
                    vtStyle: props.vtStyle,
                    destination: props.endPage,
                    setCurrentPage
                });
            } else {
                console.log("Reverse");
                doVT({
                    container: container.current ?? fail(),
                    // Swap the order
                    setupOutgoingVT: props.setupEndPageForVT,
                    setupIncomingVT: props.setupStartPageForVT,
                    vtStyle: props.vtReverseStyle ? props.vtReverseStyle : props.vtStyle,
                    destination: props.startPage,
                    setCurrentPage
                });
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
